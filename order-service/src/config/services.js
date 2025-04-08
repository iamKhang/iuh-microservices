require('dotenv').config();

module.exports = {
  productService: {
    url: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3000',
    endpoints: {
      getProduct: '/api/products',
      updateStock: '/api/products'
    }
  },
  customerService: {
    url: process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3001',
    endpoints: {
      getCustomer: '/api/customers',
      addLoyaltyPoints: '/api/customers/:id/loyalty-points/add'
    }
  }
};
