import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown, Search, X } from 'lucide-react';
import { productService } from '../services/productService.js';
import ProductGrid from '../components/ProductGrid.jsx';

const SORT_OPTIONS = [
  { value: 'default', label: 'Sort: Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('query') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // Sync with URL parameters
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const q = searchParams.get('query') || '';
    setSelectedCategory(cat);
    setSearchQuery(q);
  }, [searchParams]);

  // Load category taxonomy
  useEffect(() => {
    async function fetchTaxonomy() {
      try {
        const catList = await productService.getCategories();
        setCategories(catList);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    fetchTaxonomy();
  }, []);

  // Fetch filtered & sorted products
  useEffect(() => {
    let isMounted = true;
    async function loadFilteredProducts() {
      try {
        setLoading(true);
        const results = await productService.getProducts({
          category: selectedCategory,
          query: searchQuery,
          sortBy: sortBy,
        });
        if (isMounted) {
          setProducts(results);
        }
      } catch (err) {
        console.error('Failed to fetch filtered products', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFilteredProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (catId === 'all') {
        next.delete('category');
      } else {
        next.set('category', catId);
      }
      return next;
    });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!val) {
        next.delete('query');
      } else {
        next.set('query', val);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      
      {/* 1. Clean Centered Header */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight font-heading">
          Explore Products
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Discover products made for you.
        </p>

        {/* Clean Centered Search Input */}
        <div className="relative pt-2 max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5.5 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-3.5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Horizontal Category Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* 3. Product Count and Sort Bar */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm">
        <span className="font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
          {loading ? 'Loading...' : `${products.length} Products`}
        </span>

        {/* Minimal Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            aria-label="Sort products by"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-2.5 top-2 pointer-events-none text-slate-400">
            <ArrowUpDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* 4. Spacious Full-Width Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        emptyTitle={searchQuery ? `No products matching "${searchQuery}"` : 'No products found'}
        emptyDescription={
          searchQuery
            ? 'Try searching with a different term or clear your filters.'
            : 'There are currently no items available in this category.'
        }
        onResetFilters={handleResetFilters}
      />

    </div>
  );
}
