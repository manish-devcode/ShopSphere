import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Shirt, Home, Sparkles, Activity, Watch, Layers } from 'lucide-react';

const ICON_MAP = {
  Headphones,
  Shirt,
  Home,
  Sparkle: Sparkles,
  Sparkles,
  Activity,
  Watch,
};

export default function CategoryCard({ category, isSelected = false, onClick }) {
  const Icon = ICON_MAP[category.icon] || Layers;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200 w-full ${
          isSelected
            ? 'bg-indigo-50 border-indigo-300 text-indigo-950 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-200 shadow-xs'
            : 'bg-white border-slate-200/90 text-slate-700 hover:border-indigo-200 hover:bg-slate-50/80 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-indigo-900/60 shadow-xs'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate leading-tight">{category.name}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">
            {category.count} {category.count === 1 ? 'item' : 'items'}
          </p>
        </div>
      </button>
    );
  }

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/60 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="w-14 h-14 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-xs">
        <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
      </div>
      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {category.name}
      </h4>
      <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 tabular-nums">
        {category.count} Products
      </span>
    </Link>
  );
}
