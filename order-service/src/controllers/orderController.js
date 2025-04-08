const { Order, OrderItem } = require('../models');
const productService = require('../services/productService');
const customerService = require('../services/customerService');
const sequelize = require('../config/database');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'items' }]
    });
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: 'items' }]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get orders by customer ID
exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // Validate customer exists
    const customerValidation = await customerService.validateCustomer(customerId);
    if (!customerValidation.valid) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    const orders = await Order.findAll({
      where: { customerId },
      include: [{ model: OrderItem, as: 'items' }],
      order: [['createdAt', 'DESC']]
    });
    
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  // Start a transaction
  const transaction = await sequelize.transaction();
  
  try {
    const { customerId, items, shippingAddress, paymentMethod, notes } = req.body;
    
    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Customer ID and at least one item are required' });
    }
    
    // Validate customer exists
    const customerValidation = await customerService.validateCustomer(customerId);
    if (!customerValidation.valid) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    // Check if all products are in stock
    const stockCheck = await productService.checkStock(items);
    if (!stockCheck.allInStock) {
      await transaction.rollback();
      return res.status(400).json({ 
        message: 'Some items are out of stock',
        outOfStockItems: stockCheck.items.filter(item => !item.inStock)
      });
    }
    
    // Calculate total amount
    let totalAmount = 0;
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await productService.getProduct(item.productId);
      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;
      
      return {
        productId: item.productId,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal
      };
    }));
    
    // Create order
    const newOrder = await Order.create({
      customerId,
      totalAmount,
      status: 'pending',
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      notes
    }, { transaction });
    
    // Create order items
    const createdItems = await Promise.all(orderItems.map(item => 
      OrderItem.create({
        ...item,
        orderId: newOrder.id
      }, { transaction })
    ));
    
    // Update product stock
    await Promise.all(items.map(item => 
      productService.updateStock(item.productId, item.quantity)
    ));
    
    // Add loyalty points (10% of total amount)
    const loyaltyPoints = Math.floor(totalAmount * 0.1);
    if (loyaltyPoints > 0) {
      await customerService.addLoyaltyPoints(
        customerId, 
        loyaltyPoints, 
        `Points earned from order #${newOrder.id}`
      );
    }
    
    // Commit transaction
    await transaction.commit();
    
    // Return created order with items
    const createdOrder = await Order.findByPk(newOrder.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });
    
    return res.status(201).json({
      order: createdOrder,
      loyaltyPointsEarned: loyaltyPoints
    });
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }
    
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update order status
    await order.update({ status, updatedAt: new Date() });
    
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    
    if (!paymentStatus || !['pending', 'paid', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ message: 'Valid payment status is required' });
    }
    
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update payment status
    await order.update({ paymentStatus, updatedAt: new Date() });
    
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  // Start a transaction
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem, as: 'items' }]
    });
    
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status === 'completed') {
      await transaction.rollback();
      return res.status(400).json({ message: 'Cannot cancel a completed order' });
    }
    
    if (order.status === 'cancelled') {
      await transaction.rollback();
      return res.status(400).json({ message: 'Order is already cancelled' });
    }
    
    // Update order status to cancelled
    await order.update({ 
      status: 'cancelled', 
      updatedAt: new Date() 
    }, { transaction });
    
    // Restore product stock for each item
    if (order.items && order.items.length > 0) {
      for (const item of order.items) {
        try {
          const product = await productService.getProduct(item.productId);
          await productService.updateStock(item.productId, -item.quantity); // Negative quantity to add back to stock
        } catch (error) {
          console.error(`Error restoring stock for product ${item.productId}:`, error);
          // Continue with other items even if one fails
        }
      }
    }
    
    // Commit transaction
    await transaction.commit();
    
    return res.status(200).json(order);
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Error cancelling order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
