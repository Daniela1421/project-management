from sqlmodel import SQLModel, Session, create_engine
from app.models.user import User
from app.utils.security import hash_password
from datetime import datetime
from uuid import uuid4

DATABASE_URL = "postgresql+psycopg2://postgres:Daniela181718@localhost:5432/project_management"
engine = create_engine(DATABASE_URL)

# Usuario admin
admin_user = User(
    id=str(uuid4()),
    name="Admin",
    email="admin@test.com",
    password_hash=hash_password("admin123"),
    role="admin",
    avatar="https://i.pravatar.cc/150?img=1",
    createdAt=datetime.utcnow()
)

SQLModel.metadata.create_all(engine)

with Session(engine) as session:
    exists = session.exec(select(User).where(User.email == admin_user.email)).first()
    if not exists:
        session.add(admin_user)
        session.commit()
        print("Usuario admin creado exitosamente.")
    else:
        print("El usuario admin ya existe.")
