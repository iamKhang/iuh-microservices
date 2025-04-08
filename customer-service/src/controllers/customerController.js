const Customer = require('../models/customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    return res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, additionalInfo, preferences, dateOfBirth, gender } = req.body;
    
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'First name, last name, and email are required' });
    }
    
    // Check if customer with email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }
    
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      address,
      additionalInfo,
      preferences,
      dateOfBirth,
      gender
    });
    
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const customer = await Customer.findById(id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    // If email is being updated, check if it's already in use
    if (updateData.email && updateData.email !== customer.email) {
      const existingCustomer = await Customer.findOne({ email: updateData.email });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }
    
    // Update the updatedAt field
    updateData.updatedAt = Date.now();
    
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    return res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const customer = await Customer.findById(id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    await Customer.findByIdAndDelete(id);
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting customer:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Search customers
exports.searchCustomers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const customers = await Customer.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    
    return res.status(200).json(customers);
  } catch (error) {
    console.error('Error searching customers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
