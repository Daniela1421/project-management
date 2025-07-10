from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from uuid import UUID

from app.database import engine
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate, ProjectRead, ProjectUpdate
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/projects", tags=["Projects"])

def get_session():
    with Session(engine) as session:
        yield session

# Obtener todos los proyectos
@router.get("/", response_model=list[ProjectRead])
def get_projects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if current_user.role == "admin":
        projects = session.exec(select(Project)).all()
    elif current_user.role == "manager":
        projects = session.exec(select(Project).where(Project.managerId == current_user.id)).all()
    else:
        raise HTTPException(status_code=403, detail="No autorizado para ver todos los proyectos")
    return projects

# Crear un nuevo proyecto
@router.post("/", response_model=ProjectRead)
def create_project(
    data: ProjectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="No autorizado para crear proyectos")

    new_project = Project(
        **data.dict(),
        managerId=current_user.id
    )
    session.add(new_project)
    session.commit()
    session.refresh(new_project)
    return new_project

# Obtener proyecto específico
@router.get("/{project_id}", response_model=ProjectRead)
def get_project(
    project_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    if current_user.role == "admin" or project.managerId == current_user.id:
        return project

    raise HTTPException(status_code=403, detail="No autorizado para ver este proyecto")

# Actualizar proyecto
@router.put("/{project_id}", response_model=ProjectRead)
def update_project(
    project_id: UUID,
    data: ProjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    if current_user.role != "admin" and project.managerId != current_user.id:
        raise HTTPException(status_code=403, detail="No autorizado para editar este proyecto")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(project, key, value)

    session.add(project)
    session.commit()
    session.refresh(project)
    return project

# Eliminar proyecto
@router.delete("/{project_id}")
def delete_project(
    project_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")

    if current_user.role != "admin" and project.managerId != current_user.id:
        raise HTTPException(status_code=403, detail="No autorizado para eliminar este proyecto")

    session.delete(project)
    session.commit()
    return {"detail": "Proyecto eliminado correctamente"}

