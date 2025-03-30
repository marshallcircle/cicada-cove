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
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'canceled' | 'failed'
      product_condition: 'new' | 'excellent' | 'good' | 'fair' | 'poor'
    }
  }
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price?: number | null
  compare_at_price?: number | null
  designer: string
  era: string
  condition: Database['public']['Enums']['product_condition']
  category: string
  images: string[]
  featured: boolean
  active: boolean
  available_quantity: number
  tags?: string[] | null
  dimensions?: Json | null
  materials?: string[] | null
  care_instructions?: string | null
  origin?: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string | null
  address?: {
    address1?: string
    address2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  } | null
  preferences?: {
    marketing_emails?: boolean
    order_updates?: boolean
  } | null
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id?: string | null
  customer_email: string
  amount_total: number
  line_items: Json[]
  status: Database['public']['Enums']['order_status']
  payment_intent?: string | null
  stripe_session_id?: string | null
  shipping_address?: Json | null
  shipping_method: string
  tracking_number?: string | null
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface OrderLineItem {
  id: string
  product_id: string
  quantity: number
  price: number
  name: string
  image?: string | null
}

export interface CartItem {
  id: string
  quantity: number
  product: Product
}