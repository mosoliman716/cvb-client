import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({
  title = "CVB",
  links = null,
  authLabel = "Logout",
  authTo = "/",
}) 
{
  function logOut(label) {
        if(label === "Logout"){
            localStorage.removeItem("cvb_token");
        }
  }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-indigo-600 shadow-lg rounded-b-2xl backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="inline-block bg-white rounded-full p-2 mr-2">
          <svg
            width="25"
            height="25"
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
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
      </div>
      <ul className="flex items-center gap-8">
        {links && Array.isArray(links) ? (
          links.map((l, i) => (
            <li key={i} className="hidden md:block">
              <a
                href={l.href}
                className="text-amber-100 md:hover:underline underline-offset-8 transition"
              >
                {l.label}
              </a>
            </li>
          ))
        ) : (
          <li className="hidden md:block text-lg text-indigo-100 font-medium">
            Welcome to CVB
          </li>
        )}
        <li>
          <Link
            to={authTo}
            className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-indigo-50 transition-all"
            onClick={() => logOut(authLabel)}
          >
            {authLabel}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
