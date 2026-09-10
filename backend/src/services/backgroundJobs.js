import { query, getClient } from '../config/database.js';
import { getProviderBalances } from './providerRouter.js';
import logger from '../utils/logger.js';

let intervalIds = [];

/**
 * Refund orders that escaped the normal 10-minute poller lifecycle.
 */
async function cleanupExpiredOrders() {
  let client;
  try {
    client = await getClient();
    await client.query('BEGIN');
    const { rows } = await client.query(
      `SELECT id, user_id, user_price FROM orders
       WHERE status = 'waiting' AND created_at < NOW() - INTERVAL '15 minutes'
       FOR UPDATE SKIP LOCKED`
    );
    for (const order of rows) {
      await client.query(`UPDATE orders SET status = 'expired', updated_at = NOW() WHERE id = $1`, [order.id]);
      await client.query(`UPDATE wallets SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2`, [order.user_price, order.user_id]);
      await client.query(
        `INSERT INTO transactions (user_id, amount, type, reference) VALUES ($1, $2, 'refund', $3)`,
        [order.user_id, order.user_price, `Recovery refund ${order.id}`]
      );
      await client.query('DELETE FROM platform_revenue WHERE order_id = $1', [order.id]);
      await client.query('DELETE FROM otp_poll_queue WHERE order_id = $1', [order.id]);
    }
    await client.query('COMMIT');
    if (rows.length > 0) {
      logger.info(`Background job: refunded ${rows.length} stale orders`);
    }
  } catch (err) {
    if (client) await client.query('ROLLBACK').catch(() => {});
    logger.error('Background job: cleanupExpiredOrders failed', { error: err.message });
  } finally {
    client?.release();
  }
}

async function purgeDeliveredOtp() {
  try {
    const result = await query(
      `UPDATE orders SET otp = NULL, updated_at = NOW()
       WHERE otp IS NOT NULL AND updated_at < NOW() - INTERVAL '24 hours'`
    );
    if (result.rowCount > 0) logger.info(`Background job: purged ${result.rowCount} delivered OTP values`);
  } catch (err) {
    logger.error('Background job: purgeDeliveredOtp failed', { error: err.message });
  }
}

/**
 * Check provider balances and log warnings if any is below $5.
 */
async function checkProviderBalances() {
  try {
    const balances = await getProviderBalances();
    for (const [provider, balance] of Object.entries(balances)) {
      if (balance !== null && balance < 5) {
        logger.warn(`Low provider balance: ${provider} = $${balance}`);
      }
    }
  } catch (err) {
    logger.error('Background job: checkProviderBalances failed', { error: err.message });
  }
}

/**
 * Delete login_tokens older than 30 days.
 */
async function cleanupStaleSessions() {
  try {
    const result = await query(
      `DELETE FROM login_tokens
       WHERE created_at < NOW() - INTERVAL '30 days'
       RETURNING id`
    );
    if (result.rowCount > 0) {
      logger.info(`Background job: cleaned ${result.rowCount} stale login tokens`);
    }
  } catch (err) {
    logger.error('Background job: cleanupStaleSessions failed', { error: err.message });
  }
}

/**
 * Start all background jobs. Returns cleanup function for graceful shutdown.
 */
export function startBackgroundJobs() {
  logger.info('Background jobs started');

  // Expired order cleanup — every 5 minutes
  intervalIds.push(setInterval(cleanupExpiredOrders, 5 * 60 * 1000));

  // Provider balance check — every 10 minutes
  intervalIds.push(setInterval(checkProviderBalances, 10 * 60 * 1000));

  // Stale session cleanup — every hour
  intervalIds.push(setInterval(cleanupStaleSessions, 60 * 60 * 1000));
  intervalIds.push(setInterval(purgeDeliveredOtp, 60 * 60 * 1000));

  // Run cleanup once on startup after a short delay
  setTimeout(cleanupExpiredOrders, 10_000);
  setTimeout(purgeDeliveredOtp, 20_000);
}

/**
 * Stop all background job intervals.
 */
export function stopBackgroundJobs() {
  for (const id of intervalIds) {
    clearInterval(id);
  }
  intervalIds = [];
  logger.info('Background jobs stopped');
}
