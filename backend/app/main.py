from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.models.user import User
from app.routes import auth, project, tasks, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(auth.router)
app.include_router(project.router)
app.include_router(tasks.router)
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "Esta corriendo el backend"}
