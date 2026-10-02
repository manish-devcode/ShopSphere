import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden p-3.5 animate-pulse flex flex-col justify-between h-full">
      <div>
        <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2.5" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full mb-3" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-4" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-2">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-24" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner({ size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  return (
    <div className="flex items-center justify-center p-6">
      <div className={`${sizeClass} border-2 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin`} />
    </div>
  );
}
