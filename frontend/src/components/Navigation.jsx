import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 bg-white/80 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img src="images/logo.png" className="w-45 h-35 mt-4" alt="Logo" />
          </div>

          <Link to="/login">
            <button className="px-5 py-2 text-sm md:px-8 md:py-3 md:text-base bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-200">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
