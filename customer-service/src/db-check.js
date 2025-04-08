const mongoose = require('mongoose');
const Customer = require('./models/customer');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    
    // Count customers
    const count = await Customer.countDocuments();
    console.log(`Number of customers in database: ${count}`);
    
    if (count > 0) {
      // Show sample customer
      const customer = await Customer.findOne();
      console.log('Sample customer:', JSON.stringify(customer, null, 2));
    }
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

checkDatabase();
