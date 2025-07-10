from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    avatar: Optional[str] = None

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str
    avatar: Optional[str] = None

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    avatar: Optional[str] = None

class UserRead(BaseModel):
    id: UUID
    name: str
    email: str
    role: str
    avatar: Optional[str]
    createdAt: datetime

    class Config:
        orm_mode = True

