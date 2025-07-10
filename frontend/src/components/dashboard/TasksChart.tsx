import { useEffect, useState } from "react";
import { fetchTasks } from "@/services/dashboardService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TasksChart = () => {
  const [data, setData] = useState<{ status: string; count: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const tasks = await fetchTasks();

      const counts: Record<string, number> = {};
      tasks.forEach((task: any) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
      });

      const chartData = Object.entries(counts).map(([status, count]) => ({
        status,
        count,
      }));

      setData(chartData);
    };

    load();
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Tareas por estado</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TasksChart;
