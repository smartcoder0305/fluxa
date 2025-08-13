# Google OAuth Setup Guide for Fluxa

This guide explains how to set up Google OAuth authentication for the Fluxa project.

## Overview

The Fluxa project now supports Google OAuth authentication for both login and registration. Users can sign in or sign up using their Google accounts, providing a seamless authentication experience.

## Prerequisites

1. **Google Cloud Console Account**: You need access to the [Google Cloud Console](https://console.cloud.google.com/)
2. **Domain Verification**: Your domain should be verified with Google (for production use)

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console

- Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
- Select your project or create a new one

### 1.2 Enable Google+ API

- Go to "APIs & Services" > "Library"
- Search for "Google+ API" and enable it
- Also enable "Google Identity" if available

### 1.3 Create OAuth 2.0 Credentials

- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client IDs"
- Choose "Web application" as the application type

### 1.4 Configure OAuth Consent Screen

- Set up the OAuth consent screen if prompted
- Add your domain to authorized domains
- Add necessary scopes (email, profile)

### 1.5 Configure Authorized Redirect URIs

For development:

```
http://localhost:5173
http://localhost:3000
```

For production:

```
https://yourdomain.com
https://www.yourdomain.com
```

## Step 2: Update Environment Variables

### 2.1 Backend Configuration

Update your backend environment files with the Google Client ID:

**`backend/env.development`:**

```bash
GOOGLE_CLIENT_ID=your_development_google_client_id_here
```

**`backend/env.production`:**

```bash
GOOGLE_CLIENT_ID=your_production_google_client_id_here
```

### 2.2 Frontend Configuration

Update your frontend environment files with the Google Client ID:

**`frontend/env.development`:**

```bash
VITE_GOOGLE_CLIENT_ID=your_development_google_client_id_here
```

**`frontend/env.production`:**

```bash
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id_here
```

**Important**: The backend and frontend Google Client IDs should match for each environment.

## Step 3: How It Works

### 3.1 Frontend Flow

1. User clicks "Sign in with Google" or "Sign up with Google"
2. Google OAuth popup opens
3. User authenticates with Google
4. Google returns an access token
5. Frontend sends the token to the backend `/auth/google` endpoint
6. Backend verifies the token and creates/updates the user
7. User is redirected to the dashboard

### 3.2 Backend Flow

1. Receives Google OAuth data from frontend
2. Verifies the Google ID token
3. Extracts user information (email, name, etc.)
4. Creates new user account or updates existing one
5. Generates JWT token for the user
6. Returns user data and token

## Step 4: Testing

### 4.1 Development Testing

1. Start your backend and frontend services
2. Navigate to `/login` or `/register`
3. Click the Google button
4. Complete Google OAuth flow
5. Verify you're redirected to the dashboard

### 4.2 Production Testing

1. Deploy with production Google OAuth credentials
2. Test the complete flow on your production domain
3. Verify OAuth works correctly in production environment

## Troubleshooting

### Common Issues

#### 1. "Invalid Client ID" Error

- Ensure the Google Client ID is correct in both frontend and backend
- Verify the Client ID matches between environments
- Check that the domain is authorized in Google Cloud Console

#### 2. "Redirect URI Mismatch" Error

- Add your domain to the authorized redirect URIs in Google Cloud Console
- Include both `http://` and `https://` versions if needed
- Add localhost URIs for development

#### 3. "OAuth Consent Screen" Issues

- Complete the OAuth consent screen setup in Google Cloud Console
- Add necessary scopes (email, profile)
- Verify your domain is authorized

#### 4. CORS Issues

- Ensure your backend CORS configuration includes your frontend domain
- Check that the `BACKEND_CORS_ORIGINS` environment variable is set correctly

### Debug Steps

1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded correctly
4. Test Google OAuth credentials in Google Cloud Console

## Security Considerations

### 1. Environment Variables

- Never commit actual Google OAuth credentials to version control
- Use environment-specific files (`.env.development`, `.env.production`)
- Rotate credentials regularly

### 2. OAuth Scopes

- Only request necessary scopes (email, profile)
- Avoid requesting sensitive scopes unless absolutely necessary
- Document why each scope is required

### 3. Token Validation

- Always verify Google ID tokens on the backend
- Implement proper JWT token expiration
- Use HTTPS in production

## API Endpoints

### Google OAuth Endpoint

```
POST /api/v1/auth/google
```

**Request Body:**

```json
{
  "id_token": "google_id_token_here",
  "access_token": "google_access_token_here"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "John Doe",
    "oauth_provider": "google",
    "email_verified": true,
    "is_active": true,
    "is_superuser": false,
    "subscription_tier": "free",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": {
    "access_token": "jwt_token_here",
    "token_type": "bearer",
    "expires_in": 7200,
    "user_id": 1,
    "email": "user@example.com"
  }
}
```

## Support

If you encounter issues with Google OAuth setup:

1. Check the troubleshooting section above
2. Review Google Cloud Console documentation
3. Check backend and frontend logs
4. Verify environment variable configuration

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)
- [React OAuth Google Library](https://www.npmjs.com/package/@react-oauth/google)
