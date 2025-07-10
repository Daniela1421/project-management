import { Project } from "@/types/project";
import { getToken } from "@/utils/auth";

const API_URL = "http://localhost:8000";

export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar los proyectos");
  }

  return await res.json();
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar el proyecto");
  }

  return await res.json();
};

export const deleteProject = async (id: string) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar el proyecto");
  }

  return true;
};

export const createProject = async (projectData: any) => {
  console.log("projectData", projectData)
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!res.ok) throw new Error("Error al crear proyecto");

  return await res.json();
};
