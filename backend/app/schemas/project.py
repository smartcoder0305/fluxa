from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime


class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = False
    language: Optional[str] = None
    framework: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None
    language: Optional[str] = None
    framework: Optional[str] = None


class ProjectInDBBase(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_accessed: Optional[datetime] = None

    class Config:
        from_attributes = True


class Project(ProjectInDBBase):
    pass


class ProjectWithFiles(Project):
    files: List["ProjectFile"] = []


class ProjectFileBase(BaseModel):
    name: str
    path: str
    content: Optional[str] = None
    file_type: Optional[str] = None


class ProjectFileCreate(ProjectFileBase):
    project_id: int


class ProjectFileUpdate(BaseModel):
    name: Optional[str] = None
    path: Optional[str] = None
    content: Optional[str] = None
    file_type: Optional[str] = None


class ProjectFileInDBBase(ProjectFileBase):
    id: int
    project_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProjectFile(ProjectFileInDBBase):
    pass


# Update forward references
ProjectWithFiles.model_rebuild() 