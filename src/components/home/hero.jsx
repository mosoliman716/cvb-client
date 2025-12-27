import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="bg-linear-to-br from-indigo-100 to-white text-sm text-gray-500">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium relative z-10 bg-indigo-500 backdrop-blur-md">
          {/* Logo */}
          <span className="inline-block bg-white rounded-full p-2 mr-2">
            <svg
              width="50"
              height="50"
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

          {/* Hamburger (Mobile) */}
          <button
            id="menu-toggle"
            className="md:hidden text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation Menu */}
          <ul
            id="nav-menu"
            className="hidden max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50"
          >
            <li>
              <a
                className="text-amber-100 md:hover:underline underline-offset-8 transition"
                href="#home"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="text-amber-100 md:hover:underline underline-offset-8 transition"
                href="#features"
              >
                Features
              </a>
            </li>
            <li>
              <a
                className="text-amber-100 md:hover:underline underline-offset-8 transition"
                href="#testimonials"
              >
                Testimonials
              </a>
            </li>
            
            {/*login button for mobile*/}
            <li className="block md:hidden mt-4">
              <button className="group flex items-center gap-2 text-amber-100">
                <Link to="/login/?userState=login">Log In</Link>
                <svg
                  className="group-hover:translate-x-1 transition pt-0.5"
                  width="12"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          </ul>

          {/*login button for desktop*/}
          <button className="group hidden md:flex items-center gap-2 text-amber-100">
            <Link to="/login/?userState=login">Log In</Link>
            <svg
              className="group-hover:translate-x-1 transition pt-0.5"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>

        {/* Hero Section */}
        <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center" id="home">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
            <p>Welcome to CVB.</p>
            <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
              <p>Explore</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">
            Preview Your CV Instantly
          </h1>
          <p className="max-w-xl text-center mt-6 px-4">
            Build and preview your professional CV in real time. Fast, easy, and
            free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
              <Link to="/login/?userState=signup">Get Started</Link>
            </button>
            <button className="group px-7 py-2.5 flex items-center gap-2 font-medium">
              <Link to="/login/?userState=login">login</Link>
              <svg
                className="group-hover:translate-x-1 transition pt-0.5"
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
