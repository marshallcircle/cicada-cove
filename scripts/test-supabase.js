// Test Supabase Connection Script
require('dotenv').config({ path: './.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('Environment variables:');
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'Not found');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '[CONFIGURED]' : 'Not found');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables!');
    process.exit(1);
  }
  
  try {
    // Create the Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Simple health check
    console.log('Testing connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log('Session data retrieved successfully');
    
    console.log('\nNext steps:');
    console.log('1. Go to https://supabase.com/dashboard and select your project');
    console.log('2. Go to the SQL Editor');
    console.log('3. Open the supabase-tables.sql file from this project');
    console.log('4. Run the SQL commands to create your tables');
    
  } catch (error) {
    console.error('❌ Supabase connection test failed:');
    console.error(error);
    
    console.log('\nPossible issues:');
    console.log('- Wrong API keys');
    console.log('- Network connectivity problems');
    console.log('- Supabase service may be down');
    
    process.exit(1);
  }
}

testSupabaseConnection();