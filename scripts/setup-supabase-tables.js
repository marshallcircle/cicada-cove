// Script to set up Supabase database tables using the Data API
require('dotenv').config({ path: './.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with admin privileges
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using service role key for admin operations

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables!');
  process.exit(1);
}

console.log(`Connecting to Supabase: ${supabaseUrl}`);
console.log('Using service role key for admin operations');

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    // Simple auth check
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    
    console.log('✅ Connected successfully to Supabase!');
    return true;
    
  } catch (error) {
    console.error('❌ Error connecting to Supabase:', error.message);
    return false;
  }
}

async function checkTableExists(tableName) {
  try {
    // Attempt to select a single row from the table
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    // If we get a specific error about relation not existing, the table doesn't exist
    if (error && error.message.includes('relation') && error.message.includes('does not exist')) {
      return false;
    } 
    
    // If we got no error or a different error, assume the table exists
    return true;
    
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error.message);
    return false;
  }
}

async function createProductsTable() {
  console.log('\nCreating Products table...');
  
  try {
    // Using Supabase's storage API to create a table
    // Note: Since we don't have direct SQL execution, we'll use multiple API calls for this
    
    // Check if table already exists
    const tableExists = await checkTableExists('products');
    
    if (tableExists) {
      console.log('Products table already exists, skipping creation');
      return true;
    }
    
    // Unfortunately, Supabase's REST API doesn't directly provide a way to create tables
    // We'll need to output instructions for the user to execute in the SQL Editor
    console.log('\n❌ Cannot create tables directly via the REST API.');
    console.log('Please execute the following SQL in the Supabase SQL Editor:');
    
    console.log(`
-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  designer TEXT NOT NULL,
  era TEXT NOT NULL,
  description TEXT,
  condition TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  measurements JSONB,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold')),
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Products table
CREATE INDEX IF NOT EXISTS idx_products_designer ON products(designer);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Add the updated_at trigger
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_products ON products;
CREATE TRIGGER set_timestamp_products
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
`);
    
    return false;
    
  } catch (error) {
    console.error('❌ Error creating Products table:', error.message);
    return false;
  }
}

async function createOrdersTables() {
  console.log('\nCreating Orders and OrderItems tables...');
  
  try {
    // Check if tables already exist
    const ordersExist = await checkTableExists('orders');
    const orderItemsExist = await checkTableExists('order_items');
    
    if (ordersExist && orderItemsExist) {
      console.log('Orders and OrderItems tables already exist, skipping creation');
      return true;
    }
    
    // Output instructions for the user to execute in the SQL Editor
    console.log('\n❌ Cannot create tables directly via the REST API.');
    console.log('Please execute the following SQL in the Supabase SQL Editor:');
    
    console.log(`
-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create OrderItems Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE SET NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Orders tables
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Add the updated_at trigger for Orders
DROP TRIGGER IF EXISTS set_timestamp_orders ON orders;
CREATE TRIGGER set_timestamp_orders
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
`);
    
    return false;
    
  } catch (error) {
    console.error('❌ Error creating Orders tables:', error.message);
    return false;
  }
}

