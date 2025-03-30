import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Cicada Cove',
  description: 'Our shipping policy, including delivery times, methods, and international shipping information.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shipping Policy</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 30, 2025
          </p>
        </div>

        <div className="prose prose-lg prose-black max-w-none">
          <h2>Domestic Shipping (United States)</h2>
          <p>
            We offer the following shipping options for all orders within the United States:
          </p>
          
          <ul>
            <li>
              <strong>Standard Shipping:</strong> 3-5 business days, $15 (Free on orders over $500)
            </li>
            <li>
              <strong>Expedited Shipping:</strong> 2-3 business days, $25
            </li>
            <li>
              <strong>Overnight Shipping:</strong> Next business day (order by 12 PM EST), $45
            </li>
          </ul>

          <p>
            All orders are processed and shipped from our warehouse in San Francisco, CA. Orders placed 
            before 12 PM EST on business days are typically processed the same day. Orders placed after 
            12 PM EST or on weekends and holidays will be processed the next business day.
          </p>

          <h2>International Shipping</h2>
          <p>
            We ship to select countries worldwide. International shipping rates are calculated at checkout 
            based on destination and package weight. Please note that international orders may be subject 
            to import duties and taxes, which are the responsibility of the recipient.
          </p>

          <p>
            Estimated delivery times for international orders:
          </p>

          <ul>
            <li>
              <strong>Canada:</strong> 5-10 business days
            </li>
            <li>
              <strong>Europe:</strong> 7-14 business days
            </li>
            <li>
              <strong>Asia:</strong> 10-20 business days
            </li>
            <li>
              <strong>Australia/New Zealand:</strong> 10-20 business days
            </li>
          </ul>

          <h2>Tracking Your Order</h2>
          <p>
            Once your order has been shipped, you will receive a shipping confirmation email with tracking 
            information. You can also view the status of your order and tracking information by logging 
            into your Cicada Cove account.
          </p>

          <h2>Insurance</h2>
          <p>
            All orders are insured against loss or damage during transit. For domestic orders, insurance 
            is included at no additional cost. For international orders over $1,000, we require signature 
            confirmation upon delivery for your protection.
          </p>

          <h2>Shipping Restrictions</h2>
          <p>
            Due to shipping regulations and high customs fees, we currently do not ship to the following countries:
          </p>

          <ul>
            <li>Russia</li>
            <li>Ukraine</li>
            <li>North Korea</li>
            <li>Iran</li>
            <li>Cuba</li>
            <li>Syria</li>
            <li>Sudan</li>
          </ul>

          <h2>Delays and Lost Packages</h2>
          <p>
            While we make every effort to ensure timely delivery, shipping delays can occur due to weather, 
            customs processing, or other circumstances beyond our control. If your package appears to be 
            delayed or lost, please contact our customer service team at <a href="mailto:support@cicadacove.com">support@cicadacove.com</a>.
          </p>

          <h2>Address Changes</h2>
          <p>
            If you need to change your shipping address after placing an order, please contact us as soon as 
            possible at <a href="mailto:support@cicadacove.com">support@cicadacove.com</a>. We can only change 
            the shipping address if the order has not yet been processed. Once an order has been shipped, we 
            cannot redirect it to a different address.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our shipping policy, please contact our customer service team:
          </p>

          <ul>
            <li>Email: <a href="mailto:support@cicadacove.com">support@cicadacove.com</a></li>
            <li>Phone: +1 (415) 555-0123</li>
          </ul>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
            <p>
              For more information about orders and payments, please see our{' '}
              <Link href="/policies/terms" className="text-black underline">
                Terms of Service
              </Link>
              .
            </p>
            <p>
              For information about returns and exchanges, please see our{' '}
              <Link href="/policies/returns" className="text-black underline">
                Returns Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}