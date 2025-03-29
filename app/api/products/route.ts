import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const designer = searchParams.get('designer');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 100;
  
  try {
    let query = supabase
      .from('products')
      .select('*');
    
    // Apply filters if provided
    if (slug) {
      query = query.eq('slug', slug).single();
    }
    
    if (designer) {
      query = query.eq('designer', designer);
    }
    
    // By default, only show active products
    query = query.eq('status', 'active');
    
    // Apply limit
    query = query.limit(limit);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}