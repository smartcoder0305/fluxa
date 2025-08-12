#!/bin/bash

echo "Testing Fluxa Environment Configuration"
echo "======================================"

# Check if required files exist
echo "Checking environment files..."
if [ -f "docker-compose.env" ]; then
    echo "✅ docker-compose.env exists"
else
    echo "❌ docker-compose.env missing"
fi

if [ -f "backend/env.example" ]; then
    echo "✅ backend/env.example exists"
else
    echo "❌ backend/env.example missing"
fi

if [ -f "backend/env.development" ]; then
    echo "✅ backend/env.development exists"
else
    echo "❌ backend/env.development missing"
fi

if [ -f "frontend/env.example" ]; then
    echo "✅ frontend/env.example exists"
else
    echo "❌ frontend/env.example missing"
fi

if [ -f "frontend/env.development" ]; then
    echo "✅ frontend/env.development exists"
else
    echo "❌ frontend/env.development missing"
fi

# Test environment variable loading
echo ""
echo "Testing environment variable loading..."
export NODE_ENV=development

echo "NODE_ENV: $NODE_ENV"
echo "POSTGRES_DB: ${POSTGRES_DB:-fluxa_dev}"
echo "BACKEND_PORT: ${BACKEND_PORT:-8000}"
echo "FRONTEND_PORT: ${FRONTEND_PORT:-5173}"

# Test docker-compose config
echo ""
echo "Testing docker-compose configuration..."
if command -v docker-compose &> /dev/null; then
    echo "✅ docker-compose is available"
    echo "Version: $(docker-compose --version)"
else
    echo "❌ docker-compose not found"
fi

if command -v docker &> /dev/null; then
    echo "✅ docker is available"
    echo "Version: $(docker --version)"
else
    echo "❌ docker not found"
fi

echo ""
echo "Environment test completed!"
echo ""
echo "To start services, run:"
echo "  NODE_ENV=development docker-compose up -d"
echo ""
echo "To build services, run:"
echo "  docker-compose build"
