/**
 * Product interface for Supabase table
 */
export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  images: string[];
  designer: string;
  era?: string;
  condition: string;
  materials?: string;
  measurements?: string;
  status: 'available' | 'sold' | 'reserved';
  created_at: string;
  updated_at: string;
}