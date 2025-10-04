import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden px-4">
      {/* 404 Number */}
      <h1 className="text-[6rem] sm:text-[8rem] font-extrabold text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] animate-pulse">
        404
      </h1>

      {/* Cartoon Illustration (built using divs + Tailwind shapes) */}
      {/* 404 Illustration Image */}
      <div className="w-60 sm:w-80 mt-[-1rem] mb-4">
        <img
          src="/Stone-man.png"
          alt="Stone and Human Illustration"
          className="w-full h-auto object-contain animate-bounce-smooth"
        />
      </div>

      {/* Text */}
      <h2 className="text-2xl sm:text-3xl font-semibold mt-2">
        Looks like you’re lost
      </h2>
      <p className="text-gray-400 text-center mt-2 mb-6">
        The page you’re looking for isn’t available or may have been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-6 py-2 rounded-lg transition-all hover:scale-105"
      >
        ⬅ Go Back
      </button>
    </div>
  );
};

export default NoPage;
