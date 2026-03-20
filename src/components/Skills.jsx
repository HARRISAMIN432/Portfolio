import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Skill orb node ────────────────────────────────────────────────────
const SkillNode = ({ skill, angle, radius, delay, accent }) => {
  const ref = useRef();
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      ref={ref}
      className="skill-node absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
      <div
        className={`px-4 py-2 rounded-full border bg-[#02040f] text-xs font-mono font-bold tracking-wider
        transition-all duration-400 whitespace-nowrap
        ${accent}
        border-current/20 hover:bg-current/10 hover:scale-110 hover:shadow-[0_0_20px_currentColor]`}
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          "--tw-shadow-color": "rgba(59,130,246,0.3)",
        }}
      >
        {skill}
      </div>
    </div>
  );
};

// ── Horizontal category bar ───────────────────────────────────────────
const CategoryBar = ({ cat, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`skill-bar group flex items-start gap-5 p-6 rounded-2xl border text-left transition-all duration-400 w-full
      ${
        isActive
          ? "border-blue-500/30 bg-blue-500/5"
          : "border-white/[0.05] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      }`}
  >
    <span
      className={`font-mono text-sm font-bold mt-0.5 transition-colors ${isActive ? "text-blue-400" : "text-slate-700 group-hover:text-slate-500"}`}
    >
      0{index + 1}
    </span>
    <div className="flex-1 min-w-0">
      <div
        className={`text-sm font-bold uppercase tracking-widest mb-3 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
      >
        {cat.title}
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((s, i) => (
          <span
            key={i}
            className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all duration-300
              ${
                isActive
                  ? "border-blue-500/30 text-blue-300 bg-blue-500/10"
                  : "border-white/[0.06] text-slate-600 group-hover:text-slate-400"
              }`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  </button>
);

// ── Main Skills ───────────────────────────────────────────────────────
const Skills = () => {
  const secRef = useRef();
  const [active, setActive] = useState(0);

  const categories = [
    {
      title: "Frontend Architecture",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
      ],
      color: "text-blue-400",
    },
    {
      title: "Backend & Cloud",
      skills: [
        "Node.js",
        "Express.js",
        "Docker",
        "REST API",
        "JWT Auth",
        "Socket.io",
      ],
      color: "text-emerald-400",
    },
    {
      title: "Data Systems",
      skills: ["PostgreSQL", "MongoDB", "Redis", "SQL"],
      color: "text-purple-400",
    },
    {
      title: "Core Engineering",
      skills: ["C++ (DSA)", "Python", "Problem Solving", "Algorithms"],
      color: "text-orange-400",
    },
  ];

  // All skills flattened for the orbital display
  const allSkills = categories.flatMap((c, ci) =>
    c.skills.map((s) => ({ name: s, color: c.color, cat: ci })),
  );

  // Position skills on concentric orbits
  const getOrbitLayout = () => {
    const orbits = [
      { skills: allSkills.slice(0, 6), radius: 160 },
      { skills: allSkills.slice(6, 14), radius: 240 },
      { skills: allSkills.slice(14), radius: 310 },
    ];
    return orbits
      .map(({ skills, radius }) =>
        skills.map((s, i) => ({
          ...s,
          angle: (i / skills.length) * Math.PI * 2 - Math.PI / 2,
          radius,
        })),
      )
      .flat();
  };
  const nodes = getOrbitLayout();

  useEffect(() => {
    if (!secRef.current) return;
    let ctx = gsap.context(() => {
      gsap.from(".sk-headline > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%" },
      });
      gsap.from(".skill-bar", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skill-bar", start: "top 80%" },
      });
      gsap.from(".skill-node", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".orbit-area", start: "top 75%" },
      });
      // Orbit rings rotate on scroll
      gsap.to(".orbit-ring-1", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".orbit-ring-2", {
        rotate: -360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={secRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Huge bg text */}
      <div
        className="absolute top-0 left-0 text-[20rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: "rgba(255,255,255,0.012)",
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 0.8,
        }}
      >
        03
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            03 / SKILLS
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        {/* Headline */}
        <div className="sk-headline mb-20">
          <h2
            className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SOLVING WITH
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(59,130,246,0.45)",
                color: "transparent",
              }}
            >
              PRECISION
            </span>
          </h2>
        </div>

        {/* Two-column: orbital + list */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* ── Orbital visualization ──────────────────── */}
          <div className="orbit-area relative h-[680px] hidden lg:block">
            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-blue-400" />
                  </div>
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[ping_3s_ease-in-out_infinite]" />
                <div className="absolute inset-[-8px] rounded-full border border-blue-500/10 animate-[ping_3s_ease-in-out_infinite_0.5s]" />
              </div>
            </div>

            {/* Orbit circles (decorative) */}
            {[170, 250, 320].map((r, i) => (
              <div
                key={i}
                className={`orbit-ring-${i + 1} absolute top-1/2 left-1/2 rounded-full border pointer-events-none`}
                style={{
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                  borderColor: `rgba(59,130,246,${0.06 - i * 0.015})`,
                  borderStyle: "dashed",
                }}
              />
            ))}

            {/* Skill nodes */}
            {nodes.map((node, i) => (
              <SkillNode
                key={i}
                skill={node.name}
                angle={node.angle}
                radius={node.radius}
                accent={node.color}
                delay={i * 0.05}
              />
            ))}
          </div>

          {/* ── Category list ─────────────────────────── */}
          <div className="flex flex-col gap-3">
            {categories.map((cat, i) => (
              <CategoryBar
                key={cat.title}
                cat={cat}
                index={i}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
