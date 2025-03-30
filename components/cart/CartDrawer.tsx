'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/contexts/CartContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { CartItem } from './CartItem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, itemCount, totalPrice, clearCart } = useCart();
  
  // Calculate shipping
  const shipping = totalPrice >= 500 ? 0 : 15;
  const orderTotal = totalPrice + shipping;
  
  // Empty cart state
  const isEmpty = items.length === 0;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping Cart {!isEmpty && `(${itemCount})`}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {isEmpty ? (
                        <div className="mt-20 flex flex-col items-center justify-center text-center">
                          <svg
                            className="h-16 w-16 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Browse our collection to find unique designer pieces.
                          </p>
                          <div className="mt-6">
                            <Link
                              href="/shop"
                              className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                              onClick={onClose}
                            >
                              Shop Now
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {items.map(({ product, quantity }) => (
                                  <li key={product.id} className="py-6">
                                    <CartItem 
                                      product={product} 
                                      quantity={quantity} 
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Clear cart button */}
                          <div className="mt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={clearCart}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Clear cart
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {!isEmpty && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-base text-gray-900">
                            <p>Subtotal</p>
                            <p>{formatCurrency(totalPrice)}</p>
                          </div>
                          
                          <div className="flex justify-between text-sm text-gray-500">
                            <p>Shipping</p>
                            <p>
                              {shipping === 0 
                                ? 'Free shipping' 
                                : formatCurrency(shipping)}
                            </p>
                          </div>
                          
                          {totalPrice < 500 && (
                            <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">
                              Add {formatCurrency(500 - totalPrice)} more to qualify for free shipping
                            </div>
                          )}
                          
                          <div className="flex items-end justify-between border-t border-gray-200 pt-3 text-base font-medium text-gray-900">
                            <p>Total</p>
                            <div className="text-right">
                              <p className="text-lg">{formatCurrency(orderTotal)}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Tax calculated at checkout
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                            onClick={onClose}
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            <button
                              type="button"
                              className="font-medium text-black hover:text-gray-600"
                              onClick={onClose}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};