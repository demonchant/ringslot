import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { query } from '../src/config/database.js';
import pool from '../src/config/database.js';

const api = process.env.LOCAL_API_URL || 'http://127.0.0.1:4000/api';
const ownerEmail = String(process.env.SUPERADMIN_EMAIL || '').toLowerCase();

function tokenFor(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5m' });
}

async function request(path, token) {
  const response = await fetch(`${api}${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  const body = await response.json();
  return { status: response.status, body };
}

function check(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`PASS: ${message}`);
}

let staff;
try {
  const ownerResult = await query('SELECT id, email, role FROM users WHERE LOWER(email) = $1', [ownerEmail]);
  const staffResult = await query("SELECT id, email, role FROM users WHERE LOWER(email) <> $1 AND role = 'user' LIMIT 1", [ownerEmail]);
  const owner = ownerResult.rows[0];
  staff = staffResult.rows[0];
  check(owner?.role === 'superadmin', 'configured owner is a super admin');
  check(Boolean(staff), 'a temporary staff test account is available');

  await query("UPDATE users SET role = 'admin' WHERE id = $1", [staff.id]);
  staff.role = 'admin';
  const ownerToken = tokenFor(owner);
  const staffToken = tokenFor(staff);

  const publicServices = await request('/services');
  check(publicServices.status === 200 && !Object.hasOwn(publicServices.body[0] || {}, 'markup'), 'public catalog does not reveal markup');

  const publicHealth = await request('/health/providers');
  const serializedHealth = JSON.stringify(publicHealth.body).toLowerCase();
  check(!serializedHealth.includes('smsman') && !serializedHealth.includes('smsactivate') && !serializedHealth.includes('fivesim'), 'public health does not reveal suppliers');

  const ownerProviders = await request('/admin/providers', ownerToken);
  check(ownerProviders.status === 200 && Array.isArray(ownerProviders.body), 'owner can manage suppliers');

  const staffProviders = await request('/admin/providers', staffToken);
  check(staffProviders.status === 403, 'staff admin cannot access private suppliers');

  const staffOrders = await request('/admin/orders', staffToken);
  check(staffOrders.status === 200 && staffOrders.body.every((row) => !Object.hasOwn(row, 'provider') && !Object.hasOwn(row, 'profit')), 'staff order view hides supplier and profit data');

  const ownerServices = await request('/admin/services', ownerToken);
  check(ownerServices.status === 200 && Object.hasOwn(ownerServices.body[0] || {}, 'markup'), 'owner can manage profit pricing');
} finally {
  if (staff?.id) await query("UPDATE users SET role = 'user' WHERE id = $1", [staff.id]);
  await pool.end();
}
