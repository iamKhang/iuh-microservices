-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  "customerId" VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  "totalAmount" DECIMAL(10, 2) NOT NULL,
  "shippingAddress" JSONB,
  "paymentMethod" VARCHAR(100),
  "paymentStatus" VARCHAR(20) NOT NULL DEFAULT 'pending',
  notes TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  "orderId" INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  "productId" INTEGER NOT NULL,
  "productName" VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_orders_customer_id ON orders("customerId");
CREATE INDEX idx_order_items_order_id ON order_items("orderId");
CREATE INDEX idx_order_items_product_id ON order_items("productId");
