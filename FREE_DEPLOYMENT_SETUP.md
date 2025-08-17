# Free Vercel Deployment Setup Guide

## Step 1: Set Up Free Database (PlanetScale)

### 1.1 Create PlanetScale Account
1. Go to [planetscale.com](https://planetscale.com)
2. Sign up for free account
3. Create a new database project

### 1.2 Get Database Connection String
1. In your PlanetScale dashboard, go to "Connect"
2. Copy the connection string (it looks like: `mysql://username:password@host/database`)
3. Add `?sslaccept=strict` at the end of the connection string

### 1.3 Set Environment Variable
In your Vercel dashboard, add:
```
DATABASE_URL=your_planetscale_connection_string?sslaccept=strict
```

## Step 2: Set Up Free File Storage (Cloudinary)

### 2.1 Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Get your credentials from the dashboard

### 2.2 Set Cloudinary Environment Variables
In your Vercel dashboard, add:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 3: Install Required Packages

Run these commands in your project:
```bash
npm install cloudinary multer @types/multer
```

## Step 4: Update Your Code

### 4.1 Create Cloudinary Configuration
Create `src/lib/cloudinary.ts`:
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

### 4.2 Update File Upload Logic
Replace local file storage with Cloudinary uploads in your admin product creation.

## Step 5: Set All Environment Variables

In your Vercel dashboard, set these:
```
DATABASE_URL=your_planetscale_connection_string?sslaccept=strict
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=your_sender_email
NEXT_PUBLIC_SERVER_URL=https://your-vercel-domain.vercel.app
ADMIN_USERNAME=your_admin_username
HASHED_ADMIN_PASSWORD=your_hashed_admin_password
```

## Step 6: Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set all environment variables
4. Deploy!

## Free Service Limits

### PlanetScale (Free Tier)
- 1 database
- 1 billion row reads/month
- 10 million row writes/month
- 5GB storage

### Cloudinary (Free Tier)
- 25GB storage
- 25GB bandwidth/month
- 25GB transformations/month

### Vercel (Free Tier)
- 100GB bandwidth/month
- 100GB storage
- 100GB function execution time

## Quick Setup Commands

```bash
# Install packages
npm install cloudinary multer @types/multer

# Generate Prisma client for MySQL
npx prisma generate

# Push schema to PlanetScale
npx prisma db push
```

## Troubleshooting

1. **Database Connection Error**: Make sure to add `?sslaccept=strict` to your PlanetScale connection string
2. **File Upload Error**: Check Cloudinary credentials
3. **Build Error**: Ensure all environment variables are set in Vercel

Would you like me to help you implement the Cloudinary integration in your code? 