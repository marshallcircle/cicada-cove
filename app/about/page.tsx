import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Cicada Cove',
  description: 'Learn about our commitment to sourcing and preserving rare European designer menswear from the 1970s-1990s.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 h-[60vh] overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="Vintage clothing racks in Cicada Cove studio"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Preserving the legacy of European design through curated archive pieces
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Founded in 2020, Cicada Cove has been dedicated to the preservation and circulation of significant European menswear designs from the 1970s through the 1990s.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              We believe that these garments represent important moments in fashion history—artifacts that deserve to be preserved, appreciated, and worn. Each piece in our collection is carefully authenticated, documented, and restored when necessary.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/about-mission.jpg"
              alt="Carefully preserved vintage clothing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
              The principles that guide our curation process and business practices
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="bg-black h-12 w-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Authenticity</h3>
              <p className="text-gray-500">
                Each garment is thoroughly researched and authenticated by our team of experts. We stand behind the provenance of every piece we sell.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="bg-black h-12 w-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-500">
                By extending the lifecycle of existing garments, we contribute to a more sustainable approach to fashion consumption and appreciation.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="bg-black h-12 w-12 rounded-md flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Education</h3>
              <p className="text-gray-500">
                We document the historical context and significance of our archive pieces, preserving knowledge and fostering appreciation for design heritage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Team
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
            Passionate experts in fashion history, authentication, and preservation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-6">
              <Image
                src="/images/team-1.jpg"
                alt="Michael Chen - Founder"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Michael Chen</h3>
            <p className="text-gray-500">Founder & Lead Curator</p>
          </div>

          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-6">
              <Image
                src="/images/team-2.jpg"
                alt="Elena Rossi - Authentication Expert"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Elena Rossi</h3>
            <p className="text-gray-500">Authentication Expert</p>
          </div>

          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-6">
              <Image
                src="/images/team-3.jpg"
                alt="David Park - Textiles Conservator"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-900">David Park</h3>
            <p className="text-gray-500">Textiles Conservator</p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join Our Journey
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our curated collection of rare European designer menswear and be part of preserving fashion history.
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-block bg-white py-3 px-8 rounded-md font-medium text-black hover:bg-gray-200 transition-colors"
              >
                Browse the Archive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}