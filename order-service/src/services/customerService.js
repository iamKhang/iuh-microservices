const axios = require('axios');
const serviceConfig = require('../config/services');

class CustomerService {
  constructor() {
    this.baseUrl = serviceConfig.customerService.url;
    this.endpoints = serviceConfig.customerService.endpoints;
  }

  // Get customer by ID
  async getCustomer(customerId) {
    try {
      const response = await axios.get(`${this.baseUrl}${this.endpoints.getCustomer}/${customerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${customerId}:`, error.message);
      if (error.response) {
        throw new Error(`Customer service error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      }
      throw new Error('Failed to communicate with customer service');
    }
  }

  // Add loyalty points to customer
  async addLoyaltyPoints(customerId, points, description) {
    try {
      const endpoint = this.endpoints.addLoyaltyPoints.replace(':id', customerId);
      const response = await axios.post(`${this.baseUrl}${endpoint}`, {
        points,
        description
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error adding loyalty points for customer ${customerId}:`, error.message);
      if (error.response) {
        throw new Error(`Customer service error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      }
      throw new Error('Failed to communicate with customer service');
    }
  }

  // Validate customer exists
  async validateCustomer(customerId) {
    try {
      const customer = await this.getCustomer(customerId);
      return {
        valid: true,
        customer
      };
    } catch (error) {
      console.error(`Error validating customer ${customerId}:`, error.message);
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

module.exports = new CustomerService();
