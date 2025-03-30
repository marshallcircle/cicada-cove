import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmation | Cicada Cove',
  description: 'Thank you for your order.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderConfirmationPage() {
  // Generate a random order number
  const orderNumber = `CC${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-10 w-10 text-green-500" aria-hidden="true" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Thank you for your order!</h1>
          </div>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order, we're currently processing it. So hang tight and we'll send you confirmation very soon!
          </p>
          <p className="mt-6 text-sm font-medium">
            Order number: <span className="font-bold text-black">{orderNumber}</span>
          </p>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <div className="mt-8 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="py-6">
                <h2 className="text-lg font-medium text-gray-900">Order details</h2>
                <p className="mt-1 text-sm text-gray-500">
                  A confirmation email has been sent to your email address.
                </p>
                
                <dl className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
                    <dd className="text-sm text-gray-900">
                      <span className="block">123 Example St</span>
                      <span className="block">San Francisco, CA 94103</span>
                      <span className="block">United States</span>
                    </dd>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">Shipping method</dt>
                    <dd className="text-sm text-gray-900">Standard Shipping (3-5 business days)</dd>
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                    <dd className="text-sm text-gray-900">
                      <span className="mr-3">Visa ending in 4242</span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        Approved
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="py-6">
                <h2 className="text-lg font-medium text-gray-900">What happens next?</h2>
                <div className="mt-6 space-y-6 text-sm text-gray-500">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-900">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Processing order</h3>
                      <p className="mt-1">
                        Our specialists will carefully prepare your item(s), checking quality and packaging them securely.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-900">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Shipping</h3>
                      <p className="mt-1">
                        You'll receive a shipping confirmation email with tracking information once your order is on its way.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-900">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Delivery</h3>
                      <p className="mt-1">
                        Your item(s) will be delivered via our trusted shipping partners. Please allow 3-5 business days for delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="py-6">
                <div className="flex justify-between text-sm font-medium">
                  <Link
                    href="/account/orders"
                    className="text-black hover:text-gray-700"
                  >
                    View order history
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                  <Link
                    href="/shop"
                    className="text-black hover:text-gray-700"
                  >
                    Continue shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}