'use client';

import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/contexts/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({ className }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();
  
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  
  return (
    <>
      <button
        type="button"
        className={cn(
          "relative p-2 text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
          className
        )}
        onClick={openCart}
        aria-label="Open shopping cart"
      >
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
            {itemCount}
          </span>
        )}
      </button>
      
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};