#!/bin/bash

# Build script for Vercel deployment
echo "🚀 Building CondfyNews API for Vercel..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Copy dist files to root for Vercel
echo "📁 Copying build files..."
cp -r dist/* .

echo "✅ Build completed successfully!"
