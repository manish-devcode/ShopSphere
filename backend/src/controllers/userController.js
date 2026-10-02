// User controller managing user profiles
// Ready for future integration with Mongoose: User.findById(), User.findByIdAndUpdate()

import { users } from '../data/users.js';

/**
 * @desc   Fetch all users
 * @route  GET /api/users
 */
export const getUsers = (_req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Fetch user profile by ID
 * @route  GET /api/users/:id
 */
export const getUserProfile = (req, res, next) => {
  try {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update user profile (name, email, phone)
 * @route  PUT /api/users/:id
 */
export const updateUserProfile = (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User ${id} not found`
      });
    }

    if (name !== undefined) user.name = name.trim();
    if (email !== undefined) user.email = email.trim();
    if (phone !== undefined) user.phone = phone.trim();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
