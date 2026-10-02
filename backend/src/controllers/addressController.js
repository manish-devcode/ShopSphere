// Address controller managing in-memory address records
// Ready for future integration with Mongoose: Address.find(), Address.create()

import { addresses } from '../data/addresses.js';

/**
 * @desc   Fetch all addresses for a specific user
 * @route  GET /api/users/:userId/addresses
 */
export const getUserAddresses = (req, res, next) => {
  try {
    const { userId } = req.params;
    const userAddresses = addresses.filter((a) => a.userId === userId);

    res.status(200).json({
      success: true,
      count: userAddresses.length,
      data: userAddresses
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create new address for user
 * @route  POST /api/users/:userId/addresses
 */
export const createAddress = (req, res, next) => {
  try {
    const { userId } = req.params;
    const {
      fullName,
      phone,
      house,
      street,
      area,
      city,
      state,
      pincode,
      landmark,
      isDefault
    } = req.body;

    if (!fullName || !phone || !house || !street || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Required address fields: fullName, phone, house, street, city, state, pincode'
      });
    }

    const userAddresses = addresses.filter((a) => a.userId === userId);
    const shouldBeDefault = userAddresses.length === 0 ? true : Boolean(isDefault);

    if (shouldBeDefault) {
      addresses.forEach((a) => {
        if (a.userId === userId) {
          a.isDefault = false;
        }
      });
    }

    const newAddress = {
      id: `addr_${Math.floor(100 + Math.random() * 900)}`,
      userId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      house: house.trim(),
      street: street.trim(),
      area: area ? area.trim() : '',
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      landmark: landmark ? landmark.trim() : '',
      isDefault: shouldBeDefault
    };

    addresses.unshift(newAddress);

    res.status(201).json({
      success: true,
      data: newAddress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update address by ID
 * @route  PUT /api/addresses/:id
 */
export const updateAddress = (req, res, next) => {
  try {
    const { id } = req.params;
    const address = addresses.find((a) => a.id === id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: `Address ${id} not found`
      });
    }

    const {
      fullName,
      phone,
      house,
      street,
      area,
      city,
      state,
      pincode,
      landmark,
      isDefault
    } = req.body;

    if (isDefault) {
      addresses.forEach((a) => {
        if (a.userId === address.userId) {
          a.isDefault = false;
        }
      });
    }

    if (fullName !== undefined) address.fullName = fullName.trim();
    if (phone !== undefined) address.phone = phone.trim();
    if (house !== undefined) address.house = house.trim();
    if (street !== undefined) address.street = street.trim();
    if (area !== undefined) address.area = area.trim();
    if (city !== undefined) address.city = city.trim();
    if (state !== undefined) address.state = state.trim();
    if (pincode !== undefined) address.pincode = pincode.trim();
    if (landmark !== undefined) address.landmark = landmark.trim();
    if (isDefault !== undefined) address.isDefault = Boolean(isDefault);

    res.status(200).json({
      success: true,
      data: address
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete address by ID
 * @route  DELETE /api/addresses/:id
 */
export const deleteAddress = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = addresses.findIndex((a) => a.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Address ${id} not found`
      });
    }

    const [deleted] = addresses.splice(index, 1);

    // If deleted address was default, make the first remaining address default
    if (deleted.isDefault) {
      const remainingUserAddr = addresses.find((a) => a.userId === deleted.userId);
      if (remainingUserAddr) {
        remainingUserAddr.isDefault = true;
      }
    }

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Set an address as default
 * @route  PATCH /api/addresses/:id/default
 */
export const setDefaultAddress = (req, res, next) => {
  try {
    const { id } = req.params;
    const targetAddress = addresses.find((a) => a.id === id);

    if (!targetAddress) {
      return res.status(404).json({
        success: false,
        message: `Address ${id} not found`
      });
    }

    // Set selected address default, all other addresses for same user non-default
    addresses.forEach((a) => {
      if (a.userId === targetAddress.userId) {
        a.isDefault = a.id === id;
      }
    });

    res.status(200).json({
      success: true,
      data: targetAddress
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Fetch a single address by ID
 * @route  GET /api/addresses/:id
 */
export const getAddressById = (req, res, next) => {
  try {
    const { id } = req.params;
    const address = addresses.find((a) => a.id === id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: `Address ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: address
    });
  } catch (error) {
    next(error);
  }
};

