from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    email: str
    role: str
    avatar: str | None = None
    password_hash: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
