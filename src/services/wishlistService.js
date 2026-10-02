// Wishlist service connected to Express REST API (/api/users/:userId/wishlist)
import { API_BASE_URL } from './apiConfig.js';

export const wishlistService = {
  /**
   * Fetch user wishlist
   * Endpoint: GET /api/users/:userId/wishlist
   */
  async getWishlist(userId = 'user_001') {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(userId)}/wishlist`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (err) {
      console.warn('API getWishlist failed:', err);
    }
    return [];
  },

  /**
   * Add product to user wishlist
   * Endpoint: POST /api/users/:userId/wishlist/:productId
   */
  async addToWishlist(productId, userId = 'user_001') {
    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${encodeURIComponent(userId)}/wishlist/${encodeURIComponent(productId)}`,
        { method: 'POST' }
      );
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('API addToWishlist failed:', err);
    }
    return null;
  },

  /**
   * Remove product from user wishlist
   * Endpoint: DELETE /api/users/:userId/wishlist/:productId
   */
  async removeFromWishlist(productId, userId = 'user_001') {
    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${encodeURIComponent(userId)}/wishlist/${encodeURIComponent(productId)}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('API removeFromWishlist failed:', err);
    }
    return null;
  }
};
