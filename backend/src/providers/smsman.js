import axios from 'axios';

const CATALOG_TTL_MS = 6 * 60 * 60 * 1000;
const BALANCE_TTL_MS = 2 * 60 * 1000;
const catalogCache = { applications: null, countries: null, expiresAt: 0 };
const balanceCache = { value: null, expiresAt: 0 };

function minimumApiBalance() {
  const configured = Number(process.env.SMSMAN_MIN_API_BALANCE || 12);
  return Number.isFinite(configured) && configured >= 0 ? configured : 12;
}

function apiKey() {
  const key = process.env.SMSMAN_API_KEY?.trim();
  if (!key) throw new Error('SMSMAN_API_KEY is not configured');
  return key;
}

function client() {
  return axios.create({
    baseURL: 'https://api.sms-man.com/control',
    timeout: 15000,
    params: { token: apiKey() },
  });
}

function normalize(value = '') {
  return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function assertSuccess(data) {
  if (data?.error_code || data?.success === false) {
    throw new Error(data.error_code || data.error_msg || 'SMS-Man request failed');
  }
  if (data?.error) throw new Error(String(data.error));
  return data;
}

function catalogArray(data, kind) {
  const result = assertSuccess(data);
  if (Array.isArray(result)) return result;

  const candidates = [result?.data, result?.result, result?.[kind]];
  const catalog = candidates.find(Array.isArray);
  if (catalog) return catalog;

  const responseType = result === null ? 'null' : typeof result;
  const keys = result && typeof result === 'object'
    ? Object.keys(result).slice(0, 8).join(',')
    : '';
  throw new Error(`SMS-Man returned an invalid ${kind} catalog (${responseType}${keys ? `: ${keys}` : ''})`);
}

async function refreshCatalog(force = false) {
  if (!force && catalogCache.applications && catalogCache.countries && Date.now() < catalogCache.expiresAt) return catalogCache;
  const api = client();
  const [applicationsResponse, countriesResponse] = await Promise.all([
    api.get('/applications'),
    api.get('/countries'),
  ]);
  const applications = catalogArray(applicationsResponse.data, 'applications');
  const countries = catalogArray(countriesResponse.data, 'countries');
  catalogCache.applications = applications;
  catalogCache.countries = countries;
  catalogCache.expiresAt = Date.now() + CATALOG_TTL_MS;
  return catalogCache;
}

async function applicationId(service) {
  const { applications } = await refreshCatalog();
  const wanted = normalize(service);
  const match = applications.find((item) =>
    String(item.id) === String(service) || normalize(item.code) === wanted || normalize(item.name || item.title) === wanted
  );
  if (!match) throw new Error(`SMS-Man does not list service: ${service}`);
  return String(match.id);
}

const COUNTRY_ALIASES = {
  gb: 'unitedkingdom', uk: 'unitedkingdom', us: 'unitedstates', kr: 'southkorea',
  kp: 'northkorea', cz: 'czechrepublic', ci: 'ivorycoast', tw: 'taiwan', vn: 'vietnam',
};

async function countryId(country) {
  if (!country || country === 'any') return '0';
  const baseCode = String(country).split('_')[0].toLowerCase();
  if (/^\d+$/.test(baseCode)) return baseCode;
  const { countries } = await refreshCatalog();
  const displayName = baseCode.length === 2
    ? new Intl.DisplayNames(['en'], { type: 'region' }).of(baseCode.toUpperCase())
    : baseCode;
  const wanted = COUNTRY_ALIASES[baseCode] || normalize(displayName);
  const match = countries.find((item) =>
    normalize(item.title || item.name_en || item.name) === wanted || normalize(item.code || item.iso) === normalize(baseCode)
  );
  if (!match) throw new Error(`SMS-Man does not list country: ${country}`);
  return String(match.id);
}

function priceEntries(data, requestedCountryId, requestedApplicationId) {
  const countryBuckets = requestedCountryId === '0' ? Object.values(data || {}) : [data?.[requestedCountryId]].filter(Boolean);
  const entries = [];
  for (const bucket of countryBuckets) {
    const item = bucket?.[requestedApplicationId];
    if (item && Number(item.count) > 0 && Number(item.cost) > 0) entries.push(Number(item.cost));
  }
  return entries;
}

export const smsMan = {
  name: 'smsman',

  isConfigured() {
    return Boolean(process.env.SMSMAN_API_KEY?.trim());
  },

  minimumApiBalance,

  hasApiBalance(balance) {
    return Number(balance) > minimumApiBalance();
  },

  async isReady() {
    const balance = Date.now() < balanceCache.expiresAt
      ? balanceCache.value
      : await this.getBalance();
    return this.hasApiBalance(balance);
  },

  async getApplications({ force = false } = {}) {
    return (await refreshCatalog(force)).applications;
  },

  async getCountries({ force = false } = {}) {
    return (await refreshCatalog(force)).countries;
  },

  async getBalance() {
    const { data } = await client().get('/get-balance');
    const balance = Number(assertSuccess(data).balance);
    if (!Number.isFinite(balance)) throw new Error('SMS-Man returned an invalid balance');
    balanceCache.value = balance;
    balanceCache.expiresAt = Date.now() + BALANCE_TTL_MS;
    return balance;
  },

  async getNumber(service, country = 'any') {
    const [resolvedApplicationId, resolvedCountryId] = await Promise.all([applicationId(service), countryId(country)]);
    const { data } = await client().get('/get-number', {
      params: {
        application_id: resolvedApplicationId,
        country_id: resolvedCountryId,
        currency: process.env.SMSMAN_CURRENCY || 'USD',
      },
    });
    const result = assertSuccess(data);
    if (!result.request_id || !result.number) throw new Error('SMS-Man did not return a number');
    const number = String(result.number).startsWith('+') ? String(result.number) : `+${result.number}`;
    return { id: String(result.request_id), number, provider: this.name };
  },

  async getStatus(orderId) {
    const { data } = await client().get('/get-sms', { params: { request_id: orderId } });
    if (data?.error_code === 'wait_sms') return { status: 'waiting', sms: null };
    const result = assertSuccess(data);
    return result.sms_code ? { status: 'received', sms: String(result.sms_code) } : { status: 'waiting', sms: null };
  },

  async cancel(orderId) {
    const { data } = await client().get('/set-status', { params: { request_id: orderId, status: 'reject' } });
    assertSuccess(data);
  },

  async getPrices(service, country = 'any') {
    const [resolvedApplicationId, resolvedCountryId] = await Promise.all([applicationId(service), countryId(country)]);
    const { data } = await client().get('/get-prices', {
      params: resolvedCountryId === '0' ? {} : { country_id: resolvedCountryId },
    });
    const prices = priceEntries(assertSuccess(data), resolvedCountryId, resolvedApplicationId);
    return prices.length ? Math.min(...prices) : null;
  },
};
