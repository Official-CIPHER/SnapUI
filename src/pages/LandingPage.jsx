import React from 'react';
import { CiLinkedin } from 'react-icons/ci';
import { FiGithub } from 'react-icons/fi';
import { GiVintageRobot } from 'react-icons/gi';
import { IoMdCode } from 'react-icons/io';
import { MdOutlineLiveTv } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: "AI-Powered Component Generation",
    description: "Create responsive UI components instantly from simple prompts using advanced AI.",
    icon: <GiVintageRobot />,
  },
  {
    title: "Live Preview",
    description: "See real-time updates of your components as you build, making design adjustments quick and intuitive.",
    icon: <MdOutlineLiveTv />,
  },
  {
    title: "Production-Ready Code",
    description: "Export clean, optimized code that's ready to drop into your project with minimal tweaks.",
    icon: <IoMdCode />,
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleScroll = () => {
    const featureSection = document.getElementById("features");
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 min-h-screen">
      {/* Header */}
      <header className="py-6">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-cyan-400 cursor-pointer">
            SnapUI
          </h1>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium text-gray-400">
            AI-Powered Component Builder
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-4 sm:pt-6 md:pt-8 px-4 sm:px-8 -mt-12 md:-mt-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Left */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Your Revolutionary Product, <span className="text-cyan-400">Snap UI</span>
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto md:mx-0">
              SnapUI is an AI-powered component builder that lets you create clean, responsive UI components instantly from simple prompts. It’s the fastest way to go from idea to production-ready design.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
              <button
                onClick={handleScroll}
                className="bg-cyan-600/20 backdrop-blur-md border border-cyan-400/30 rounded-2xl py-2 px-6 font-semibold text-cyan-400 hover:scale-105 transition-all duration-200"
              >
                Explore Features
              </button>
              <button
                onClick={() => navigate('/home')}
                className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 rounded-2xl py-2 px-6 font-semibold hover:scale-105 transition-all duration-200"
              >
                Start Building
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 flex justify-center md:justify-end items-center p-4">
            <img
              src="./bot.png"
              alt="Product Showcase"
              className="rounded-xl w-60 sm:w-72 md:w-80 lg:w-96 animate-bounce"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-900/30 backdrop-blur-md">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">Key Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Discover what makes our solution the best choice for you, empowering you to excel in every aspect.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/40 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="bg-cyan-400 text-gray-900 flex items-center justify-center rounded-full mb-4 text-5xl p-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gray-800">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-6 text-lg sm:text-xl">
          Excel your users experience and take your productivity to the next level today.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 hover:scale-105 rounded-2xl py-2 px-6 font-semibold transition-all duration-200"
        >
          Start Building
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/30 backdrop-blur-md text-gray-400 py-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 gap-4">
          <p>&copy; 2025 SnapUI. All rights reserved | Official-Cipher.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Official-CIPHER"
              target="_blank"
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <FiGithub /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-kumar-vk70/"
              target="_blank"
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <CiLinkedin className="text-xl" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
