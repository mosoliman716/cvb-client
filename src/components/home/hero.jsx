import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

function Hero() {
  return (
    <>
      <div className="bg-linear-to-br from-indigo-100 to-white text-sm text-gray-500">
        <Navbar
          links={[
            { label: "Home", href: "#home" },
            { label: "Features", href: "#features" },
            { label: "Testimonials", href: "#testimonials" },
          ]}
          authLabel={"Log In"}
          authTo={"/login/?userState=login"}
        />

        {/* Hero Section */}
        <div
          className="h-[580px] flex flex-col items-center justify-center px-4 text-center"
          id="home"
        >
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
