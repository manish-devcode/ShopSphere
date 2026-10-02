// Address service connected to Express REST API (/api/users/:userId/addresses and /api/addresses/:id)
import { API_BASE_URL } from './apiConfig.js';
import { INITIAL_ADDRESSES } from '../data/mockAddresses.js';

const STORAGE_KEY = 'shopsphere_addresses';

function getStoredAddresses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read addresses from localStorage', e);
  }
  return INITIAL_ADDRESSES;
}

function saveStoredAddresses(addresses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch (e) {
    console.error('Failed to write addresses to localStorage', e);
  }
}

export const addressService = {
  /**
   * Fetch user addresses
   * Endpoint: GET /api/users/:userId/addresses
   */
  async getAddresses(userId = 'user_001') {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(userId)}/addresses`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          saveStoredAddresses(json.data);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API getAddresses failed, reading local storage:', err);
    }
    return getStoredAddresses();
  },

  /**
   * Add a new address
   * Endpoint: POST /api/users/:userId/addresses
   */
  async addAddress(addressData, userId = 'user_001') {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(userId)}/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const current = getStoredAddresses();
          const updated = [json.data, ...current];
          saveStoredAddresses(updated);
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API addAddress failed, saving locally:', err);
    }

    const current = getStoredAddresses();
    const newAddress = {
      ...addressData,
      id: `addr_${Math.floor(100 + Math.random() * 900)}`,
      isDefault: current.length === 0 ? true : Boolean(addressData.isDefault),
    };
    let updated = [...current];
    if (newAddress.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }
    updated.unshift(newAddress);
    saveStoredAddresses(updated);
    return newAddress;
  },

  /**
   * Update address
   * Endpoint: PUT /api/addresses/:id
   */
  async updateAddress(id, updatedFields) {
    try {
      const res = await fetch(`${API_BASE_URL}/addresses/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API updateAddress failed, updating local copy:', err);
    }

    const current = getStoredAddresses();
    const updated = current.map((addr) => {
      if (addr.id === id) {
        return { ...addr, ...updatedFields };
      }
      return addr;
    });
    saveStoredAddresses(updated);
    return updated.find((a) => a.id === id);
  },

  /**
   * Delete address
   * Endpoint: DELETE /api/addresses/:id
   */
  async deleteAddress(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/addresses/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const current = getStoredAddresses();
        const remaining = current.filter((a) => a.id !== id);
        saveStoredAddresses(remaining);
        return true;
      }
    } catch (err) {
      console.warn('API deleteAddress failed, removing locally:', err);
    }

    const current = getStoredAddresses();
    const remaining = current.filter((a) => a.id !== id);
    saveStoredAddresses(remaining);
    return true;
  },

  /**
   * Set address as default
   * Endpoint: PATCH /api/addresses/:id/default
   */
  async setDefaultAddress(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/addresses/${encodeURIComponent(id)}/default`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API setDefaultAddress failed, updating locally:', err);
    }

    const current = getStoredAddresses();
    const updated = current.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveStoredAddresses(updated);
    return updated;
  }
};
