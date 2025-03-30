import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';
import Stripe from 'stripe';

// Initialize Stripe and Supabase
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

// Disable Next.js body parsing for webhooks to access raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Get raw body from request
    const text = await request.text();
    const signature = request.headers.get('stripe-signature') as string;

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        text,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${errorMessage}` },
        { status: 400 }
      );
    }

    // Handle the event based on its type
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Unhandled error in Stripe webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handler for checkout.session.completed event
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    // Skip if no metadata (which contains our order ID)
    if (!session.metadata?.orderId) {
      console.warn('No order ID in session metadata');
      return;
    }

    console.log(`Processing completed checkout for order ${session.metadata.orderId}`);

    // Get line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Create order record in Supabase
    const { error } = await supabase.from('orders').insert({
      id: session.metadata.orderId,
      customer_email: session.customer_details?.email || '',
      amount_total: session.amount_total || 0,
      shipping_method: session.metadata.shippingMethod || 'standard',
      shipping_address: session.shipping_details?.address || {},
      status: 'paid',
      payment_intent: session.payment_intent as string,
      stripe_session_id: session.id,
      line_items: lineItems.data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error creating order record:', error);
      throw error;
    }

    // If the customer has a user account, associate the order with their account
    if (session.customer_details?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', session.customer_details.email.toLowerCase())
        .maybeSingle();

      if (profile?.id) {
        await supabase
          .from('orders')
          .update({ user_id: profile.id })
          .eq('id', session.metadata.orderId);
      }
    }

    console.log(`Successfully processed order ${session.metadata.orderId}`);
  } catch (error) {
    console.error('Error processing checkout.session.completed event:', error);
    throw error;
  }
}

// Handler for payment_intent.succeeded event
async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment succeeded for payment intent ${paymentIntent.id}`);

    // Update order status if we have one associated with this payment intent
    const { data: order, error } = await supabase
      .from('orders')
      .select('id')
      .eq('payment_intent', paymentIntent.id)
      .single();

    if (error) {
      // This may not be an error - the order might have been created via checkout.session.completed
      console.log(`No order found for payment intent ${paymentIntent.id}`);
      return;
    }

    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'paid',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    console.log(`Updated order ${order.id} status to paid`);
  } catch (error) {
    console.error('Error processing payment_intent.succeeded event:', error);
    throw error;
  }
}

// Handler for payment_intent.payment_failed event
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log(`Payment failed for payment intent ${paymentIntent.id}`);

    // Update order status if we have one associated with this payment intent
    const { data: order, error } = await supabase
      .from('orders')
      .select('id')
      .eq('payment_intent', paymentIntent.id)
      .single();

    if (error) {
      console.log(`No order found for payment intent ${paymentIntent.id}`);
      return;
    }

    // Update order status
    await supabase
      .from('orders')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    console.log(`Updated order ${order.id} status to failed`);
  } catch (error) {
    console.error('Error processing payment_intent.payment_failed event:', error);
    throw error;
  }
}