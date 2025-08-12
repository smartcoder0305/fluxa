from sqlalchemy import Boolean, Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    full_name = Column(String, nullable=True)
    hashed_password = Column(String, nullable=True)  # Nullable for OAuth users
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # OAuth fields
    google_id = Column(String, unique=True, nullable=True, index=True)
    oauth_provider = Column(String, nullable=True)  # google, local
    email_verified = Column(Boolean, default=False)
    
    # Profile fields
    avatar_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    website = Column(String, nullable=True)
    github_username = Column(String, nullable=True)
    twitter_username = Column(String, nullable=True)
    
    # Subscription fields
    subscription_tier = Column(String, default="free")  # free, basic, pro, enterprise
    subscription_status = Column(String, default="active")  # active, canceled, past_due
    stripe_customer_id = Column(String, nullable=True)
    stripe_subscription_id = Column(String, nullable=True)
    
    # Relationships
    projects = relationship("Project", back_populates="owner")
    
    @property
    def display_name(self) -> str:
        """Get the user's display name"""
        if self.full_name:
            return self.full_name
        elif self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        else:
            return self.email.split('@')[0]
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', tier='{self.subscription_tier}')>" 