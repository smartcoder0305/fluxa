#!/bin/bash

echo "🚀 Setting up Fluxa - General Vibe Coding Application"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Create environment files
echo "📝 Creating environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env (please update with your actual values)"
else
    echo "ℹ️  backend/.env already exists"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/env.example frontend/.env
    echo "✅ Created frontend/.env (please update with your actual values)"
else
    echo "ℹ️  frontend/.env already exists"
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the environment files with your actual values:"
echo "   - backend/.env (especially Stripe keys and database URL)"
echo "   - frontend/.env (API URL and Stripe publishable key)"
echo ""
echo "2. Start the application:"
echo "   docker-compose up -d"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo ""
echo "4. Create your first superuser account:"
echo "   - Email: admin@fluxa.com"
echo "   - Password: admin123"
echo ""
echo "Happy coding! 🎯" 