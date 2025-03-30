'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types/supabase';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  priority = false,
}) => {
  const {
    title,
    slug,
    designer,
    price,
    images,
    status,
    condition,
  } = product;

  const imageUrl = images && images.length > 0 
    ? images[0] 
    : '/images/product-placeholder.jpg';
  
  const isSoldOut = status === 'sold';

  return (
    <Link
      href={`/products/${slug}`}
      className={cn(
        "group flex flex-col h-full transition-transform hover:-translate-y-1",
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Condition tag */}
        <div className="absolute left-3 top-3 z-10">
          <span className="rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 shadow-sm">
            {condition}
          </span>
        </div>
        
        {/* Sold out overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="transform rotate-6 bg-black/80 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-white">
              Sold
            </span>
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:underline">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{designer}</p>
        <div className="mt-auto">
          <p className="text-base font-semibold text-gray-900">
            {formatCurrency(price)}
            {isSoldOut && (
              <span className="ml-2 text-xs text-red-600 font-medium">Sold Out</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};