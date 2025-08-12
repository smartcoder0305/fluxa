# Environment Configuration Guide

This guide explains how to configure environment variables for different deployment scenarios in the Fluxa project.

## Overview

The project now uses a flexible environment configuration system that allows you to:

- Configure different environments (development, staging, production)
- Override default values without hardcoding
- Use environment-specific configurations
- Maintain security best practices

## File Structure

```
fluxa/
├── docker-compose.env.example          # Docker compose environment template
├── docker-compose.env                  # Docker compose environment (copy from example)
├── backend/
│   ├── env.example                    # Backend environment template
│   ├── env.development               # Development-specific backend config
│   └── env.production                # Production-specific backend config
├── frontend/
│   ├── env.example                    # Frontend environment template
│   ├── env.development               # Development-specific frontend config
│   └── env.production                # Production-specific frontend config
└── docker-compose.yml                 # Uses environment files
```

## Quick Setup

### 1. Development Environment

```bash
# Copy environment templates
cp docker-compose.env.example docker-compose.env
# Note: env.example files are used directly by docker-compose.yml
# No need to copy to .env files

# Start services
NODE_ENV=development docker-compose up
```

### 2. Production Environment

```bash
# Copy environment templates
cp docker-compose.env.example docker-compose.env
# Note: env.example files are used directly by docker-compose.yml
# No need to copy to .env files

# Edit production values
nano backend/env.production
nano frontend/env.production

# Start services
NODE_ENV=production docker-compose up
```

## Environment Variables

### Backend Configuration

| Variable                      | Description                  | Required | Default         |
| ----------------------------- | ---------------------------- | -------- | --------------- |
| `DATABASE_URL`                | PostgreSQL connection string | Yes      | -               |
| `SECRET_KEY`                  | JWT secret key               | Yes      | -               |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time        | No       | 11520 (8 days)  |
| `BACKEND_CORS_ORIGINS`        | Allowed CORS origins         | No       | []              |
| `STRIPE_SECRET_KEY`           | Stripe secret key            | Yes      | -               |
| `STRIPE_WEBHOOK_SECRET`       | Stripe webhook secret        | Yes      | -               |
| `FIRST_SUPERUSER`             | First admin email            | No       | admin@fluxa.com |
| `FIRST_SUPERUSER_PASSWORD`    | First admin password         | No       | admin123        |

### Frontend Configuration

| Variable                      | Description            | Required | Default |
| ----------------------------- | ---------------------- | -------- | ------- |
| `VITE_API_URL`                | Backend API URL        | Yes      | -       |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes      | -       |
| `VITE_APP_TITLE`              | Application title      | No       | Fluxa   |
| `VITE_ENABLE_DEBUG_MODE`      | Enable debug features  | No       | false   |

### Docker Compose Configuration

| Variable            | Description           | Default        |
| ------------------- | --------------------- | -------------- |
| `POSTGRES_DB`       | Database name         | fluxa_dev      |
| `POSTGRES_USER`     | Database user         | fluxa_user     |
| `POSTGRES_PASSWORD` | Database password     | fluxa_password |
| `POSTGRES_PORT`     | Database port         | 5432           |
| `BACKEND_PORT`      | Backend service port  | 8000           |
| `FRONTEND_PORT`     | Frontend service port | 5173           |
| `NODE_ENV`          | Environment type      | development    |

## Environment-Specific Overrides

The system automatically loads environment-specific configurations:

1. **Base configuration** (`env.example` files)
2. **Environment-specific overrides** (`env.development`, `env.production`)
3. **System environment variables** (highest priority)

### Example: Development vs Production

**Development** (`env.development`):

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/fluxa_dev
DEBUG=True
LOG_LEVEL=DEBUG
```

**Production** (`env.production`):

```bash
DATABASE_URL=postgresql://prod_user:secure_pass@prod_host:5432/fluxa_prod
DEBUG=False
LOG_LEVEL=INFO
```

## Security Best Practices

### 1. Never Commit Sensitive Data

```bash
# Add to .gitignore
.env
env.production
docker-compose.env
```

### 2. Use Strong Secrets

```bash
# Generate secure secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Environment-Specific Secrets

- Use different keys for development/staging/production
- Rotate production secrets regularly
- Use secret management services in production

### 4. Database Security

- Use strong passwords
- Limit database access
- Enable SSL in production
- Use connection pooling

## Deployment Scenarios

### Local Development

```bash
NODE_ENV=development docker-compose up
```

### Staging Environment

```bash
NODE_ENV=staging docker-compose up
```

### Production Environment

```bash
NODE_ENV=production docker-compose up -d
```

## Troubleshooting

### Common Issues

1. **Environment file not found**

   - Ensure `env.example` files exist
   - Check file permissions
   - Verify file paths in docker-compose.yml

2. **Configuration not loaded**

   - Restart services after changing environment files
   - Check environment variable names
   - Verify file syntax

3. **Database connection issues**

   - Check `DATABASE_URL` format
   - Verify database credentials
   - Ensure database service is running

### Debug Environment Variables

```bash
# Check loaded environment variables
docker-compose exec backend env | grep DATABASE
docker-compose exec frontend env | grep VITE_API
```

## Advanced Configuration

### Custom Environment Files

Create custom environment configurations:

```bash
cp backend/env.example backend/env.staging
cp frontend/env.example frontend/env.staging
```

### Environment Variable Precedence

1. System environment variables
2. Environment-specific files (`env.production`)
3. Base environment files (`env.example`)
4. Default values in code

### Conditional Configuration

Use environment variables to conditionally load configurations:

```bash
# In docker-compose.yml
env_file:
  - backend/env.example
  - backend/env.${NODE_ENV:-development}
```

## Important Notes

### Environment File Usage

- **`env.example` files**: These are used directly by docker-compose.yml
- **No `.env` files needed**: The system uses the example files as base configuration
- **Environment-specific overrides**: Files like `env.development` and `env.production` provide overrides
- **Git safety**: Since we don't use `.env` files, there's no risk of accidentally committing sensitive data

### File Naming Convention

- `env.example` - Base configuration template
- `env.development` - Development environment overrides
- `env.staging` - Staging environment overrides (create as needed)
- `env.production` - Production environment overrides

## Support

For issues with environment configuration:

1. Check this guide
2. Review environment file syntax
3. Verify docker-compose configuration
4. Check service logs for errors
