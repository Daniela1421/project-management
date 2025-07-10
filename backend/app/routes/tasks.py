from fastapi import APIRouter, HTTPException, Depends, Path
from sqlmodel import Session, select
from uuid import UUID
from app.models.task import Task
from app.schemas.task_schema import TaskCreate, TaskRead, TaskUpdate
from app.database import engine
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix="/projects", tags=["Tasks"])

def get_session():
    with Session(engine) as session:
        yield session

# Obtener tareas de un proyecto
@router.get("/{project_id}/tasks", response_model=list[TaskRead])
def get_tasks_by_project(
    project_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    statement = select(Task).where(Task.projectId == project_id)
    tasks = session.exec(statement).all()
    return tasks

# Crear nueva tarea para un proyecto
@router.post("/{project_id}/tasks", response_model=TaskRead)
def create_task_for_project(
    project_id: UUID,
    task_data: TaskCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if task_data.projectId != project_id:
        raise HTTPException(status_code=400, detail="El ID del proyecto no coincide con el cuerpo de la solicitud.")
    
    new_task = Task(**task_data.dict())
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task

# Obtener una tarea por su ID
@router.get("/tasks/{task_id}", response_model=TaskRead)
def get_task_by_id(
    task_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return task

# Actualizar una tarea
@router.put("/tasks/{task_id}", response_model=TaskRead)
def update_task(
    task_id: UUID,
    task_data: TaskUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    task_data_dict = task_data.dict(exclude_unset=True)
    for key, value in task_data_dict.items():
        setattr(task, key, value)

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

# Eliminar una tarea
@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: UUID,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    session.delete(task)
    session.commit()
    return {"message": "Tarea eliminada correctamente"}
