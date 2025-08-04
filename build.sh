#!/bin/bash
# Build script for Vercel deployment

# Navigate to frontend directory and build
cd frontend
npm install
npm run build

# Return to root directory
cd ..

echo "Build completed successfully"
