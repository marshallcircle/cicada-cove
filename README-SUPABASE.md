# Cicada Cove - Supabase Integration

This document contains information about the Supabase integration for the Cicada Cove e-commerce platform.

## Database Schema

Cicada Cove uses Supabase as the backend database with the following tables:

### Products

Stores information about vintage clothing items.

| Column        | Type                 | Description                               |
|---------------|----------------------|-------------------------------------------|
| id            | UUID                 | Primary key                               |
| title         | TEXT                 | Product title                             |
| designer      | TEXT                 | Designer/brand name                       |
| era           | TEXT                 | Decade/period (e.g., "1980s")            |
| description   | TEXT                 | Detailed description                      |
| condition     | TEXT                 | Item condition                            |
| price         | DECIMAL(10,2)        | Price in USD                              |
| images        | JSONB (string array) | Array of image URLs                       |
| measurements  | JSONB                | Key measurements as key-value pairs       |
| status        | TEXT                 | 'active' or 'sold'                        |
| slug          | TEXT                 | URL-friendly unique identifier            |
| created_at    | TIMESTAMP            | Creation timestamp                        |
| updated_at    | TIMESTAMP            | Last update timestamp                     |

### Orders

Tracks customer orders.

| Column            | Type                 | Description                               |
|-------------------|----------------------|-------------------------------------------|
| id                | UUID                 | Primary key                               |
| customer_email    | TEXT                 | Customer's email address                  |
| shipping_address  | JSONB                | Shipping address information              |
| total             | DECIMAL(10,2)        | Order total in USD                        |
| stripe_payment_id | TEXT                 | Stripe payment ID for reference           |
| status            | TEXT                 | Order status (pending/paid/shipped/etc)   |
| created_at        | TIMESTAMP            | Creation timestamp                        |
| updated_at        | TIMESTAMP            | Last update timestamp                     |

### Order Items

Links products to orders (many-to-many relationship).

| Column      | Type          | Description                               |
|-------------|---------------|-------------------------------------------|
| id          | UUID          | Primary key                               |
| order_id    | UUID          | Foreign key to orders table               |
| product_id  | UUID          | Foreign key to products table             |
| price       | DECIMAL(10,2) | Price at time of purchase                 |
| created_at  | TIMESTAMP     | Creation timestamp                        |

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Database Setup

1. Run the database setup script:

```bash
node scripts/setup-database.js
```

2. The script will:
   - Test the connection to Supabase
   - Open the Supabase SQL Editor in your browser
   - Display the SQL commands needed to create the tables

3. Copy and paste the SQL commands into the Supabase SQL Editor and execute them.

### 3. Verify Setup

Run the test script to verify that the connection and tables are working:

```bash
node scripts/test-supabase.js
```

## Using Supabase in the Codebase

The Supabase client is initialized in `src/lib/supabase.ts` and exported for use throughout the application. The file includes service functions for:

- Product management (CRUD operations)
- Order management
- Checkout process

## Type Definitions

TypeScript type definitions for the database schema are defined in `src/types/database.ts`.