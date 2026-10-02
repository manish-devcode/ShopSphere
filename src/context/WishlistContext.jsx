import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext.jsx';
import { wishlistService } from '../services/wishlistService.js';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('shopsphere_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from backend API on mount
  useEffect(() => {
    let isMounted = true;
    async function syncBackendWishlist() {
      try {
        const remoteWishlist = await wishlistService.getWishlist('user_001');
        if (isMounted && Array.isArray(remoteWishlist) && remoteWishlist.length > 0) {
          setWishlist(remoteWishlist);
          try {
            localStorage.setItem('shopsphere_wishlist', JSON.stringify(remoteWishlist));
          } catch (e) {
            console.error('Failed to sync wishlist to localStorage', e);
          }
        }
      } catch (err) {
        console.warn('Could not sync initial wishlist with backend', err);
      }
    }
    syncBackendWishlist();
    return () => {
      isMounted = false;
    };
  }, []);

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = async (product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
      try {
        await wishlistService.removeFromWishlist(product.id, 'user_001');
      } catch (e) {
        console.warn('Backend wishlist removal failed', e);
      }
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved "${product.name}" to your wishlist`);
      try {
        await wishlistService.addToWishlist(product.id, 'user_001');
      } catch (e) {
        console.warn('Backend wishlist addition failed', e);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    try {
      await wishlistService.removeFromWishlist(productId, 'user_001');
    } catch (e) {
      console.warn('Backend wishlist removal failed', e);
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
