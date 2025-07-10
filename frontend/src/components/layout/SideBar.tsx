import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/projects", label: "Proyectos" },
    { href: "/tasks", label: "Tareas" },
  ];

  if (user?.role === "admin" || user?.role === "manager") {
    links.push({ href: "/users", label: "Usuarios" });
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between min-h-screen p-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Panel de gestión de proyectos</h2>
        <nav className="flex flex-col gap-4">
          {links.map((link) => {
            const isActive = router.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={logout}
        className="mt-8 w-full px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-md text-sm hover:bg-red-200 transition-colors"
      >
        Cerrar sesión
      </button>
    </aside>
  );
};

export default Sidebar;
