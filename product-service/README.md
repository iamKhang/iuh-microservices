# Product Service

A simple Express.js microservice for managing products in a store.

## Features

- CRUD operations for products
- PostgreSQL database with Sequelize ORM
- Docker and Docker Compose configuration
- RESTful API

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- `GET /health` - Health check endpoint

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

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

The database tables and sample data are automatically created when the PostgreSQL container starts up for the first time. The initialization scripts are located in the `db/init` directory.

If you need to reset the database, you can remove the Docker volume and restart the containers:
```
docker-compose down -v
docker-compose up -d
```

## Product Model

- `id` - Primary key
- `name` - Product name (required)
- `price` - Product price (required)
- `description` - Product description
- `stock` - Inventory count (default: 0)
- `imageUrl` - URL to product image
- `category` - Product category
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Postman Collection

A Postman collection is included in the repository for testing the API endpoints. Import the `Product-Service-API.postman_collection.json` file into Postman to get started.
