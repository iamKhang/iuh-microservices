const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// GET all customers
router.get('/', customerController.getAllCustomers);

// GET customer by ID
router.get('/:id', customerController.getCustomerById);

// POST create new customer
router.post('/', customerController.createCustomer);

// PUT update customer
router.put('/:id', customerController.updateCustomer);

// DELETE customer
router.delete('/:id', customerController.deleteCustomer);

// GET search customers
router.get('/search', customerController.searchCustomers);

module.exports = router;
