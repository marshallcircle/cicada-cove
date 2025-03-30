'use client';

import { Product } from '@/lib/types/supabase';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products,
  className
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10",
      className
    )}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={products.indexOf(product) < 4}
        />
      ))}
    </div>
  );
};