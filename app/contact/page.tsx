import React from 'react';
import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Cicada Cove',
  description: 'Get in touch with our team for inquiries about our archive pieces, authentication services, or business opportunities.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="divide-y-2 divide-gray-200">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get in touch
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">General Inquiries</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>info@cicadacove.com</dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (415) 555-0123</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Authentication Services</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>authentication@cicadacove.com</dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (415) 555-0124</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Press & Media</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>press@cicadacove.com</dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (415) 555-0125</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Business Opportunities</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>partnerships@cicadacove.com</dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (415) 555-0126</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Locations
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">San Francisco</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>375 Valencia Street</p>
                  <p>San Francisco, CA 94103</p>
                  <p className="mt-1">Thursday - Sunday: 12pm - 6pm</p>
                  <p>By appointment only Monday - Wednesday</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">New York</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>142 Rivington Street</p>
                  <p>New York, NY 10002</p>
                  <p className="mt-1">Friday - Sunday: 12pm - 7pm</p>
                  <p>By appointment only Monday - Thursday</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}