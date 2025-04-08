const axios = require('axios');
const serviceConfig = require('../config/services');

class ProductService {
  constructor() {
    this.baseUrl = serviceConfig.productService.url;
    this.endpoints = serviceConfig.productService.endpoints;
  }

  // Get product by ID
  async getProduct(productId) {
    try {
      const response = await axios.get(`${this.baseUrl}${this.endpoints.getProduct}/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error.message);
      if (error.response) {
        throw new Error(`Product service error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      }
      throw new Error('Failed to communicate with product service');
    }
  }

  // Update product stock
  async updateStock(productId, quantity) {
    try {
      // Get current product
      const product = await this.getProduct(productId);
      
      // Calculate new stock
      const newStock = Math.max(0, product.stock - quantity);
      
      // Update product stock
      const response = await axios.put(`${this.baseUrl}${this.endpoints.updateStock}/${productId}`, {
        stock: newStock
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating stock for product ${productId}:`, error.message);
      if (error.response) {
        throw new Error(`Product service error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      }
      throw new Error('Failed to communicate with product service');
    }
  }

  // Check if products are in stock
  async checkStock(items) {
    try {
      const stockChecks = await Promise.all(
        items.map(async (item) => {
          const product = await this.getProduct(item.productId);
          return {
            productId: item.productId,
            name: product.name,
            requested: item.quantity,
            available: product.stock,
            inStock: product.stock >= item.quantity
          };
        })
      );
      
      const allInStock = stockChecks.every(item => item.inStock);
      
      return {
        allInStock,
        items: stockChecks
      };
    } catch (error) {
      console.error('Error checking stock:', error.message);
      throw error;
    }
  }
}

module.exports = new ProductService();
