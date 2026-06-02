import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 md:px-16 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
