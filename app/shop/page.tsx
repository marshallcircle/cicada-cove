import React from 'react';
import { Metadata } from 'next';
import { getAllProducts } from '@/lib/services/productService';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ShopFilters } from '@/components/shop/ShopFilters';

export const metadata: Metadata = {
  title: 'Shop | Cicada Cove',
  description: 'Shop our curated collection of designer archive pieces.',
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parse filter params
  const designer = typeof searchParams.designer === 'string' ? searchParams.designer : undefined;
  const era = typeof searchParams.era === 'string' ? searchParams.era : undefined;
  const condition = typeof searchParams.condition === 'string' ? searchParams.condition : undefined;
  const priceRange = typeof searchParams.price === 'string' 
    ? searchParams.price.split('-').map(Number) 
    : undefined;
  const sortBy = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  
  // Fetch products with filters
  const products = await getAllProducts({
    status: 'available',
    designer,
    era,
    condition,
    priceMin: priceRange?.[0],
    priceMax: priceRange?.[1],
    sortBy,
  });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Archive</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Filter and browse our collection of unique designer pieces. Each item has been carefully authenticated and curated.
        </p>
      </header>
      
      <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Filters sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <ShopFilters 
            currentFilters={{
              designer,
              era,
              condition,
              priceRange,
              sortBy,
            }}
          />
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 lg:hidden">
            <div className="text-sm text-gray-500">
              Showing {products.length} products
            </div>
            <button
              type="button"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Filter & Sort
              <span className="sr-only"> products</span>
            </button>
          </div>
          
          {/* Product grid */}
          {products.length > 0 ? (
            <div className="mt-6 lg:mt-0">
              <ProductGrid 
                products={products} 
                className="grid-cols-2 lg:grid-cols-3"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or browse our entire collection.
              </p>
              <a href="/shop" className="text-black underline font-medium">
                Clear all filters
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}