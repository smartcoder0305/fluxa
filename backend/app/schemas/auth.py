from pydantic import BaseModel, EmailStr, validator
from typing import Optional


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirm_password: str

    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

    @validator('confirm_password')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('Passwords do not match')
        return v


class GoogleOAuthRequest(BaseModel):
    id_token: str
    access_token: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user_id: int
    email: str


class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None


class UserResponse(BaseModel):
    id: int
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    full_name: Optional[str] = None
    display_name: str
    avatar_url: Optional[str] = None
    is_active: bool
    is_superuser: bool
    oauth_provider: Optional[str] = None
    email_verified: bool
    subscription_tier: str
    created_at: str

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    user: UserResponse
    token: Token
