import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Initialize Supabase with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      );
    }

    // Fetch the product by slug
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Fetch related products
    const { data: relatedProducts, error: relatedError } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .or(`designer.eq.${product.designer},category.eq.${product.category}`)
      .neq('id', product.id)
      .limit(4);

    if (relatedError) {
      console.error('Error fetching related products:', relatedError);
    }

    return NextResponse.json({
      product,
      relatedProducts: relatedProducts || [],
    });
  } catch (error) {
    console.error('Unhandled error in single product API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}