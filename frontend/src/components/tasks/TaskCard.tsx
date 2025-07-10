import { Task } from "@/types/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-white p-3 rounded shadow hover:shadow-md transition">
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.priority.toUpperCase()}</p>
      <p className="text-xs text-gray-400">
        Asignado: {task.assignedTo?.email || "No asignado"}
      </p>
    </div>
  );
}
