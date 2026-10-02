import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { UserProvider } from './context/UserContext.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import Orders from './pages/Orders.jsx';
import OrderDetails from './pages/OrderDetails.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Profile from './pages/Profile.jsx';
import Addresses from './pages/Addresses.jsx';
import Settings from './pages/Settings.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-200">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      {/* Main Storefront Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      
                      {/* Bag & Checkout Flow */}
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />

                      {/* Orders & Tracking Routes */}
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/orders/:id" element={<OrderDetails />} />

                      {/* Wishlist Routes (both top-level and profile alias) */}
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/profile/wishlist" element={<Wishlist />} />

                      {/* Account & Profile Routes */}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/profile/orders" element={<Orders />} />
                      <Route path="/profile/addresses" element={<Addresses />} />
                      <Route path="/profile/settings" element={<Settings />} />

                      {/* About Brand */}
                      <Route path="/about" element={<About />} />

                      {/* 404 Route */}
                      <Route path="/404" element={<NotFound />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
