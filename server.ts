import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables (supports .env and process environment)
dotenv.config();

// Import backend routes and middleware
// @ts-ignore
import productRoutes from './backend/src/routes/productRoutes.js';
// @ts-ignore
import orderRoutes from './backend/src/routes/orderRoutes.js';
// @ts-ignore
import userRoutes from './backend/src/routes/userRoutes.js';
// @ts-ignore
import addressRoutes from './backend/src/routes/addressRoutes.js';
// @ts-ignore
import { errorHandler } from './backend/src/middleware/errorMiddleware.js';
// @ts-ignore
import connectDB from './backend/src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Initialize Database Connection in background without blocking server startup
  connectDB().catch((err: any) => {
    console.warn('[MongoDB] Initialization notice:', err?.message || err);
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'ShopSphere API is running'
    });
  });

  // Mount API Routes
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/addresses', addressRoutes);

  // Unmatched /api/* routes should return 404 JSON
  app.all('/api/*', (_req, res) => {
    res.status(404).json({
      success: false,
      message: 'API route not found'
    });
  });

  // Global Error Handler for API
  app.use(errorHandler);

  // In development, mount Vite dev server as middleware
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production build from dist
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ShopSphere Full-Stack] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[ShopSphere Full-Stack] API Health: http://0.0.0.0:${PORT}/api/health`);
  });
}

startServer().catch((err) => {
  console.error('[ShopSphere Full-Stack] Failed to start server:', err);
  process.exit(1);
});
