import { Product } from '@/types/database';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
  title?: string;
  showEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
}

export default function ProductsGrid({ 
  products, 
  title, 
  showEmpty = true, 
  emptyMessage = 'No products found', 
  className = '' 
}: ProductsGridProps) {
  
  if (products.length === 0 && showEmpty) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-medium mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}