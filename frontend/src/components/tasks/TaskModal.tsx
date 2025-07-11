import { useState, useEffect } from "react";
import { CreateTaskInput, Task } from "@/types/task";

const initialForm: CreateTaskInput = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  estimatedHours: 0,
  actualHours: 0,
  assignedTo: "cf8277f0-1c65-4018-9672-a7e25b2387da",
  dueDate: "",
};

type FormType = typeof initialForm;

type Props = {
  task?: Task | null;
  onClose: () => void;
  onSave: (form: FormType) => void;
  projectId: string;
};


export default function TaskModal({ task, onClose, onSave, projectId }: Props) {
  const [form, setForm] = useState<CreateTaskInput>(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        // projectId: projectId,
        estimatedHours: task.estimatedHours || 0,
        actualHours: task.actualHours || 0,
        assignedTo: "cf8277f0-1c65-4018-9672-a7e25b2387da",
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "estimatedHours" || name === "actualHours"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.status ||
      !form.priority ||
      form.estimatedHours === undefined ||
      !form.assignedTo ||
      !form.dueDate
    ) {
      setError("Todos los campos obligatorios deben estar llenos.");
      return;
    }

    onSave({
      ...form,
      // projectId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-6 rounded-md w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-xl font-bold">{task ? "Editar Tarea" : "Crear Tarea"}</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="todo">Por hacer</option>
              <option value="in_progress">En progreso</option>
              <option value="review">En revisión</option>
              <option value="done">Hecha</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Prioridad</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horas estimadas</label>
          <input
            type="number"
            name="estimatedHours"
            value={form.estimatedHours}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            min="0"
            step="0.5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Horas reales</label>
          <input
            type="number"
            name="actualHours"
            value={form.actualHours}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            min="0"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ID del Usuario Asignado</label>
          <input
            type="text"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="cf8277f0-1c65-4018-9672-a7e25b2387da"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha límite</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {task ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
