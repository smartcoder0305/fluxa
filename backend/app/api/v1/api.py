from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, projects, payments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"]) 