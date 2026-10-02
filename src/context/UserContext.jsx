import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_USER } from '../data/mockUser.js';
import { INITIAL_ADDRESSES } from '../data/mockAddresses.js';
import { INITIAL_ORDERS } from '../data/mockOrders.js';
import { userService } from '../services/userService.js';
import { addressService } from '../services/addressService.js';
import { orderService } from '../services/orderService.js';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('shopsphere_user');
      return stored ? JSON.parse(stored) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const stored = localStorage.getItem('shopsphere_auth');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem('shopsphere_addresses');
      return stored ? JSON.parse(stored) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('shopsphere_orders');
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Sync profile, addresses, and orders from backend API
  useEffect(() => {
    let isMounted = true;

    async function syncBackendData() {
      try {
        const [remoteUser, remoteAddresses, remoteOrders] = await Promise.allSettled([
          userService.getProfile('user_001'),
          addressService.getAddresses('user_001'),
          orderService.getOrders(),
        ]);

        if (isMounted) {
          if (remoteUser.status === 'fulfilled' && remoteUser.value) {
            setUser(remoteUser.value);
          }
          if (remoteAddresses.status === 'fulfilled' && Array.isArray(remoteAddresses.value)) {
            setAddresses(remoteAddresses.value);
          }
          if (remoteOrders.status === 'fulfilled' && Array.isArray(remoteOrders.value)) {
            setOrders(remoteOrders.value);
          }
        }
      } catch (err) {
        console.warn('Backend sync failed, continuing with cached/mock data', err);
      }
    }

    syncBackendData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('shopsphere_user', JSON.stringify(user));
      localStorage.setItem('shopsphere_auth', JSON.stringify(isLoggedIn));
      localStorage.setItem('shopsphere_addresses', JSON.stringify(addresses));
      localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving user data to storage', e);
    }
  }, [user, isLoggedIn, addresses, orders]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const updateUser = useCallback(async (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
    try {
      const res = await userService.updateProfile(updatedFields, 'user_001');
      if (res) setUser(res);
    } catch (err) {
      console.warn('Backend updateProfile failed', err);
    }
  }, []);

  const addAddress = useCallback(async (newAddr) => {
    try {
      const created = await addressService.addAddress(newAddr, 'user_001');
      if (created) {
        setAddresses((prev) => {
          let updated = prev;
          if (created.isDefault) {
            updated = prev.map((a) => ({ ...a, isDefault: false }));
          }
          return [created, ...updated];
        });
        return;
      }
    } catch (err) {
      console.warn('Backend addAddress failed, saving locally', err);
    }

    // Fallback local creation
    setAddresses((prev) => {
      const id = `addr-${Date.now().toString().slice(-5)}`;
      const isDefault = prev.length === 0 ? true : Boolean(newAddr.isDefault);
      let updated = prev;
      if (isDefault) {
        updated = prev.map((a) => ({ ...a, isDefault: false }));
      }
      return [{ ...newAddr, id, isDefault }, ...updated];
    });
  }, []);

  const updateAddress = useCallback(async (id, updatedFields) => {
    try {
      const updated = await addressService.updateAddress(id, updatedFields);
      if (updated) {
        setAddresses((prev) =>
          prev.map((addr) => {
            if (addr.id === id) return updated;
            if (updated.isDefault) return { ...addr, isDefault: false };
            return addr;
          })
        );
        return;
      }
    } catch (err) {
      console.warn('Backend updateAddress failed, updating locally', err);
    }

    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === id) return { ...addr, ...updatedFields };
        if (updatedFields.isDefault) return { ...addr, isDefault: false };
        return addr;
      })
    );
  }, []);

  const deleteAddress = useCallback(async (id) => {
    try {
      await addressService.deleteAddress(id);
    } catch (err) {
      console.warn('Backend deleteAddress failed', err);
    }

    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
  }, []);

  const setDefaultAddress = useCallback(async (id) => {
    try {
      await addressService.setDefaultAddress(id);
    } catch (err) {
      console.warn('Backend setDefaultAddress failed', err);
    }

    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  }, []);

  const addOrder = useCallback((orderData) => {
    setOrders((prev) => [orderData, ...prev]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUser,
        addresses,
        setAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        addOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
