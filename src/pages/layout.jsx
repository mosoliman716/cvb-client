import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-white flex flex-col">
      <nav className="flex items-center justify-between w-full py-5 px-8 bg-indigo-600 shadow-lg rounded-b-2xl">
        <div className="flex items-center gap-3">
          <span className="inline-block bg-white rounded-full p-2 mr-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="32" rx="16" fill="#6366F1" />
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fontSize="16"
                fill="white"
                fontFamily="Arial"
                fontWeight="bold"
              >
                CV
              </text>
            </svg>
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            CVB
          </h1>
        </div>
        <ul className="flex items-center gap-8">
          <li className="hidden md:block text-lg text-indigo-100 font-medium">
            Welcome to CVB
          </li>
          <li>
            <Link
              to="/"
              className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-indigo-50 transition-all"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
