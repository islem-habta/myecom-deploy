#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Environment Variables Setup Guide\n');

console.log('📋 Follow these steps to get your environment variables:\n');

console.log('1. 🌐 PLANETSCALE (Database)');
console.log('   - Go to: https://planetscale.com');
console.log('   - Sign up for free account');
console.log('   - Create new database project');
console.log('   - Go to "Connect" tab');
console.log('   - Copy the connection string');
console.log('   - Add "?sslaccept=strict" at the end\n');

console.log('2. ☁️ CLOUDINARY (File Storage)');
console.log('   - Go to: https://cloudinary.com');
console.log('   - Sign up for free account');
console.log('   - Get credentials from dashboard:');
console.log('     * Cloud Name');
console.log('     * API Key');
console.log('     * API Secret\n');

console.log('3. 💳 STRIPE (Payments)');
console.log('   - Go to: https://stripe.com');
console.log('   - Sign up for free account');
console.log('   - Get from dashboard:');
console.log('     * Secret Key (sk_test_...)');
console.log('     * Publishable Key (pk_test_...)');
console.log('     * Webhook Secret (whsec_...)\n');

console.log('4. 📧 RESEND (Email)');
console.log('   - Go to: https://resend.com');
console.log('   - Sign up for free account');
console.log('   - Get API key from dashboard\n');

console.log('5. 🔧 APP CONFIGURATION');
console.log('   - Set admin username and password\n');

console.log('Once you have all the values, run:');
console.log('vercel env add DATABASE_URL');
console.log('vercel env add CLOUDINARY_CLOUD_NAME');
console.log('vercel env add CLOUDINARY_API_KEY');
console.log('vercel env add CLOUDINARY_API_SECRET');
console.log('vercel env add STRIPE_SECRET_KEY');
console.log('vercel env add NEXT_PUBLIC_STRIPE_PUBLIC_KEY');
console.log('vercel env add STRIPE_WEBHOOK_SECRET');
console.log('vercel env add RESEND_API_KEY');
console.log('vercel env add SENDER_EMAIL');
console.log('vercel env add NEXT_PUBLIC_SERVER_URL');
console.log('vercel env add ADMIN_USERNAME');
console.log('vercel env add HASHED_ADMIN_PASSWORD\n');

console.log('Or use the Vercel dashboard to add them all at once!\n');

console.log('💰 Total Cost: $0/month (all services have generous free tiers)');
