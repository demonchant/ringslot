import axios from 'axios';

const BASE_URL = 'https://5sim.net/v1';
const CACHE_TTL_MS = 5 * 60 * 1000;
const countryCache = { data: null, expiresAt: 0 };
const balanceCache = { value: null, expiresAt: 0 };

function client() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${process.env.FIVESIM_API_KEY}`,
      Accept: 'application/json',
    },
  });
}

function publicClient() {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: { Accept: 'application/json' },
  });
}

async function resolveCountry(country = 'any') {
  if (!country || country === 'any') return 'any';
  const code = String(country).split('_')[0].toLowerCase();
  if (code.length !== 2) return code;

  if (!countryCache.data || Date.now() >= countryCache.expiresAt) {
    const { data } = await publicClient().get('/guest/countries');
    countryCache.data = data && typeof data === 'object' ? data : {};
    countryCache.expiresAt = Date.now() + CACHE_TTL_MS;
  }

  const match = Object.entries(countryCache.data).find(([, details]) =>
    details?.iso && Object.prototype.hasOwnProperty.call(details.iso, code)
  );
  if (!match) throw new Error(`Number supplier does not list country: ${country}`);
  return match[0];
}

function minimumAvailableCost(node, current = Infinity) {
  if (!node || typeof node !== 'object') return current;
  if (Number(node.count) > 0 && Number(node.cost) > 0) return Math.min(current, Number(node.cost));
  for (const value of Object.values(node)) current = minimumAvailableCost(value, current);
  return current;
}

export const fiveSim = {
  name: 'fivesim',

  isConfigured() {
    return Boolean(process.env.FIVESIM_API_KEY?.trim());
  },

  async isReady() {
    const balance = Date.now() < balanceCache.expiresAt
      ? balanceCache.value
      : await this.getBalance();
    return balance > 0;
  },

  async getBalance() {
    const { data } = await client().get('/user/profile');
    const balance = Number(data?.balance);
    if (!Number.isFinite(balance)) throw new Error('Number supplier returned an invalid balance');
    balanceCache.value = balance;
    balanceCache.expiresAt = Date.now() + CACHE_TTL_MS;
    return balance;
  },

  async getProducts(country = 'any') {
    const resolvedCountry = await resolveCountry(country);
    const { data } = await publicClient().get(`/guest/products/${resolvedCountry}/any`);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('Number supplier returned an invalid product catalog');
    }
    return Object.entries(data)
      .filter(([, item]) => String(item?.Category || '').toLowerCase() === 'activation')
      .map(([code, item]) => ({
        code,
        quantity: Number(item.Qty || 0),
        price: Number(item.Price || 0),
      }));
  },

  async getNumber(service, country = 'any') {
    const c = await resolveCountry(country);
    const { data } = await client().get(`/user/buy/activation/${c}/any/${service}`);
    const rawNumber = String(data.phone || '');
    const number = rawNumber.startsWith('+') ? rawNumber : `+${rawNumber}`;
    return { id: String(data.id), number, provider: this.name };
  },

  async getStatus(orderId) {
    const { data } = await client().get(`/user/check/${orderId}`);
    if (data.status === 'RECEIVED' && data.sms?.length) {
      return { status: 'received', sms: data.sms[0]?.code || data.sms[0]?.text };
    }
    if (['CANCELED', 'TIMEOUT', 'BANNED'].includes(data.status)) {
      return { status: 'cancelled', sms: null };
    }
    return { status: 'waiting', sms: null };
  },

  async cancel(orderId) {
    await client().get(`/user/cancel/${orderId}`);
  },

  async getPrices(service, country = 'any') {
    try {
      const resolvedCountry = await resolveCountry(country);
      const params = { product: service };
      if (resolvedCountry !== 'any') params.country = resolvedCountry;
      const { data } = await publicClient().get('/guest/prices', { params });
      const min = minimumAvailableCost(data);
      return min === Infinity ? null : parseFloat(min);
    } catch {
      return null;
    }
  },
};
