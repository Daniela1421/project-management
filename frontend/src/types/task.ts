export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  projectId: string;
  assignedTo: string;
  estimatedHours: number;
  actualHours?: number;
  dueDate?: string;
};
