from sqlmodel import SQLModel, Field
from typing import Optional
from uuid import UUID, uuid4
from datetime import date, datetime

class Task(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    title: str
    description: Optional[str]
    status: str  # todo | in_progress | review | done
    priority: str  # low | medium | high
    projectId: UUID
    assignedTo: UUID
    estimatedHours: float
    actualHours: Optional[float]
    dueDate: date
    createdAt: datetime = Field(default_factory=datetime.utcnow)
