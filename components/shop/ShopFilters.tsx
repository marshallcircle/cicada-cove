'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Filter options
const designers = ['Rick Owens', 'Yohji Yamamoto', 'Comme des Garçons', 'Issey Miyake', 'Maison Margiela'];
const eras = ['1980s', '1990s', '2000s', '2010s'];
const conditions = ['Excellent', 'Very Good', 'Good'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

interface ShopFiltersProps {
  currentFilters: {
    designer?: string;
    era?: string;
    condition?: string;
    priceRange?: number[];
    sortBy?: string;
  };
  className?: string;
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({
  currentFilters,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Local state for price range
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentFilters.priceRange?.[0] || 0,
    currentFilters.priceRange?.[1] || 5000,
  ]);
  
  // Create new search params
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      
      return params.toString();
    },
    [searchParams]
  );
  
  // Apply a filter
  const applyFilter = (name: string, value: string | null) => {
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };
  
  // Apply price range filter
  const applyPriceFilter = useCallback(() => {
    const priceString = `${priceRange[0]}-${priceRange[1]}`;
    router.push(`${pathname}?${createQueryString('price', priceString)}`);
  }, [priceRange, pathname, createQueryString, router]);
  
  // Reset all filters
  const resetFilters = () => {
    router.push(pathname);
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h2 className="text-lg font-medium text-gray-900">Sort By</h2>
        <div className="mt-2">
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
            value={currentFilters.sortBy || 'newest'}
            onChange={(e) => applyFilter('sort', e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-medium text-gray-900">Designer</h2>
        <div className="mt-4 space-y-3">
          {designers.map((designer) => (
            <div key={designer} className="flex items-center">
              <input
                id={`designer-${designer}`}
                name="designer"
                type="radio"
                className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                value={designer}
                checked={currentFilters.designer === designer}
                onChange={() => applyFilter('designer', designer)}
              />
              <label htmlFor={`designer-${designer}`} className="ml-3 text-sm text-gray-600">
                {designer}
              </label>
            </div>
          ))}
          
          {currentFilters.designer && (
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => applyFilter('designer', null)}
            >
              Clear designer
            </button>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-medium text-gray-900">Era</h2>
        <div className="mt-4 space-y-3">
          {eras.map((era) => (
            <div key={era} className="flex items-center">
              <input
                id={`era-${era}`}
                name="era"
                type="radio"
                className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                value={era}
                checked={currentFilters.era === era}
                onChange={() => applyFilter('era', era)}
              />
              <label htmlFor={`era-${era}`} className="ml-3 text-sm text-gray-600">
                {era}
              </label>
            </div>
          ))}
          
          {currentFilters.era && (
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => applyFilter('era', null)}
            >
              Clear era
            </button>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-medium text-gray-900">Condition</h2>
        <div className="mt-4 space-y-3">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center">
              <input
                id={`condition-${condition}`}
                name="condition"
                type="radio"
                className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                value={condition}
                checked={currentFilters.condition === condition}
                onChange={() => applyFilter('condition', condition)}
              />
              <label htmlFor={`condition-${condition}`} className="ml-3 text-sm text-gray-600">
                {condition}
              </label>
            </div>
          ))}
          
          {currentFilters.condition && (
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-gray-700 mt-2"
              onClick={() => applyFilter('condition', null)}
            >
              Clear condition
            </button>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Price Range</h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="absolute z-10 w-full opacity-0 cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="absolute z-20 w-full opacity-0 cursor-pointer"
            />
            
            <div className="relative z-0 h-1 bg-gray-200 rounded-full">
              <div
                className="absolute h-1 bg-black rounded-full"
                style={{
                  left: `${(priceRange[0] / 5000) * 100}%`,
                  right: `${100 - (priceRange[1] / 5000) * 100}%`,
                }}
              ></div>
              <div
                className="absolute w-4 h-4 -mt-1.5 bg-black rounded-full cursor-pointer"
                style={{
                  left: `${(priceRange[0] / 5000) * 100}%`,
                }}
              ></div>
              <div
                className="absolute w-4 h-4 -mt-1.5 bg-black rounded-full cursor-pointer"
                style={{
                  left: `${(priceRange[1] / 5000) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={applyPriceFilter}
            className="w-full py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
          >
            Apply Price Range
          </button>
          
          {currentFilters.priceRange && (
            <button
              type="button"
              className="w-full py-1 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => applyFilter('price', null)}
            >
              Clear price filter
            </button>
          )}
        </div>
      </div>
      
      {/* Reset all filters */}
      {(currentFilters.designer || currentFilters.era || currentFilters.condition || currentFilters.priceRange) && (
        <div className="border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};