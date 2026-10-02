// Order controller managing in-memory order records
// Ready for future integration with Mongoose: Order.find(), Order.create()

import { orders, ALLOWED_ORDER_STATUSES } from '../data/orders.js';

/**
 * @desc   Fetch all orders
 * @route  GET /api/orders
 */
export const getOrders = (req, res, next) => {
  try {
    const { status, userId } = req.query;
    let results = [...orders];

    if (userId) {
      results = results.filter((o) => o.userId === userId);
    }

    if (status) {
      results = results.filter(
        (o) => o.status.toUpperCase() === status.toUpperCase()
      );
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Fetch order by ID
 * @route  GET /api/orders/:id
 */
export const getOrderById = (req, res, next) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim().toUpperCase();

    const order = orders.find(
      (o) =>
        o.id.toUpperCase() === cleanId ||
        o.id.replace('SS', '').replace('-', '') === cleanId.replace('SS', '').replace('-', '')
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Create new order
 * @route  POST /api/orders
 */
export const createOrder = (req, res, next) => {
  try {
    const {
      userId = 'user_001',
      items,
      deliveryAddress,
      paymentMethod,
      totalAmount
    } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!deliveryAddress || typeof deliveryAddress !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'deliveryAddress is required'
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'paymentMethod is required'
      });
    }

    if (totalAmount === undefined || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid totalAmount is required'
      });
    }

    const newOrder = {
      id: `SS${Math.floor(1000 + Math.random() * 9000)}`,
      userId,
      items,
      deliveryAddress,
      paymentMethod: paymentMethod.toUpperCase(),
      totalAmount: Number(Number(totalAmount).toFixed(2)),
      status: 'ORDER_PLACED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.unshift(newOrder);

    res.status(201).json({
      success: true,
      data: newOrder
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update order status
 * @route  PUT /api/orders/:id/status
 */
export const updateOrderStatus = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'status field is required'
      });
    }

    const normalizedStatus = status.trim().toUpperCase();
    if (!ALLOWED_ORDER_STATUSES.includes(normalizedStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses: ${ALLOWED_ORDER_STATUSES.join(', ')}`
      });
    }

    const order = orders.find(
      (o) =>
        o.id.toUpperCase() === id.toUpperCase() ||
        o.id.replace('SS', '') === id.replace('SS', '')
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${id} not found`
      });
    }

    order.status = normalizedStatus;
    order.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
