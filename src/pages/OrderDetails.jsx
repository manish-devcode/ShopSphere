import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { orderService } from '../services/orderService.js';
import OrderTimeline from '../components/OrderTimeline.jsx';
import { Spinner } from '../components/Loader.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError(null);
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message || 'Order not found');
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Order Not Found"
          description={`We could not locate order #${id}.`}
          actionLabel="View All Orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16 space-y-8">
      
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>My Orders</span>
      </Link>

      {/* Header Overview */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Order #{order.id}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Placed on {order.date}
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400 block">Estimated Delivery</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {order.expectedDelivery || '3-5 days'}
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Tracking Status
        </h2>
        <OrderTimeline currentStatusCode={order.statusCode || 4} />
      </div>

      {/* Items & Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
        
        {/* Package Items */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Items ({order.items.length})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex justify-between gap-2">
                <span className="text-slate-600 dark:text-slate-300 truncate">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-slate-900 dark:text-white">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white">
            Delivery Address
          </h3>
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            {order.deliveryAddress?.fullName}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {order.deliveryAddress?.house}, {order.deliveryAddress?.street}
            <br />
            {order.deliveryAddress?.city} — {order.deliveryAddress?.pincode}
          </p>
        </div>

      </div>

    </div>
  );
}
