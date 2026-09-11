import test from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';

test('SMS-Activate uses the configured endpoint and validates provider responses', async () => {
  const originalGet = axios.get;
  const calls = [];
  process.env.SMSACTIVATE_API_KEY = 'test-key';
  process.env.SMSACTIVATE_BASE_URL = 'https://provider.example/stubs/handler_api.php';

  axios.get = async (url, config = {}) => {
    calls.push({ url, params: config.params });
    if (config.params.action === 'getBalance') return { data: 'ACCESS_BALANCE:12.50' };
    if (config.params.action === 'getPrices') {
      return { data: { 0: { tg: { cost: '0.25', count: 4 } }, 1: { tg: { cost: '0.20', count: 2 } } } };
    }
    throw new Error(`Unexpected action: ${config.params.action}`);
  };

  try {
    const { smsActivate } = await import('../src/providers/smsactivate.js');
    assert.equal(await smsActivate.getBalance(), 12.5);
    assert.equal(await smsActivate.getPrices('tg'), 0.2);
    assert.equal(calls[0].url, process.env.SMSACTIVATE_BASE_URL);
    assert.equal(calls[0].params.api_key, 'test-key');
  } finally {
    axios.get = originalGet;
    delete process.env.SMSACTIVATE_API_KEY;
    delete process.env.SMSACTIVATE_BASE_URL;
  }
});
