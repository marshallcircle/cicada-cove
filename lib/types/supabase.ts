export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          slug: string;
          description: string;
          price: number;
          images: string[];
          designer: string;
          era: string;
          condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
          materials: string[];
          measurements: {
            chest?: number;
            waist?: number;
            length?: number;
            shoulders?: number;
            sleeves?: number;
          };
          status: 'in_stock' | 'sold_out' | 'reserved';
          featured: boolean;
          updated_at: string;
          category: string;
          tags: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          slug: string;
          description: string;
          price: number;
          images: string[];
          designer: string;
          era: string;
          condition: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
          materials: string[];
          measurements?: {
            chest?: number;
            waist?: number;
            length?: number;
            shoulders?: number;
            sleeves?: number;
          };
          status?: 'in_stock' | 'sold_out' | 'reserved';
          featured?: boolean;
          updated_at?: string;
          category?: string;
          tags?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          slug?: string;
          description?: string;
          price?: number;
          images?: string[];
          designer?: string;
          era?: string;
          condition?: 'Excellent' | 'Very Good' | 'Good' | 'Fair';
          materials?: string[];
          measurements?: {
            chest?: number;
            waist?: number;
            length?: number;
            shoulders?: number;
            sleeves?: number;
          };
          status?: 'in_stock' | 'sold_out' | 'reserved';
          featured?: boolean;
          updated_at?: string;
          category?: string;
          tags?: string[];
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          total: number;
          shipping_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          billing_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          shipping_method: 'standard' | 'expedited' | 'overnight';
          shipping_cost: number;
          stripe_payment_intent_id?: string;
          notes?: string;
          updated_at: string;
          items: {
            product_id: string;
            title: string;
            price: number;
            quantity: number;
          }[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          total: number;
          shipping_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          billing_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          shipping_method: 'standard' | 'expedited' | 'overnight';
          shipping_cost: number;
          stripe_payment_intent_id?: string;
          notes?: string;
          updated_at?: string;
          items: {
            product_id: string;
            title: string;
            price: number;
            quantity: number;
          }[];
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          status?: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          total?: number;
          shipping_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          billing_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          };
          shipping_method?: 'standard' | 'expedited' | 'overnight';
          shipping_cost?: number;
          stripe_payment_intent_id?: string;
          notes?: string;
          updated_at?: string;
          items?: {
            product_id: string;
            title: string;
            price: number;
            quantity: number;
          }[];
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          updated_at: string;
          email_preferences: {
            marketing: boolean;
            orders: boolean;
            newsletter: boolean;
          };
          default_shipping_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
          default_billing_address: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          updated_at?: string;
          email_preferences?: {
            marketing: boolean;
            orders: boolean;
            newsletter: boolean;
          };
          default_shipping_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
          default_billing_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string | null;
          last_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          updated_at?: string;
          email_preferences?: {
            marketing: boolean;
            orders: boolean;
            newsletter: boolean;
          };
          default_shipping_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
          default_billing_address?: {
            first_name: string;
            last_name: string;
            address1: string;
            address2?: string;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone?: string;
          } | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Type aliases for commonly used types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Simplified types for frontend use
export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
};

export type Address = {
  first_name: string;
  last_name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
};