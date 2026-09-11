import test from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';

test('SMS-Man resolves provider service and country IDs for price and number requests', async () => {
  const originalCreate = axios.create;
  const calls = [];
  process.env.SMSMAN_API_KEY = 'test-key';
  process.env.SMSMAN_CURRENCY = 'USD';

  axios.create = () => ({
    async get(path, config = {}) {
      calls.push({ path, params: config.params || {} });
      if (path === '/applications') return { data: { applications: [{ id: '3', name: 'Telegram', code: 'tg' }] } };
      if (path === '/countries') return { data: { data: [{ id: 187, title: 'United States' }] } };
      if (path === '/get-balance') return { data: { balance: '12.01' } };
      if (path === '/get-prices') return { data: { 187: { 3: { cost: '0.25', count: 12 } } } };
      if (path === '/get-number') return { data: { request_id: 99, number: '14246782048' } };
      throw new Error(`Unexpected path: ${path}`);
    },
  });

  try {
    const { smsMan } = await import('../src/providers/smsman.js');
    assert.equal(smsMan.hasApiBalance(12), false);
    assert.equal(smsMan.hasApiBalance(12.01), true);
    assert.equal(await smsMan.isReady(), true);
    const price = await smsMan.getPrices('tg', 'us');
    const number = await smsMan.getNumber('tg', 'us');

    assert.equal(price, 0.25);
    assert.deepEqual(number, { id: '99', number: '+14246782048', provider: 'smsman' });
    const numberCall = calls.find((call) => call.path === '/get-number');
    assert.deepEqual(numberCall.params, { application_id: '3', country_id: '187', currency: 'USD' });
  } finally {
    axios.create = originalCreate;
    delete process.env.SMSMAN_API_KEY;
    delete process.env.SMSMAN_CURRENCY;
  }
});
