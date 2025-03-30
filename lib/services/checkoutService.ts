import { fetchApi } from '@/lib/utils/apiHelpers';
import { Product } from '@/lib/types/supabase';
import { z } from 'zod';

// Validation schemas
export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export type ShippingMethod = 'standard' | 'express' | 'overnight' | 'free';

export interface CheckoutData {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  billingAddressSame: boolean;
  billingAddress?: Address;
  shippingMethod: ShippingMethod;
}

export interface CheckoutResponse {
  url: string;
}

// Shipping rate constants
const SHIPPING_RATES = {
  standard: 10.00,
  express: 25.00,
  overnight: 50.00,
  free: 0,
};

// Tax rate (example: 8.25%)
const TAX_RATE = 0.0825;

const checkoutService = {
  /**
   * Calculate shipping cost based on method
   */
  calculateShipping(method: ShippingMethod): number {
    return SHIPPING_RATES[method] || 0;
  },

  /**
   * Calculate tax for an order
   */
  calculateTax(subtotal: number): number {
    return subtotal * TAX_RATE;
  },

  /**
   * Calculate full order summary
   */
  calculateOrderSummary(
    items: CartItem[],
    shippingMethod: ShippingMethod
  ): OrderSummary {
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const shipping = this.calculateShipping(shippingMethod);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  },

  /**
   * Validate checkout data
   */
  validateCheckoutData(data: CheckoutData): { valid: boolean; errors?: Record<string, string[]> } {
    try {
      // Validate items
      if (!data.items.length) {
        return {
          valid: false,
          errors: { items: ['Cart cannot be empty'] },
        };
      }

      // Validate shipping address
      const shippingAddressResult = addressSchema.safeParse(data.shippingAddress);
      if (!shippingAddressResult.success) {
        return {
          valid: false,
          errors: shippingAddressResult.error.format(),
        };
      }

      // Validate billing address if different
      if (!data.billingAddressSame && data.billingAddress) {
        const billingAddressResult = addressSchema.safeParse(data.billingAddress);
        if (!billingAddressResult.success) {
          return {
            valid: false,
            errors: billingAddressResult.error.format(),
          };
        }
      }

      // Validate shipping method
      if (!['standard', 'express', 'overnight', 'free'].includes(data.shippingMethod)) {
        return {
          valid: false,
          errors: { shippingMethod: ['Invalid shipping method'] },
        };
      }

      return { valid: true };
    } catch (error) {
      console.error('Validation error:', error);
      return {
        valid: false,
        errors: { _errors: ['Validation failed'] },
      };
    }
  },

  /**
   * Process checkout with Stripe
   */
  async createCheckoutSession(checkoutData: CheckoutData): Promise<CheckoutResponse> {
    // Validate checkout data
    const validation = this.validateCheckoutData(checkoutData);
    if (!validation.valid) {
      throw new Error(
        `Invalid checkout data: ${JSON.stringify(validation.errors)}`
      );
    }

    try {
      // Send to API endpoint
      const response = await fetchApi<CheckoutResponse>('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      return response;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  },

  /**
   * Get order status by ID
   */
  async getOrderStatus(orderId: string): Promise<{ status: string }> {
    return await fetchApi<{ status: string }>(`/api/orders/${orderId}/status`);
  },

  /**
   * Get order details by ID
   */
  async getOrderDetails(orderId: string): Promise<any> {
    return await fetchApi<any>(`/api/orders/${orderId}`);
  },

  /**
   * Get order by Stripe session ID
   */
  async getOrderBySessionId(sessionId: string): Promise<any> {
    return await fetchApi<any>(`/api/orders/session/${sessionId}`);
  },
};

export default checkoutService;