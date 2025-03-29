#!/usr/bin/env node
// Supabase Database Setup Helper
require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are defined in .env.local');
  process.exit(1);
}

console.log('Cicada Cove - Supabase Database Setup Helper');
console.log('=============================================');
console.log();

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkConnection() {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test failed:');
    console.error(error);
    return false;
  }
}

function openSupabaseDashboard() {
  console.log('\nOpening Supabase dashboard...');
  
  // Extract project ID from URL
  const projectId = supabaseUrl.match(/https:\/\/([^.]+)/)?.[1];
  
  if (!projectId) {
    console.log('Could not determine project ID from URL');
    console.log(`Please manually navigate to: https://app.supabase.com/project/_/sql`);
    return;
  }
  
  const dashboardUrl = `https://app.supabase.com/project/${projectId}/sql`;
  
  let command;
  switch (process.platform) {
    case 'darwin': // macOS
      command = `open "${dashboardUrl}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${dashboardUrl}"`;
      break;
    default: // Linux and others
      command = `xdg-open "${dashboardUrl}"`;
  }
  
  console.log(`Opening: ${dashboardUrl}`);
  
  exec(command, (error) => {
    if (error) {
      console.error(`Could not open browser: ${error.message}`);
      console.log(`Please manually navigate to: ${dashboardUrl}`);
    }
  });
}

function displaySQLInstructions() {
  const sqlFilePath = path.join(__dirname, '..', 'supabase-tables.sql');
  
  console.log('\nTo set up your database:');
  console.log('1. Go to the SQL Editor in your Supabase dashboard');
  console.log('2. Copy and paste the SQL commands from the supabase-tables.sql file');
  console.log('3. Execute the SQL script to create all tables and indexes');
  console.log();
  
  if (fs.existsSync(sqlFilePath)) {
    console.log('SQL file found at:', sqlFilePath);
    console.log('\nContents of SQL file:');
    console.log('===================');
    
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(sqlContent);
    console.log('===================');
  } else {
    console.error('SQL file not found at:', sqlFilePath);
  }
}

async function main() {
  const connected = await checkConnection();
  
  if (!connected) {
    console.log('\nPlease check your Supabase configuration and try again.');
    process.exit(1);
  }
  
  openSupabaseDashboard();
  displaySQLInstructions();
  
  console.log('\nAfter setting up your database, you can run the Next.js development server:');
  console.log('npm run dev');
}

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});