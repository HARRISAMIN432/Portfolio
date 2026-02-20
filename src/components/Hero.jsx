import React from "react";
import { ChevronDown, Download } from "lucide-react";

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gray-900"
    >
      <div className="container mx-auto px-6 text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hi, I'm <span className="text-blue-400">Muhammad Harris Amin</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Developer & Competitive Programmer with 350+ LeetCode &
            150+ Codeforces solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToAbout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-300"
            >
              View My Work
            </button>
            <a
              href="/Harris_Resume.pdf"
              download
              className="flex items-center space-x-2 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 rounded-lg transition-colors duration-300"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
