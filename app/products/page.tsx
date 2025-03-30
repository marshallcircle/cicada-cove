import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllProducts } from '@/lib/services/productService';
import { ProductGrid } from '@/components/products/ProductGrid';

export const metadata: Metadata = {
  title: 'Products | Cicada Cove',
  description: 'Browse our curated collection of designer archive pieces.',
};

export default async function ProductsPage() {
  const products = await getAllProducts({ status: 'available' });
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Archive Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of unique designer pieces from the archives.
          Each item has been carefully selected for its quality, design, and historical significance.
        </p>
      </header>
      
      <main>
        <ProductGrid products={products} />
      </main>
    </div>
  );
}