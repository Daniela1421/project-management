from sqlmodel import SQLModel, create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:Daniela181718@localhost:5432/project_management"

engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
