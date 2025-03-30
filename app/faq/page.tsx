import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Cicada Cove',
  description: 'Find answers to the most common questions about our vintage clothing, ordering process, shipping, and returns.',
};

export default function FAQPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions about our vintage clothing, ordering process, shipping, returns, and more.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Shopping & Products */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900">Shopping & Products</h2>
            <div className="mt-8 grid gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How do I know if an item will fit me?</h3>
                <p className="mt-3 text-gray-500">
                  We provide detailed measurements for each garment in the product description. Please compare these 
                  measurements to items that fit you well or take your own measurements. Due to the vintage nature 
                  of our products, standard modern sizing does not always apply.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Are the items authentic?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we guarantee the authenticity of all items sold on Cicada Cove. Each piece is carefully 
                  authenticated by our team of experts with extensive knowledge in vintage fashion. If you ever 
                  have doubts about an item's authenticity, please contact us.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">What condition are the vintage items in?</h3>
                <p className="mt-3 text-gray-500">
                  We thoroughly inspect and describe the condition of each item in the product listing. Our condition 
                  scale ranges from "Fair" to "Excellent." Any flaws, signs of wear, or repairs are always disclosed 
                  in the description and visible in the photos. If you need additional photos or information, feel free to contact us.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you hold or reserve items?</h3>
                <p className="mt-3 text-gray-500">
                  Due to high demand for our curated vintage pieces, we generally cannot hold items without payment. 
                  All products are available on a first-come, first-served basis. We recommend purchasing promptly 
                  if you're interested in a specific item.
                </p>
              </div>
            </div>
          </div>

          {/* Ordering & Payment */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900">Ordering & Payment</h2>
            <div className="mt-8 grid gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
                <p className="mt-3 text-gray-500">
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, 
                  Apple Pay, and Google Pay. All payments are processed securely through our payment providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Is my payment information secure?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we take data security very seriously. We never store your full credit card details on our servers. 
                  All payment processing is handled by trusted third-party payment processors that maintain the highest 
                  level of security and PCI compliance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Can I modify or cancel my order?</h3>
                <p className="mt-3 text-gray-500">
                  You can modify or cancel your order within 1 hour of placement by contacting us via email at 
                  orders@cicadacove.com. Once an order has been processed or shipped, it cannot be modified or canceled. 
                  Please review our return policy for options after your item has shipped.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you offer layaway or installment plans?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we offer installment payments through Affirm and Afterpay at checkout for orders over $100. 
                  You can split your payment into 4 interest-free installments. Please note that these services are 
                  subject to approval and availability in your region.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900">Shipping</h2>
            <div className="mt-8 grid gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How long will it take to receive my order?</h3>
                <p className="mt-3 text-gray-500">
                  Domestic orders (United States) typically arrive within 3-5 business days. International shipping 
                  times vary by location, ranging from 7-21 business days. Please note that these are estimates and 
                  delivery times may vary, especially during holidays or due to customs processing for international orders.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you ship internationally?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we ship to most countries worldwide. International customers are responsible for any customs duties, 
                  taxes, or fees imposed by their country. These fees are not included in the purchase price or shipping costs 
                  and will be collected by your local customs authority.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">How can I track my order?</h3>
                <p className="mt-3 text-gray-500">
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also log into 
                  your account on our website to view your order status and tracking details. If you have any issues tracking 
                  your package, please contact our customer service team.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you offer expedited shipping?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we offer expedited shipping options at checkout. For domestic orders, we offer 2-day and overnight shipping. 
                  For international orders, we offer priority shipping where available. Expedited shipping costs will be calculated 
                  based on the destination and package weight.
                </p>
              </div>
            </div>
          </div>

          {/* Returns & Exchanges */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900">Returns & Exchanges</h2>
            <div className="mt-8 grid gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">What is your return policy?</h3>
                <p className="mt-3 text-gray-500">
                  We accept returns within 14 days of delivery for items in their original condition. The item must be unworn, 
                  unwashed, with all original tags attached. Please note that return shipping is the customer's responsibility 
                  unless the item is defective or we made an error. For detailed information, please visit our 
                  <a href="/policies/returns" className="text-black font-medium hover:text-stone-700"> Returns Policy page</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">How do I initiate a return?</h3>
                <p className="mt-3 text-gray-500">
                  To initiate a return, please email returns@cicadacove.com with your order number and reason for return. 
                  Our team will provide you with a return authorization and instructions. Returns sent without prior authorization 
                  may be delayed or rejected.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you offer exchanges?</h3>
                <p className="mt-3 text-gray-500">
                  Due to the one-of-a-kind nature of our vintage items, we generally cannot offer direct exchanges. If you need a 
                  different size or item, we recommend returning the original purchase for a refund and placing a new order for the 
                  desired item. Please note that inventory is limited and we cannot guarantee availability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">How long does it take to process a refund?</h3>
                <p className="mt-3 text-gray-500">
                  Once we receive your return, we'll inspect the item and process your refund within 3-5 business days. Refunds are 
                  issued to the original payment method. Credit card refunds may take an additional 3-7 business days to appear on 
                  your statement, depending on your bank's processing times.
                </p>
              </div>
            </div>
          </div>

          {/* About Cicada Cove */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-gray-900">About Cicada Cove</h2>
            <div className="mt-8 grid gap-y-10 gap-x-6 sm:grid-cols-1 lg:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">How do you source your vintage items?</h3>
                <p className="mt-3 text-gray-500">
                  Our team sources items through a variety of channels including estate sales, vintage dealers, private collections, 
                  and select vintage markets worldwide. Each piece is hand-selected for its quality, uniqueness, and historical significance. 
                  We pride ourselves on offering items that tell a story and represent important eras in fashion history.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you buy or consign vintage clothing?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, we selectively purchase high-quality vintage pieces and offer consignment for exceptional items. We're particularly 
                  interested in designer pieces, rare items, and well-preserved vintage from the 1950s-1990s. Please email 
                  sourcing@cicadacove.com with clear photos and details of the items you'd like to sell or consign.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Do you have a physical store?</h3>
                <p className="mt-3 text-gray-500">
                  Yes, our flagship store is located in San Francisco at 375 Valencia Street. We're open Tuesday through Sunday, 11am-7pm. 
                  Our physical location carries a selection of our inventory, but our complete collection is available online. We also 
                  occasionally host pop-up shops in other cities — follow us on social media for announcements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">How can I contact customer service?</h3>
                <p className="mt-3 text-gray-500">
                  Our customer service team is available via email at support@cicadacove.com. We aim to respond to all inquiries within 
                  24 hours during business days. For urgent matters, you can reach us by phone at (415) 555-0123 during business hours 
                  (Monday-Friday, 9am-5pm PT). You can also visit our <a href="/contact" className="text-black font-medium hover:text-stone-700">Contact page</a> for more options.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-lg font-medium text-gray-900">Still have questions?</h2>
          <p className="mt-3 text-gray-500">
            We're happy to help. Reach out to our customer service team for personalized assistance.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-black px-5 py-3 text-base font-medium text-white hover:bg-stone-800"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}