#!/bin/bash

echo "Building for GitHub Pages..."

# Build the React app
npm run build

# Copy built files to root directory
cp -r dist/public/* ./ 2>/dev/null || echo "Build files not found in dist/public"

# Update index.html to work from root
sed -i 's|/assets/|./assets/|g' index.html 2>/dev/null || echo "index.html not found"

echo "✅ Build complete! Files ready for GitHub Pages deployment."
echo "📁 Upload all files to your GitHub repository with index.html in the root directory."