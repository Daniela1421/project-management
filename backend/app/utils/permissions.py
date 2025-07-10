from fastapi import HTTPException, status
from app.models.user import User

def require_roles(user: User, roles: list[str]):
    if user.role not in roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos para esta acción."
        )
