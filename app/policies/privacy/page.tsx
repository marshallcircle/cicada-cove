import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Cicada Cove',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information when you use our services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 30, 2025
          </p>
        </div>

        <div className="prose prose-lg prose-black max-w-none">
          <h2>Introduction</h2>
          <p>
            At Cicada Cove, we respect your privacy and are committed to protecting your personal data. This privacy 
            policy explains how we collect, use, disclose, and safeguard your information when you visit our website, 
            make a purchase, or interact with us in any way.
          </p>
          
          <p>
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect several types of information for various purposes to provide and improve our service to you:
          </p>
          
          <h3>Personal Data</h3>
          <p>
            While using our services, we may ask you to provide us with certain personally identifiable information that can be used 
            to contact or identify you ("Personal Data"). This may include, but is not limited to:
          </p>

          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Shipping and billing address</li>
            <li>Phone number</li>
            <li>Payment information (processed securely through our payment processors)</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We may also collect information on how you access and use our website ("Usage Data"). This may include:
          </p>

          <ul>
            <li>Your computer's Internet Protocol address (IP address)</li>
            <li>Browser type and version</li>
            <li>Pages of our website that you visit</li>
            <li>Time and date of your visit</li>
            <li>Time spent on those pages</li>
            <li>Device information</li>
          </ul>

          <h3>Tracking and Cookies Data</h3>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
            Cookies are files with small amounts of data that may include an anonymous unique identifier.
          </p>

          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
            do not accept cookies, you may not be able to use some portions of our website.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the collected data for various purposes:
          </p>

          <ul>
            <li>To process and fulfill your orders</li>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide you with news, special offers, and general information about other goods, services, and events which we offer</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method 
            of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
            we cannot guarantee its absolute security.
          </p>

          <h2>Data Sharing and Disclosure</h2>
          <p>
            We may share your personal information in the following situations:
          </p>

          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your information with third-party vendors and service providers 
              that perform services for us or on our behalf, such as payment processing, shipping, and marketing assistance.
            </li>
            <li>
              <strong>For Business Transfers:</strong> We may share or transfer your information in connection with, or during 
              negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.
            </li>
            <li>
              <strong>To Comply with Legal Obligations:</strong> We may disclose your information where we are legally required to do so.
            </li>
          </ul>

          <h2>Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information:
          </p>

          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to rectify inaccurate personal information</li>
            <li>The right to erasure of your personal information</li>
            <li>The right to restrict processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to withdraw consent where we rely on consent to process your information</li>
          </ul>

          <p>
            To exercise any of these rights, please contact us at <a href="mailto:privacy@cicadacove.com">privacy@cicadacove.com</a>.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for use by children under the age of 16. We do not knowingly collect personally 
            identifiable information from children under 16. If you are a parent or guardian and you are aware that your child 
            has provided us with Personal Data, please contact us so that we can take necessary actions.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
            Policy on this page and updating the "Last updated" date.
          </p>

          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are 
            effective when they are posted on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>

          <ul>
            <li>Email: <a href="mailto:privacy@cicadacove.com">privacy@cicadacove.com</a></li>
            <li>Phone: +1 (415) 555-0123</li>
            <li>
              Mail: Privacy Officer<br />
              Cicada Cove<br />
              375 Valencia Street<br />
              San Francisco, CA 94103
            </li>
          </ul>

          <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
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