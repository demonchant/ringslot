import { Router } from 'express';

import {
  register, login, verifyDevice, forgotPassword, resetPassword,
  validateResetToken, getMe, regenerateKey, getMyDevices, revokeDevice,
} from '../controllers/authController.js';

import {
  listServices, buyNumber, getSMS, cancelNumber, getOrders, rentNumber,
} from '../controllers/orderController.js';

import {
  getBalance, getTransactions, getCurrencies, createDeposit, depositStatus, webhook,
} from '../controllers/walletController.js';

import {
  getStats, getDailyRevenue, setMarkup, getProviders, toggleProvider,
  getUsers, toggleUser, setUserRole, blockIp, getAllOrders, withdraw, getWithdrawals,
  getAdminServices,
} from '../controllers/adminController.js';

import {
  createTicket, getMyTickets, getTicketMessages, replyToTicket, closeMyTicket,
  adminGetAllTickets, adminGetTicketMessages, adminReplyTicket, adminSetTicketStatus, adminUnreadCount,
} from '../controllers/supportController.js';

import analyticsRouter from './analytics.js';
import intelligenceRouter from './intelligence.js';
import { submitContact } from '../controllers/contactController.js';

import { requireAuth, requireAdmin, requireSuperAdmin } from '../middleware/auth.js';
import { authLimiter, buyLimiter, contactLimiter, forgotPasswordLimiter } from '../middleware/rateLimit.js';

const router = Router();

// ── Public ────────────────────────────────────────────────────
router.post('/auth/register',                   authLimiter,           register);
router.post('/auth/login',                       authLimiter,           login);
router.get( '/auth/verify-device/:token',                               verifyDevice);
router.post('/auth/forgot-password',             forgotPasswordLimiter, forgotPassword);
router.post('/auth/reset-password',              authLimiter,           resetPassword);
router.get( '/auth/validate-reset/:token',                              validateResetToken);
router.get( '/services',                                                listServices);
router.post('/contact',                          contactLimiter,         submitContact);

// NOWPayments webhook — needs raw body
router.post('/wallet/webhook', webhook);

// ── Authenticated ─────────────────────────────────────────────
router.use(requireAuth);

router.get( '/me',                   getMe);
router.post('/me/regenerate-key',    regenerateKey);
router.get( '/me/devices',           getMyDevices);
router.delete('/me/devices/:deviceId', revokeDevice);

// Wallet
router.get( '/wallet/balance',              getBalance);
router.get( '/wallet/transactions',         getTransactions);
router.get( '/wallet/currencies',           getCurrencies);
router.post('/wallet/deposit',              createDeposit);
router.get( '/wallet/deposit/:id/status',   depositStatus);

// Orders
router.post('/orders/buy',    buyLimiter, buyNumber);
router.get( '/orders/sms',               getSMS);
router.post('/orders/cancel',            cancelNumber);
router.post('/orders/rent',              rentNumber);
router.get( '/orders',                   getOrders);

// Support (user)
router.post('/support/tickets',                createTicket);
router.get( '/support/tickets',                getMyTickets);
router.get( '/support/tickets/:id',            getTicketMessages);
router.post('/support/tickets/:id/reply',      replyToTicket);
router.post('/support/tickets/:id/close',      closeMyTicket);

// ── Admin ─────────────────────────────────────────────────────
router.use('/admin', requireAdmin);

// Analytics sub-router
router.use('/admin/analytics', requireSuperAdmin, analyticsRouter);

// Intelligence sub-router
router.use('/admin/intelligence', requireSuperAdmin, intelligenceRouter);

router.get( '/admin/stats',              requireSuperAdmin, getStats);
router.get( '/admin/revenue/daily',      requireSuperAdmin, getDailyRevenue);
router.get( '/admin/services',           requireSuperAdmin, getAdminServices);
router.post('/admin/markup',             requireSuperAdmin, setMarkup);
router.get( '/admin/providers',          requireSuperAdmin, getProviders);
router.post('/admin/providers/toggle',   requireSuperAdmin, toggleProvider);
router.get( '/admin/users',              getUsers);
router.post('/admin/users/toggle',       toggleUser);
router.post('/admin/users/role',         requireSuperAdmin, setUserRole);
router.post('/admin/block-ip',           blockIp);
router.get( '/admin/orders',             getAllOrders);
router.post('/admin/withdraw',           requireSuperAdmin, withdraw);
router.get( '/admin/withdrawals',        requireSuperAdmin, getWithdrawals);

// Support (admin)
router.get( '/admin/support/tickets',              adminGetAllTickets);
router.get( '/admin/support/tickets/:id',          adminGetTicketMessages);
router.post('/admin/support/tickets/:id/reply',    adminReplyTicket);
router.post('/admin/support/tickets/:id/status',   adminSetTicketStatus);
router.get( '/admin/support/unread',               adminUnreadCount);

export default router;
