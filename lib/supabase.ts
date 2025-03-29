import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These will be replaced with actual values from your Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Authentication helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Products helpers
export const getProducts = async (filters?: {
  designer?: string;
  status?: 'active' | 'sold';
  minPrice?: number;
  maxPrice?: number;
}) => {
  let query = supabase.from('products').select('*');
  
  if (filters?.designer) {
    query = query.eq('designer', filters.designer);
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
};

// Orders helpers
export const createOrder = async (
  customerEmail: string,
  shippingAddress: any,
  total: number,
  stripePaymentId?: string
) => {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_email: customerEmail,
      shipping_address: shippingAddress,
      total,
      stripe_payment_id: stripePaymentId,
      status: 'pending',
    })
    .select()
    .single();
  
  return { data, error };
};

export const getOrdersByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))')
    .eq('customer_email', email);
  
  return { data, error };
};

// Order items helpers
export const addOrderItem = async (
  orderId: string,
  productId: string,
  price: number
) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert({
      order_id: orderId,
      product_id: productId,
      price,
    })
    .select()
    .single();
  
  return { data, error };
};