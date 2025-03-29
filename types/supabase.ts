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
          images: Json
          measurements: Json | null
          status: string
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
          images?: Json
          measurements?: Json | null
          status?: string
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
          images?: Json
          measurements?: Json | null
          status?: string
          slug?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          customer_email: string
          shipping_address: Json
          total: number
          stripe_payment_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_email: string
          shipping_address: Json
          total: number
          stripe_payment_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_email?: string
          shipping_address?: Json
          total?: number
          stripe_payment_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
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