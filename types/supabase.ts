export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          designer: string
          era: string
          description: string | null
          condition: string
          price: number
          images: string[]
          measurements: {
            chest?: string
            length?: string
            shoulders?: string
            sleeves?: string
            waist?: string
            hips?: string
            [key: string]: string | undefined
          } | null
          status: 'active' | 'sold'
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          designer: string
          era: string
          description?: string | null
          condition: string
          price: number
          images?: string[]
          measurements?: {
            chest?: string
            length?: string
            shoulders?: string
            sleeves?: string
            waist?: string
            hips?: string
            [key: string]: string | undefined
          } | null
          status?: 'active' | 'sold'
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          designer?: string
          era?: string
          description?: string | null
          condition?: string
          price?: number
          images?: string[]
          measurements?: {
            chest?: string
            length?: string
            shoulders?: string
            sleeves?: string
            waist?: string
            hips?: string
            [key: string]: string | undefined
          } | null
          status?: 'active' | 'sold'
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_email: string
          shipping_address: {
            name: string
            address1: string
            address2?: string
            city: string
            state: string
            postal_code: string
            country: string
            phone?: string
          }
          total: number
          stripe_payment_id: string | null
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_email: string
          shipping_address: {
            name: string
            address1: string
            address2?: string
            city: string
            state: string
            postal_code: string
            country: string
            phone?: string
          }
          total: number
          stripe_payment_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_email?: string
          shipping_address?: {
            name: string
            address1: string
            address2?: string
            city: string
            state: string
            postal_code: string
            country: string
            phone?: string
          }
          total?: number
          stripe_payment_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          price?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience types for working with the database
export type Product = Database['public']['Tables']['products']['Row']
export type NewProduct = Database['public']['Tables']['products']['Insert']
export type UpdateProduct = Database['public']['Tables']['products']['Update']

export type Order = Database['public']['Tables']['orders']['Row']
export type NewOrder = Database['public']['Tables']['orders']['Insert']
export type UpdateOrder = Database['public']['Tables']['orders']['Update']

export type OrderItem = Database['public']['Tables']['order_items']['Row']
export type NewOrderItem = Database['public']['Tables']['order_items']['Insert']
export type UpdateOrderItem = Database['public']['Tables']['order_items']['Update']

export interface Product {
  id: string;
  created_at?: string;
  updated_at?: string;
  title: string;
  description?: string;
  designer: string;
  era: string;
  condition: string;
  price: number;
  sale_price?: number | null;
  status: 'active' | 'sold' | 'reserved' | 'hidden';
  slug: string;
  images: string[];
  category_id?: string;
  size?: string;
  measurements?: Record<string, string>;
  materials?: string[];
  colors?: string[];
  featured?: boolean;
  keywords?: string[];
  metadata?: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string | null;
}