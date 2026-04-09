import React, { useEffect, useRef, useState } from "react";
import {
  Terminal,
  GraduationCap,
  MapPin,
  ChevronRight,
  Code2,
  Cpu,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import me from "../assets/me.jpg";

gsap.registerPlugin(ScrollTrigger);

// ── Animated counter ─────────────────────────────────────────────────
const Counter = ({ to, suffix = "", duration = 2.2 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef();
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const num = parseFloat(to.replace ? to.replace(/[^0-9.]/g, "") : to);
          const tick = (now) => {
            const p = Math.min((now - start) / 1000 / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(ease * num);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);

  const display = String(to).includes(".") ? val.toFixed(2) : Math.floor(val);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

// ── Photo Placeholder — tell user to swap with real photo ────────────
const PhotoSlot = () => (
  <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0">
    {/* Frame border */}
    <div className="absolute -inset-3 rounded-[2rem] border border-blue-500/15 pointer-events-none" />
    <div className="absolute -inset-6 rounded-[2.5rem] border border-blue-500/06 pointer-events-none" />

    {/* Actual photo area */}
    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-[#0a0f1e] border border-white/10 relative">
      {/* 
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📷  REPLACE THIS BLOCK WITH YOUR REAL PHOTO:
        
        <img
          src="/your-photo.jpg"
          alt="Muhammad Harris Amin"
          className="w-full h-full object-cover"
        />
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      */}
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
        <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
          <span className="text-4xl font-black text-blue-500/50">H</span>
        </div>
        <p className="text-slate-600 font-mono text-xs tracking-widest uppercase">
          📷 Add your photo here
        </p>
        <p className="text-slate-700 font-mono text-[10px]">
          Replace &lt;PhotoSlot&gt; in About.jsx
        </p>
      </div>

      {/* Holographic overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%, rgba(129,140,248,0.05) 100%)",
        }}
      />
      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent pointer-events-none"
        style={{ animation: "scanY 5s linear infinite", top: 0 }}
      />
    </div>

    {/* Location badge */}
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#02040f] border border-white/10 backdrop-blur-sm whitespace-nowrap">
      <MapPin size={11} className="text-blue-400" />
      <span className="text-[10px] font-mono text-slate-400 tracking-widest">
        Lahore, Pakistan
      </span>
    </div>

    <style>{`
      @keyframes scanY { from { top: -2px } to { top: 100% } }
    `}</style>
  </div>
);

// ── Main About ────────────────────────────────────────────────────────
const About = () => {
  const secRef = useRef();

  useEffect(() => {
    if (!secRef.current) return;
    let ctx = gsap.context(() => {
      gsap.from(".ab-left", {
        x: -60,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%" },
      });
      gsap.from(".ab-right > *", {
        x: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 70%" },
      });
      gsap.from(".ab-stat", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".ab-stat", start: "top 80%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const skills = [
    "Full-Stack MERN",
    "Real-Time Systems",
    "REST API Design",
    "DSA & Algorithms",
    "Docker & Redis",
  ];

  return (
    <section id="about" ref={secRef} className="py-32 relative overflow-hidden">
      {/* Massive background number */}
      <div
        className="absolute top-0 right-0 text-[22rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: "rgba(255,255,255,0.015)",
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 0.8,
        }}
      >
        02
      </div>

      {/* Section label */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex items-center gap-4">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            02 / ABOUT
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-20 items-start">
          {/* ── LEFT: Photo ──────────────────────────────── */}
          <div className="ab-left">
            <img src={me} alt="me" />
          </div>

          {/* ── RIGHT: Text + Stats ──────────────────────── */}
          <div className="ab-right flex flex-col gap-10">
            {/* Headline */}
            <div>
              <h2
                className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                BUILDING
                <br />
                <span
                  style={{
                    WebkitTextStroke: "2px rgba(59,130,246,0.5)",
                    color: "transparent",
                  }}
                >
                  SYSTEMS
                </span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-xl">
                Computer Science student at{" "}
                <span className="text-white font-semibold">UET Lahore</span> —
                class of 2027. I architect systems where every byte counts,
                combining scalable MERN stacks with algorithmic precision.
              </p>
            </div>

            {/* Skill bullets */}
            <div className="flex flex-wrap gap-3">
              {skills.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group cursor-default"
                >
                  <div className="w-1 h-1 rounded-full bg-blue-500 group-hover:shadow-[0_0_8px_#3b82f6] transition-shadow" />
                  <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide">
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]">
              {[
                {
                  val: "500",
                  suf: "+",
                  label: "LeetCode",
                  color: "text-orange-400",
                  icon: <Code2 size={18} />,
                },
                {
                  val: "3.75",
                  suf: "/4.0",
                  label: "CGPA",
                  color: "text-emerald-400",
                  icon: <GraduationCap size={18} />,
                },
                {
                  val: "1100",
                  suf: "+",
                  label: "Codeforces",
                  color: "text-blue-400",
                  icon: <Cpu size={18} />,
                },
                {
                  val: "15",
                  suf: "+",
                  label: "Repos",
                  color: "text-purple-400",
                  icon: <Terminal size={18} />,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="ab-stat bg-[#05080f] p-6 flex flex-col gap-3 hover:bg-[#0a0f20] transition-colors group cursor-default"
                >
                  <div
                    className={`${s.color} opacity-60 group-hover:opacity-100 transition-opacity`}
                  >
                    {s.icon}
                  </div>
                  <div
                    className={`text-3xl font-black ${s.color} tabular-nums`}
                  >
                    <Counter to={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* University badge */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  University of Engineering & Technology
                </div>
                <div className="text-slate-500 text-xs font-mono tracking-wide">
                  Lahore · CS '27 · CGPA 3.75
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
