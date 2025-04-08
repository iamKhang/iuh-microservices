db = db.getSiblingDB('customer_db');

// Create collection
db.createCollection('customers');

// Insert sample data
db.customers.insertMany([
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    additionalInfo: {
      occupation: "Software Engineer",
      company: "Tech Corp"
    },
    preferences: {
      newsletter: true,
      marketingEmails: false
    },
    dateOfBirth: new Date("1985-05-15"),
    gender: "male",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    address: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA"
    },
    preferences: {
      newsletter: false,
      marketingEmails: true,
      productUpdates: true
    },
    gender: "female",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "555-123-4567",
    address: {
      street: "789 Pine Blvd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    additionalInfo: {
      occupation: "Marketing Manager",
      company: "Marketing Inc",
      notes: "VIP customer"
    },
    dateOfBirth: new Date("1978-11-30"),
    gender: "male",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@example.com",
    phone: "444-555-6666",
    address: {
      street: "321 Maple Dr",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
      country: "USA"
    },
    additionalInfo: {
      occupation: "Doctor",
      specialization: "Pediatrics"
    },
    preferences: {
      newsletter: true,
      marketingEmails: true,
      appointmentReminders: true
    },
    dateOfBirth: new Date("1982-03-25"),
    gender: "female",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: "Michael",
    lastName: "Wilson",
    email: "michael.wilson@example.com",
    phone: "777-888-9999",
    address: {
      city: "Seattle",
      state: "WA",
      country: "USA"
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create indexes
db.customers.createIndex({ 
  firstName: "text", 
  lastName: "text", 
  email: "text",
  "address.city": "text",
  "address.country": "text"
});

print("MongoDB initialization completed successfully");
