import { createClient } from '@supabase/supabase-js';
import { 
  Product, 
  Order, 
  OrderItem, 
  ProductInsert, 
  OrderInsert, 
  OrderItemInsert,
  OrderStatus
} from '../types/database';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product related functions
export const productService = {
  // Get all active products
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },
  
  // Get a single product by slug
  async getProductBySlug(slug: string): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Product;
  },
  
  // Get products by designer
  async getProductsByDesigner(designer: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .eq('designer', designer)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  },
  
  // Create a new product
  async createProduct(product: ProductInsert): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },
  
  // Update a product
  async updateProduct(id: string, updates: Partial<ProductInsert>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  }
};

// Order related functions
export const orderService = {
  // Create a new order
  async createOrder(orderData: OrderInsert): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data as Order;
  },
  
  // Get order by ID
  async getOrderById(id: string): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Order;
  },
  
  // Update order status
  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Order;
  },
  
  // Get orders for a customer
  async getOrdersByCustomerEmail(email: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Order[];
  }
};

// Order items related functions
export const orderItemService = {
  // Add items to an order
  async addOrderItems(items: OrderItemInsert[]): Promise<OrderItem[]> {
    const { data, error } = await supabase
      .from('order_items')
      .insert(items)
      .select();
    
    if (error) throw error;
    return data as OrderItem[];
  },
};

// Full checkout process
export const checkoutService = {
  async processOrder(orderData: OrderInsert, orderItems: OrderItemInsert[]): Promise<Order> {
    // Start a Supabase transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Prepare order items with the newly created order ID
    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));
    
    // Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);
    
    if (itemsError) throw itemsError;
    
    // Update product statuses to 'sold'
    const productIds = orderItems.map(item => item.product_id);
    const { error: updateError } = await supabase
      .from('products')
      .update({ status: 'sold' })
      .in('id', productIds);
    
    if (updateError) throw updateError;
    
    return order as Order;
  }
};