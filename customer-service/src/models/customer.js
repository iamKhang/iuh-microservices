const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  // Flexible fields that can vary between customers
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed
  },
  preferences: {
    type: mongoose.Schema.Types.Mixed
  },
  // Optional fields
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer not to say']
  },
  // Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a text index for search functionality
customerSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text',
  'address.city': 'text',
  'address.country': 'text'
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
