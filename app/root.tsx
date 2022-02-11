import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import {
  FaTools,
  FaUsersCog,
  FaTape,
  FaCogs,
  FaUserCircle
} from "react-icons/fa"
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarItem from "./components/SidebarItem/SidebarItem";

import styles from "./styles/app.css"

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const meta: MetaFunction = () => {
  return { title: "Subalcatel Gestion Matériel" };
};

export default function App() {
  return (
    <html lang="en" className="overflow-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-900 text-gray-100">
        <div className="h-screen w-screen flex flex-col">
          <div className="flex-grow p-4">
            <Outlet />
          </div>
          <Sidebar>
            <SidebarItem text="Matériel" icon={FaTools} to="/items" />
            <SidebarItem text="Utilisateurs" icon={FaUsersCog} to="/users" />
            <SidebarItem text="Maintenance" icon={FaTape} to="/servicing" />
            <SidebarItem text="Configuration" icon={FaCogs} to="/configuration" />
            <SidebarItem text="Profil" icon={FaUserCircle} to="/profile" />
          </Sidebar>
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
