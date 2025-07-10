from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import date, datetime

class ProjectBase(BaseModel):
    name: str
    description: Optional[str]
    status: str
    priority: str
    startDate: date
    endDate: date

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    startDate: Optional[date] = None
    endDate: Optional[date] = None

class ProjectRead(ProjectBase):
    id: UUID
    managerId: UUID
    createdAt: datetime

    class Config:
        orm_mode = True
