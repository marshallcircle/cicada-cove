# Supabase Setup Guide for Cicada Cove

This guide explains how to set up Supabase for the Cicada Cove e-commerce platform.

## Project Initialization

1. Sign up or log in at [supabase.com](https://supabase.com)
2. Create a new project named "cicada-cove"
3. Choose a strong database password and save it securely
4. Select the region closest to your target audience
5. Wait for the project to be created (usually takes a few minutes)

## Environment Variables

After creating the project, you need to set up the environment variables in your local development environment:

1. Create a `.env.local` file in the project root (already added to `.gitignore`)
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. Replace the placeholders with your actual values from the Supabase project dashboard

## Database Schema Setup

You can set up the database in two ways:

### Option 1: Using the SQL Editor in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase/migrations/20250329_initial_schema.sql`
4. Paste into the SQL Editor and execute
5. Repeat for the seed data in `supabase/seed.sql` if you want test data

### Option 2: Using Supabase CLI (Recommended for Development)

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Log in to Supabase:
   ```bash
   supabase login
   ```

3. Initialize Supabase in your project (if not already done):
   ```bash
   supabase init
   ```

4. Link to your remote project:
   ```bash
   supabase link --project-ref your-project-id
   ```

5. Apply migrations:
   ```bash
   supabase db push
   ```

## Authentication Setup

The SQL scripts have already configured Row Level Security and permissions. To set up authentication:

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure Site URL as `http://localhost:3000` for local development
3. Add additional redirect URLs as needed
4. Under Email Templates, customize the invitation and confirmation emails to match your brand
5. Configure Email Auth provider settings:
   - Enable email confirmations
   - Enable email signup
   - Set custom approved email domains if needed

## Testing the Setup

To test if your Supabase setup is working correctly:

1. Run your Next.js application locally:
   ```bash
   npm run dev
   ```

2. Test authentication by creating a new account through your application
3. Check if products are loaded correctly on the shop page
4. Attempt to create an order to test the full flow

## Next Steps

After setting up the database and authentication:

1. Implement the frontend components to interact with Supabase
2. Set up storage buckets for product images
3. Configure production environment variables
4. Set up backup strategies for your database