import { useRouter } from "next/router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskBoard from "@/components/tasks/TaskBoard";

export default function ProjectTasksPage() {
  const router = useRouter();
  const { id: projectId } = router.query;

  if (!projectId || typeof projectId !== "string") return null;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Tareas del Proyecto</h2>
        <TaskBoard projectId={projectId} />
      </div>
    </DashboardLayout>
  );
}
