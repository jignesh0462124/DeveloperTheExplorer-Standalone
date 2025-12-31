import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImg from "./video/img.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-[90px] font-extrabold text-blue-500 leading-none">
            404
          </h1>

          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            Oops!
          </h2>

          <h3 className="text-3xl font-bold mt-3">
            Developer{" "}
            <span className="text-blue-500">TheExplore</span>{" "}
            <span className="text-blue-500">is Not Found!</span>
          </h3>

          <p className="text-gray-500 mt-4 max-w-md">
            The page you're looking for doesn't exist or might have been moved.
            Let's help you find your way back.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10"
              />
            </svg>
            Go to Homepage
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src={NotFoundImg}
            alt="404 illustration"
            className="max-w-md w-full"
          />
        </div>

      </div>
    </div>
  );
}
