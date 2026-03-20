import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Skill orb node ────────────────────────────────────────────────────
const SkillNode = ({ skill, angle, radius, accent }) => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return (
    <div
      className="skill-node absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
      <div
        className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider
          whitespace-nowrap transition-all duration-300 ${accent}
          hover:scale-110`}
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "#02040f",
          boxShadow: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 18px currentColor";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {skill}
      </div>
    </div>
  );
};

// ── Category bar ──────────────────────────────────────────────────────
const CategoryBar = ({ cat, index, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="skill-bar group flex items-start gap-5 p-6 rounded-2xl text-left w-full transition-all duration-300"
    style={{
      border: isActive
        ? "1px solid rgba(59,130,246,0.3)"
        : "1px solid rgba(255,255,255,0.05)",
      backgroundColor: isActive
        ? "rgba(59,130,246,0.05)"
        : "rgba(255,255,255,0.02)",
    }}
  >
    <span
      className="font-mono text-sm font-bold mt-0.5 transition-colors flex-shrink-0"
      style={{ color: isActive ? "#60a5fa" : "#334155" }}
    >
      0{index + 1}
    </span>
    <div className="flex-1 min-w-0">
      <div
        className="text-sm font-bold uppercase tracking-widest mb-3"
        style={{ color: isActive ? "#ffffff" : "#64748b" }}
      >
        {cat.title}
      </div>
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((s, i) => (
          <span
            key={i}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full transition-all duration-300"
            style={{
              border: isActive
                ? "1px solid rgba(59,130,246,0.3)"
                : "1px solid rgba(255,255,255,0.06)",
              color: isActive ? "#93c5fd" : "#475569",
              backgroundColor: isActive
                ? "rgba(59,130,246,0.1)"
                : "transparent",
            }}
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

  const allSkills = categories.flatMap((c) =>
    c.skills.map((s) => ({ name: s, color: c.color })),
  );

  const nodes = [
    { skills: allSkills.slice(0, 6), radius: 155 },
    { skills: allSkills.slice(6, 14), radius: 230 },
    { skills: allSkills.slice(14), radius: 298 },
  ].flatMap(({ skills, radius }) =>
    skills.map((s, i) => ({
      ...s,
      angle: (i / skills.length) * Math.PI * 2 - Math.PI / 2,
      radius,
    })),
  );

  useEffect(() => {
    if (!secRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".sk-headline > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%" },
      });
      gsap.from(".skill-bar", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 70%" },
      });
      gsap.from(".skill-node", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ".orbit-area", start: "top 75%" },
      });
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
      gsap.to(".orbit-ring-3", {
        rotate: 360,
        duration: 80,
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
      {/* Bg section number */}
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

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            03 / SKILLS
          </span>
          <div
            className="h-px flex-1 max-w-xs"
            style={{
              background:
                "linear-gradient(90deg, rgba(59,130,246,0.3), transparent)",
            }}
          />
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

        {/* ── Two-column: category list LEFT, orbital RIGHT ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Category bars (always visible) */}
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

          {/* RIGHT — Orbital (desktop only) */}
          <div className="orbit-area relative h-[640px] hidden lg:block">
            {/* Orbit ring decorations */}
            {[
              { r: 170, cls: "orbit-ring-1" },
              { r: 248, cls: "orbit-ring-2" },
              { r: 316, cls: "orbit-ring-3" },
            ].map(({ r, cls }, i) => (
              <div
                key={i}
                className={`${cls} absolute top-1/2 left-1/2 rounded-full pointer-events-none`}
                style={{
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                  border: `1px dashed rgba(59,130,246,${0.07 - i * 0.02})`,
                }}
              />
            ))}

            {/* Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.3)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(59,130,246,0.25)",
                      border: "1px solid rgba(96,165,250,0.5)",
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-400" />
                  </div>
                </div>
                {/* Pulse rings */}
                <div
                  className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="absolute rounded-full border border-blue-500/10 animate-ping"
                  style={{
                    inset: "-8px",
                    animationDuration: "3s",
                    animationDelay: "0.5s",
                  }}
                />
              </div>
            </div>

            {/* Skill nodes */}
            {nodes.map((node, i) => (
              <SkillNode
                key={i}
                skill={node.name}
                angle={node.angle}
                radius={node.radius}
                accent={node.color}
              />
            ))}
          </div>
        </div>

        {/* Mobile: show all skills as flat tags */}
        <div className="lg:hidden mt-12 flex flex-wrap gap-2">
          {allSkills.map((s, i) => (
            <span
              key={i}
              className={`text-xs font-mono px-3 py-1.5 rounded-full ${s.color}`}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
