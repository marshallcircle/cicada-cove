# Cicada Cove Database Structure

This document outlines the database schema for the Cicada Cove vintage clothing e-commerce platform.

## Tables Overview

The database consists of three main tables:

1. **Products**: Stores information about vintage clothing items
2. **Orders**: Stores customer order information
3. **Order Items**: Links products to orders (many-to-many relationship)

## Schema Details

### Products Table

Stores all product information for the vintage clothing items.

| Column       | Type           | Description                                      |
|--------------|----------------|--------------------------------------------------|
| id           | UUID           | Primary key, automatically generated             |
| title        | TEXT           | Product title/name                               |
| designer     | TEXT           | Designer/brand name                              |
| era          | TEXT           | Time period/decade (e.g., "1970s")              |
| description  | TEXT           | Detailed product description                     |
| condition    | TEXT           | Item condition (e.g., "Excellent", "Good")      |
| price        | DECIMAL(10,2)  | Product price                                   |
| images       | JSONB          | Array of image URLs                              |
| measurements | JSONB          | Product measurements (chest, waist, etc.)        |
| status       | TEXT           | Product status ("active" or "sold")              |
| slug         | TEXT           | URL-friendly identifier (must be unique)         |
| created_at   | TIMESTAMP      | Creation timestamp (auto-generated)              |
| updated_at   | TIMESTAMP      | Last update timestamp (auto-updated)             |

### Orders Table

Stores all customer order information.

| Column            | Type           | Description                                  |
|-------------------|----------------|----------------------------------------------|
| id                | UUID           | Primary key, automatically generated         |
| customer_email    | TEXT           | Customer's email address                     |
| shipping_address  | JSONB          | Customer's shipping details                  |
| total             | DECIMAL(10,2)  | Order total amount                           |
| stripe_payment_id | TEXT           | Reference to Stripe payment                  |
| status            | TEXT           | Order status ("pending", "paid", etc.)       |
| created_at        | TIMESTAMP      | Creation timestamp (auto-generated)          |
| updated_at        | TIMESTAMP      | Last update timestamp (auto-updated)         |

### Order Items Table

Links products to orders (junction table for many-to-many relationship).

| Column       | Type          | Description                                      |
|--------------|---------------|--------------------------------------------------|
| id           | UUID          | Primary key, automatically generated             |
| order_id     | UUID          | Foreign key referencing orders.id                |
| product_id   | UUID          | Foreign key referencing products.id              |
| price        | DECIMAL(10,2) | Price at time of purchase                        |
| created_at   | TIMESTAMP     | Creation timestamp (auto-generated)              |

## Database Setup Instructions

To set up this database schema:

1. Log in to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Open the `supabase-tables.sql` file from this repository
4. Copy and paste the entire contents into the SQL Editor
5. Execute the SQL script
6. Verify table creation with the query at the end of the script

## Relationships

- **Products to Order Items**: One-to-many (one product can be in many order items)
- **Orders to Order Items**: One-to-many (one order can have many order items)

## Indexes

Performance indexes are created on:
- `designer`, `status`, and `slug` columns in the Products table
- `customer_email` and `status` columns in the Orders table
- `order_id` and `product_id` columns in the Order Items table

## Automatic Timestamp Updates

Triggers are set up to automatically update the `updated_at` column when records are modified in the Products and Orders tables.