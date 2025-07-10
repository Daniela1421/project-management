import { useEffect, useState } from "react";
import ProjectTable from "@/components/projects/ProjectTable";
import { fetchProjects, deleteProject } from "@/services/projectService";
import { Project } from "@/types/project";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ConfirmModal from "@/components/common/ConfirmModal";
import UpdateProjectModal from "@/components/projects/UpdateProjectModal";
import CreateProjectModal from "@/components/projects/CreateProjectModal";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError("Error al cargar los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
  };

  const handleUpdate = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setSelectedProject(null);
  };

  const handleDelete = (id: string) => {
    setProjectToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (projectToDelete) {
      try {
        await deleteProject(projectToDelete);
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
      } catch (err) {
        setError("Error al eliminar el proyecto.");
      } finally {
        setShowConfirm(false);
        setProjectToDelete(null);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Proyectos</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            Crear Proyecto
          </button>
        </div>
        {loading ? (
          <p className="text-gray-600">Cargando proyectos...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <ProjectTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {selectedProject && (
              <UpdateProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                onSave={handleUpdate}
              />
            )}
          </>
        )}
      </div>
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreated={(newProject) => {
            setProjects((prev) => [...prev, newProject]);
            setShowCreateModal(false);
          }}
        />
      )}
      <ConfirmModal
        show={showConfirm}
        message="¿Estás segura/o de que quieres eliminar este proyecto?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setProjectToDelete(null);
        }}
      />
    </DashboardLayout>
  );
}