const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// GET all customers
router.get('/', customerController.getAllCustomers);

// GET search customers (must be before /:id route)
router.get('/search', customerController.searchCustomers);

// GET customer by ID
router.get('/:id', customerController.getCustomerById);

// POST create new customer
router.post('/', customerController.createCustomer);

// PUT update customer
router.put('/:id', customerController.updateCustomer);

// DELETE customer
router.delete('/:id', customerController.deleteCustomer);

// Loyalty Points Routes
// GET customer loyalty points
router.get('/:id/loyalty-points', customerController.getLoyaltyPoints);

// POST add loyalty points
router.post('/:id/loyalty-points/add', customerController.addLoyaltyPoints);

// POST redeem loyalty points
router.post('/:id/loyalty-points/redeem', customerController.redeemLoyaltyPoints);

// GET loyalty points history
router.get('/:id/loyalty-points/history', customerController.getLoyaltyPointsHistory);

module.exports = router;
