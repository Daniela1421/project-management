import React from "react";
import Sidebar from "./SideBar";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Hola, {user?.email}</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
          {/* <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button> */}
        </header>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
