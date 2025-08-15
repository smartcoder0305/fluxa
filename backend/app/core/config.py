from typing import List, Union, Optional, Dict
from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    
    # Security - use environment variables with sensible defaults
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS - simple string field that can be parsed later
    BACKEND_CORS_ORIGINS: str = ""

    # Database - required environment variable
    DATABASE_URL: str
    
    # Stripe - required for payment functionality
    STRIPE_SECRET_KEY: str
    STRIPE_WEBHOOK_SECRET: str

    
    # Google OAuth - required for Google login
    GOOGLE_CLIENT_ID: str
    
    # Email configuration - optional but configurable
    SMTP_TLS: bool = True
    SMTP_PORT: int = 587
    SMTP_HOST: Optional[str] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None
    
    # First superuser - configurable for different environments
    FIRST_SUPERUSER: str = "admin@fluxa.com"
    FIRST_SUPERUSER_PASSWORD: str = "admin123"

    class Config:
        case_sensitive = True
        env_file_encoding = "utf-8"

    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from the string field"""
        if not self.BACKEND_CORS_ORIGINS:
            return []
        
        origins = [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]
        return origins


settings = Settings() 