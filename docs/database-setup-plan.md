# Cicada Cove Supabase Database Setup Plan

## Overview
This document outlines the step-by-step process for setting up our Supabase database for the Cicada Cove e-commerce platform.

## 1. Project Initialization
- Create a new Supabase project named "cicada-cove"
- Set up connection details and API keys
- Document project initialization details

## 2. Authentication Setup
- Enable email authentication
- Configure password requirements
- Set up email templates for verification
- Test authentication flow

## 3. Database Schema Creation
We'll create the following tables based on our schema requirements:

### Products Table
```sql
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
```

### Orders Table
```sql
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
```

### OrderItems Table
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 4. Index Creation
```sql
-- Create indexes for faster queries
CREATE INDEX idx_products_designer ON products(designer);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

## 5. Row Level Security (RLS)
- Set up RLS policies for each table to ensure proper data access
- Products: Public read, admin write
- Orders: Customer read own orders, admin read/write all
- OrderItems: Customer read own items, admin read/write all

## 6. API Integration
- Set up Supabase API keys for frontend access
- Create and test API endpoints for:
  - Product listing and filtering
  - Order creation and management
  - User authentication

## 7. Testing & Validation
- Validate schema with sample data
- Test queries for performance
- Verify security policies work as expected
- Ensure proper indexing for common queries