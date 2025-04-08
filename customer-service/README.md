# Customer Service

A simple Express.js microservice for managing customer information with MongoDB.

## Features

- CRUD operations for customers
- Flexible schema with MongoDB to handle varying customer information
- Docker and Docker Compose configuration
- RESTful API
- Text search functionality

## API Endpoints

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer
- `GET /api/customers/search?query=text` - Search for customers
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

The database and sample data are automatically created when the MongoDB container starts up for the first time. The initialization script is located in the `db/init` directory.

If you need to reset the database, you can remove the Docker volume and restart the containers:
```
docker-compose down -v
docker-compose up -d
```

## Customer Model

The customer model has a flexible schema to accommodate varying levels of information:

### Required Fields
- `firstName` - Customer's first name
- `lastName` - Customer's last name
- `email` - Customer's email address (unique)

### Optional Fields
- `phone` - Contact phone number
- `address` - Object containing street, city, state, zipCode, and country
- `additionalInfo` - Flexible object for any additional customer information
- `preferences` - Customer preferences (newsletter, marketing emails, etc.)
- `dateOfBirth` - Customer's date of birth
- `gender` - Customer's gender

### Metadata
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Postman Collection

A Postman collection is included in the repository for testing the API endpoints. Import the `Customer-Service-API.postman_collection.json` file into Postman to get started.
