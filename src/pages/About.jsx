import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
          About ShopSphere
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          Discover products you'll love. Shop smarter.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          We believe modern shopping should be simple, refined, and transparent. We curate electronics, lifestyle gear, and everyday objects crafted to last.
        </p>
      </div>

      {/* 2-Column Simple Philosophy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs sm:text-sm">
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Curated Quality
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every product in our collection undergoes material and performance verification. We prefer timeless design and durable craftsmanship over disposable trends.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Customer First
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Fast dispatch, live order tracking, and a straightforward 30-day return policy guarantee a confident, friction-free experience.
          </p>
        </div>
      </div>

      {/* Clean Bottom Call to Action */}
      <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Explore our latest collection
        </h3>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
