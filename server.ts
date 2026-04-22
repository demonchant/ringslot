import 'dotenv/config';
import express from 'express';
import next from 'next';
import { createBackendApp, bootServices } from './backend/src/server.js';
import logger from './backend/src/utils/logger.js';

async function startServer() {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: './frontend' });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();
  
  const server = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Mount Backend API
  const backendApp = await createBackendApp();
  server.use(backendApp);

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  try {
    await bootServices();
    server.listen(PORT, '0.0.0.0', () => {
      logger.info(`RingSlot Next.js + Express Hybrid Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Hybrid boots failed', { error: err.message });
    // In dev, let next.js run even if backend services (DB/Redis) fail
    if (dev) {
       server.listen(PORT, '0.0.0.0', () => {
          logger.info(`RingSlot Hybrid running on port ${PORT} (BACKEND SERVICES OFFLINE)`);
       });
    } else {
      process.exit(1);
    }
  }
}

startServer();
