import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Headphones,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Activity,
  Watch,
} from 'lucide-react';
import { productService } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';
import { SkeletonGrid } from '../components/Loader.jsx';

const CATEGORY_ITEMS = [
  { id: 'electronics', name: 'Electronics', icon: Headphones },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'home', name: 'Home', icon: HomeIcon },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'sports', name: 'Sports', icon: Activity },
  { id: 'accessories', name: 'Accessories', icon: Watch },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        setLoading(true);
        const featured = await productService.getFeaturedProducts();
        // Show only 4 products as requested
        setFeaturedProducts(featured.slice(0, 4));
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Clean, Spacious Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                The New Way to Shop
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] font-heading">
                Discover products <br className="hidden sm:inline" />
                <span className="text-indigo-600 dark:text-indigo-400">you'll love.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated collections of premium electronics, lifestyle essentials, and refined everyday apparel designed to elevate your daily routine.
              </p>

              {/* Clean Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all active:scale-98"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            </div>

            {/* Hero Single Strong High-Quality Image Showcase */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] shadow-md border border-slate-200/80 dark:border-slate-800">
                <img
                  src="/assets/images/hero_ecommerce_showcase_1790860157305.jpg"
                  alt="ShopSphere Premium Collection"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/placeholder.svg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular Categories (Clean 6 cards) */}
      <section className="py-16 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Popular Categories
            </h2>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORY_ITEMS.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {cat.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Products (Show only 4 products) */}
      <section className="py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Browse all
            </Link>
          </div>

          {loading ? (
            <SkeletonGrid count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Why ShopSphere? (Only 4 simple benefits) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Fast Delivery
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Prompt dispatch with end-to-end tracking on every order.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Secure Checkout
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  256-bit encrypted transactions for complete peace of mind.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Easy Returns
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hassle-free 30-day money-back guarantee policy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Quality Products
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Rigorous inspection and authentic material sourcing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. One Clean Promotional Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-12">
        <div className="rounded-3xl bg-slate-900 dark:bg-slate-850 dark:bg-slate-900 border border-slate-800/80 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Special Collection
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Upgrade Your Everyday.
            </h3>
            <p className="text-sm text-slate-300 max-w-md">
              Explore our latest curated essentials crafted for modern productivity and mindful living.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
