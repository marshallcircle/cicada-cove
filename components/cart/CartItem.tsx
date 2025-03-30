'use client';

import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/contexts/CartContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types/supabase';

interface CartItemProps {
  product: Product;
  quantity: number;
  isCheckout?: boolean;
  className?: string;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  isCheckout = false,
  className,
}) => {
  const { updateQuantity, removeItem } = useCart();
  const { id, title, slug, designer, price, images } = product;
  
  const imageUrl = images && images.length > 0 
    ? images[0] 
    : '/images/product-placeholder.jpg';
  
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };
  
  const handleRemove = () => {
    removeItem(id);
  };
  
  return (
    <div className={cn(
      "flex py-6 border-b border-gray-200",
      isCheckout ? "pr-0" : "",
      className
    )}>
      {/* Product image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <Link href={`/products/${slug}`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="96px"
          />
        </Link>
      </div>

      {/* Product info */}
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link href={`/products/${slug}`} className="hover:underline">
              <h3>{title}</h3>
            </Link>
            <p className="ml-4">{formatCurrency(price * quantity)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{designer}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity controls */}
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className={cn(
                "p-1 rounded-l-md",
                quantity <= 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
              )}
              aria-label="Decrease quantity"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            
            <span className="px-2 py-1 text-gray-900 text-sm min-w-[40px] text-center">
              {quantity}
            </span>
            
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
              aria-label="Increase quantity"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Remove button */}
          {!isCheckout && (
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-black hover:text-gray-600"
            >
              <span className="sr-only">Remove</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};