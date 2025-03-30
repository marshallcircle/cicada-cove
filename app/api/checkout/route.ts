import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';
import Stripe from 'stripe';
import { z } from 'zod';

// Initialize services
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Validation schema for checkout data
const checkoutItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const addressSchema = z.object({
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

const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, 'Cart cannot be empty'),
  shippingAddress: addressSchema,
  billingAddressSame: z.boolean(),
  billingAddress: addressSchema.optional(),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const result = checkoutSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      );
    }

    const { items, shippingAddress, billingAddressSame, billingAddress, shippingMethod } = result.data;

    // Fetch product details from database to get accurate prices and availability
    const productIds = items.map((item) => item.productId);
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)
      .eq('active', true);

    if (productError || !products) {
      console.error('Error fetching products:', productError);
      return NextResponse.json(
        { error: 'Failed to retrieve product information' },
        { status: 500 }
      );
    }

    // Verify all products exist and are available
    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products are no longer available' },
        { status: 400 }
      );
    }

    // Calculate order total
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: product.images ? [product.images[0]] : [],
            metadata: {
              productId: product.id,
            },
          },
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      };
    });

    // Calculate shipping cost based on method
    const shippingCost = calculateShippingCost(shippingMethod);
    
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping (${shippingMethod})`,
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
      customer_email: shippingAddress.email,
      shipping_address_collection: {
        allowed_countries: ['US'], // Restrict to US for now
      },
      metadata: {
        orderId: generateOrderId(),
        shippingMethod,
      },
    });

    // Return the checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Unhandled error in checkout API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to calculate shipping cost based on method
function calculateShippingCost(method: string): number {
  switch (method) {
    case 'standard':
      return 1000; // $10.00
    case 'express':
      return 2500; // $25.00
    case 'overnight':
      return 5000; // $50.00
    case 'free':
    default:
      return 0;
  }
}

// Helper function to generate a unique order ID
function generateOrderId(): string {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  return `CC-${timestamp}-${random}`;
}