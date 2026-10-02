import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderCard({ order }) {
  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            Order #{order.id}
          </span>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <span className="text-xs text-slate-400">
            {order.date}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} · Status: <span className="font-semibold text-slate-700 dark:text-slate-300">{order.status}</span>
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5">
        <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
          ${order.total}
        </span>

        <div className="flex items-center gap-2">
          <Link
            to={`/orders/${order.id}`}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/orders/${order.id}`}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
