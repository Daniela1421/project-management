export type Project = {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  startDate: string;
  endDate: string;
  managerId: string;
  developersIds: string[];
  createdAt: string;
};