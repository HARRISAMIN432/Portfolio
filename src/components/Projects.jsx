import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── 3D Tilt Project Card (Optimized) ──────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const rect = useRef(null);
  const shineRef = useRef(); // Added missing ref

  // Cache dimensions to prevent "Layout Thrashing" (heavy recalculations)
  const updateRect = () => {
    if (cardRef.current) {
      rect.current = cardRef.current.getBoundingClientRect();
    }
  };

  const onMove = (e) => {
    if (!rect.current) updateRect();

    const r = rect.current;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    // Use GSAP for smooth hardware-accelerated movement
    gsap.to(cardRef.current, {
      rotateX: (y - 0.5) * -12,
      rotateY: (x - 0.5) * 12,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Update CSS variables for high-performance background rendering
    cardRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={updateRect}
      onMouseLeave={onLeave}
      className="group relative flex-shrink-0 w-[380px] h-[520px] rounded-[2rem] bg-[#05080f] border border-white/[0.05] overflow-hidden project-card"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Dynamic Cursor Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${project.glowColor}15, transparent 40%)`,
          zIndex: 1,
        }}
      />

      {/* Shine Effect */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.04) 0%, transparent 80%)`,
        }}
      />

      {/* Top Panel */}
      <div
        className="relative h-44 flex-shrink-0 overflow-hidden flex items-center justify-center bg-[#0a0f1a]"
        style={{ transform: "translateZ(30px)", background: project.panelBg }}
      >
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${project.glowColor}15 0%, transparent 70%)`,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.05] font-black text-9xl text-white">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div
          className={`relative z-10 p-5 rounded-3xl border bg-[#02040f]/60 backdrop-blur-md transition-transform duration-500 group-hover:scale-110`}
          style={{ borderColor: `${project.glowColor}30` }}
        >
          <div className={project.accent}>
            {React.cloneElement(project.icon, { size: 36 })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1 p-7 gap-4"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <div className="flex gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] ${project.accent}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Projects Component ───────────────────────────────────────────
const Projects = () => {
  const secRef = useRef();
  const railRef = useRef();
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const projects = [
    {
      title: "UrbanNest",
      tech: ["React", "Node.js", "MongoDB", "Redux", "JWT"],
      accent: "text-blue-400",
      glowColor: "#3b82f6",
      link: "https://github.com/HARRISAMIN432/Real-Estate-App",
      desc: "Real estate platform with JWT & Google auth, advanced property filtering, and optimized queries with a fully responsive UI.",
      icon: <Layers size={28} />,
    },
    {
      title: "Chatty Engine",
      tech: ["Socket.io", "Redis", "TypeScript", "Node.js"],
      accent: "text-emerald-400",
      glowColor: "#10b981",
      link: "https://github.com/HARRISAMIN432/chat-app-ts",
      desc: "Real-time messaging system with sub-50ms latency using Socket.IO and Redis-based online presence tracking.",
      icon: <Terminal size={28} />,
    },
    {
      title: "AI Stroke Predictor",
      tech: ["Python", "Scikit-Learn", "FastAPI", "Pandas"],
      accent: "text-purple-400",
      glowColor: "#a855f7",
      link: "https://github.com/HARRISAMIN432/AI-Final-Project",
      desc: "ML model predicting stroke risk with high accuracy using Random Forest, served via a FastAPI REST endpoint.",
      icon: <Cpu size={28} />,
    },
    {
      title: "CodeIQ",
      tech: ["Gemini AI", "JWT", "Express", "Node.js"],
      accent: "text-orange-400",
      glowColor: "#f97316",
      link: "https://gitlab.com/2023-cs-160/csc200m24pid160",
      desc: "AI-powered DSA assistant using Gemini API with persistent chat history and JWT-protected user sessions.",
      icon: <Code2 size={28} />,
    },
    {
      title: "QuickBlog",
      tech: ["Next.js", "ImageKit", "MERN", "Redux", "Gemini"],
      accent: "text-pink-400",
      glowColor: "#ec4899",
      link: "https://github.com/HARRISAMIN432/Blog-App",
      desc: "Full-stack blogging platform with AI-assisted content generation, image optimization via ImageKit, and Redux Toolkit state.",
      icon: <Sparkles size={28} />,
    },
  ];

  const scroll = (dir) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * 460, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 20);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".pj-headline", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: secRef.current, start: "top 80%" },
      });
      gsap.from(".project-card", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: railRef.current, start: "top 85%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={secRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 text-[20rem] font-black leading-none select-none pointer-events-none opacity-[0.015] font-bebas">
        04
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            04 / PROJECTS
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        <div className="pj-headline flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase font-bebas">
            FEATURED <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(59,130,246,0.45)",
                color: "transparent",
              }}
            >
              SYSTEMS
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              disabled={!canLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                ${canLeft ? "border-white/15 text-white hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400" : "border-white/[0.04] text-slate-700 cursor-not-allowed"}`}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                ${canRight ? "border-white/15 text-white hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400" : "border-white/[0.04] text-slate-700 cursor-not-allowed"}`}
            >
              <ArrowRight size={18} />
            </button>
            <span className="text-slate-700 font-mono text-xs ml-2 hidden sm:block">
              {projects.length} projects
            </span>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto pb-6 px-8 max-w-7xl mx-auto scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}

        <a
          href="https://github.com/HARRISAMIN432"
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 w-64 rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group h-[520px]"
        >
          <div className="w-14 h-14 rounded-full border border-white/10 group-hover:border-blue-500/30 flex items-center justify-center text-slate-600 group-hover:text-blue-400 transition-colors">
            <Github size={22} />
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
              View All
            </div>
            <div className="text-slate-600 text-xs font-mono mt-1">
              GitHub →
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Projects;
