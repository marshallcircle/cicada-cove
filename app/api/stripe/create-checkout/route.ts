import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServiceClient } from '@/lib/supabase/client';
import Stripe from 'stripe';
import { CartItem } from '@/lib/types/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

/**
 * POST /api/stripe/create-checkout
 * Creates a Stripe checkout session for the cart items
 */
export async function POST(request: NextRequest) {
  try {
    const {
      cartItems,
      shippingAddress,
      billingAddress,
      shippingMethod,
      shippingCost,
    } = await request.json();

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client to get user information
    const cookieStore = cookies();
    const supabase = await getServiceClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    // Create line items for Stripe checkout
    const lineItems = cartItems.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image],
          metadata: {
            product_id: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping (${shippingMethod})`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Calculate order total
    const orderTotal = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    ) + shippingCost;

    // Create a record in the orders table
    // Note: In a production app, you might want to use a pending status until the payment succeeds
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id || 'guest',
        status: 'pending',
        total: orderTotal,
        shipping_address: shippingAddress,
        billing_address: billingAddress || shippingAddress,
        shipping_method: shippingMethod,
        shipping_cost: shippingCost,
        items: cartItems.map((item: CartItem) => ({
          product_id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        updated_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError.message },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
      customer_email: user?.email,
      metadata: {
        order_id: order.id,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'IT', 'ES', 'JP', 'AU'],
      },
      billing_address_collection: 'auto',
    });

    // Update the order with the Stripe session ID
    await supabase
      .from('orders')
      .update({
        stripe_payment_intent_id: session.payment_intent as string,
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    // Return the checkout URL
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}