import { productService } from '@/lib/supabase';
import ProductsGrid from '@/components/ProductsGrid';

export const metadata = {
  title: 'Shop | Cicada Cove Vintage',
  description: 'Browse our curated collection of vintage clothing and accessories.',
};

export const revalidate = 3600; // Revalidate this page every hour

export default async function ProductsPage() {
  // Fetch all active products
  const products = await productService.getAllProducts();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Shop All</h1>
      <p className="text-gray-600 mb-8">Discover our curated collection of vintage pieces</p>
      
      <ProductsGrid 
        products={products} 
        showEmpty={true}
        emptyMessage="No products are currently available. Please check back soon!"
      />
    </div>
  );
}