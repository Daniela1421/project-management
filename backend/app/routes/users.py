from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from uuid import UUID
from app.database import engine
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserUpdate, UserRead
from app.dependencies.auth import get_current_user
from app.models.user import User as UserModel
from app.utils.permissions import require_roles

router = APIRouter(prefix="/users", tags=["Users"])

def get_session():
    with Session(engine) as session:
        yield session

@router.get("/", response_model=list[UserRead])
def get_users(session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    require_roles(current_user, ["admin", "manager"]) 
    users = session.exec(select(User)).all()
    return users

@router.post("/", response_model=UserRead)
def create_user(user_data: UserCreate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    require_roles(current_user, ["admin", "manager"]) 
    existing = session.exec(select(User).where(User.email == user_data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email ya registrado")

    from app.utils.security import hash_password
    hashed_pwd = hash_password(user_data.password)

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        role=user_data.role,
        avatar=user_data.avatar,
        password_hash=hashed_pwd
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.put("/{user_id}", response_model=UserRead)
def update_user(user_id: UUID, user_data: UserUpdate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    require_roles(current_user, ["admin", "manager"]) 
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    update_data = user_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)

    session.add(user)
    session.commit()
    session.refresh(user)
    return user
