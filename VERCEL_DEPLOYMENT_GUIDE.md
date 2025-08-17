# Vercel Deployment Guide

## Issues to Fix Before Deployment

### 1. Database Migration (CRITICAL)
Your app currently uses SQLite which won't work on Vercel. You need to migrate to a cloud database.

**Option A: Use Vercel Postgres (Recommended)**
1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Get the connection string
4. Update your Prisma schema

**Option B: Use PlanetScale (Free tier available)**
1. Sign up at planetscale.com
2. Create a new database
3. Get the connection string

### 2. Update Prisma Schema
Replace your current `prisma/schema.prisma` with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql" for PlanetScale
  url      = env("DATABASE_URL")
}

// ... rest of your models stay the same
```

### 3. File Storage Migration
Your app currently stores files locally. You need cloud storage:

**Option A: Use Vercel Blob Storage**
```bash
npm install @vercel/blob
```

**Option B: Use AWS S3 or similar**

### 4. Environment Variables
Set these in your Vercel dashboard:

```
DATABASE_URL=your_database_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=your_sender_email
NEXT_PUBLIC_SERVER_URL=https://your-vercel-domain.vercel.app
ADMIN_USERNAME=your_admin_username
HASHED_ADMIN_PASSWORD=your_hashed_admin_password
```

### 5. Build Command
Your current build command is correct:
```json
"build": "prisma generate && next build"
```

## Step-by-Step Deployment Process

1. **Set up cloud database** (Postgres/MySQL)
2. **Update Prisma schema** to use cloud database
3. **Set up cloud file storage** (Vercel Blob/AWS S3)
4. **Update file upload logic** to use cloud storage
5. **Set environment variables** in Vercel dashboard
6. **Deploy to Vercel**

## Quick Fix for Testing

If you want to test deployment quickly, you can temporarily:

1. Comment out database operations
2. Use mock data
3. Remove file upload functionality

But for production, you'll need the full migration to cloud services.

## Common Vercel Errors

- **Build Error**: Usually missing environment variables
- **Runtime Error**: Database connection issues
- **File Upload Error**: Local file system not available
- **Prisma Error**: Missing database or wrong connection string

## Next Steps

1. Choose your cloud database provider
2. Set up the database
3. Update your code to use cloud storage
4. Set environment variables
5. Deploy to Vercel

Would you like me to help you implement any of these specific solutions? 