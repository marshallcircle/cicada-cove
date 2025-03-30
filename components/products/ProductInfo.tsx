'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/types/supabase';
import { useCart } from '@/lib/contexts/CartContext';
import { toast } from 'react-hot-toast';

// Icons for information sections
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

interface ProductInfoProps {
  product: Product;
  className?: string;
  onAddToCart?: () => void;
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

// Expandable section component
const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border-t border-gray-200 pt-6", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}>
          <ChevronDownIcon />
        </span>
      </button>
      
      <div className={cn(
        "mt-4 prose prose-sm text-gray-700 overflow-hidden transition-all duration-200",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        {children}
      </div>
    </div>
  );
};

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  className,
  onAddToCart,
}) => {
  const {
    title,
    designer,
    era,
    price,
    description,
    measurements,
    materials,
    status,
    condition
  } = product;
  
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const isSoldOut = status === 'sold';
  
  // Parse measurements if it's a string
  const parsedMeasurements = typeof measurements === 'string' 
    ? measurements.split(',').map(m => m.trim()) 
    : [];
  
  // Add to cart handler with inventory check
  const handleAddToCart = () => {
    if (isSoldOut) return;
    
    setIsAddingToCart(true);
    
    // Simulate an inventory check
    setTimeout(() => {
      try {
        // Add to cart
        addItem(product);
        
        // Show success message
        toast.success(`${title} added to cart`);
        
        // Call the passed handler if exists
        if (onAddToCart) onAddToCart();
      } catch (error) {
        // Show error message
        toast.error('Failed to add item to cart');
        console.error('Error adding to cart:', error);
      } finally {
        setIsAddingToCart(false);
      }
    }, 500); // Simulate a short delay for the inventory check
  };
  
  return (
    <div className={cn("flex flex-col", className)}>
      {/* Product provenance and designer */}
      <div className="mb-1">
        <div className="text-sm text-gray-500 mb-1 uppercase tracking-wider font-medium">
          {designer}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {era && (
          <div className="mt-2 flex items-center">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {era}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              Authenticity Verified
            </span>
          </div>
        )}
      </div>
      
      {/* Price and availability */}
      <div className="mt-4 mb-6">
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {formatCurrency(price)}
          </p>
          {isSoldOut ? (
            <span className="ml-3 text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">
              Sold Out
            </span>
          ) : (
            <span className="ml-3 text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
              Available
            </span>
          )}
        </div>
        
        {/* Condition indicator */}
        <div className="mt-3">
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Condition:</span>
            <span className="font-medium text-sm">
              {condition}
            </span>
          </div>
          <div className="relative mt-2 h-2 w-full rounded-full bg-gray-200">
            <div 
              className={cn(
                "absolute h-full rounded-full",
                condition === "Excellent" ? "w-[90%] bg-green-500" : 
                condition === "Very Good" ? "w-[75%] bg-green-400" : 
                condition === "Good" ? "w-[60%] bg-yellow-500" : 
                condition === "Fair" ? "w-[40%] bg-orange-400" : "w-[20%] bg-red-500"
              )}
            />
          </div>
        </div>
      </div>
      
      {/* Add to cart button */}
      <div className="mt-2 mb-8">
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut || isAddingToCart}
          className={cn(
            "w-full py-3 px-8 rounded-md font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors",
            isSoldOut
              ? "bg-gray-300 cursor-not-allowed"
              : isAddingToCart
                ? "bg-gray-600 cursor-wait"
                : "bg-black hover:bg-gray-800"
          )}
        >
          {isSoldOut 
            ? "Sold Out" 
            : isAddingToCart 
              ? "Adding..." 
              : "Add to Cart"}
        </button>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Free shipping on orders over $500
        </p>
      </div>
      
      {/* Product description */}
      {description && (
        <ExpandableSection title="About this piece" defaultOpen={true}>
          <p>{description}</p>
          {designer && (
            <div className="mt-4">
              <h4 className="font-medium">Designer</h4>
              <p className="mt-1">{designer} is known for their contribution to {era} fashion, with a focus on quality craftsmanship and innovative design.</p>
            </div>
          )}
        </ExpandableSection>
      )}
      
      {/* Measurements */}
      {measurements && (
        <ExpandableSection title="Measurements & Fit">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {parsedMeasurements.map((measurement, i) => {
              const [label, value] = measurement.split(':').map(s => s.trim());
              return (
                <div key={i} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium">{label}</span>
                  <span>{value}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Please note that vintage sizing differs from contemporary sizing. We recommend comparing these measurements to a similar item you already own.
          </p>
        </ExpandableSection>
      )}
      
      {/* Materials */}
      {materials && (
        <ExpandableSection title="Materials & Construction">
          <p>{materials}</p>
          <div className="mt-4">
            <h4 className="font-medium">Care Instructions</h4>
            <p className="mt-1">We recommend professional dry cleaning only. Store on a padded hanger to maintain shape.</p>
          </div>
        </ExpandableSection>
      )}
      
      {/* Authentication */}
      <ExpandableSection title="Authentication & Provenance">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <p>
              Every item at Cicada Cove undergoes a rigorous authentication process. Our experts verify designer markings, craftsmanship, materials, and period-specific details.
            </p>
            <div className="mt-4">
              <h4 className="font-medium">Our guarantee</h4>
              <p className="mt-1">
                We guarantee the authenticity of all items. If you have any questions about this piece, please contact us.
              </p>
            </div>
          </div>
        </div>
      </ExpandableSection>
      
      {/* Shipping & Returns */}
      <ExpandableSection title="Shipping & Returns">
        <ul className="list-disc pl-5 space-y-2">
          <li>Free shipping on orders over $500</li>
          <li>Standard shipping (3-5 business days)</li>
          <li>Express shipping available at checkout</li>
          <li>14-day return policy for unworn items</li>
          <li>Returns must be in original condition with all tags</li>
          <li>See our <span className="underline cursor-pointer">full policy</span> for details</li>
        </ul>
      </ExpandableSection>
    </div>
  );
};