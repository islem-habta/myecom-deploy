import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          🛍️ Ecommerce Store
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your digital marketplace is ready! Set up the database to start selling.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 Quick Setup Guide
          </h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">1</span>
              <span>Go to <a href="https://planetscale.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PlanetScale.com</a> and create free database</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">2</span>
              <span>Copy your connection string and add <code className="bg-gray-100 px-2 py-1 rounded">?sslaccept=strict</code></span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">3</span>
              <span>Update <code className="bg-gray-100 px-2 py-1 rounded">DATABASE_URL</code> in Vercel dashboard</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">4</span>
              <span>Redeploy and your store will be live! 🎉</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💰 Free Forever</h3>
            <p className="text-gray-600">All services have generous free tiers</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">⚡ Fast Setup</h3>
            <p className="text-gray-600">Get your store running in minutes</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔒 Secure</h3>
            <p className="text-gray-600">Built with modern security practices</p>
          </div>
        </div>

        <div className="space-x-4">
          <Link 
            href="/admin" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Admin Panel
          </Link>
          
          <a 
            href="https://vercel.com/dashboard" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Vercel Dashboard
          </a>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Check the <code className="bg-gray-100 px-2 py-1 rounded">FIX_DEPLOYMENT.md</code> file in your project</p>
        </div>
      </div>
    </div>
  )
}
