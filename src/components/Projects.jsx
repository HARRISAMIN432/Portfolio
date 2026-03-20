import React, { useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef();

  const projects = [
    {
      title: "UrbanNest",
      tech: ["React", "Node.js", "MongoDB", "Redux Toolkit", "JWT"],
      color: "from-blue-600/20 to-cyan-500/5",
      accent: "text-blue-400",
      link: "https://github.com/HARRISAMIN432/Real-Estate-App",
      desc: "Developed a real estate platform with JWT and Google authentication, advanced filtering, and optimized property queries with responsive UI.",
      size: "md:col-span-2 md:row-span-2",
      icon: <Layers size={24} />,
    },
    {
      title: "AI Stroke Predictor",
      tech: ["Python", "Scikit-Learn", "FastAPI"],
      color: "from-purple-600/20 to-pink-500/5",
      accent: "text-purple-400",
      link: "https://github.com/HARRISAMIN432/AI-Final-Project",
      desc: "Built a machine learning model using Scikit-Learn to predict stroke risk with high accuracy using Random Forest.",
      size: "md:col-span-1 md:row-span-1",
      icon: <Cpu size={20} />,
    },
    {
      title: "Chatty Engine",
      tech: ["Socket.io", "Redis", "TypeScript", "Node.js"],
      color: "from-emerald-600/20 to-teal-500/5",
      accent: "text-emerald-400",
      link: "https://github.com/HARRISAMIN432/chat-app-ts",
      desc: "Developed a real-time messaging system with low-latency communication using Socket.IO and Redis-based presence tracking.",
      size: "md:col-span-1 md:row-span-2",
      icon: <Terminal size={20} />,
    },
    {
      title: "CodeIQ",
      tech: ["Gemini AI", "JWT", "Express", "Node.js"],
      color: "from-orange-600/20 to-yellow-500/5",
      accent: "text-orange-400",
      link: "https://gitlab.com/2023-cs-160/csc200m24pid160",
      desc: "Built an AI-powered DSA assistant using Gemini API with JWT authentication and persistent chat history.",
      size: "md:col-span-1 md:row-span-1",
      icon: <Code2 size={20} />,
    },
    {
      title: "QuickBlog",
      tech: ["Next.js", "ImageKit", "MERN", "Redux Toolkit", "Gemini AI"],
      color: "from-pink-600/20 to-rose-500/5",
      accent: "text-pink-400",
      link: "https://github.com/HARRISAMIN432/Blog-App",
      desc: "Built a full-stack blogging platform with JWT authentication, AI-assisted content generation, and optimized state management using Redux Toolkit.",
      size: "md:col-span-1 md:row-span-1",
      icon: <Sparkles size={20} />,
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        rotateX: -10,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
        clearProps: "all",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-32 relative z-10 overflow-hidden"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none translate-x-1/3 -translate-y-1/4">
        WORKS
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-blue-500"></div>
            <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">
              Engineering Portfolio
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            FEATURED <br />
            <span className="text-slate-700 italic">SYSTEMS.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`project-card group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0f1e]/80 backdrop-blur-md flex flex-col p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] ${project.size}`}
            >
              {/* Dynamic Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Card Header: Icon & Links */}
              <div className="relative z-10 flex justify-between items-start mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${project.accent} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}
                >
                  {project.icon}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <ExternalLink size={22} />
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-mono font-bold tracking-wider text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/5 group-hover:border-white/10 group-hover:text-white transition-all"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
