import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { NewProduct } from '@/types/supabase';

// Only allow server-side calls to this API
export const dynamic = 'force-dynamic';

// GET handler - List all products for admin (including sold ones)
export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = createAdminClient();
    
    // Get search params for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const designer = searchParams.get('designer');
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    
    // Build query
    let query = supabaseAdmin
      .from('products')
      .select('*');
    
    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    
    if (designer) {
      query = query.eq('designer', designer);
    }
    
    // Apply sorting
    if (['created_at', 'updated_at', 'price', 'title', 'designer'].includes(sort)) {
      query = query.order(sort as any, { ascending: order === 'asc' });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Admin API error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST handler - Create a new product
export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createAdminClient();
    
    // Get the product data from the request
    const productData: NewProduct = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'designer', 'era', 'condition', 'price', 'slug'];
    for (const field of requiredFields) {
      if (!productData[field as keyof NewProduct]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Insert the product
    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    if (error) {
      console.error('Admin API error:', error);
      return NextResponse.json(
        { error: `Failed to create product: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
    
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}