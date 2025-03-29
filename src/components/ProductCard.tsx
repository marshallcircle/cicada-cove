import { Product } from '@/types/database';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, designer, price, images, slug, status } = product;
  
  // If product is sold out, show a different style
  const isSold = status === 'sold';
  
  return (
    <Link href={`/product/${slug}`}>
      <div className={`group relative rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-shadow ${
        isSold ? 'opacity-75' : ''
      }`}>
        {/* Product Image */}
        <div className="aspect-w-4 aspect-h-5 w-full overflow-hidden bg-gray-100">
          {images && images.length > 0 ? (
            <div className="relative h-[320px]">
              <Image
                src={images[0]}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
          ) : (
            <div className="h-[320px] flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          {/* Sold Out Badge */}
          {isSold && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 text-xs uppercase tracking-wider rounded">
              Sold
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
          <p className="mt-1 text-xs text-gray-500">{designer}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-cicada-red">
              ${price.toFixed(2)}
            </p>
            <div className="text-xs text-gray-500 italic">View Details</div>
          </div>
        </div>
      </div>
    </Link>
  );
}