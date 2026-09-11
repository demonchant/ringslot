import test from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';

test('secondary supplier exposes its catalog and resolves ISO countries', async () => {
  const originalCreate = axios.create;
  const calls = [];
  process.env.FIVESIM_API_KEY = 'test-key';

  axios.create = (options) => ({
    async get(path, config = {}) {
      calls.push({ path, params: config.params || {}, authenticated: Boolean(options.headers.Authorization) });
      if (path === '/guest/countries') {
        return { data: { usa: { iso: { us: 1 }, text_en: 'United States' } } };
      }
      if (path === '/guest/products/any/any') {
        return { data: {
          facebook: { Category: 'activation', Qty: 20, Price: 0.25 },
          '1day': { Category: 'hosting', Qty: 2, Price: 2 },
        } };
      }
      if (path === '/guest/prices') {
        return { data: { usa: { facebook: { mobile: { cost: 0.25, count: 20 } } } } };
      }
      if (path === '/user/profile') return { data: { balance: 4.5 } };
      if (path === '/user/buy/activation/usa/any/facebook') {
        return { data: { id: 42, phone: '+12025550123' } };
      }
      throw new Error(`Unexpected path: ${path}`);
    },
  });

  try {
    const { fiveSim } = await import('../src/providers/fivesim.js');
    assert.deepEqual(await fiveSim.getProducts(), [{ code: 'facebook', quantity: 20, price: 0.25 }]);
    assert.equal(await fiveSim.getPrices('facebook', 'us'), 0.25);
    assert.equal(await fiveSim.isReady(), true);
    assert.deepEqual(await fiveSim.getNumber('facebook', 'us'), {
      id: '42',
      number: '+12025550123',
      provider: 'fivesim',
    });
    assert.equal(calls.find((call) => call.path === '/guest/prices').params.country, 'usa');
  } finally {
    axios.create = originalCreate;
    delete process.env.FIVESIM_API_KEY;
  }
});
