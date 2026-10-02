import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No items found',
  description = 'Try adjusting your search criteria or explore our collection.',
  actionLabel = 'Explore Products',
  actionTo = '/products',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-sm mx-auto space-y-3">
      <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mb-1">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
        {description}
      </p>
      <div className="pt-2">
        {onAction ? (
          <button
            onClick={onAction}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            {actionLabel}
          </button>
        ) : actionTo ? (
          <Link
            to={actionTo}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors inline-block"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
