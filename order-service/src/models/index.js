const sequelize = require('../config/database');
const Order = require('./order');
const OrderItem = require('./orderItem');

const syncDatabase = async () => {
  try {
    // Only check connection, don't alter tables since they're created by SQL script
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error; // Rethrow to stop server startup if DB connection fails
  }
};

module.exports = {
  sequelize,
  Order,
  OrderItem,
  syncDatabase
};
