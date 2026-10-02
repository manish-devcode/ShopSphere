import express from 'express';
import {
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from '../controllers/addressController.js';

const router = express.Router();

router.get('/:id', getAddressById);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);
router.patch('/:id/default', setDefaultAddress);

export default router;
