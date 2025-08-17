# PowerShell script to add environment variables to Vercel

Write-Host "🚀 Setting up environment variables for Vercel..." -ForegroundColor Green

# Environment variables to add
$envVars = @{
    "NEXT_PUBLIC_SERVER_URL" = "https://my-fpzuiyr5x-islems-projects-9bb88426.vercel.app"
    "ADMIN_USERNAME" = "admin"
    "HASHED_ADMIN_PASSWORD" = '$2a$10$placeholder_hashed_password'
    "DATABASE_URL" = "mysql://placeholder:placeholder@placeholder/placeholder?sslaccept=strict"
    "CLOUDINARY_CLOUD_NAME" = "placeholder_cloud_name"
    "CLOUDINARY_API_KEY" = "placeholder_api_key"
    "CLOUDINARY_API_SECRET" = "placeholder_api_secret"
    "STRIPE_SECRET_KEY" = "sk_test_placeholder"
    "NEXT_PUBLIC_STRIPE_PUBLIC_KEY" = "pk_test_placeholder"
    "STRIPE_WEBHOOK_SECRET" = "whsec_placeholder"
    "RESEND_API_KEY" = "re_placeholder"
    "SENDER_EMAIL" = "placeholder@example.com"
}

# Environments to add to
$environments = @("production", "preview", "development")

foreach ($envVar in $envVars.GetEnumerator()) {
    $name = $envVar.Key
    $value = $envVar.Value
    
    Write-Host "Adding $name..." -ForegroundColor Yellow
    
    foreach ($env in $environments) {
        try {
            # Create a temporary file with the value
            $tempFile = "temp_$name.txt"
            $value | Out-File -FilePath $tempFile -Encoding UTF8
            
            # Add the environment variable
            Get-Content $tempFile | vercel env add $name $env
            
            # Clean up
            Remove-Item $tempFile -ErrorAction SilentlyContinue
            
            Write-Host "  ✅ Added to $env" -ForegroundColor Green
        }
        catch {
            Write-Host "  ❌ Failed to add to $env" -ForegroundColor Red
        }
    }
}

Write-Host "`n🎉 Environment variables setup complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to Vercel dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Select your project" -ForegroundColor White
Write-Host "3. Go to Settings > Environment Variables" -ForegroundColor White
Write-Host "4. Update placeholder values with real API keys" -ForegroundColor White
Write-Host "`n🔗 Services to set up:" -ForegroundColor Cyan
Write-Host "- PlanetScale: https://planetscale.com" -ForegroundColor White
Write-Host "- Cloudinary: https://cloudinary.com" -ForegroundColor White
Write-Host "- Stripe: https://stripe.com" -ForegroundColor White
Write-Host "- Resend: https://resend.com" -ForegroundColor White
