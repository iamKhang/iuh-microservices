const express = require('express');
const cors = require('cors');
const { syncDatabase } = require('./models');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'product-service' });
});

// Sync database and start server
const startServer = async () => {
  try {
    // Sync database models
    await syncDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Product Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
