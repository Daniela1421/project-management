from sqlmodel import SQLModel, Field
from typing import Optional, List
from uuid import UUID, uuid4
from datetime import date, datetime

class Project(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    description: Optional[str] = None
    status: str  # planning | in_progress | completed | canceled
    priority: str  # low | medium | high
    startDate: date
    endDate: date
    managerId: UUID
    # developersIds: Optional[List[UUID]] = Field(default_factory=list, sa_column_kwargs={"nullable": True})
    createdAt: datetime = Field(default_factory=datetime.utcnow)
