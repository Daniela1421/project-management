import { getToken } from "@/utils/auth";

const API_URL = "http://localhost:8000";
export const fetchProjects = async () => {
  const res = await fetch(`${API_URL}/projects/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
  });
  if (!res.ok) throw new Error("Error al cargar proyectos");
  return await res.json();
};

export const fetchTasks = async () => {
  return [
    { id: "1", title: "Task 1", status: "TODO", priority: "Alta" },
    { id: "2", title: "Task 2", status: "DONE", priority: "Media" },
    { id: "3", title: "Task 3", status: "IN_PROGRESS", priority: "Alta" },
    { id: "4", title: "Task 4", status: "TODO", priority: "Baja" },
  ];
};