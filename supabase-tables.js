/**
 * SUPABASE SQL COMMANDS FOR TABLE CREATION
 * 
 * This file contains the SQL commands needed to create the database tables for the Cicada Cove project.
 * These SQL commands should be executed in the Supabase SQL Editor.
 */

// Step 1: Enable UUID extension
const enableUUID = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
`;

// Step 2: Create Products Table
const createProductsTable = `
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  designer TEXT NOT NULL,
  era TEXT NOT NULL,
  description TEXT,
  condition TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  measurements JSONB,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold')),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

// Step 3: Create Orders Table
const createOrdersTable = `
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

// Step 4: Create OrderItems Table
const createOrderItemsTable = `
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

// Step 5: Create Indexes
const createIndexes = `
-- Create indexes for better performance
CREATE INDEX idx_products_designer ON products(designer);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
`;

// Step 6: Create Trigger Function for Updated Timestamps
const createTriggerFunction = `
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
`;

// Step 7: Create Triggers
const createTriggers = `
-- Add triggers for updated_at fields
CREATE TRIGGER set_timestamp_products
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_orders
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
`;

// Step 8: Verify tables exist
const verifyTables = `
SELECT 
  table_name 
FROM 
  information_schema.tables 
WHERE 
  table_schema = 'public' 
  AND table_name IN ('products', 'orders', 'order_items');
`;

/**
 * INSTRUCTIONS:
 * 
 * 1. Go to the Supabase dashboard for your project
 * 2. Navigate to the SQL Editor
 * 3. Copy and paste each SQL block above, one at a time, in the order shown
 * 4. Execute each statement and verify it completes successfully
 * 5. Use the verifyTables query at the end to confirm all tables were created
 */