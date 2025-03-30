import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns Policy | Cicada Cove',
  description: 'Learn about our returns and exchanges policy, including eligibility, timeframes, and process.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Returns & Exchanges Policy</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 30, 2025
          </p>
        </div>

        <div className="prose prose-lg prose-black max-w-none">
          <h2>Return Eligibility</h2>
          <p>
            At Cicada Cove, we want you to be completely satisfied with your purchase. However, due to the unique and 
            often one-of-a-kind nature of our archive pieces, we have a specific returns policy:
          </p>
          
          <ul>
            <li>
              Returns are accepted within 14 days of delivery for unworn, undamaged items with all original tags still attached.
            </li>
            <li>
              Items marked as "Final Sale" cannot be returned or exchanged.
            </li>
            <li>
              Items must be returned in their original packaging, including any dust bags, boxes, or garment covers provided.
            </li>
            <li>
              Evidence of wear, alteration, or damage will result in the item being returned to you without a refund.
            </li>
          </ul>

          <h2>Exchange Process</h2>
          <p>
            Due to the unique nature of our inventory, direct exchanges are rarely possible. Instead, we recommend:
          </p>

          <ol>
            <li>
              Return your original item following our returns process.
            </li>
            <li>
              Place a new order for the desired item to secure it, as we cannot hold items.
            </li>
          </ol>

          <p>
            If you're interested in exchanging for a different item, please contact our customer service team at 
            <a href="mailto:returns@cicadacove.com"> returns@cicadacove.com</a> for assistance.
          </p>

          <h2>Returns Process</h2>
          <p>
            To initiate a return:
          </p>

          <ol>
            <li>
              <strong>Contact Us:</strong> Email <a href="mailto:returns@cicadacove.com">returns@cicadacove.com</a> within 
              14 days of receiving your order. Include your order number and reason for return.
            </li>
            <li>
              <strong>Return Authorization:</strong> We will review your request and, if approved, provide a Return 
              Authorization Number (RA#) and return instructions.
            </li>
            <li>
              <strong>Package Your Return:</strong> Carefully pack the item in its original packaging with all tags 
              attached. Include the RA# on your return label.
            </li>
            <li>
              <strong>Ship Your Return:</strong> Send your return using a tracked and insured shipping method to the 
              address provided in your return instructions.
            </li>
            <li>
              <strong>Refund Processing:</strong> Once we receive and inspect your return, we will process your refund 
              within 5-7 business days.
            </li>
          </ol>

          <h2>Return Shipping Costs</h2>
          <p>
            Return shipping costs are the responsibility of the customer, except in cases of incorrect items or damaged goods. 
            Original shipping charges are non-refundable.
          </p>

          <h2>Refunds</h2>
          <p>
            Refunds will be issued to the original payment method used for the purchase. Please allow:
          </p>

          <ul>
            <li>
              <strong>Credit Card Refunds:</strong> 5-10 business days to appear on your statement after processing
            </li>
            <li>
              <strong>PayPal Refunds:</strong> 3-5 business days
            </li>
            <li>
              <strong>Store Credit:</strong> Issued immediately upon approval and valid for 1 year
            </li>
          </ul>

          <h2>Damaged or Defective Items</h2>
          <p>
            If you receive an item that is damaged or significantly different from the description, please contact us 
            within 48 hours of delivery with photos of the damage or issue. We will arrange for a return shipping label 
            and process a full refund including original shipping costs, or offer a replacement if available.
          </p>

          <h2>Authentication Guarantee</h2>
          <p>
            All items sold by Cicada Cove are guaranteed authentic. If you have concerns about the authenticity of 
            your item, please contact us immediately. We will review the item and, if found to be non-authentic, will 
            provide a full refund including shipping costs.
          </p>

          <h2>International Returns</h2>
          <p>
            International customers are eligible for returns under the same policy. However, please note:
          </p>

          <ul>
            <li>
              International return shipping costs are the responsibility of the customer.
            </li>
            <li>
              Any customs duties, taxes, or import fees paid on the original shipment are non-refundable.
            </li>
            <li>
              We recommend using a trackable, insured shipping method for returns.
            </li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our returns policy, please contact our customer service team:
          </p>

          <ul>
            <li>Email: <a href="mailto:returns@cicadacove.com">returns@cicadacove.com</a></li>
            <li>Phone: +1 (415) 555-0123</li>
          </ul>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
            <p>
              For information about shipping and delivery, please see our{' '}
              <Link href="/policies/shipping" className="text-black underline">
                Shipping Policy
              </Link>
              .
            </p>
            <p>
              For our full terms and conditions, please see our{' '}
              <Link href="/policies/terms" className="text-black underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}