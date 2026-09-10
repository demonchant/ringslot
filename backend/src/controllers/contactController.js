import { query } from '../config/database.js';
import { sendEmail } from '../utils/email.js';
import logger from '../utils/logger.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = new Set([
  'General Inquiry', 'Technical Support', 'Billing & Payments',
  'API & Integration', 'Bug Report', 'Feature Request',
]);

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

export async function submitContact(req, res) {
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim().toLowerCase();
  const category = String(req.body?.category || 'General Inquiry').trim();
  const message = String(req.body?.message || '').trim();

  // Honeypot fields are invisible to people but commonly filled by bots.
  if (req.body?.website) return res.status(201).json({ success: true });
  if (name.length < 2 || name.length > 100) return res.status(400).json({ error: 'Please enter your name.' });
  if (!EMAIL_RE.test(email) || email.length > 254) return res.status(400).json({ error: 'Please enter a valid email.' });
  if (!CATEGORIES.has(category)) return res.status(400).json({ error: 'Please select a valid category.' });
  if (message.length < 10 || message.length > 5000) return res.status(400).json({ error: 'Message must be between 10 and 5,000 characters.' });

  try {
    const { rows } = await query(
      `INSERT INTO contact_messages (name, email, category, message, ip_address)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, email, category, message, req.ip]
    );

    const supportEmail = process.env.SUPPORT_EMAIL || 'support@ringslot.shop';
    sendEmail({
      to: supportEmail,
      replyTo: email,
      subject: `[RingSlot contact] ${category}`,
      text: `Contact ID: ${rows[0].id}\nName: ${name}\nEmail: ${email}\nCategory: ${category}\n\n${message}`,
      html: `<h1>New website message</h1><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Category:</strong> ${escapeHtml(category)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    }).catch((error) => logger.warn('Contact notification failed', { contactId: rows[0].id, error: error.message }));

    return res.status(201).json({ success: true, reference: rows[0].id });
  } catch (error) {
    logger.error('Contact submission failed', { error: error.message });
    return res.status(500).json({ error: 'We could not save your message. Please email support@ringslot.shop.' });
  }
}
