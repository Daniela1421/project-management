import DashboardLayout from "@/components/layout/DashboardLayout";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TasksChart from "@/components/dashboard/TasksChart";
import NotificationsList from "@/components/dashboard/NotificationsList";
import { useEffect, useState } from "react";
import { fetchProjects, fetchTasks } from "@/services/dashboardService";
import { useAuth } from "@/context/AuthContext";

type SimpleTask = {
  id: string;
  title: string;
  status: string;
  priority: string;
};


export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState<SimpleTask[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [proj, task] = await Promise.all([fetchProjects(), fetchTasks()]);
        setProjects(proj);
        setTasks(task.filter((t: any) => t.assignedTo === user?.id));
      } catch (err) {
        console.error("Error cargando datos del dashboard", err);
      }
    };
    loadData();
  }, [user]);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <SummaryCards projects={projects} tasks={tasks} />
      <TasksChart />
      <NotificationsList tasks={tasks} />
    </DashboardLayout>
  );
}

