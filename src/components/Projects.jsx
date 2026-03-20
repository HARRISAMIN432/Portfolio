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

// ── 3D Tilt Project Card ──────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef();
  const shineRef = useRef();
  const glowRef = useRef();

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    gsap.to(cardRef.current, {
      rotateX: (y - 0.5) * -16,
      rotateY: (x - 0.5) * 16,
      transformPerspective: 900,
      duration: 0.45,
      ease: "power2.out",
    });
    if (shineRef.current)
      shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.06) 0%, transparent 55%)`;
    if (glowRef.current) {
      glowRef.current.style.left = `${e.clientX - r.left}px`;
      glowRef.current.style.top = `${e.clientY - r.top}px`;
    }
  };
  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.4)",
    });
    if (shineRef.current) shineRef.current.style.background = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="project-card flex-shrink-0 w-[360px] sm:w-[420px] relative rounded-[2rem] overflow-hidden border border-white/[0.07] bg-[#05080f] flex flex-col cursor-default"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        height: "520px",
      }}
    >
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-40 h-40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle, ${project.glowColor}30, transparent)`,
          zIndex: 1,
        }}
      />

      {/* Shine */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-20 pointer-events-none rounded-[2rem]"
      />

      {/* ── Card Top Panel ──────────────────────────────────── */}
      <div
        className="relative h-44 flex-shrink-0 overflow-hidden flex items-center justify-center"
        style={{ transform: "translateZ(15px)", background: project.panelBg }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Radial glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${project.glowColor}18 0%, transparent 70%)`,
          }}
        />

        {/* Big project number — behind icon */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "9rem",
            fontWeight: 900,
            color: `${project.glowColor}08`,
            lineHeight: 1,
            letterSpacing: "-0.05em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Center icon */}
        <div
          className={`relative z-10 p-5 rounded-3xl border bg-[#02040f]/60 backdrop-blur-sm ${project.accent} group-hover:scale-110 transition-transform duration-500`}
          style={{ borderColor: `${project.glowColor}30` }}
        >
          <div className={project.accent}>
            {React.cloneElement(project.icon, { size: 36 })}
          </div>
        </div>

        {/* Tech accent dots — decorative corners */}
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-40">
          {project.tech.slice(0, 3).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.glowColor, opacity: 1 - i * 0.25 }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest uppercase opacity-30"
          style={{ color: project.glowColor }}
        >
          {project.tech[0]}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, #05080f 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div
        className="flex flex-col flex-1 p-7 gap-4"
        style={{ transform: "translateZ(25px)" }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h3>
          <div className="flex gap-3 flex-shrink-0 mt-1">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-white transition-colors hover:scale-110 inline-block"
            >
              <Github size={18} />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-white transition-colors hover:scale-110 inline-block"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed flex-1">
          {project.desc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className={`text-[10px] font-mono font-bold tracking-wide px-2.5 py-1 rounded-full border border-white/[0.06] ${project.accent} bg-white/[0.03]`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-[2rem] border border-transparent hover:border-blue-500/20 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

// ── Main Projects ─────────────────────────────────────────────────────
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
    el.scrollBy({ left: dir * 460, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 20);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    if (!secRef.current) return;
    let ctx = gsap.context(() => {
      gsap.from(".pj-headline > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%" },
      });
      gsap.from(".project-card", {
        x: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
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
      {/* Bg number */}
      <div
        className="absolute top-0 right-0 text-[20rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: "rgba(255,255,255,0.012)",
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 0.8,
        }}
      >
        04
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            04 / PROJECTS
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        <div className="pj-headline flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            FEATURED
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(59,130,246,0.45)",
                color: "transparent",
              }}
            >
              SYSTEMS
            </span>
          </h2>

          {/* Nav arrows */}
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

      {/* Horizontal scroll rail */}
      <div
        ref={railRef}
        onScroll={onScroll}
        className="flex gap-5 overflow-x-auto pb-6 px-8 max-w-7xl mx-auto scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}

        {/* "View all" end card */}
        <a
          href="https://github.com/HARRISAMIN432"
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 w-64 rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
          style={{ height: "520px" }}
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

      {/* Fade edges */}
      <div
        className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #02040f, transparent)" }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, #02040f, transparent)" }}
      />
    </section>
  );
};

export default Projects;
