import { smsActivate } from '../providers/smsactivate.js';
import { fiveSim } from '../providers/fivesim.js';
import { smsMan } from '../providers/smsman.js';
import { query } from '../config/database.js';
import redis from '../config/redis.js';
import logger from '../utils/logger.js';
import { providerHealth } from './providerHealth.js';

const PROVIDERS = { smsactivate: smsActivate, fivesim: fiveSim, smsman: smsMan };

async function enabledProviders() {
  const { rows } = await query(
    'SELECT provider_name FROM providers WHERE enabled = TRUE ORDER BY priority ASC'
  );
  return rows
    .map((r) => PROVIDERS[r.provider_name])
    .filter((provider) => provider && (typeof provider.isConfigured !== 'function' || provider.isConfigured()));
}

async function getPrice(provider, service, country) {
  const key = `price:${provider.name}:${service}:${country}`;
  try {
    const cached = await redis.get(key);
    if (cached) return parseFloat(cached);
    const start = Date.now();
    const price = await provider.getPrices(service, country);
    providerHealth.recordSuccess(provider.name, Date.now() - start);
    if (price) await redis.setex(key, 300, String(price));
    return price;
  } catch (err) {
    providerHealth.recordFailure(provider.name);
    return null;
  }
}

export async function buyWithFailover(service, country = 'any') {
  const providers = await enabledProviders();

  // Filter by circuit breaker health
  const available = providers.filter(p => providerHealth.isAvailable(p.name));
  if (!available.length) throw new Error('All providers temporarily unavailable');

  const primaryProvider = process.env.PRIMARY_PROVIDER || 'smsman';
  const ordered = [...available].sort((a, b) => {
    if (a.name === primaryProvider) return -1;
    if (b.name === primaryProvider) return 1;
    return 0;
  });

  for (const p of ordered) {
    try {
      const price = await getPrice(p, service, country);
      if (!(price > 0)) continue;
      const start = Date.now();
      const result = await p.getNumber(service, country);
      providerHealth.recordSuccess(p.name, Date.now() - start);
      logger.info('Number bought', { provider: p.name, service, number: result.number, responseMs: Date.now() - start });
      return { ...result, providerPrice: price };
    } catch (err) {
      providerHealth.recordFailure(p.name);
      logger.warn(`Provider ${p.name} failed`, { error: err.message, service, country });
    }
  }
  throw new Error('No provider has inventory for this service and country');
}

export async function checkStatus(providerName, orderId) {
  const p = PROVIDERS[providerName];
  if (!p) throw new Error(`Unknown provider: ${providerName}`);
  try {
    const start = Date.now();
    const result = await p.getStatus(orderId);
    providerHealth.recordSuccess(providerName, Date.now() - start);
    return result;
  } catch (err) {
    providerHealth.recordFailure(providerName);
    throw err;
  }
}

export async function cancelOrder(providerName, orderId) {
  const p = PROVIDERS[providerName];
  if (!p) throw new Error(`Unknown provider: ${providerName}`);
  try {
    const start = Date.now();
    await p.cancel(orderId);
    providerHealth.recordSuccess(providerName, Date.now() - start);
  } catch (err) {
    providerHealth.recordFailure(providerName);
    throw err;
  }
}

export async function getProviderBalances() {
  const providers = await enabledProviders();
  const balances = {};
  await Promise.allSettled(providers.map(async (p) => {
    try {
      const start = Date.now();
      const balance = await p.getBalance();
      providerHealth.recordSuccess(p.name, Date.now() - start);
      balances[p.name] = balance;
    } catch (err) {
      providerHealth.recordFailure(p.name);
      balances[p.name] = null;
    }
  }));
  return balances;
}

export function getProviderHealthStats() {
  return providerHealth.getAllStats();
}
