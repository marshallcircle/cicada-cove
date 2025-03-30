import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/formatters';
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from '@/lib/services/productService';
import { Product } from '@/lib/types/supabase';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';

// Types for the page props
type ProductPageProps = {
  params: {
    slug: string;
  };
};

// Types for metadata generation
type MetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for SEO
export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch product data
  const product = await getProductBySlug(params.slug);
  
  // Return default metadata if product doesn't exist
  if (!product) {
    return {
      title: 'Product Not Found | Cicada Cove',
      description: 'The requested product could not be found.',
    };
  }

  // Construct metadata based on product data
  return {
    title: `${product.title} by ${product.designer} | Cicada Cove`,
    description: `${product.era} ${product.title} by ${product.designer}. ${product.condition} condition. ${product.description?.substring(0, 150)}...`,
    openGraph: {
      title: `${product.title} by ${product.designer} | Cicada Cove`,
      description: `${product.era} ${product.title} by ${product.designer}. ${product.condition} condition.`,
      images: product.images.length > 0 ? [product.images[0]] : [],
      type: 'website',
    },
  };
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  
  // Handle product not found
  if (!product) {
    notFound();
  }
  
  // Fetch related products
  const relatedProducts = await getRelatedProducts(product);
  
  // Determine if product is sold out
  const isSoldOut = product.status === 'sold';
  
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="py-4">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
              <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </Link>
              <svg className="mx-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">{product.title}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 mb-16">
          {/* Product gallery */}
          <ProductImageGallery
            images={product.images}
            productName={product.title}
            designer={product.designer}
            condition={product.condition}
            isSoldOut={isSoldOut}
            className="mb-10 lg:mb-0"
          />
          
          {/* Product info */}
          <ProductInfo product={product} />
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 mb-24">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">You may also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.title,
            image: product.images[0],
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: product.designer,
            },
            offers: {
              '@type': 'Offer',
              url: `https://cicadacove.com/products/${product.slug}`,
              priceCurrency: 'USD',
              price: product.price,
              availability: isSoldOut
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock'
            }
          }),
        }}
      />
    </>
  );
}