import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/types/supabase';

// Initialize Supabase with service role for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const designer = searchParams.get('designer');
    const era = searchParams.get('era');
    const condition = searchParams.get('condition');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    // Initialize query
    let query = supabase
      .from('products')
      .select('*')
      .eq('active', true);

    // Apply filters if they exist
    if (designer) {
      query = query.eq('designer', designer);
    }

    if (era) {
      query = query.eq('era', era);
    }

    if (condition) {
      query = query.eq('condition', condition);
    }

    if (minPrice) {
      query = query.gte('price', parseInt(minPrice));
    }

    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice));
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Apply sorting
    if (
      ['price', 'created_at', 'name', 'designer'].includes(sort) &&
      ['asc', 'desc'].includes(order)
    ) {
      query = query.order(sort as any, { ascending: order === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    if (countError) {
      console.error('Error counting products:', countError);
    }

    return NextResponse.json({
      products: data,
      pagination: {
        total: totalCount || 0,
        offset,
        limit,
      },
    });
  } catch (error) {
    console.error('Unhandled error in products API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}