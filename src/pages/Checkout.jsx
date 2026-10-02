import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  QrCode,
  Banknote,
  Plus,
  ArrowRight,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useUser } from '../context/UserContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AddressForm from '../components/AddressForm.jsx';
import Modal from '../components/Modal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { orderService } from '../services/orderService.js';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, deliveryFee, finalTotal, clearCart } = useCart();
  const { addresses, addAddress } = useUser();
  const { addToast } = useToast();

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const defaultAddr = addresses.find((a) => a.isDefault);
    return defaultAddr ? defaultAddr.id : addresses[0]?.id || null;
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          icon={ShoppingBag}
          title="Your Cart is Empty"
          description="Please add items to your cart before proceeding to checkout."
          actionLabel="Explore Products"
          actionTo="/products"
        />
      </div>
    );
  }

  const handleSaveAddress = (addressData) => {
    addAddress(addressData);
    addToast('Address added');
    setIsAddressModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    setErrorMsg('');
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) {
      setErrorMsg('Please select or add a delivery address to continue.');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const createdOrder = await orderService.createOrder({
        items: [...cartItems],
        deliveryAddress: selectedAddress,
        paymentMethod: paymentMethod.toUpperCase(),
        subtotal,
        shippingFee: deliveryFee,
        total: finalTotal,
      });

      clearCart();
      setIsPlacingOrder(false);
      navigate('/order-success', { state: { order: createdOrder } });
    } catch (err) {
      console.error('Failed to create order', err);
      setIsPlacingOrder(false);
      setErrorMsg('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading mb-8">
        Checkout
      </h1>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-200 flex items-center gap-2 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Delivery Address & Payment Method */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Delivery Address */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                1. Delivery Address
              </h2>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New</span>
              </button>
            </div>

            {addresses.length === 0 ? (
              <div className="p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center space-y-2">
                <p className="text-xs text-slate-500">No saved addresses found.</p>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
                >
                  + Add Address
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {addr.fullName}
                        </span>
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                          {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {addr.house}, {addr.street}, {addr.city} — {addr.pincode}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Phone: {addr.phone}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Payment Method */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading pb-3 border-b border-slate-100 dark:border-slate-800">
              2. Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                { id: 'upi', name: 'UPI', icon: QrCode },
                { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = paymentMethod === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {opt.name}
                      </span>
                    </div>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                      {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Order Summary
          </h2>

          <div className="space-y-2 max-h-48 overflow-y-auto divide-y divide-slate-200/60 dark:divide-slate-700/60 pr-1 text-xs">
            {cartItems.map((item) => (
              <div key={item.id} className="pt-2 first:pt-0 flex justify-between gap-2">
                <span className="text-slate-600 dark:text-slate-300 truncate">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums shrink-0">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs sm:text-sm divide-y divide-slate-200/60 dark:divide-slate-700/60 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">${subtotal}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-500">Delivery</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {deliveryFee === 0 ? <span className="text-emerald-600">Free</span> : `$${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <span className="font-bold text-slate-900 dark:text-white">Total</span>
              <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={isPlacingOrder}
            onClick={handlePlaceOrder}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPlacingOrder ? 'Processing...' : 'Place Order'}
          </button>
        </div>

      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add New Address"
      >
        <AddressForm
          onSave={handleSaveAddress}
          onCancel={() => setIsAddressModalOpen(false)}
        />
      </Modal>

    </div>
  );
}
