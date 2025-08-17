const { execSync } = require('child_process');

console.log('🚀 Automatically setting up environment variables...\n');

const envVars = [
  {
    name: 'NEXT_PUBLIC_SERVER_URL',
    value: 'https://my-fpzuiyr5x-islems-projects-9bb88426.vercel.app'
  },
  {
    name: 'ADMIN_USERNAME',
    value: 'admin'
  },
  {
    name: 'HASHED_ADMIN_PASSWORD',
    value: '$2a$10$placeholder_hashed_password'
  },
  {
    name: 'DATABASE_URL',
    value: 'mysql://placeholder:placeholder@placeholder/placeholder?sslaccept=strict'
  },
  {
    name: 'CLOUDINARY_CLOUD_NAME',
    value: 'placeholder_cloud_name'
  },
  {
    name: 'CLOUDINARY_API_KEY',
    value: 'placeholder_api_key'
  },
  {
    name: 'CLOUDINARY_API_SECRET',
    value: 'placeholder_api_secret'
  },
  {
    name: 'STRIPE_SECRET_KEY',
    value: 'sk_test_placeholder'
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLIC_KEY',
    value: 'pk_test_placeholder'
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    value: 'whsec_placeholder'
  },
  {
    name: 'RESEND_API_KEY',
    value: 're_placeholder'
  },
  {
    name: 'SENDER_EMAIL',
    value: 'placeholder@example.com'
  }
];

async function addEnvVar(name, value) {
  try {
    console.log(`Adding ${name}...`);
    
    // Create a temporary file with the value
    const fs = require('fs');
    const tempFile = `temp_${name}.txt`;
    fs.writeFileSync(tempFile, value);
    
    // Use the file as input for the vercel command
    const command = `echo "${value}" | vercel env add ${name}`;
    execSync(command, { stdio: 'inherit' });
    
    // Clean up
    fs.unlinkSync(tempFile);
    
    console.log(`✅ Added ${name}`);
  } catch (error) {
    console.log(`❌ Failed to add ${name}: ${error.message}`);
  }
}

async function setupAllEnvVars() {
  console.log('Starting environment variable setup...\n');
  
  for (const envVar of envVars) {
    await addEnvVar(envVar.name, envVar.value);
    // Wait a bit between commands
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 Environment variables setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Go to Vercel dashboard: https://vercel.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to Settings > Environment Variables');
  console.log('4. Update the placeholder values with real API keys');
  console.log('\n🔗 Services to set up:');
  console.log('- PlanetScale: https://planetscale.com');
  console.log('- Cloudinary: https://cloudinary.com');
  console.log('- Stripe: https://stripe.com');
  console.log('- Resend: https://resend.com');
}

setupAllEnvVars().catch(console.error);
