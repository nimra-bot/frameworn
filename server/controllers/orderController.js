const Order = require('../models/Order');

// POST /api/orders (protected)
const createOrder = async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    const order = await Order.create({
      user: req.userId,
      items,
      total,
      shippingAddress,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// GET /api/orders/mine (protected)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = { createOrder, getMyOrders };
