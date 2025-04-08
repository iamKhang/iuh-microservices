const { sequelize } = require('./models');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    // Check connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Check if tables exist
    const [ordersResult] = await sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'orders'
      );
    `);
    
    const [orderItemsResult] = await sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'order_items'
      );
    `);
    
    const ordersExist = ordersResult[0].exists;
    const orderItemsExist = orderItemsResult[0].exists;
    
    console.log(`Orders table exists: ${ordersExist}`);
    console.log(`Order items table exists: ${orderItemsExist}`);
    
    if (ordersExist && orderItemsExist) {
      // Count orders
      const [countResult] = await sequelize.query('SELECT COUNT(*) FROM orders');
      const count = parseInt(countResult[0].count);
      
      console.log(`Number of orders in database: ${count}`);
    }
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await sequelize.close();
  }
};

checkDatabase();
