'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/types/supabase';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Calculate derived values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  // Add an item to the cart
  const addItem = (product: Product) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};