import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useToast } from './ToastContext.jsx';
import { wishlistService } from '../services/wishlistService.js';

const WishlistContext = createContext();
const STORAGE_KEY = 'shopsphere_wishlist';

function getStoredWishlist() {
  if (typeof window === 'undefined') return null;
  try {
    const item = window.localStorage.getItem(STORAGE_KEY);
    return item !== null ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function setStoredWishlist(items) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save wishlist to localStorage', e);
  }
}

export function WishlistProvider({ children }) {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    const stored = getStoredWishlist();
    return Array.isArray(stored) ? stored : [];
  });
  
  // Track whether we've completed the initial load cycle
  const hasInitialized = useRef(false);

  // Initialize from backend only for first-time visitors who do not yet have a stored state
  useEffect(() => {
    let isMounted = true;

    async function initWishlist() {
      const stored = getStoredWishlist();
      
      // If user already has stored state in localStorage (even an empty array []), respect it
      if (stored !== null) {
        hasInitialized.current = true;
        return;
      }

      // First-time visit: fetch default from backend
      try {
        const remoteWishlist = await wishlistService.getWishlist('user_001');
        if (isMounted && Array.isArray(remoteWishlist)) {
          setWishlist(remoteWishlist);
          setStoredWishlist(remoteWishlist);
        }
      } catch (err) {
        console.warn('Could not fetch initial wishlist from backend', err);
      } finally {
        hasInitialized.current = true;
      }
    }

    initWishlist();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (hasInitialized.current) {
      setStoredWishlist(wishlist);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = async (product) => {
    if (!product || !product.id) return;

    if (isInWishlist(product.id)) {
      setWishlist((prev) => {
        const updated = prev.filter((item) => item.id !== product.id);
        setStoredWishlist(updated);
        return updated;
      });
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
      try {
        await wishlistService.removeFromWishlist(product.id, 'user_001');
      } catch (e) {
        console.warn('Backend wishlist removal notice', e);
      }
    } else {
      setWishlist((prev) => {
        if (prev.some((item) => item.id === product.id)) return prev;
        const updated = [...prev, product];
        setStoredWishlist(updated);
        return updated;
      });
      addToast(`Saved "${product.name}" to your wishlist`);
      try {
        await wishlistService.addToWishlist(product.id, 'user_001');
      } catch (e) {
        console.warn('Backend wishlist addition notice', e);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!productId) return;
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      setStoredWishlist(updated);
      return updated;
    });
    try {
      await wishlistService.removeFromWishlist(productId, 'user_001');
    } catch (e) {
      console.warn('Backend wishlist removal notice', e);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
