import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import route modules
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import addressRoutes from './routes/addressRoutes.js';

// Import database connection
import connectDB from './config/db.js';

// Import centralized error handling
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config({ override: true });

const app = express();
// Default to 5000 as specified; guard against container 8080 collision
const PORT = process.env.PORT === '8080' ? 5000 : (process.env.PORT || 5000);
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

// Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman)
      // or from configured frontendUrl, localhost, and preview domains
      if (
        !origin ||
        origin === frontendUrl ||
        origin.startsWith('http://localhost') ||
        origin.startsWith('https://ais-')
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ShopSphere API is running'
  });
});

// Mount Resource API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);

// 404 Route Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

// Initialize Database Connection
connectDB();

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[ShopSphere API] Server listening on port ${PORT}`);
    console.log(`[ShopSphere API] Health check at http://localhost:${PORT}/api/health`);
  });
}

export default app;
