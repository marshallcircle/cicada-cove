import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Cicada Cove',
  description: 'Our terms of service outline the rules and guidelines for using Cicada Cove\'s website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 30, 2025
          </p>
        </div>

        <div className="prose prose-lg prose-black max-w-none">
          <h2>Introduction</h2>
          <p>
            Welcome to Cicada Cove. These Terms of Service ("Terms") govern your use of our website, products, and services. 
            By accessing or using our website at <a href="https://www.cicadacove.com">www.cicadacove.com</a> (the "Service"), 
            you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
          </p>

          <h2>Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>

          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions 
            under your password. You agree not to disclose your password to any third party. You must notify us immediately upon 
            becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Cicada 
            Cove and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and 
            foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the 
            prior written consent of Cicada Cove.
          </p>

          <h2>Product Descriptions and Pricing</h2>
          <p>
            We strive to provide accurate descriptions of our products, including measurements, condition, and provenance. However, 
            we do not warrant that product descriptions or other content on the site is accurate, complete, reliable, current, or 
            error-free. The color and appearance of products may vary from what is displayed on your screen.
          </p>

          <p>
            All prices are listed in USD and are subject to change without notice. We reserve the right to modify or discontinue 
            any product without notice at any time. We shall not be liable to you or to any third party for any modification, price 
            change, suspension, or discontinuance of the Service.
          </p>

          <h2>Orders and Payment</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse any order you place with us. 
            We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
          </p>

          <p>
            Payment for all purchases must be made at the time of order. We accept major credit cards, PayPal, and other payment 
            methods as indicated at checkout. By submitting your payment information, you represent and warrant that you have the 
            legal right to use any payment method(s) utilized in connection with any transaction.
          </p>

          <h2>Shipping and Delivery</h2>
          <p>
            We ship to the address you provide at checkout. Please ensure your shipping address is accurate and complete. We are 
            not responsible for orders shipped to incorrect addresses provided by customers.
          </p>

          <p>
            Delivery times are estimates only and are not guaranteed. We are not responsible for shipping delays due to customs, 
            weather conditions, or other circumstances beyond our control. For full details, please see our 
            <Link href="/policies/shipping" className="text-black underline"> Shipping Policy</Link>.
          </p>

          <h2>Returns and Refunds</h2>
          <p>
            Please review our <Link href="/policies/returns" className="text-black underline">Returns Policy</Link> for information 
            about returns, exchanges, and refunds. By making a purchase, you agree to the terms of our Returns Policy.
          </p>

          <h2>Prohibited Uses</h2>
          <p>
            You agree not to use the Service:
          </p>

          <ul>
            <li>
              In any way that violates any applicable national or international law or regulation.
            </li>
            <li>
              To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," 
              "chain letter," "spam," or any other similar solicitation.
            </li>
            <li>
              To impersonate or attempt to impersonate Cicada Cove, a Cicada Cove employee, another user, or any other person or entity.
            </li>
            <li>
              In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.
            </li>
            <li>
              To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm 
              Cicada Cove or users of the Service.
            </li>
          </ul>

          <h2>User-Generated Content</h2>
          <p>
            By posting, uploading, or otherwise submitting content to our Service (such as reviews, comments, etc.), you grant us a 
            non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, 
            publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
          </p>

          <p>
            You represent and warrant that you own or control all rights to the content you post, that the content is accurate, and 
            that use of the content does not violate these Terms and will not cause injury to any person or entity.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Cicada Cove expressly disclaims all warranties of any kind, 
            whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular 
            purpose, and non-infringement.
          </p>

          <p>
            Cicada Cove makes no warranty that the Service will meet your requirements, be available on an uninterrupted, timely, secure, 
            or error-free basis, or that the results that may be obtained from the use of the Service will be accurate or reliable.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Cicada Cove, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, 
            incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or 
            other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct 
            or content of any third party on the Service; or (iii) unauthorized access, use, or alteration of your transmissions or content.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without 
            regard to its conflict of law provisions. Any dispute arising under or relating in any way to these Terms will be resolved 
            exclusively in the courts located in San Francisco, California.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will 
            try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be 
            determined at our sole discretion.
          </p>

          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. 
            If you do not agree to the new terms, please stop using the Service.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>

          <ul>
            <li>Email: <a href="mailto:legal@cicadacove.com">legal@cicadacove.com</a></li>
            <li>Phone: +1 (415) 555-0123</li>
            <li>
              Mail: Legal Department<br />
              Cicada Cove<br />
              375 Valencia Street<br />
              San Francisco, CA 94103
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}