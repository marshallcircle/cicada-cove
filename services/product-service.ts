import { supabase } from '@/lib/supabase';
import { Product, NewProduct, UpdateProduct } from '@/types/supabase';

/**
 * Service for interacting with products in the database
 */
export const ProductService = {
  /**
   * Get all products with optional filtering
   */
  async getAllProducts(options: {
    status?: 'active' | 'sold',
    designer?: string,
    limit?: number,
    offset?: number
  } = {}): Promise<Product[]> {
    const {
      status = 'active',
      designer,
      limit = 100,
      offset = 0
    } = options;
    
    let query = supabase
      .from('products')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, offset + limit - 1);
    
    if (designer) {
      query = query.eq('designer', designer);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
    
    return data as Product[];
  },
  
  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error('Error fetching product by ID:', error);
      throw new Error('Failed to fetch product');
    }
    
    return data as Product;
  },
  
  /**
   * Get a single product by slug
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return null;
      }
      console.error('Error fetching product by slug:', error);
      throw new Error('Failed to fetch product');
    }
    
    return data as Product;
  },
  
  /**
   * Create a new product
   */
  async createProduct(product: NewProduct): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
    
    return data as Product;
  },
  
  /**
   * Update an existing product
   */
  async updateProduct(id: string, updates: UpdateProduct): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating product:', error);
      throw new Error(`Failed to update product: ${error.message}`);
    }
    
    return data as Product;
  },
  
  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },
  
  /**
   * Mark a product as sold
   */
  async markProductAsSold(id: string): Promise<Product> {
    return this.updateProduct(id, { status: 'sold' });
  },
  
  /**
   * Get unique designers from the products table
   */
  async getUniqueDesigners(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('designer')
      .eq('status', 'active');
    
    if (error) {
      console.error('Error fetching designers:', error);
      throw new Error('Failed to fetch designers');
    }
    
    // Extract unique designers
    const designers = [...new Set(data.map(item => item.designer))];
    return designers.sort();
  },
  
  /**
   * Get unique eras from the products table
   */
  async getUniqueEras(): Promise<string[]> {
    const { data, error } = await supabase
      .from('products')
      .select('era')
      .eq('status', 'active');
    
    if (error) {
      console.error('Error fetching eras:', error);
      throw new Error('Failed to fetch eras');
    }
    
    // Extract unique eras
    const eras = [...new Set(data.map(item => item.era))];
    return eras.sort();
  }
};