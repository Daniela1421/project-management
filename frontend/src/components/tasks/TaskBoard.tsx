import { useEffect, useState } from "react";
import {
  fetchTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "@/services/taskService";
import { Task } from "@/types/task";
import TaskModal from "./TaskModal";
import ConfirmModal from "../common/ConfirmModal";

type Props = {
  projectId: string;
};

const columns = ["todo", "in_progress", "review", "done"];

export default function TaskBoard({ projectId }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasksByProject(projectId);
        setTasks(data);
      } catch (err) {
        console.error("Error al cargar tareas");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [projectId]);

  const handleCreate = () => {
    setEditMode(false);
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSave = async (taskData: Partial<Task>) => {
    try {
      if (editMode && selectedTask) {
        const updated = await updateTask(selectedTask.id, taskData);
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const created = await createTask(projectId, taskData);
        setTasks((prev) => [...prev, created]);
      }
    } catch {
      alert("Error al guardar la tarea");
    } finally {
      setShowModal(false);
      setSelectedTask(null);
    }
  };

  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete.id);
        setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      } catch {
        alert("Error al eliminar la tarea");
      } finally {
        setShowConfirm(false);
        setTaskToDelete(null);
      }
    }
  };

  const groupedTasks = columns.reduce((acc, col) => {
    acc[col] = tasks.filter((t) => t.status === col);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Tarea
        </button>
      </div>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col} className="bg-white rounded shadow p-4">
              <h3 className="font-bold text-lg mb-2">{col.replace("_", " ")}</h3>
              <div className="space-y-2">
                {groupedTasks[col]?.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border rounded shadow-sm bg-gray-50"
                  >
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <div className="flex justify-between mt-2 text-sm text-blue-600">
                      <button onClick={() => handleEdit(task)}>Editar</button>
                      <button onClick={() => handleDelete(task)}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      <ConfirmModal
        show={showConfirm}
        message="¿Estás seguro/a de eliminar esta tarea?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setTaskToDelete(null);
        }}
      />
    </div>
  );
}


