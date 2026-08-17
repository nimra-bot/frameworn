const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { createOrder, getMyOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/mine', protect, getMyOrders);

module.exports = router;
