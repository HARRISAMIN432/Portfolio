import React, { useEffect, useRef, useState } from "react";
import { Download, ArrowDownRight, Zap } from "lucide-react";
import gsap from "gsap";
import HeroCanvas from "./canvas/HeroCanvas";
import resume from "../assets/Harris_Resume.pdf";

// ── Glitch Text ───────────────────────────────────────────────────────
const GlitchText = ({ text, className }) => {
  const ref = useRef();
  const chars = "!<>-_\\/[]{}—=+*^?#@$%01";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let interval;
    const glitch = () => {
      let iter = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        el.innerText = text
          .split("")
          .map((c, i) => {
            if (i < iter) return text[i];
            if (c === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (iter >= text.length) clearInterval(interval);
        iter += 0.6;
      }, 28);
    };
    const t = setTimeout(glitch, 600);
    el.addEventListener("mouseenter", glitch);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
      el.removeEventListener("mouseenter", glitch);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} data-value={text}>
      {text}
    </span>
  );
};

// ── Magnetic Button ───────────────────────────────────────────────────
const MagBtn = ({ children, onClick, className }) => {
  const ref = useRef();
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    gsap.to(ref.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.38,
      y: (e.clientY - r.top - r.height / 2) * 0.38,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onLeave = () =>
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });
  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </button>
  );
};

// ── Ticker marquee ────────────────────────────────────────────────────
const Ticker = () => {
  const items = [
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Socket.io",
    "Docker",
    "Redis",
    "Python",
    "C++ DSA",
    "JWT Auth",
    "REST API",
    "Next.js",
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 border-t border-white/[0.06] overflow-hidden bg-white/[0.02] backdrop-blur-sm flex items-center">
      <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] gap-0">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="px-8 text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-slate-600"
          >
            {item} <span className="text-blue-500/60 mx-2">◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
      `}</style>
    </div>
  );
};

// ── Main Hero ─────────────────────────────────────────────────────────
const Hero = () => {
  const heroRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) =>
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Left side stagger
      gsap.from(".h-left > *", {
        x: -80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.3,
      });
      // Right side
      gsap.from(".h-right", {
        x: 80,
        opacity: 0,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.5,
      });
      // Stats
      gsap.from(".h-stat", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(2)",
        delay: 1,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ paddingTop: "80px" }}
    >
      {/* Main grid split */}
      <div className="flex-1 grid lg:grid-cols-[1fr_1fr] items-center relative">
        {/* ── LEFT: TEXT BLOCK ─────────────────────────────────── */}
        <div className="h-left flex flex-col justify-center px-12 lg:px-20 py-16 relative z-10">
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/5">
              <Zap size={10} className="text-blue-400 fill-blue-400" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-blue-400 uppercase">
                Available for Work
              </span>
            </div>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-blue-500/40 to-transparent" />
          </div>

          {/* Huge kinetic headline */}
          <div className="mb-6 overflow-hidden">
            <div
              className="text-[clamp(4rem,10vw,8rem)] font-black text-white leading-[0.85] tracking-tighter"
              style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
            >
              <GlitchText text="HARRIS" className="block" />
              <span
                className="block"
                style={{
                  WebkitTextStroke: "2px rgba(59,130,246,0.6)",
                  color: "transparent",
                }}
              >
                AMIN
              </span>
              <span
                className="block text-[clamp(1.2rem,3vw,2rem)] font-light text-slate-500 tracking-[0.4em] uppercase mt-2"
                style={{ fontFamily: "inherit" }}
              >
                Full–Stack Engineer
              </span>
            </div>
          </div>

          {/* Descriptor */}
          <p className="text-slate-400 text-base leading-relaxed max-w-md mb-10 font-light">
            CS student at{" "}
            <span className="text-white font-semibold">UET Lahore</span>{" "}
            architecting scalable MERN systems, real-time apps, and algorithmic
            solutions at 500+ LeetCode problems.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <MagBtn
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative px-8 py-3.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold tracking-wide rounded-full transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <ArrowDownRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform duration-300"
                />
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </MagBtn>

            <a
              href={resume}
              download
              className="group flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 text-slate-400 text-sm font-bold hover:text-white hover:border-white/30 transition-all duration-300"
            >
              <Download
                size={15}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Resume
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {[
              { val: "500+", label: "LeetCode", color: "text-orange-400" },
              { val: "3.75/4", label: "CGPA", color: "text-emerald-400" },
              { val: "1100+", label: "Codeforces", color: "text-blue-400" },
              { val: "15+", label: "Repos", color: "text-purple-400" },
            ].map((s, i) => (
              <div key={i} className="h-stat group cursor-default">
                <div className={`text-2xl font-black ${s.color} leading-none`}>
                  {s.val}
                </div>
                <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-0.5 group-hover:text-slate-400 transition-colors">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: 3D CANVAS ─────────────────────────────────── */}
        <div className="h-right relative h-[60vh] lg:h-full min-h-[500px]">
          {/* Gradient fade on left edge — blends canvas into text */}
          <div
            className="absolute top-0 left-0 bottom-0 w-32 z-10 pointer-events-none hidden lg:block"
            style={{
              background: "linear-gradient(90deg, #02040f, transparent)",
            }}
          />
          <HeroCanvas />
        </div>

        {/* Vertical rule divider */}
        <div className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none" />
      </div>

      {/* ── BOTTOM TICKER ──────────────────────────────────────── */}
      <Ticker />

      {/* Corner index mark */}
      <div className="absolute bottom-14 left-12 text-[10px] font-mono text-slate-700 hidden lg:block">
        01 / HOME
      </div>
    </section>
  );
};

export default Hero;
