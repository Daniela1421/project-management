from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlmodel import Session, select
from uuid import UUID
from app.models.user import User
from app.database import engine
from app.config import SECRET_KEY, ALGORITHM

bearer_scheme = HTTPBearer()

def get_session():
    with Session(engine) as session:
        yield session

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    session: Session = Depends(get_session)
) -> User:
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido (sin sub).")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Error al decodificar token.")

    try:
        user = session.exec(select(User).where(User.id == UUID(user_id))).first()
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado.")
    except Exception as e:
        print("Error al buscar usuario:", e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no válido.")

    return user
