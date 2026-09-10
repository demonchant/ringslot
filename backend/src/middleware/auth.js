import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

export async function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : null;

  if (apiKey) {
    const { rows } = await query(
      'SELECT id, email, role FROM users WHERE api_key = $1 AND is_active = TRUE',
      [apiKey]
    );
    if (!rows.length) return res.status(401).json({ error: 'Invalid API key' });
    req.user = rows[0];
    return next();
  }

  if (bearer) {
    try {
      const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
      const { rows } = await query(
        'SELECT id, email, role FROM users WHERE id = $1 AND is_active = TRUE',
        [decoded.id]
      );
      if (!rows.length) return res.status(401).json({ error: 'Account is inactive or no longer exists' });
      req.user = rows[0];
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  return res.status(401).json({ error: 'Authentication required' });
}

export function requireAdmin(req, res, next) {
  if (!['admin', 'superadmin'].includes(req.user?.role)) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

export function requireSuperAdmin(req, res, next) {
  if (req.user?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Super-admin access required' });
  }
  next();
}
