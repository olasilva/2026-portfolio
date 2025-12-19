#!/bin/bash

# Cyber Portfolio Deployment Script
echo "🚀 Deploying Silva Ola Cyber Portfolio..."

# Step 1: Check environment
echo "🔍 Checking environment..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Step 2: Setup email if not configured
if [ ! -f ".env" ]; then
    echo "📧 Email configuration not found..."
    read -p "Do you want to setup email now? (y/n): " setup_email
    if [ "$setup_email" = "y" ]; then
        node scripts/setup-email.js
    fi
fi

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 4: Test locally
echo "🧪 Testing locally..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Test health endpoint
curl -s http://localhost:5000/api/health | grep -q "operational"
if [ $? -eq 0 ]; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID
    exit 1
fi

kill $BACKEND_PID

# Step 5: Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

# Step 6: Set environment variables on Vercel
echo "⚙️ Setting environment variables..."
if [ -f ".env" ]; then
    while IFS= read -r line; do
        if [[ $line != "" && $line != \#* ]]; then
            key=$(echo $line | cut -d'=' -f1)
            value=$(echo $line | cut -d'=' -f2-)
            vercel env add "$key" "$value"
        fi
    done < .env
fi

echo "🎉 Deployment complete!"
echo "🌐 Your portfolio is live at: https://your-project.vercel.app"
echo "📧 Contact form will send emails to your configured address"