async function insertSampleProducts() {
  console.log('\nInserting sample products...');
  
  try {
    // Check if products already exist
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (checkError) {
      if (checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
        console.log('Products table does not exist yet. Please create it first.');
        return false;
      } 
      throw checkError;
    }
    
    // Define sample products
    const sampleProducts = [
      {
        title: 'Pleated Button-Up Shirt in Black',
        designer: 'Issey Miyake',
        era: '1990s',
        description: 'Rare vintage Issey Miyake pleated button-up shirt in black from the iconic 1990s collection. Features the signature micro-pleating technique that Miyake is renowned for. The pleating creates a textured appearance and makes the garment incredibly lightweight and comfortable to wear. Classic collar and full button closure.',
        condition: 'Excellent',
        price: 450.00,
        images: ['https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99', 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3'],
        measurements: {
          chest: '56cm (fits like M/L)',
          length: '72cm',
          shoulders: '48cm',
          sleeves: '62cm'
        },
        status: 'active',
        slug: 'issey-miyake-pleated-shirt-black-1990s'
      },
      {
        title: 'Asymmetrical Wool Coat in Charcoal',
        designer: 'Yohji Yamamoto',
        era: '1980s',
        description: 'Iconic Yohji Yamamoto asymmetrical wool coat from his groundbreaking 1980s collections. Features the designer\'s signature oversized silhouette with an asymmetrical front closure, deep pockets, and draped lapels. Made from high-quality heavyweight wool in a deep charcoal gray. The perfect statement piece that embodies the avant-garde Japanese design aesthetic of the era.',
        condition: 'Very Good',
        price: 1200.00,
        images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3', 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a'],
        measurements: {
          chest: '64cm (oversized)',
          length: '90cm',
          shoulders: '56cm',
          sleeves: '65cm'
        },
        status: 'active',
        slug: 'yohji-yamamoto-asymmetrical-wool-coat-1980s'
      },
      {
        title: 'Minimalist Leather Biker Jacket',
        designer: 'Helmut Lang',
        era: '1990s',
        description: 'Rare Helmut Lang leather biker jacket from the 1990s. Features the Austrian designer\'s signature minimalist approach with clean lines and impeccable construction. Made from buttery-soft black leather with subtle silver-tone hardware. Asymmetrical front zip closure, snap-down lapels, and two front zip pockets. A timeless piece from Lang\'s most influential era.',
        condition: 'Good',
        price: 950.00,
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5', 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504'],
        measurements: {
          chest: '54cm',
          length: '65cm',
          shoulders: '46cm',
          sleeves: '64cm'
        },
        status: 'active',
        slug: 'helmut-lang-leather-biker-jacket-1990s'
      },
      {
        title: 'Deconstructed Wool Blazer with Raw Edges',
        designer: 'Comme des Garçons',
        era: '1980s',
        description: 'Extraordinary Comme des Garçons deconstructed wool blazer from Rei Kawakubo\'s influential 1980s collections. Features intentional deconstruction with asymmetrical details, raw unfinished edges, and exposed seams. Made from high-quality black wool with partial lining. A museum-worthy example of Kawakubo\'s revolutionary approach to fashion that challenged conventional Western tailoring.',
        condition: 'Excellent',
        price: 850.00,
        images: ['https://images.unsplash.com/photo-1535891169584-1cce69e42f69', 'https://images.unsplash.com/photo-1617137968427-85924c800a22'],
        measurements: {
          chest: '55cm',
          length: '74cm (asymmetrical)',
          shoulders: '46cm (asymmetrical)',
          sleeves: '62cm'
        },
        status: 'active',
        slug: 'comme-des-garcons-deconstructed-blazer-1980s'
      },
      {
        title: 'Silk Embroidered Button-Up Shirt',
        designer: 'Dries Van Noten',
        era: '1990s',
        description: 'Stunning Dries Van Noten silk shirt featuring intricate embroidery from his early 1990s collection. This piece showcases the Belgian designer\'s signature mix of traditional craftsmanship with contemporary design. Made from luxurious cream silk with colorful floral embroidery across the chest and back. Features a classic collar, front button closure, and single chest pocket.',
        condition: 'Very Good',
        price: 380.00,
        images: ['https://images.unsplash.com/photo-1626497764746-6dc36546b388', 'https://images.unsplash.com/photo-1604644401890-0bd678c83788'],
        measurements: {
          chest: '58cm',
          length: '76cm',
          shoulders: '47cm',
          sleeves: '64cm'
        },
        status: 'active',
        slug: 'dries-van-noten-embroidered-silk-shirt-1990s'
      }
    ];

    // Insert the products
    const { data, error } = await supabase
      .from('products')
      .insert(sampleProducts)
      .select();
    
    if (error) {
      if (error.message.includes('duplicate key value')) {
        console.log('Some products already exist. They will be skipped.');
      } else {
        throw error;
      }
    } else {
      console.log(`✅ Successfully inserted ${data.length} sample products!`);
    }
    
    // Verify products were inserted
    const { data: products, error: countError } = await supabase
      .from('products')
      .select('*');
    
    if (countError) {
      throw countError;
    }
    
    console.log(`Total products in database: ${products.length}`);
    return true;
    
  } catch (error) {
    console.error('❌ Error inserting sample products:', error.message);
    
    // Output instructions for the user to execute in the SQL Editor
    console.log('\nYou can also insert sample products by executing the following SQL in the Supabase SQL Editor:');
    
    console.log(`
-- Sample Product 1: Issey Miyake Pleated Shirt
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Pleated Button-Up Shirt in Black',
  'Issey Miyake',
  '1990s',
  'Rare vintage Issey Miyake pleated button-up shirt in black from the iconic 1990s collection. Features the signature micro-pleating technique that Miyake is renowned for. The pleating creates a textured appearance and makes the garment incredibly lightweight and comfortable to wear. Classic collar and full button closure.',
  'Excellent',
  450.00,
  '["https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99", "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3"]'::jsonb,
  '{"chest": "56cm (fits like M/L)", "length": "72cm", "shoulders": "48cm", "sleeves": "62cm"}'::jsonb,
  'active',
  'issey-miyake-pleated-shirt-black-1990s'
);

-- Sample Product 2: Yohji Yamamoto Wool Coat
INSERT INTO products (
  title, designer, era, description, condition, price, images, measurements, status, slug
) VALUES (
  'Asymmetrical Wool Coat in Charcoal',
  'Yohji Yamamoto',
  '1980s',
  'Iconic Yohji Yamamoto asymmetrical wool coat from his groundbreaking 1980s collections. Features the designer''s signature oversized silhouette with an asymmetrical front closure, deep pockets, and draped lapels. Made from high-quality heavyweight wool in a deep charcoal gray. The perfect statement piece that embodies the avant-garde Japanese design aesthetic of the era.',
  'Very Good',
  1200.00,
  '["https://images.unsplash.com/photo-1539533018447-63fcce2678e3", "https://images.unsplash.com/photo-1578932750294-f5075e85f44a"]'::jsonb,
  '{"chest": "64cm (oversized)", "length": "90cm", "shoulders": "56cm", "sleeves": "65cm"}'::jsonb,
  'active',
  'yohji-yamamoto-asymmetrical-wool-coat-1980s'
);
`);
    
    return false;
  }
}

