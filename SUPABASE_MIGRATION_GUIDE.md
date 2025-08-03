# Supabase Migration & Vercel Deployment Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the database to be set up (2-3 minutes)

## Step 2: Set up Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the content from `supabase_schema.sql`
4. Click **Run** to create all tables and policies

## Step 3: Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy your Project URL and anon public key
3. Create a `.env` file in your project root:

```env
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
JWT_SECRET=your-existing-jwt-secret
NODE_ENV=development
```

## Step 4: Migrate Your Data

1. Update the migration script with your Supabase credentials:
   ```bash
   # Set environment variables or edit the script directly
   export SUPABASE_URL="your_project_url"
   export SUPABASE_SERVICE_KEY="your_service_key"
   ```

2. Run the migration:
   ```bash
   node migrate-to-supabase.mjs
   ```

## Step 5: Test Locally

1. Update your `.env` file with the correct Supabase credentials
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Test registration, login, and messaging to ensure everything works

## Step 6: Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Deploy your project:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add the same environment variables from your `.env` file
   - Redeploy if needed

## Step 7: Configure File Uploads (Optional)

For file uploads to work in production, you have a few options:

### Option A: Supabase Storage
1. Enable Storage in your Supabase project
2. Create a bucket called "uploads"
3. Update your upload API to use Supabase storage

### Option B: Vercel Blob Storage
1. Add `@vercel/blob` to your dependencies
2. Update upload endpoints to use Vercel Blob

### Option C: Cloudinary (Recommended)
1. Create a Cloudinary account
2. Add `cloudinary` package
3. Update upload endpoints

## Troubleshooting

### Common Issues:

1. **Migration fails**: Check your service key and URL
2. **Authentication doesn't work**: Verify JWT_SECRET is the same
3. **Database connection fails**: Check your environment variables
4. **Deployment fails**: Ensure all environment variables are set in Vercel

### Testing the Migration:

```bash
# Test user registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test user login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Benefits of Supabase Migration:

✅ **Real-time**: Built-in real-time subscriptions
✅ **Scalable**: PostgreSQL database that scales
✅ **Secure**: Row Level Security (RLS) built-in
✅ **File Storage**: Built-in file storage solution
✅ **Authentication**: Advanced auth features available
✅ **Vercel Compatible**: Works perfectly with Vercel deployments

## Next Steps After Migration:

1. **Real-time Chat**: Implement Supabase real-time subscriptions
2. **File Storage**: Set up proper file upload handling
3. **Advanced Auth**: Add social login, password reset, etc.
4. **Performance**: Add database indexes for better performance
5. **Monitoring**: Set up logging and monitoring

Your app will now be fully production-ready and deployable to Vercel!
