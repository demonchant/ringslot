import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { globalLimiter, blockIpMiddleware } from './middleware/rateLimit.js';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import pool from './config/database.js';
import redis from './config/redis.js';
import { startPoller, recoverPending } from './services/otpPoller.js';
import { seedServicesIfEmpty } from './services/seedServices.js';

export async function createBackendApp() {
  const app = express();
  
  app.set('trust proxy', 1);
  app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true,
  }));

  app.use(globalLimiter);
  app.use(blockIpMiddleware);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
  app.use('/api', routes);

  app.use((err, req, res, next) => {
    logger.error('Unhandled', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

export async function bootServices() {
  try {
    await pool.query('SELECT 1');
    logger.info('PostgreSQL connected');
    
    try {
      if (redis.status === 'wait' || redis.status === 'close') {
        await redis.connect();
      }
    } catch (err) {
      if (err.message !== 'Redis is already connecting/connected') {
        logger.error('Redis connect failed', { error: err.message });
      }
    }

    await seedServicesIfEmpty();
    startPoller();
    await recoverPending();
    logger.info('Backend services booted');
  } catch (err) {
    logger.error('Services boot failed', { error: err.message });
    throw err;
  }
}

// Only start if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const app = await createBackendApp();
  await bootServices();
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`RingSlot Backend standalone running on port ${PORT}`);
  });
}
