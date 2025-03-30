"use client";

import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/policies/privacy', label: 'Privacy Policy' },
    { href: '/policies/terms', label: 'Terms of Service' },
    { href: '/policies/shipping', label: 'Shipping & Returns' },
  ];

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold tracking-wider">
              CICADA COVE
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              © {currentYear} Cicada Cove. All rights reserved.
            </p>
          </div>
          
          <nav className="flex flex-wrap gap-6 justify-center">
            {footerLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>Vintage European Designer Menswear • Est. 2023</p>
        </div>
      </div>
    </footer>
  );
};