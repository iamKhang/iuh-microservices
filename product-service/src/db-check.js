const { sequelize } = require('./models');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    // Check connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Check if products table exists
    const [results] = await sequelize.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
      );
    `);
    
    const tableExists = results[0].exists;
    
    if (tableExists) {
      console.log('Products table exists');
      
      // Count products
      const [countResult] = await sequelize.query('SELECT COUNT(*) FROM products');
      const count = parseInt(countResult[0].count);
      
      console.log(`Number of products in database: ${count}`);
      
      if (count > 0) {
        // Show sample product
        const [products] = await sequelize.query('SELECT * FROM products LIMIT 1');
        console.log('Sample product:', JSON.stringify(products[0], null, 2));
      }
    } else {
      console.error('Products table does not exist!');
    }
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await sequelize.close();
  }
};

checkDatabase();
