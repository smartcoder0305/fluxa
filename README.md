# Fluxa - General Vibe Coding Application

A modern, full-stack coding application built with React and FastAPI, featuring authentication, database support, and payment integration.

## 🚀 Features

- **Frontend**: React 18 with TypeScript and ShadcnUI components
- **Backend**: FastAPI with modern Python features
- **Authentication**: JWT-based user authentication
- **Database**: SQLAlchemy with PostgreSQL support
- **Payments**: Stripe integration with pricing plans
- **Modern UI**: Beautiful, responsive design with dark/light themes
- **Flexible Environment**: Multi-environment configuration support

## 🏗️ Project Structure

```
fluxa/
├── frontend/          # React frontend application
├── backend/           # FastAPI backend application
├── shared/            # Shared types and utilities
├── docker-compose.yml # Development environment setup
├── docker-compose.env.example # Docker environment template
└── ENVIRONMENT_SETUP.md # Environment configuration guide
```

## 🛠️ Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- ShadcnUI for components
- Tailwind CSS for styling
- React Router for navigation
- Zustand for state management

### Backend

- FastAPI with Python 3.11+
- SQLAlchemy ORM
- PostgreSQL database
- JWT authentication
- Stripe payment integration
- Pydantic for data validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL
- Docker (recommended)

### Development Setup

#### Option 1: Docker (Recommended)

1. **Setup environment configuration:**

   ```bash
   # Copy environment templates
   cp docker-compose.env.example docker-compose.env
   # Note: env.example files are used directly by docker-compose.yml
   # No need to copy to .env files
   ```

2. **Start all services:**

   ```bash
   NODE_ENV=development docker-compose up
   ```

3. **Access the application:**

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Database: localhost:5432

#### Option 2: Manual Setup

1. **Setup backend:**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt

   # Note: env.example files are used directly
   # No need to copy to .env files

   uvicorn main:app --reload
   ```

2. **Setup frontend:**

   ```bash
   cd frontend
   npm install

   # Note: env.example files are used directly
   # No need to copy to .env files

   npm run dev
   ```

3. **Setup database:**

   ```bash
   # Create PostgreSQL database
   createdb fluxa_dev

   # Run migrations
   cd backend
   alembic upgrade head
   ```

### Environment Configuration

The project now supports flexible environment configuration for different deployment scenarios:

- **Development**: `env.development` files
- **Staging**: `env.staging` files
- **Production**: `env.production` files

For detailed environment setup instructions, see [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md).

#### Quick Environment Setup

```bash
# Development
NODE_ENV=development docker-compose up

# Production (after configuring production env files)
NODE_ENV=production docker-compose up -d
```

## 📱 Features

- **User Authentication**: Sign up, login, password reset
- **Dashboard**: Personal coding workspace
- **Projects**: Create and manage coding projects
- **Pricing Plans**: Multiple subscription tiers
- **Payment Processing**: Secure Stripe integration
- **Responsive Design**: Works on all devices

## 🔧 Development

- **Backend API**: http://localhost:8000
- **Frontend Dev Server**: http://localhost:5173
- **API Documentation**: http://localhost:8000/docs

## 📄 License

MIT License - see LICENSE file for details
