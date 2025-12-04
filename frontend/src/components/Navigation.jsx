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
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center ">
              <svg
                width="23"
                height="28"
                viewBox="0 0 23 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.5 28H0V0H22.5V28Z" stroke="#3373f233" />
                <g clipPath="url(#clip0_77_599)">
                  <path
                    d="M13.8094 4.29214C13.2117 4.11987 12.5895 4.46792 12.4172 5.06557L7.91719 20.8156C7.74493 21.4132 8.09297 22.0355 8.69063 22.2078C9.28829 22.38 9.91055 22.032 10.0828 21.4343L14.5828 5.68432C14.7551 5.08667 14.407 4.4644 13.8094 4.29214ZM16.643 8.5144C16.2035 8.95386 16.2035 9.66753 16.643 10.107L19.7824 13.25L16.6395 16.3929C16.2 16.8324 16.2 17.546 16.6395 17.9855C17.0789 18.425 17.7926 18.425 18.232 17.9855L22.1695 14.048C22.609 13.6085 22.609 12.8949 22.1695 12.4554L18.232 8.51792C17.7926 8.07847 17.0789 8.07847 16.6395 8.51792L16.643 8.5144ZM5.86055 8.5144C5.4211 8.07495 4.70743 8.07495 4.26797 8.5144L0.330475 12.4519C-0.108978 12.8914 -0.108978 13.605 0.330475 14.0445L4.26797 17.982C4.70743 18.4214 5.4211 18.4214 5.86055 17.982C6.30001 17.5425 6.30001 16.8289 5.86055 16.3894L2.71758 13.25L5.86055 10.107C6.30001 9.66753 6.30001 8.95386 5.86055 8.5144Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_77_599">
                    <path d="M0 4.25H22.5V22.25H0V4.25Z" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900 md:w-30 lg:w-60 ">
              Developers: The Explorers
            </p>
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
            <a
              href="#sponsors"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sponsors
            </a>
            <Link
              to="/contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link to="/signup">
            <button className="hidden md:block px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition lg:ms[10rem]">
              Registration
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
            <a
              href="#sponsors"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Sponsors
            </a>
            <Link
              to="/contact"
              className="block text-sm text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link to="/signup">
              <button className=" md:block px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition lg:ms[10rem]">
                Registration
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
