import { fetchApi } from '@/lib/utils/apiHelpers';
import { Product } from '@/lib/types/supabase';

export interface ProductFilters {
  designer?: string;
  era?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  sort?: 'price' | 'created_at' | 'name' | 'designer';
  order?: 'asc' | 'desc';
}

export interface PaginatedProducts {
  products: Product[];
  pagination: {
    total: number;
    offset: number;
    limit: number;
  };
}

export interface SingleProductResponse {
  product: Product;
  relatedProducts: Product[];
}

const productService = {
  /**
   * Get all products with optional filtering
   */
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedProducts> {
    // Build query params from filters
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return await fetchApi<PaginatedProducts>(`/api/products${queryString}`);
  },

  /**
   * Get featured products for homepage
   */
  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    const response = await this.getProducts({
      featured: true,
      limit,
    });
    return response.products;
  },

  /**
   * Get a single product by slug
   */
  async getProductBySlug(slug: string): Promise<SingleProductResponse> {
    return await fetchApi<SingleProductResponse>(`/api/products/${slug}`);
  },

  /**
   * Get products by designer
   */
  async getProductsByDesigner(designer: string, limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({
      designer,
      limit,
    });
    return response.products;
  },

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({
      category,
      limit,
    });
    return response.products;
  },

  /**
   * Get products by era
   */
  async getProductsByEra(era: string, limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({
      era,
      limit,
    });
    return response.products;
  },

  /**
   * Get products with price range
   */
  async getProductsByPriceRange(minPrice: number, maxPrice: number, limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({
      minPrice,
      maxPrice,
      limit,
    });
    return response.products;
  },

  /**
   * Get latest products
   */
  async getLatestProducts(limit: number = 8): Promise<Product[]> {
    const response = await this.getProducts({
      sort: 'created_at',
      order: 'desc',
      limit,
    });
    return response.products;
  },

  /**
   * Search products by query
   */
  async searchProducts(query: string, limit: number = 8): Promise<Product[]> {
    // This is a simplified implementation - a real search would use more complex logic
    return await fetchApi<Product[]>(`/api/products/search?query=${encodeURIComponent(query)}&limit=${limit}`);
  },

  /**
   * Get all unique designers
   */
  async getDesigners(): Promise<string[]> {
    return await fetchApi<string[]>('/api/products/designers');
  },

  /**
   * Get all unique eras
   */
  async getEras(): Promise<string[]> {
    return await fetchApi<string[]>('/api/products/eras');
  },

  /**
   * Get all unique categories
   */
  async getCategories(): Promise<string[]> {
    return await fetchApi<string[]>('/api/products/categories');
  },

  /**
   * Get all unique conditions
   */
  async getConditions(): Promise<string[]> {
    return await fetchApi<string[]>('/api/products/conditions');
  },
};

export default productService;