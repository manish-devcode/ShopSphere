import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white font-heading">
              Shop<span className="text-indigo-600 dark:text-indigo-400">Sphere</span>
            </span>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex items-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Products
            </Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              About
            </Link>
            <Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Orders
            </Link>
            <Link to="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Account
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} ShopSphere. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
