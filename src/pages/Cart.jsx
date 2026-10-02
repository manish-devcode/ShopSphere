import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, subtotal, deliveryFee, finalTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Looks like you haven't added anything yet."
          actionLabel="Explore Products"
          actionTo="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading mb-8">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-y border-slate-100 dark:border-slate-800">
            {cartItems.map((item) => (
              <div key={item.id} className="py-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800">
                    <img
                      src={item.image || '/assets/images/placeholder.svg'}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/placeholder.svg';
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                      <Link to={`/products/${item.id}`} className="hover:text-indigo-600 transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 tabular-nums">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-semibold tabular-nums text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums min-w-[50px] text-right">
                    ${item.price * item.quantity}
                  </span>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/products"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs sm:text-sm divide-y divide-slate-200/60 dark:divide-slate-700/60">
            <div className="flex justify-between pt-1">
              <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">${subtotal}</span>
            </div>
            <div className="flex justify-between pt-2.5">
              <span className="text-slate-500 dark:text-slate-400">Delivery</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {deliveryFee === 0 ? <span className="text-emerald-600">Free</span> : `$${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between pt-3 text-base">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
