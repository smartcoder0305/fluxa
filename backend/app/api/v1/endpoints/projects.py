from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.models.project import Project, ProjectFile
from app.schemas.project import (
    Project as ProjectSchema,
    ProjectCreate,
    ProjectUpdate,
    ProjectWithFiles,
    ProjectFile as ProjectFileSchema,
    ProjectFileCreate,
    ProjectFileUpdate
)
from app.api.v1.endpoints.auth import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[ProjectSchema])
def read_projects(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Retrieve projects for current user.
    """
    projects = db.query(Project).filter(Project.owner_id == current_user.id).offset(skip).limit(limit).all()
    return projects


@router.post("/", response_model=ProjectSchema)
def create_project(
    *,
    db: Session = Depends(get_db),
    project_in: ProjectCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new project.
    """
    project = Project(
        **project_in.dict(),
        owner_id=current_user.id
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/{project_id}", response_model=ProjectWithFiles)
def read_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Get project by ID.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id and not project.is_public:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return project


@router.put("/{project_id}", response_model=ProjectSchema)
def update_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    project_in: ProjectUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Update project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    for field, value in project_in.dict(exclude_unset=True).items():
        setattr(project, field, value)
    
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/{project_id}")
def delete_project(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Delete project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}


# Project Files endpoints
@router.post("/{project_id}/files", response_model=ProjectFileSchema)
def create_project_file(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    file_in: ProjectFileCreate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Create new file in project.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    file_obj = ProjectFile(
        **file_in.dict(),
        project_id=project_id
    )
    db.add(file_obj)
    db.commit()
    db.refresh(file_obj)
    return file_obj


@router.put("/{project_id}/files/{file_id}", response_model=ProjectFileSchema)
def update_project_file(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    file_id: int,
    file_in: ProjectFileUpdate,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Update project file.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    file_obj = db.query(ProjectFile).filter(
        ProjectFile.id == file_id,
        ProjectFile.project_id == project_id
    ).first()
    if not file_obj:
        raise HTTPException(status_code=404, detail="File not found")
    
    for field, value in file_in.dict(exclude_unset=True).items():
        setattr(file_obj, field, value)
    
    db.add(file_obj)
    db.commit()
    db.refresh(file_obj)
    return file_obj


@router.delete("/{project_id}/files/{file_id}")
def delete_project_file(
    *,
    db: Session = Depends(get_db),
    project_id: int,
    file_id: int,
    current_user: User = Depends(get_current_active_user),
) -> Any:
    """
    Delete project file.
    """
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    file_obj = db.query(ProjectFile).filter(
        ProjectFile.id == file_id,
        ProjectFile.project_id == project_id
    ).first()
    if not file_obj:
        raise HTTPException(status_code=404, detail="File not found")
    
    db.delete(file_obj)
    db.commit()
    return {"message": "File deleted successfully"} 