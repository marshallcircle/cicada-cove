'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Product } from '@/lib/types/supabase';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

export function useCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useLocalStorage<CartState>('cicada-cove-cart', {
    items: [],
    subtotal: 0,
    itemCount: 0,
  });

  // Calculate cart totals
  const calculateTotals = useCallback((items: CartItem[]) => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    
    return {
      items,
      itemCount,
      subtotal,
    };
  }, []);

  // Add item to cart
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id
      );

      let updatedItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        updatedItems = [
          ...prevCart.items,
          { id: product.id, product, quantity },
        ];
      }

      return calculateTotals(updatedItems);
    });

    // Open cart drawer when adding items
    setIsOpen(true);
  }, [setCart, calculateTotals]);

  // Update item quantity
  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return calculateTotals(prevCart.items.filter(item => item.id !== id));
      }

      const updatedItems = prevCart.items.map(item => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });

      return calculateTotals(updatedItems);
    });
  }, [setCart, calculateTotals]);

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.id !== id);
      return calculateTotals(updatedItems);
    });
  }, [setCart, calculateTotals]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart(calculateTotals([]));
  }, [setCart, calculateTotals]);

  // Toggle cart visibility
  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Open cart
  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Close cart
  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    cart,
    isOpen,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
}