const { execSync } = require('child_process');

console.log('🌐 Setting up PlanetScale Database...\n');

console.log('📋 Steps to get your DATABASE_URL:\n');

console.log('1. Go to: https://planetscale.com');
console.log('2. Sign up for free account');
console.log('3. Create new database project');
console.log('4. Go to "Connect" tab');
console.log('5. Copy the connection string');
console.log('6. Add "?sslaccept=strict" at the end\n');

console.log('🔗 Example connection string:');
console.log('mysql://username:password@host/database?sslaccept=strict\n');

console.log('💡 Once you have the connection string:');
console.log('1. Go to Vercel dashboard: https://vercel.com/dashboard');
console.log('2. Select your project: my-app');
console.log('3. Go to Settings > Environment Variables');
console.log('4. Find DATABASE_URL and update the value');
console.log('5. Redeploy: vercel --prod\n');

console.log('🎯 After setting up PlanetScale, we\'ll set up:');
console.log('- Cloudinary (file storage)');
console.log('- Stripe (payments)');
console.log('- Resend (email)\n');

console.log('💰 PlanetScale Free Tier:');
console.log('- 1 database');
console.log('- 1 billion row reads/month');
console.log('- 10 million row writes/month');
console.log('- 5GB storage');
console.log('- $0/month\n');

console.log('Ready to continue? Let me know when you have your PlanetScale connection string!');
