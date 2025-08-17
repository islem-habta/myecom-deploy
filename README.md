# 🛍️ Digital Ecommerce Store

A modern, full-stack ecommerce platform built with Next.js 14, featuring digital product sales, secure payments, and admin management.

## ✨ Features

### 🛒 Customer Features
- **Digital Product Storefront** - Browse and purchase digital products
- **Secure Checkout** - Stripe-powered payment processing
- **Instant Downloads** - Secure file downloads with verification
- **Order History** - Track all purchases and download history
- **Responsive Design** - Works perfectly on desktop and mobile

### 🔧 Admin Features
- **Product Management** - Add, edit, and manage digital products
- **Order Management** - View and manage customer orders
- **User Management** - Monitor customer accounts
- **Analytics Dashboard** - Sales, customer, and product statistics
- **File Upload** - Cloud storage for product files and images

### 🛡️ Security Features
- **Secure File Downloads** - Time-limited download links
- **Payment Verification** - Stripe webhook integration
- **User Authentication** - Protected admin routes
- **Cloud Storage** - Secure file hosting with Cloudinary

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL (PlanetScale)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **File Storage**: Cloudinary
- **Email**: Resend
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/digital-ecommerce.git
   cd digital-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Email (Resend)
   RESEND_API_KEY="re_..."
   SENDER_EMAIL="noreply@yourdomain.com"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables Setup

Set these in your Vercel dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PlanetScale MySQL connection string | `mysql://...?sslaccept=strict` |
| `NEXTAUTH_SECRET` | Random secret for authentication | `random-string-here` |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-secret` |
| `RESEND_API_KEY` | Resend API key | `re_...` |
| `SENDER_EMAIL` | Email sender address | `noreply@yourdomain.com` |

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - Customer accounts and authentication
- **Products** - Digital products with files and metadata
- **Orders** - Customer purchases and payment records
- **Downloads** - Secure download verification tokens

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (customerFacing)/   # Customer-facing pages
│   ├── admin/             # Admin dashboard
│   ├── webhooks/          # API webhooks
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── db/                    # Database configuration
├── lib/                   # Utility functions
└── actions/               # Server actions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database

## 🛡️ Security Considerations

- All file downloads are verified and time-limited
- Payment processing uses Stripe's secure infrastructure
- Admin routes are protected with authentication
- Environment variables are properly secured
- Database connections use SSL encryption

## 📧 Email Notifications

The application sends emails for:
- Order confirmations
- Download links
- Payment receipts
- Order history requests

## 🔄 API Endpoints

- `POST /api/webhooks/stripe` - Stripe webhook handler
- `GET /api/products/download/[id]` - Secure file downloads
- `POST /api/orders` - Order creation
- `GET /api/admin/*` - Admin API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/digital-ecommerce/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Subscription products
- [ ] Affiliate system
- [ ] Mobile app
- [ ] Advanced search and filtering

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting
- [Stripe](https://stripe.com/) for payments
- [PlanetScale](https://planetscale.com/) for database
- [Cloudinary](https://cloudinary.com/) for file storage
- [shadcn/ui](https://ui.shadcn.com/) for UI components

---

**Built with ❤️ using Next.js 14**
