// Wishlist controller managing in-memory wishlists
// Ready for future integration with Mongoose Wishlist model

import { wishlists } from '../data/wishlists.js';
import { products } from '../data/products.js';

/**
 * @desc   Fetch user wishlist
 * @route  GET /api/users/:userId/wishlist
 */
export const getWishlist = (req, res, next) => {
  try {
    const { userId } = req.params;
    const userWishlistIds = wishlists[userId] || [];

    const wishlistProducts = userWishlistIds
      .map((productId) =>
        products.find(
          (p) =>
            p.id.toLowerCase() === productId.toLowerCase() ||
            p.id.replace('prod-', '') === productId
        )
      )
      .filter(Boolean);

    res.status(200).json({
      success: true,
      count: wishlistProducts.length,
      data: wishlistProducts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Add product to user wishlist (prevents duplicates)
 * @route  POST /api/users/:userId/wishlist/:productId
 */
export const addToWishlist = (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    if (!wishlists[userId]) {
      wishlists[userId] = [];
    }

    // Check if product exists
    const product = products.find(
      (p) =>
        p.id.toLowerCase() === productId.toLowerCase() ||
        p.id.replace('prod-', '') === productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Prevent duplicates
    if (!wishlists[userId].includes(product.id)) {
      wishlists[userId].push(product.id);
    }

    res.status(200).json({
      success: true,
      data: wishlists[userId]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Remove product from user wishlist
 * @route  DELETE /api/users/:userId/wishlist/:productId
 */
export const removeFromWishlist = (req, res, next) => {
  try {
    const { userId, productId } = req.params;

    if (!wishlists[userId]) {
      wishlists[userId] = [];
    }

    wishlists[userId] = wishlists[userId].filter(
      (id) =>
        id.toLowerCase() !== productId.toLowerCase() &&
        id.replace('prod-', '') !== productId
    );

    res.status(200).json({
      success: true,
      data: wishlists[userId]
    });
  } catch (error) {
    next(error);
  }
};
