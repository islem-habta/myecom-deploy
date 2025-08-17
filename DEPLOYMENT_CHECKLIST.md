# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Database Setup (PlanetScale - FREE)
- [ ] Sign up at [planetscale.com](https://planetscale.com)
- [ ] Create new database project
- [ ] Copy connection string from "Connect" tab
- [ ] Add `?sslaccept=strict` to the end of connection string

### 2. File Storage Setup (Cloudinary - FREE)
- [ ] Sign up at [cloudinary.com](https://cloudinary.com)
- [ ] Get credentials from dashboard:
  - Cloud Name
  - API Key
  - API Secret

### 3. Install Dependencies
```bash
npm install cloudinary multer @types/multer
```

## ✅ Environment Variables (Set in Vercel Dashboard)

### Database
- [ ] `DATABASE_URL` = your_planetscale_connection_string?sslaccept=strict

### Cloudinary
- [ ] `CLOUDINARY_CLOUD_NAME` = your_cloud_name
- [ ] `CLOUDINARY_API_KEY` = your_api_key
- [ ] `CLOUDINARY_API_SECRET` = your_api_secret

### Stripe
- [ ] `STRIPE_SECRET_KEY` = your_stripe_secret_key
- [ ] `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` = your_stripe_public_key
- [ ] `STRIPE_WEBHOOK_SECRET` = your_stripe_webhook_secret

### Email (Resend)
- [ ] `RESEND_API_KEY` = your_resend_api_key
- [ ] `SENDER_EMAIL` = your_sender_email

### App Configuration
- [ ] `NEXT_PUBLIC_SERVER_URL` = https://your-vercel-domain.vercel.app
- [ ] `ADMIN_USERNAME` = your_admin_username
- [ ] `HASHED_ADMIN_PASSWORD` = your_hashed_admin_password

## ✅ Deploy to Vercel

1. [ ] Push code to GitHub
2. [ ] Connect repository to Vercel
3. [ ] Set all environment variables above
4. [ ] Deploy!

## ✅ Post-Deployment

1. [ ] Test admin login
2. [ ] Test product creation
3. [ ] Test file uploads
4. [ ] Test Stripe payments
5. [ ] Test email sending

## 🔧 Quick Commands

```bash
# Generate Prisma client for MySQL
npx prisma generate

# Push schema to PlanetScale
npx prisma db push

# Install dependencies
npm install

# Build locally to test
npm run build
```

## 🆘 Troubleshooting

- **Build fails**: Check all environment variables are set
- **Database error**: Verify PlanetScale connection string
- **File upload fails**: Check Cloudinary credentials
- **Payment fails**: Verify Stripe keys

## 💰 Cost Summary

- **PlanetScale**: FREE (1 database, 1B reads/month)
- **Cloudinary**: FREE (25GB storage, 25GB bandwidth/month)
- **Vercel**: FREE (100GB bandwidth/month)
- **Stripe**: FREE (no monthly fees, only transaction fees)
- **Resend**: FREE (3,000 emails/month)

**Total Cost: $0/month** 🎉 