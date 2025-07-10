from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.models.user import User
from app.schemas.user_schema import UserRegister, LoginUser, UserRead
from app.database import engine
from app.utils.security import hash_password
from app.utils.security import verify_password, create_access_token
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_session():
    with Session(engine) as session:
        yield session

@router.post("/register")
def register_user(user_data: UserRegister, session: Session = Depends(get_session)):
  statement = select(User).where(User.email == user_data.email)
  result = session.exec(statement).first()
  if result:
      raise HTTPException(status_code=400, detail="El email ya está registrado.")

  hashed_pwd = hash_password(user_data.password)
  new_user = User(
      name=user_data.name,
      email=user_data.email,
      role="developer",
      avatar=user_data.avatar,
      password_hash=hashed_pwd
  )
  session.add(new_user)
  session.commit()
  session.refresh(new_user)
  return {"id": new_user.id, "email": new_user.email, "role": new_user.role}

@router.post("/login")
def login_user(login_data: LoginUser, session: Session = Depends(get_session)):
  statement = select(User).where(User.email == login_data.email)
  user = session.exec(statement).first()
  if not user:
      raise HTTPException(status_code=400, detail="Usuario no encontrado.")

  print("✅ Usuario encontrado:", user.email)
  print("🔐 Hash en la base de datos:", user.password_hash)
  print("🔑 Contraseña ingresada:", login_data.password)

  if not verify_password(login_data.password, user.password_hash):
      raise HTTPException(status_code=400, detail="Contraseña incorrecta.")

  token = create_access_token(user.id)
  return {"access_token": token, "token_type": "bearer"}

@router.get("/profile", response_model=UserRead)
def get_profile(current_user: User = Depends(get_current_user)):
  return current_user