const { execSync } = require('child_process');

console.log('🚀 Adding Environment Variables to Vercel\n');

const envVars = [
  {
    name: 'NEXT_PUBLIC_SERVER_URL',
    value: 'https://my-fpzuiyr5x-islems-projects-9bb88426.vercel.app',
    description: 'Your Vercel app URL'
  },
  {
    name: 'ADMIN_USERNAME',
    value: 'admin',
    description: 'Admin login username'
  },
  {
    name: 'HASHED_ADMIN_PASSWORD',
    value: '$2a$10$your_hashed_password_here',
    description: 'Hashed admin password (use bcrypt)'
  }
];

console.log('📋 Required Environment Variables:\n');

envVars.forEach((env, index) => {
  console.log(`${index + 1}. ${env.name}`);
  console.log(`   Description: ${env.description}`);
  console.log(`   Value: ${env.value}\n`);
});

console.log('🌐 Services to set up:\n');
console.log('1. PlanetScale (Database) - https://planetscale.com');
console.log('2. Cloudinary (File Storage) - https://cloudinary.com');
console.log('3. Stripe (Payments) - https://stripe.com');
console.log('4. Resend (Email) - https://resend.com\n');

console.log('💡 Quick Setup Instructions:\n');
console.log('1. Go to your Vercel dashboard');
console.log('2. Select your project');
console.log('3. Go to Settings > Environment Variables');
console.log('4. Add each variable from the list above');
console.log('5. Set up the free services to get their API keys\n');

console.log('🔗 Vercel Dashboard: https://vercel.com/dashboard');
