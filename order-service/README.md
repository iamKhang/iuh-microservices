# Order Service

A microservice for managing orders in a store, with integration to Product and Customer services.

## Features

- CRUD operations for orders
- Integration with Product Service to update product stock
- Integration with Customer Service to add loyalty points
- PostgreSQL database with Sequelize ORM
- Docker and Docker Compose configuration
- RESTful API

## API Endpoints

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order
- `GET /api/orders/customer/:customerId` - Get orders for a specific customer
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/payment` - Update payment status
- `PUT /api/orders/:id/cancel` - Cancel an order
- `GET /health` - Health check endpoint

## Service Integrations

### Product Service
- Checks if products are in stock before creating an order
- Updates product stock when an order is created
- Restores product stock when an order is cancelled

### Customer Service
- Validates customer exists before creating an order
- Adds loyalty points to customer when an order is created (10% of order total)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- Running instances of Product Service and Customer Service

### Development

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on the provided example.

3. Start the development server:
   ```
   npm run dev
   ```

### Docker Deployment

1. Build and start the containers:
   ```
   docker-compose up -d
   ```

2. Check if the database is properly initialized:
   ```
   npm run db:check
   ```

3. To stop the containers:
   ```
   docker-compose down
   ```

### Database Initialization

The database tables are automatically created when the PostgreSQL container starts up for the first time. The initialization scripts are located in the `db/init` directory.

If you need to reset the database, you can remove the Docker volume and restart the containers:
```
docker-compose down -v
docker-compose up -d
```

## Data Models

### Order
- `id` - Primary key
- `customerId` - ID of the customer who placed the order
- `status` - Order status (pending, processing, completed, cancelled)
- `totalAmount` - Total order amount
- `shippingAddress` - Shipping address information
- `paymentMethod` - Payment method used
- `paymentStatus` - Payment status (pending, paid, failed)
- `notes` - Additional notes for the order
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### OrderItem
- `id` - Primary key
- `orderId` - Reference to the order
- `productId` - ID of the product
- `productName` - Name of the product
- `quantity` - Quantity ordered
- `price` - Price per unit
- `subtotal` - Total price for this item
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Postman Collection

A Postman collection is included in the repository for testing the API endpoints. Import the `Order-Service-API.postman_collection.json` file into Postman to get started.
