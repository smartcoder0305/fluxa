from datetime import datetime, timedelta
from typing import Any, Union, Optional
from jose import jwt
from passlib.context import CryptContext
from app.core.config import settings
from app.models.user import User
from app.core.database import SessionLocal

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def create_first_superuser():
    db = SessionLocal()
    try:
        # Check if superuser already exists
        existing_user = db.query(User).filter(User.email == settings.FIRST_SUPERUSER).first()
        if existing_user:
            return
        
        # Create superuser
        hashed_password = get_password_hash(settings.FIRST_SUPERUSER_PASSWORD)
        superuser = User(
            email=settings.FIRST_SUPERUSER,
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=True,
            full_name="Admin User"
        )
        db.add(superuser)
        db.commit()
        print(f"Superuser created: {settings.FIRST_SUPERUSER}")
    except Exception as e:
        print(f"Error creating superuser: {e}")
    finally:
        db.close()


def verify_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        username: str = payload.get("sub")
        if username is None:
            return None
        return username
    except jwt.JWTError:
        return None 