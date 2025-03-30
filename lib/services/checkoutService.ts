/**
 * Checkout Service
 * Handles checkout process and integration with Stripe
 */

import { CartItem, Address } from '@/lib/types/supabase';

export type ShippingMethod = 'standard' | 'expedited' | 'overnight';

export interface CheckoutData {
  cartItems: CartItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  shippingMethod: ShippingMethod;
  shippingCost: number;
}

/**
 * Calculate shipping cost based on shipping method
 * @param method Shipping method
 * @param subtotal Cart subtotal
 * @returns Shipping cost in USD
 */
export function calculateShippingCost(method: ShippingMethod, subtotal: number): number {
  // Free standard shipping for orders over $500
  if (method === 'standard' && subtotal >= 500) {
    return 0;
  }

  switch (method) {
    case 'standard':
      return 15;
    case 'expedited':
      return 25;
    case 'overnight':
      return 45;
    default:
      return 15;
  }
}

/**
 * Creates a Stripe checkout session for the current cart
 * @param checkoutData Checkout data
 * @returns A URL to redirect the user to Stripe checkout
 */
export async function createCheckoutSession(checkoutData: CheckoutData): Promise<string> {
  try {
    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create checkout session');
    }

    const { checkoutUrl } = await response.json();
    
    if (!checkoutUrl) {
      throw new Error('No checkout URL returned from the server');
    }

    return checkoutUrl;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Calculate order summary for display in the checkout UI
 * @param cartItems Cart items
 * @param shippingMethod Shipping method
 * @returns Object with subtotal, shipping, tax, and total
 */
export function calculateOrderSummary(cartItems: CartItem[], shippingMethod: ShippingMethod) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = calculateShippingCost(shippingMethod, subtotal);
  
  // Calculate estimated tax at 8% (this would be calculated more precisely with a tax API in production)
  const estimatedTax = Math.round(subtotal * 0.08 * 100) / 100;
  
  const total = subtotal + shipping + estimatedTax;

  return {
    subtotal,
    shipping,
    tax: estimatedTax,
    total,
  };
}

/**
 * Validate checkout form data
 * @param data Form data
 * @returns Object with validation result and error message
 */
export function validateCheckoutData(data: Partial<CheckoutData>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Validate cart items
  if (!data.cartItems || data.cartItems.length === 0) {
    errors.cartItems = 'Your cart is empty';
  }

  // Validate shipping address
  if (!data.shippingAddress) {
    errors.shippingAddress = 'Shipping address is required';
  } else {
    const requiredFields: (keyof Address)[] = [
      'first_name', 
      'last_name', 
      'address1', 
      'city', 
      'state', 
      'postal_code', 
      'country'
    ];
    
    for (const field of requiredFields) {
      if (!data.shippingAddress[field]) {
        errors[`shippingAddress.${field}`] = `${field.replace('_', ' ')} is required`;
      }
    }
  }

  // Validate shipping method
  if (!data.shippingMethod) {
    errors.shippingMethod = 'Please select a shipping method';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default {
  calculateShippingCost,
  createCheckoutSession,
  calculateOrderSummary,
  validateCheckoutData,
};