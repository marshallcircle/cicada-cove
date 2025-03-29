'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '@/lib/supabase';
import { ProductInsert, ProductMeasurements } from '@/types/database';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<ProductInsert, 'images' | 'measurements'> & {
    images: string;
    measurements: {
      chest: string;
      waist: string;
      shoulders: string;
      length: string;
      sleeve: string;
      hips: string;
      inseam: string;
      rise: string;
      [key: string]: string;
    };
  }>({
    title: '',
    designer: '',
    era: '',
    description: '',
    condition: '',
    price: 0,
    images: '',
    status: 'active',
    slug: '',
    measurements: {
      chest: '',
      waist: '',
      shoulders: '',
      length: '',
      sleeve: '',
      hips: '',
      inseam: '',
      rise: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for nested measurements
    if (name.startsWith('measurements.')) {
      const measurementKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        measurements: {
          ...prev.measurements,
          [measurementKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setFormData(prev => ({
        ...prev,
        slug: `${slug}-${Date.now().toString().slice(-4)}`
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Generate slug if not provided
      if (!formData.slug) {
        generateSlug();
      }
      
      // Parse images from comma-separated string to array
      const imageArray = formData.images
        .split(',')
        .map(url => url.trim())
        .filter(url => url !== '');
      
      // Filter out empty measurement values
      const filteredMeasurements: ProductMeasurements = {};
      
      Object.entries(formData.measurements).forEach(([key, value]) => {
        if (value.trim() !== '') {
          filteredMeasurements[key] = value.trim();
        }
      });
      
      // Create the product
      const productData: ProductInsert = {
        ...formData,
        images: imageArray,
        measurements: Object.keys(filteredMeasurements).length > 0 ? filteredMeasurements : undefined
      };
      
      await productService.createProduct(productData);
      router.push('/admin/products');
      
    } catch (err) {
      console.error('Failed to create product:', err);
      setError('Failed to create product. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <Link 
          href="/admin/products" 
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Products
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">Basic Information</h2>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="title">
                Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="designer">
                Designer/Brand *
              </label>
              <input
                id="designer"
                type="text"
                name="designer"
                required
                value={formData.designer}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="era">
                Era *
              </label>
              <input
                id="era"
                type="text"
                name="era"
                required
                value={formData.era}
                onChange={handleChange}
                placeholder="e.g., 1970s, 1990s"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="condition">
                Condition *
              </label>
              <input
                id="condition"
                type="text"
                name="condition"
                required
                value={formData.condition}
                onChange={handleChange}
                placeholder="e.g., Excellent, Good, Fair"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="price">
                Price (USD) *
              </label>
              <input
                id="price"
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-medium mb-4">Additional Information</h2>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="images">
                Images (comma-separated URLs) *
              </label>
              <textarea
                id="images"
                name="images"
                required
                rows={3}
                value={formData.images}
                onChange={handleChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple image URLs with commas</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="slug">
                Slug (URL path)
              </label>
              <div className="flex">
                <input
                  id="slug"
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="bg-gray-200 text-gray-700 px-3 py-2 rounded-r hover:bg-gray-300"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
            </div>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Measurements</h3>
            <p className="text-sm text-gray-600 mb-3">Enter all applicable measurements (inches)</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.chest">
                  Chest
                </label>
                <input
                  id="measurements.chest"
                  type="text"
                  name="measurements.chest"
                  value={formData.measurements.chest}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.waist">
                  Waist
                </label>
                <input
                  id="measurements.waist"
                  type="text"
                  name="measurements.waist"
                  value={formData.measurements.waist}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.shoulders">
                  Shoulders
                </label>
                <input
                  id="measurements.shoulders"
                  type="text"
                  name="measurements.shoulders"
                  value={formData.measurements.shoulders}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.length">
                  Length
                </label>
                <input
                  id="measurements.length"
                  type="text"
                  name="measurements.length"
                  value={formData.measurements.length}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.sleeve">
                  Sleeve
                </label>
                <input
                  id="measurements.sleeve"
                  type="text"
                  name="measurements.sleeve"
                  value={formData.measurements.sleeve}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.hips">
                  Hips
                </label>
                <input
                  id="measurements.hips"
                  type="text"
                  name="measurements.hips"
                  value={formData.measurements.hips}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.inseam">
                  Inseam
                </label>
                <input
                  id="measurements.inseam"
                  type="text"
                  name="measurements.inseam"
                  value={formData.measurements.inseam}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm" htmlFor="measurements.rise">
                  Rise
                </label>
                <input
                  id="measurements.rise"
                  type="text"
                  name="measurements.rise"
                  value={formData.measurements.rise}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cicada-red focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-right">
          <button
            type="submit"
            disabled={loading}
            className={`bg-cicada-red text-white px-6 py-2 rounded ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            } transition-opacity`}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}