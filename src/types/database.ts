/**
 * Cicada Cove Database Types
 * 
 * This file contains TypeScript type definitions for the database tables
 * and their relationships.
 */

// Order status options
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

// Product status options
export type ProductStatus = 'active' | 'sold';

// Base Product type
export interface Product {
  id: string;
  title: string;
  designer: string;
  era: string;
  description: string | null;
  condition: string;
  price: number;
  images: string[];
  measurements: Record<string, string> | null;
  status: ProductStatus;
  slug: string;
  created_at: string;
  updated_at: string;
}

// Type for inserting a new product
export type ProductInsert = Omit<Product, 'id' | 'created_at' | 'updated_at'>;

// Base Order type
export interface Order {
  id: string;
  customer_email: string;
  shipping_address: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
  };
  total: number;
  stripe_payment_id: string | null;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  
  // Joined fields
  order_items?: OrderItem[];
}

// Type for inserting a new order
export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_items'>;

// Base OrderItem type
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  price: number;
  created_at: string;
  
  // Joined fields
  product?: Product;
}

// Type for inserting a new order item
export type OrderItemInsert = Omit<OrderItem, 'id' | 'created_at' | 'product'>;

// Type for a basic count query
export interface CountResult {
  count: number;
}

// Type for an error response from the database
export interface DatabaseError {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
}