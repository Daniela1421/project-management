from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date, datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    priority: str
    projectId: UUID
    assignedTo: UUID
    estimatedHours: float
    actualHours: Optional[float] = None
    dueDate: date

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    estimatedHours: Optional[float] = None
    actualHours: Optional[float] = None
    dueDate: Optional[date] = None

class TaskRead(TaskBase):
    id: UUID
    createdAt: datetime

    class Config:
        orm_mode = True
