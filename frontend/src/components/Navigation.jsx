import { React, useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className=" sticky top-0 left-0 right-0 bg-white/80 shadow-sm z-50 ">
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img src="images/logo.png" className="w-45 h-35 mt-4"></img>
          </div>

          <div className="hidden md:flex items-center md:space-x-4 ms-0">
            <a
              href="#about"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#highlights"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Highlights
            </a>
            <a
              href="#campaign"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Campaign
            </a>
            <a
              href="#community"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Community
            </a>


          </div>

          {/* CTA Button */}
          <Link to="/login">
            <button className="hidden md:block px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-200">
              Login
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/50">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#about"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#highlights"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Highlights
            </a>
            <a
              href="#campaign"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Campaign
            </a>
            <a
              href="#community"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Community
            </a>


            <Link to="/login">
              <button className="w-full md:w-auto mt-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
