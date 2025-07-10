type Props = {
  projects: any[];
  tasks: any[];
};

export default function SummaryCards({ projects, tasks }: Props) {
  const completed = tasks.filter(t => t.status === "DONE").length;
  const pending = tasks.filter(t => t.status !== "DONE").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Projects</h3>
        <p className="text-2xl">{projects.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Tasks</h3>
        <p className="text-2xl">{tasks.length}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Completed</h3>
        <p className="text-2xl text-green-600">{completed}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Pending</h3>
        <p className="text-2xl text-yellow-600">{pending}</p>
      </div>
    </div>
  );
}

