const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET order by ID
router.get('/:id', orderController.getOrderById);

// GET orders by customer ID
router.get('/customer/:customerId', orderController.getOrdersByCustomer);

// POST create new order
router.post('/', orderController.createOrder);

// PUT update order status
router.put('/:id/status', orderController.updateOrderStatus);

// PUT update payment status
router.put('/:id/payment', orderController.updatePaymentStatus);

// PUT cancel order
router.put('/:id/cancel', orderController.cancelOrder);

module.exports = router;
