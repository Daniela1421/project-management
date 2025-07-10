type Props = {
  tasks: any[];
};

export default function NotificationsList({ tasks }: Props) {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Últimas tareas asignadas</h3>
      {recentTasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas recientes.</p>
      ) : (
        <ul className="space-y-2">
          {recentTasks.map((task) => (
            <li key={task.id} className="border-b pb-2">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
