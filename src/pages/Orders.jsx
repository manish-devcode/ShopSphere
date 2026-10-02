import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService.js';
import OrderCard from '../components/OrderCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { Spinner } from '../components/Loader.jsx';
import { Package } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          My Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your previous purchases and tracking updates.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <Spinner size="md" />
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Orders Yet"
          description="You haven't placed any orders yet. Discover our catalog today."
          actionLabel="Explore Products"
          actionTo="/products"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
