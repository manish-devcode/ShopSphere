# ShopSphere

A modern, high-performance, full-stack e-commerce shopping platform featuring curated product discovery, dynamic filtering, real-time search, cart management, checkout with multi-address selection, order tracking with status timelines, customer wishlists, and personalized user profiles.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, React Router v7, Tailwind CSS v4, Lucide React icons, Motion
- **Backend**: Node.js, Express 4, unified server (`server.ts`)
- **Build Tooling**: Vite 8, TSX
- **Data Architecture**: Self-contained in-memory data store with REST API endpoints (MongoDB/Mongoose ready)

---

## Main Features

- **Storefront & Product Catalog**:
  - Instant live keyword search and multi-category filtering
  - Price sorting, rating filters, and availability indicators
  - Rich product details with image galleries, specifications, stock status, and related items
- **Bag & Checkout**:
  - Real-time cart state with quantity adjustment and order summary calculations
  - Multi-step checkout with delivery address selection and payment method simulation
  - Instant order placement and interactive order confirmation
- **Order Management**:
  - Complete order history and individual order tracking details
  - Visual status timeline (`ORDER_PLACED` → `CONFIRMED` → `PACKED` → `SHIPPED` → `OUT_FOR_DELIVERY` → `DELIVERED`)
- **Customer Experience**:
  - User profiles with editable contact information
  - Full address book management (add, edit, delete, set default)
  - Wishlist management with quick move-to-cart functionality
  - Seamless Light / Dark theme support with system preference persistence
  - Interactive toast notifications for user actions

---

## Project Structure

```
├── .env.example            # Environment variables template
├── .gitignore              # Ignored files (node_modules, dist, .env*)
├── index.html              # HTML entry point with metadata & web fonts
├── package.json            # Scripts & dependencies
├── server.ts               # Unified full-stack server (Vite dev + Express API + static prod)
├── src/                    # Frontend React Application
│   ├── assets/             # Optimized visual assets
│   ├── components/         # Reusable UI components (Navbar, Footer, Cards, Modal, etc.)
│   ├── context/            # React Context providers (Cart, Wishlist, User, Theme, Toast)
│   ├── data/               # In-memory fallback mock datasets
│   ├── pages/              # Route pages (Home, Products, Details, Cart, Checkout, Profile, Orders, etc.)
│   ├── services/           # API client services using relative /api endpoints
│   ├── App.tsx             # Route definitions and application layout
│   └── main.tsx            # React DOM mounting
└── backend/                # Backend API Module
    ├── package.json        # Backend metadata
    └── src/
        ├── config/         # Database and connection configuration
        ├── controllers/    # Route controllers (products, orders, users, addresses, wishlist)
        ├── data/           # Server-side in-memory data records
        ├── middleware/     # Error handling and 404 middleware
        └── routes/         # Express router modules
```

---

## Important Notice on MongoDB

> **MongoDB is NOT currently required.**
> The application operates out-of-the-box using its robust built-in in-memory data store. If a `MONGODB_URI` is provided in environment variables, the server will attempt to connect; if absent or if authentication is not configured yet, it cleanly and safely defaults to the in-memory data store without breaking any features or interrupting API requests.

---

## Environment Variables

Documented in `.env.example`:

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server listening port | `3000` |
| `NODE_ENV` | Runtime environment (`development` / `production`) | `development` |
| `VITE_API_URL` | Base API URL for frontend | `/api` |
| `MONGODB_URI` | *(Optional)* MongoDB Atlas connection string | `""` |

---

## Local Development

```bash
# Install dependencies
npm install

# Run unified full-stack dev server (port 3000)
npm run dev

# Run TypeScript type check
npm run lint
```

---

## Production Build & Start

```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

---

## Deployment Notes (e.g., Render, Railway, Cloud Run)

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Port**: The unified server reads `process.env.PORT` automatically (defaults to `3000` if unset) and binds to `0.0.0.0`.
- **Single Service**: Both the React frontend SPA and the Express REST API are served together from one Node.js process with zero CORS friction.
