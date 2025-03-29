import { productService } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate this page every hour

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await productService.getProductBySlug(params.slug).catch(() => null);
  
  if (!product) {
    return {
      title: 'Product Not Found | Cicada Cove Vintage',
      description: 'The product you are looking for could not be found.',
    };
  }
  
  return {
    title: `${product.title} | Cicada Cove Vintage`,
    description: product.description || `${product.title} by ${product.designer} from ${product.era}`,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Fetch the product data
  const product = await productService.getProductBySlug(params.slug).catch(() => null);
  
  // If the product doesn't exist, show a 404 page
  if (!product) {
    notFound();
  }
  
  const { 
    title, 
    designer, 
    era, 
    description, 
    condition, 
    price, 
    images, 
    measurements,
    status 
  } = product;
  
  const isSold = status === 'sold';
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link 
          href="/products" 
          className="text-gray-600 hover:text-cicada-red transition-colors"
        >
          ← Back to Products
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {images && images.length > 0 ? (
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={images[0]}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                
                {isSold && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 text-sm uppercase tracking-wider rounded">
                    Sold
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          
          {/* Additional images */}
          {images && images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1).map((image, index) => (
                <div key={index} className="bg-gray-100 rounded overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`${title} - Image ${index + 2}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">{title}</h1>
            <p className="text-gray-600 mb-2">By {designer}</p>
            <p className="text-gray-500 text-sm">{era}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-cicada-red">${price.toFixed(2)}</p>
              
              {isSold ? (
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                  Sold Out
                </div>
              ) : (
                <button className="bg-cicada-red text-white px-6 py-2 rounded hover:opacity-90 transition-opacity">
                  Contact to Purchase
                </button>
              )}
            </div>
          </div>
          
          {/* Product Condition */}
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium mb-2">Condition</h2>
            <p className="text-gray-700">{condition}</p>
          </div>
          
          {/* Product Description */}
          {description && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>
          )}
          
          {/* Product Measurements */}
          {measurements && Object.keys(measurements).length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-medium mb-3">Measurements</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {Object.entries(measurements).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="text-gray-800">{value}"</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Shipping Info */}
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium mb-2">Shipping</h2>
            <p className="text-gray-700">
              Worldwide shipping available. Please contact us for shipping rates and details.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-medium mb-2">Questions?</h2>
            <p className="text-gray-700">
              Contact us at <a href="mailto:shop@cicadacove.com" className="text-cicada-red hover:underline">shop@cicadacove.com</a> for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}