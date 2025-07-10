import { Project } from "@/types/project";
import Link from "next/link";

type Props = {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
};

const statusColors: Record<string, string> = {
  planning: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function ProjectTable({ projects, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700 bg-white">
        <thead className="bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Prioridad</th>
            <th className="px-4 py-3">Inicio</th>
            <th className="px-4 py-3">Fin</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{project.name}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[project.status] || "bg-gray-200 text-gray-800"}`}
                >
                  {project.status.replace("_", " ")}
                </span>
              </td>
              <td className="px-4 py-3 capitalize">{project.priority}</td>
              <td className="px-4 py-3">{new Date(project.startDate).toLocaleDateString()}</td>
              <td className="px-4 py-3">{new Date(project.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit?.(project)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete?.(project.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
                <Link
                  href={`/projects/${project.id}/tasks`}
                  className="text-green-600 hover:underline"
                >
                  Ver tareas
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && (
        <p className="text-center text-gray-500 p-4">No hay proyectos disponibles.</p>
      )}
    </div>
  );
}
