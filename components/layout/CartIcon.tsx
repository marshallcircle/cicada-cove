'use client';

import Link from 'next/link';
import { useCart } from '@/lib/contexts/CartContext';
import { cn } from '@/lib/utils';

// Shopping bag icon SVG
const ShoppingBagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

interface CartIconProps {
  className?: string;
}

export const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const { itemCount } = useCart();
  
  return (
    <Link href="/cart" className={cn("relative p-2", className)}>
      <ShoppingBagIcon />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-medium text-white">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};