import { query } from '../config/database.js';
import logger from '../utils/logger.js';

export async function initializeAccessControl() {
  await query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check');
  await query("ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('user','admin','superadmin'))");

  const ownerEmail = String(process.env.SUPERADMIN_EMAIL || '').trim().toLowerCase();
  if (!ownerEmail) {
    logger.warn('SUPERADMIN_EMAIL is not configured; no owner account was promoted');
    return;
  }

  const { rows } = await query(
    `UPDATE users SET role = 'superadmin', is_active = TRUE
     WHERE LOWER(email) = $1
     RETURNING id, email`,
    [ownerEmail]
  );

  if (rows.length) logger.info('Super-admin account is ready', { email: rows[0].email });
  else logger.warn('SUPERADMIN_EMAIL does not match an account yet; register it, then restart the API', { email: ownerEmail });
}
