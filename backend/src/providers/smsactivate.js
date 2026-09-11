import axios from 'axios';

const DEFAULT_BASE = 'https://sms-activate.org/stubs/handler_api.php';

function baseUrl() {
  return process.env.SMSACTIVATE_BASE_URL?.trim() || DEFAULT_BASE;
}

function get(params) {
  return axios.get(baseUrl(), {
    params: { api_key: process.env.SMSACTIVATE_API_KEY, ...params },
    timeout: 15000,
  });
}

function textResponse(data) {
  return typeof data === 'string' ? data.trim() : '';
}

function providerError(data) {
  const text = textResponse(data);
  if (!text || text.startsWith('BAD_') || text.startsWith('NO_') || text.startsWith('ERROR')) {
    throw new Error(text || 'SMS-Activate returned an invalid response');
  }
  return text;
}

function collectCosts(node, service, costs = []) {
  if (!node || typeof node !== 'object') return costs;
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === 'object' && Number.isFinite(Number(value.cost))) {
      if (!service || key === service) costs.push(Number(value.cost));
    } else {
      collectCosts(value, service, costs);
    }
  }
  return costs;
}

export const smsActivate = {
  name: 'smsactivate',

  isConfigured() {
    return Boolean(process.env.SMSACTIVATE_API_KEY?.trim());
  },

  async getBalance() {
    const { data } = await get({ action: 'getBalance' });
    const text = providerError(data);
    if (!text.startsWith('ACCESS_BALANCE:')) throw new Error(`SMS-Activate balance request failed: ${text}`);
    const balance = Number(text.split(':')[1]);
    if (!Number.isFinite(balance)) throw new Error('SMS-Activate returned an invalid balance');
    return balance;
  },

  async getNumber(service, country = 'any') {
    const { data } = await get({
      action: 'getNumber',
      service,
      country: country === 'any' ? '0' : country,
    });
    const text = providerError(data);
    if (!text.startsWith('ACCESS_NUMBER:')) throw new Error(`SMS-Activate number request failed: ${text}`);
    const parts = text.split(':');
    return { id: parts[1], number: `+${parts[2]}`, provider: this.name };
  },

  async getStatus(orderId) {
    const { data } = await get({ action: 'getStatus', id: orderId });
    const text = providerError(data);
    if (text.startsWith('STATUS_OK')) return { status: 'received', sms: text.split(':')[1] };
    if (text === 'STATUS_CANCEL') return { status: 'cancelled', sms: null };
    return { status: 'waiting', sms: null };
  },

  async cancel(orderId) {
    const { data } = await get({ action: 'setStatus', id: orderId, status: 8 });
    providerError(data);
  },

  async getPrices(service) {
    try {
      const { data } = await get({ action: 'getPrices', service });
      const parsed = typeof data === 'string' ? JSON.parse(providerError(data)) : data;
      const costs = collectCosts(parsed, service);
      return costs.length ? Math.min(...costs) : null;
    } catch {
      return null;
    }
  },
};
