import axios from 'axios';
import crypto from 'crypto';
import { query, getClient } from '../config/database.js';
import logger from '../utils/logger.js';

const NP = 'https://api.nowpayments.io/v1';
const np = () => axios.create({ baseURL: NP, headers: { 'x-api-key': process.env.NOWPAYMENTS_API_KEY }, timeout: 15000 });

export async function getBalance(req, res) {
  const { rows } = await query('SELECT balance FROM wallets WHERE user_id = $1', [req.user.id]);
  return res.json({ balance: parseFloat(rows[0]?.balance || 0) });
}

export async function getTransactions(req, res) {
  const { rows } = await query(
    `SELECT id, amount, type, reference, created_at FROM transactions
     WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [req.user.id]
  );
  return res.json(rows);
}

export async function getCurrencies(req, res) {
  try {
    const { data } = await np().get('/currencies?fixed_rate=false');
    const popular = ['btc', 'eth', 'usdttrc20', 'usdterc20', 'ltc', 'usdc', 'trx', 'bnb'];
    const all = data.currencies || [];
    return res.json(all.filter((c) => popular.includes(c.toLowerCase())));
  } catch {
    return res.json(['btc', 'eth', 'usdttrc20', 'ltc', 'usdc']);
  }
}

export async function createDeposit(req, res) {
  try {
    if (!process.env.NOWPAYMENTS_API_KEY?.trim()) {
      return res.status(503).json({ error: 'Deposits are temporarily unavailable because the payment provider is not configured.' });
    }
    const { amount, currency = 'usdttrc20' } = req.body;

    if (!amount || parseFloat(amount) < 20) {
      return res.status(400).json({ error: 'Minimum deposit is $20.00' });
    }

    const { data: payment } = await np().post('/payment', {
      price_amount: parseFloat(amount),
      price_currency: 'usd',
      pay_currency: currency.toLowerCase(),
      ipn_callback_url: `${process.env.BACKEND_URL}/api/wallet/webhook`,
      order_id: `${req.user.id}:${Date.now()}`,
      order_description: `RingSlot deposit ${req.user.email}`,
    });

    await query(
      `INSERT INTO transactions (user_id, amount, type, reference, meta)
       VALUES ($1,$2,'pending_deposit',$3,$4)`,
      [req.user.id, parseFloat(amount), payment.payment_id, JSON.stringify({ pay_currency: payment.pay_currency })]
    );

    return res.json({
      paymentId: payment.payment_id,
      payAddress: payment.pay_address,
      payAmount: payment.pay_amount,
      payCurrency: payment.pay_currency,
      usdAmount: parseFloat(amount),
    });
  } catch (err) {
    logger.error('Deposit create error', { error: err.message });
    return res.status(500).json({ error: 'Failed to create payment' });
  }
}

export async function depositStatus(req, res) {
  try {
    if (!process.env.NOWPAYMENTS_API_KEY?.trim()) {
      return res.status(503).json({ error: 'Payment status is unavailable because the payment provider is not configured.' });
    }
    const { data } = await np().get(`/payment/${req.params.id}`);
    return res.json({ status: data.payment_status, payAmount: data.pay_amount, payCurrency: data.pay_currency });
  } catch {
    return res.status(500).json({ error: 'Could not fetch status' });
  }
}

export async function webhook(req, res) {
  try {
    const sig = req.headers['x-nowpayments-sig'];
    if (!verifySignature(req.body, sig)) {
      logger.warn('Invalid webhook signature');
      return res.status(400).json({ error: 'Bad signature' });
    }

    const { payment_id, payment_status, order_id, price_amount } = req.body;
    if (payment_status !== 'finished') return res.json({ ok: true });

    const claimedUserId = String(order_id || '').split(':')[0];
    const amount = parseFloat(price_amount);

    const { rows } = await query(
      `SELECT id, user_id, amount, type FROM transactions WHERE reference = $1`,
      [payment_id]
    );
    const pending = rows[0];
    if (!pending) return res.status(400).json({ error: 'Unknown payment' });
    if (pending.type === 'deposit') return res.json({ ok: true, note: 'duplicate' });
    if (pending.type !== 'pending_deposit') return res.status(409).json({ error: 'Payment is not pending' });
    if (String(pending.user_id) !== claimedUserId || Math.abs(parseFloat(pending.amount) - amount) > 0.0001) {
      logger.warn('Webhook payment details did not match pending deposit', { payment_id });
      return res.status(400).json({ error: 'Payment details mismatch' });
    }

    await creditWallet(pending.user_id, amount, payment_id);
    logger.info('Deposit confirmed', { userId: pending.user_id, amount, payment_id });
    return res.json({ ok: true });
  } catch (err) {
    logger.error('Webhook error', { error: err.message });
    return res.status(500).json({ error: 'Webhook failed' });
  }
}

function verifySignature(body, sig) {
  if (!process.env.NOWPAYMENTS_IPN_SECRET || !sig) return false;
  const sorted = JSON.stringify(sortObj(body));
  const hmac = crypto.createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET).update(sorted).digest('hex');
  const expected = Buffer.from(hmac, 'utf8');
  const received = Buffer.from(String(sig), 'utf8');
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

function sortObj(obj) {
  if (Array.isArray(obj)) return obj.map(sortObj);
  if (!obj || typeof obj !== 'object') return obj;
  return Object.keys(obj).sort().reduce((a, k) => { a[k] = sortObj(obj[k]); return a; }, {});
}

export async function creditWallet(userId, amount, reference) {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    await client.query('UPDATE wallets SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2', [amount, userId]);
    const result = await client.query(
      `UPDATE transactions SET type = 'deposit'
       WHERE reference = $1 AND user_id = $2 AND type = 'pending_deposit'`,
      [reference, userId]
    );
    if (result.rowCount !== 1) throw new Error('Pending deposit was already processed or not found');
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function deductWallet(userId, amount, reference) {
  const { rows } = await query('SELECT balance FROM wallets WHERE user_id = $1 FOR UPDATE', [userId]);
  if (!rows[0] || parseFloat(rows[0].balance) < amount) throw new Error('Insufficient balance');
  await query('UPDATE wallets SET balance = balance - $1, updated_at = NOW() WHERE user_id = $2', [amount, userId]);
  await query(
    `INSERT INTO transactions (user_id, amount, type, reference) VALUES ($1,$2,'deduct',$3)`,
    [userId, -amount, reference]
  );
}
