-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  "imageUrl" VARCHAR(255),
  category VARCHAR(100),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO products (name, price, description, stock, "imageUrl", category) VALUES
('Smartphone XYZ', 799.99, 'Latest smartphone with advanced features', 50, 'https://example.com/images/smartphone-xyz.jpg', 'Electronics'),
('Laptop Pro', 1299.99, 'High-performance laptop for professionals', 25, 'https://example.com/images/laptop-pro.jpg', 'Electronics'),
('Wireless Headphones', 149.99, 'Noise-cancelling wireless headphones', 100, 'https://example.com/images/wireless-headphones.jpg', 'Audio'),
('Smart Watch', 249.99, 'Fitness and health tracking smartwatch', 75, 'https://example.com/images/smart-watch.jpg', 'Wearables'),
('Bluetooth Speaker', 89.99, 'Portable waterproof Bluetooth speaker', 120, 'https://example.com/images/bluetooth-speaker.jpg', 'Audio');
