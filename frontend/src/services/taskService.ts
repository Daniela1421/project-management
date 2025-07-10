import { Task } from "@/types/task";
import { getToken } from "@/utils/auth";

const API_URL = "http://localhost:8000";

export const fetchTasksByProject = async (projectId: string) => {
  const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Error al cargar tareas");
  return await res.json();
};

export const createTask = async (projectId: string, task: Task) => {
  const res = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ...task, projectId }),
  });
  if (!res.ok) throw new Error("Error al crear tarea");
  return await res.json();
};

export const updateTask = async (taskId: string, updates: any) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar tarea");
  return await res.json();
};

export const deleteTask = async (taskId: string) => {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar tarea");
};

