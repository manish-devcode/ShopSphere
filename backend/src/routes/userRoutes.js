import express from 'express';
import {
  getUsers,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';
import {
  getUserAddresses,
  createAddress
} from '../controllers/addressController.js';
import wishlistRoutes from './wishlistRoutes.js';

const router = express.Router();

// Users collection route
router.get('/', getUsers);

// User Profile routes
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

// User Addresses sub-routes
router.get('/:userId/addresses', getUserAddresses);
router.post('/:userId/addresses', createAddress);

// User Wishlist sub-routes (/api/users/:userId/wishlist)
router.use('/:userId/wishlist', wishlistRoutes);

export default router;