async function verifyTables() {
  console.log('\nVerifying database setup...');
  
  try {
    // Check if products table exists and has data
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');
    
    if (productsError) {
      if (productsError.message.includes('relation') && productsError.message.includes('does not exist')) {
        console.log('❌ Products table does not exist yet.');
        return false;
      } 
      throw productsError;
    }
    
    console.log(`✅ Products table exists with ${products.length} records.`);
    
    // Check if orders table exists
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);
    
    if (ordersError) {
      if (ordersError.message.includes('relation') && ordersError.message.includes('does not exist')) {
        console.log('❌ Orders table does not exist yet.');
      } else {
        throw ordersError;
      }
    } else {
      console.log('✅ Orders table exists.');
    }
    
    // Check if order_items table exists
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('order_items')
      .select('*')
      .limit(1);
    
    if (orderItemsError) {
      if (orderItemsError.message.includes('relation') && orderItemsError.message.includes('does not exist')) {
        console.log('❌ OrderItems table does not exist yet.');
      } else {
        throw orderItemsError;
      }
    } else {
      console.log('✅ OrderItems table exists.');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error verifying tables:', error.message);
    return false;
  }
}

async function main() {
  // Verify connection to Supabase
  const connected = await checkConnection();
  
  if (!connected) {
    console.error('Failed to connect to Supabase. Cannot proceed with database setup.');
    process.exit(1);
  }
  
  // Create tables
  await createProductsTable();
  await createOrdersTables();
  
  // Try to insert sample products (only if tables exist)
  const tablesExists = await verifyTables();
  
  if (tablesExists) {
    await insertSampleProducts();
  }
  
  console.log('\nDatabase setup process completed.');
  console.log('If any steps failed, please follow the SQL instructions provided to complete setup manually.');
}

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});