import { Product } from '@/lib/types/supabase';

// Mock data for development
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    slug: 'vintage-leather-jacket',
    description: 'A beautiful vintage leather jacket from the 1970s. This piece features classic styling with a modern fit.',
    price: 1200,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
      'https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    ],
    designer: 'Yves Saint Laurent',
    era: '1970s',
    condition: 'Excellent',
    materials: '100% Leather, Satin Lining',
    measurements: 'Chest: 40", Length: 25", Sleeve: 24"',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Archive Wool Coat',
    slug: 'archive-wool-coat',
    description: 'A luxurious wool coat from Comme des Garçons archive collection. Features oversized pockets and unique silhouette.',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    ],
    designer: 'Comme des Garçons',
    era: '1990s',
    condition: 'Good',
    materials: '80% Wool, 20% Cashmere',
    measurements: 'Chest: 44", Length: 42", Sleeve: 25"',
    status: 'sold',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Vintage Denim Jacket',
    slug: 'vintage-denim-jacket',
    description: 'A rare vintage denim jacket from Helmut Lang\'s 1998 collection. Raw hem detailing and contrast stitching.',
    price: 950,
    images: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    ],
    designer: 'Helmut Lang',
    era: '1998',
    condition: 'Very Good',
    materials: '100% Cotton Denim',
    measurements: 'Chest: 38", Length: 23", Sleeve: 22"',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Archive Print Silk Shirt',
    slug: 'archive-print-silk-shirt',
    description: 'A stunning silk shirt featuring an archive print from Versace\'s 1992 collection. Bold pattern with gold accents.',
    price: 780,
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    ],
    designer: 'Versace',
    era: '1992',
    condition: 'Excellent',
    materials: '100% Silk',
    measurements: 'Chest: 42", Length: 28", Sleeve: 25"',
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

/**
 * Get a product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // In a real app, this would query Supabase
  const product = mockProducts.find(p => p.slug === slug);
  return product || null;
}

/**
 * Get all product slugs for static path generation
 */
export async function getAllProductSlugs(): Promise<string[]> {
  // In a real app, this would query Supabase
  return mockProducts.map(p => p.slug);
}

/**
 * Get related products based on designer or era
 */
export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  // In a real app, this would query Supabase based on designer, category, etc.
  return mockProducts
    .filter(p => p.id !== product.id && (p.designer === product.designer || p.era === product.era))
    .slice(0, limit);
}

/**
 * Get all products with optional filtering
 */
export async function getAllProducts(options?: {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  status?: 'available' | 'sold' | 'reserved';
}): Promise<Product[]> {
  // In a real app, this would query Supabase with filters
  let filtered = [...mockProducts];
  
  if (options?.status) {
    filtered = filtered.filter(p => p.status === options.status);
  }
  
  return filtered.slice(0, options?.limit || filtered.length);
}