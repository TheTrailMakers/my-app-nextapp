#!/bin/bash
# Quick Start Guide for Production Booking System

echo "🚀 Trail Makers Booking System - Quick Start"
echo "============================================="
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install razorpay winston
# Or if using pnpm:
# pnpm add razorpay winston

echo ""
echo "✅ Dependencies installed"
echo ""

# Step 2: Configure environment
echo "🔧 Step 2: Setting up environment variables..."
echo ""
echo "Create/update .env.local with:"
echo ""
cat <<'EOF'
# Database (required)
DATABASE_URL=postgresql://user:password@localhost:5432/trek_booking

# NextAuth (required for authentication)
NEXTAUTH_SECRET=your-secret-min-32-chars-here
NEXTAUTH_URL=http://localhost:3000

# Razorpay (for payments - get from https://dashboard.razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=whsec_xxxxx

# Optional: Logging & Monitoring
LOG_LEVEL=info
SENTRY_DSN=https://xxx@sentry.io/xxx

# Optional: Email Service (for confirmations)
SENDGRID_API_KEY=SG.xxxx
ADMIN_EMAILS=admin@yourdomain.com

# Optional: Redis (for caching & rate limiting)
REDIS_URL=redis://localhost:6379
EOF

echo ""
read -p "Press Enter once you've set up .env.local"
echo ""

# Step 3: Database setup
echo "🗄️  Step 3: Setting up database..."
echo ""
echo "Options:"
echo "1. Use existing PostgreSQL database"
echo "2. Use Neon (free cloud PostgreSQL) - Recommended"
echo "3. Use Supabase (PostgreSQL + extras)"
echo ""
read -p "Select option (1-3): " db_option

if [ "$db_option" = "2" ]; then
  echo ""
  echo "📝 Creating Neon database:"
  echo "1. Go to https://console.neon.tech"
  echo "2. Create new project"
  echo "3. Copy DATABASE_URL"
  echo "4. Paste in .env.local"
  echo ""
  read -p "Press Enter when done with Neon setup"
fi

# Step 4: Run migrations
echo ""
echo "📚 Step 4: Running database migrations..."
npx prisma db push

echo ""
echo "✅ Database schema created"
echo ""

# Step 5: Seed database
echo "🌱 Step 5: Seeding database with sample treks..."
npm run db:seed

echo ""
echo "✅ Database seeded with 3 sample treks and 7 departures"
echo ""

# Step 6: Start development server
echo "🎯 Step 6: Starting development server..."
echo ""
echo "Run: npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""

echo "============================================="
echo "✅ Setup complete!"
echo "============================================="
echo ""
echo "📋 Next Steps:"
echo "1. Test login at /login (use signup to create account)"
echo "2. View treks at /all"
echo "3. Click trek to see departures and book"
echo "4. Complete payment with test Razorpay card"
echo ""
echo "🧪 Test Razorpay Cards (in Sandbox):"
echo "Success: 4111 1111 1111 1111"
echo "Decline: 4000 0000 0000 0002"
echo "Expiry: Any future date"
echo "CVV: Any 3 digits"
echo ""
echo "📚 Documentation:"
echo "- Architecture: ./ARCHITECTURE.md"
echo "- Implementation: ./IMPLEMENTATION_GUIDE.md"
echo "- Database: ./prisma/schema.prisma"
echo ""
echo "🚀 Ready to build and ship!"
