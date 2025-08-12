from datetime import datetime, timedelta
from typing import Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from google.auth.transport import requests
from google.oauth2 import id_token
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import UserLogin, UserRegister, GoogleOAuthRequest, Token, UserResponse
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Google OAuth
GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        """Hash a password"""
        return pwd_context.hash(password)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None) -> str:
        """Create a JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
        return encoded_jwt

    def verify_token(self, token: str) -> Optional[dict]:
        """Verify and decode a JWT token"""
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return payload
        except JWTError:
            return None

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate a user with email and password"""
        user = self.db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not user.hashed_password:
            return None  # OAuth user without password
        if not self.verify_password(password, user.hashed_password):
            return None
        return user

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get a user by email"""
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_google_id(self, google_id: str) -> Optional[User]:
        """Get a user by Google ID"""
        return self.db.query(User).filter(User.google_id == google_id).first()

    def create_user(self, user_data: Union[UserRegister, dict]) -> User:
        """Create a new user"""
        if isinstance(user_data, UserRegister):
            user_dict = user_data.dict(exclude={'confirm_password'})
            user_dict['hashed_password'] = self.get_password_hash(user_data.password)
            user_dict['oauth_provider'] = 'local'
            user_dict['email_verified'] = False
        else:
            user_dict = user_data.copy()
            if 'password' in user_dict:
                user_dict['hashed_password'] = self.get_password_hash(user_dict['password'])
                del user_dict['password']

        # Set full name if first and last names are provided
        if user_dict.get('first_name') and user_dict.get('last_name'):
            user_dict['full_name'] = f"{user_dict['first_name']} {user_dict['last_name']}"

        user = User(**user_dict)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user_oauth_info(self, user: User, google_id: str, email_verified: bool = True) -> User:
        """Update user with OAuth information"""
        user.google_id = google_id
        user.oauth_provider = 'google'
        user.email_verified = email_verified
        self.db.commit()
        self.db.refresh(user)
        return user

    def verify_google_token(self, id_token_str: str) -> Optional[dict]:
        """Verify Google ID token and return user info"""
        try:
            idinfo = id_token.verify_oauth2_token(
                id_token_str, 
                requests.Request(), 
                GOOGLE_CLIENT_ID
            )
            
            # Verify the token was issued by Google
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            
            # Verify the token is not expired
            if idinfo['exp'] < datetime.utcnow().timestamp():
                raise ValueError('Token expired.')
            
            return idinfo
        except Exception as e:
            logger.error(f"Google token verification failed: {e}")
            return None

    def login_user(self, user_data: UserLogin) -> Optional[Token]:
        """Login a user and return a token"""
        user = self.authenticate_user(user_data.email, user_data.password)
        if not user:
            return None
        
        if not user.is_active:
            return None

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.create_access_token(
            data={"sub": user.email, "user_id": user.id},
            expires_delta=access_token_expires
        )

        return Token(
            access_token=access_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user_id=user.id,
            email=user.email
        )

    def register_user(self, user_data: UserRegister) -> Token:
        """Register a new user and return a token"""
        # Check if user already exists
        existing_user = self.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("User with this email already exists")

        # Create user
        user = self.create_user(user_data)

        # Generate token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.create_access_token(
            data={"sub": user.email, "user_id": user.id},
            expires_delta=access_token_expires
        )

        return Token(
            access_token=access_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user_id=user.id,
            email=user.email
        )

    def google_oauth_login(self, oauth_data: GoogleOAuthRequest) -> Optional[Token]:
        """Handle Google OAuth login/registration"""
        # Verify Google token
        google_user_info = self.verify_google_token(oauth_data.id_token)
        if not google_user_info:
            return None

        google_id = google_user_info['sub']
        email = google_user_info['email']
        first_name = google_user_info.get('given_name')
        last_name = google_user_info.get('family_name')
        email_verified = google_user_info.get('email_verified', False)
        avatar_url = google_user_info.get('picture')

        # Check if user exists by Google ID
        user = self.get_user_by_google_id(google_id)
        
        if not user:
            # Check if user exists by email
            user = self.get_user_by_email(email)
            
            if user:
                # Link existing user to Google
                user = self.update_user_oauth_info(user, google_id, email_verified)
            else:
                # Create new user
                user_data = {
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'avatar_url': avatar_url,
                    'oauth_provider': 'google',
                    'email_verified': email_verified
                }
                user = self.create_user(user_data)
                user.google_id = google_id
                self.db.commit()

        if not user.is_active:
            return None

        # Generate token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = self.create_access_token(
            data={"sub": user.email, "user_id": user.id},
            expires_delta=access_token_expires
        )

        return Token(
            access_token=access_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user_id=user.id,
            email=user.email
        )

    def get_current_user(self, token: str) -> Optional[User]:
        """Get current user from token"""
        payload = self.verify_token(token)
        if payload is None:
            return None
        
        email: str = payload.get("sub")
        if email is None:
            return None
        
        user = self.get_user_by_email(email)
        if user is None:
            return None
        
        return user
