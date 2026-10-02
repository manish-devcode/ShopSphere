// Order service connected to Express REST API (/api/orders)
import { API_BASE_URL } from './apiConfig.js';
import { INITIAL_ORDERS } from '../data/mockOrders.js';

const STORAGE_KEY = 'shopsphere_orders';

function getStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read orders from localStorage', e);
  }
  return INITIAL_ORDERS;
}

function saveStoredOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to write orders to localStorage', e);
  }
}

export const orderService = {
  /**
   * Fetch all orders
   * Endpoint: GET /api/orders
   */
  async getOrders(filter = 'all') {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API orders fetch failed, reading local storage:', err);
    }

    const orders = getStoredOrders();
    if (filter === 'all' || !filter) return orders;

    return orders.filter((ord) => {
      const status = ord.status.toLowerCase();
      if (filter === 'processing') {
        return ['order placed', 'order confirmed', 'packed', 'processing'].includes(status);
      }
      if (filter === 'shipped') {
        return ['shipped', 'out for delivery'].includes(status);
      }
      if (filter === 'delivered') {
        return status === 'delivered';
      }
      if (filter === 'cancelled') {
        return status === 'cancelled';
      }
      return true;
    });
  },

  /**
   * Fetch single order by ID
   * Endpoint: GET /api/orders/:id
   */
  async getOrderById(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/${encodeURIComponent(id)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API getOrderById failed, searching local storage:', err);
    }

    const orders = getStoredOrders();
    const cleanId = id.toString().trim().toUpperCase();
    const order = orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.replace('SS', '').replace('-', '') === cleanId.replace('SS', '').replace('-', '')
    );
    if (!order) {
      throw new Error(`Order #${id} not found.`);
    }
    return order;
  },

  /**
   * Create a new order
   * Endpoint: POST /api/orders
   */
  async createOrder({ items, deliveryAddress, paymentMethod, subtotal, shippingFee = 0, total }) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_001',
          items,
          deliveryAddress,
          paymentMethod,
          totalAmount: total || subtotal
        })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          // Also sync locally
          const stored = getStoredOrders();
          saveStoredOrders([json.data, ...stored]);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API createOrder failed, generating local record:', err);
    }

    const orders = getStoredOrders();
    const orderNumber = `SS${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const newOrder = {
      id: orderNumber,
      userId: 'user_001',
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'ORDER_PLACED',
      statusCode: 1,
      expectedDelivery: '3-5 days',
      paymentMethod,
      items,
      deliveryAddress,
      subtotal,
      shippingFee,
      totalAmount: total || subtotal,
      total: total || subtotal
    };

    saveStoredOrders([newOrder, ...orders]);
    return newOrder;
  }
};
