import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order || {
    id: 'SS1024',
    expectedDelivery: '3-5 days',
    total: 249,
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
        <Check className="w-7 h-7 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Order placed successfully
        </h1>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          Order #{order.id}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Estimated delivery: {order.expectedDelivery || '3-5 days'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to={`/orders/${order.id}`}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Track Order
        </Link>
        <Link
          to="/products"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
