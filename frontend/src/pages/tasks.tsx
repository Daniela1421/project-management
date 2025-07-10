import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import { Task } from "@/types/task";
import { fetchTasks } from "@/services/taskService";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch {
        setError("Error al cargar tareas.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tareas</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <TaskBoard tasks={tasks} />
        )}
      </div>
    </DashboardLayout>
  );
}
