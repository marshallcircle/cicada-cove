-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  designer VARCHAR NOT NULL,
  era VARCHAR NOT NULL,
  description TEXT,
  condition VARCHAR NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of image URLs
  measurements JSONB, -- key measurements
  status VARCHAR NOT NULL DEFAULT 'active', -- 'active' or 'sold'
  slug VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email VARCHAR NOT NULL,
  shipping_address JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  stripe_payment_id VARCHAR,
  status VARCHAR NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'shipped', 'delivered', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OrderItems Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_products_designer ON products(designer);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at fields
CREATE TRIGGER set_timestamp_products
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_orders
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Products table policies
CREATE POLICY "Allow public read access to active products" 
ON products FOR SELECT 
USING (status = 'active');

CREATE POLICY "Allow authenticated users to see their sold purchases" 
ON products FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    WHERE oi.product_id = products.id
    AND o.customer_email = auth.email()
  )
);

CREATE POLICY "Allow admins full access to products" 
ON products 
TO authenticated
USING (auth.email() IN (SELECT email FROM admin_users));

-- Orders table policies
CREATE POLICY "Allow users to view own orders" 
ON orders FOR SELECT 
TO authenticated
USING (customer_email = auth.email());

CREATE POLICY "Allow users to insert own orders" 
ON orders FOR INSERT 
TO authenticated
WITH CHECK (customer_email = auth.email());

CREATE POLICY "Allow admins full access to orders" 
ON orders 
TO authenticated
USING (auth.email() IN (SELECT email FROM admin_users));

-- Order items policies
CREATE POLICY "Allow users to view own order items" 
ON order_items FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE order_items.order_id = orders.id
    AND orders.customer_email = auth.email()
  )
);

CREATE POLICY "Allow users to insert own order items" 
ON order_items FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE order_items.order_id = orders.id
    AND orders.customer_email = auth.email()
  )
);

CREATE POLICY "Allow admins full access to order items" 
ON order_items 
TO authenticated
USING (auth.email() IN (SELECT email FROM admin_users));

-- Admin users table (for permissions)
CREATE TABLE admin_users (
  email VARCHAR PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add initial admin user (replace with actual admin email)
INSERT INTO admin_users (email) VALUES ('admin@cicadacove.com');