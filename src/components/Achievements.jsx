import React, { useEffect, useRef, useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  Zap,
  Github,
  GitBranch,
  Users,
  ExternalLink,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Glitch text on scroll reveal ──────────────────────────────────────
const GlitchReveal = ({ text, className }) => {
  const ref = useRef();
  const chars = "!<>-_\\/[]{}—=+*^?#@$%";
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          let iter = 0;
          const interval = setInterval(() => {
            el.innerText = text
              .split("")
              .map((c, i) => {
                if (i < iter) return text[i];
                if (c === " ") return " ";
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("");
            if (iter >= text.length) clearInterval(interval);
            iter += 0.5;
          }, 30);
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
};

// ── Rank badge ────────────────────────────────────────────────────────
const RankBadge = ({ rank, color, bgColor, borderColor }) => (
  <div
    className={`flex-shrink-0 w-14 h-14 rounded-2xl border ${borderColor} ${bgColor} flex flex-col items-center justify-center relative overflow-hidden`}
  >
    {/* Inner shimmer */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
      }}
    />
    <span
      className={`text-xs font-mono font-black tracking-tighter leading-none ${color}`}
    >
      {rank}
    </span>
    {rank === "🏆" || rank === "★" ? null : (
      <div
        className={`absolute -bottom-0.5 left-0 right-0 h-0.5 ${bgColor.replace("bg-", "bg-").replace("/10", "/60")}`}
      />
    )}
  </div>
);

// ── Single achievement card ───────────────────────────────────────────
const AchievementCard = ({ item, index }) => {
  const cardRef = useRef();
  const isLeft = index % 2 === 0;

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    gsap.to(cardRef.current, {
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const onLeave = () =>
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1,0.4)",
    });

  return (
    <div
      className={`achieve-card flex items-center gap-6 ${isLeft ? "flex-row" : "flex-row-reverse"} w-full max-w-xl ${isLeft ? "mr-auto" : "ml-auto"}`}
    >
      {/* Date bubble (connects to timeline) */}
      <div className="hidden lg:flex flex-col items-center gap-1 flex-shrink-0 w-28">
        <div
          className={`text-[10px] font-mono tracking-widest uppercase text-slate-600 ${isLeft ? "text-right" : "text-left"} w-full`}
        >
          {item.date}
        </div>
        <div
          className={`text-[9px] font-mono text-slate-700 ${isLeft ? "text-right" : "text-left"} w-full`}
        >
          {item.location}
        </div>
      </div>

      {/* Card body */}
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="flex-1 group relative rounded-[1.5rem] border bg-[#05080f] overflow-hidden cursor-default transition-[border-color,box-shadow] duration-400 hover:shadow-[0_0_40px_-10px] "
        style={{
          borderColor: `${item.borderColor}22`,
          "--tw-shadow-color": item.glowColor,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Gradient wash on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${item.glowColor}10, transparent 70%)`,
          }}
        />

        {/* Holographic top border line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.borderColor}, transparent)`,
          }}
        />

        <div
          className="relative z-10 p-6 flex flex-col gap-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Top row: badge + date (mobile) + position label */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <RankBadge
                rank={item.rankDisplay}
                color={item.accentColor}
                bgColor={item.badgeBg}
                borderColor={item.badgeBorder}
              />
              <div>
                <div
                  className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase ${item.accentColor} mb-0.5`}
                >
                  {item.position}
                </div>
                <div className="text-[10px] font-mono text-slate-700 lg:hidden">
                  {item.date}
                </div>
              </div>
            </div>
            {/* Contest type pill */}
            <div className="flex-shrink-0 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                {item.type}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <GlitchReveal
              text={item.title}
              className="text-xl font-black text-white tracking-tight leading-snug block"
            />
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            {item.desc}
          </p>

          {/* Stats row */}
          {item.stats && (
            <div className="flex flex-wrap gap-4 pt-2 border-t border-white/[0.04]">
              {item.stats.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span
                    className={`text-lg font-black ${item.accentColor} leading-none`}
                  >
                    {s.val}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── GitHub Stats Island ───────────────────────────────────────────────
const GitHubIsland = () => {
  // Simulated contribution grid (52 weeks × 7 days)
  const [grid] = useState(() =>
    Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5)),
  );

  const levelColor = (l) =>
    [
      "bg-white/[0.04]",
      "bg-blue-500/20",
      "bg-blue-500/40",
      "bg-blue-500/65",
      "bg-blue-400",
    ][l];

  return (
    <div className="gh-island group relative rounded-[2rem] border border-white/[0.06] bg-[#05080f] overflow-hidden p-8 lg:p-10">
      {/* Holographic shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Top border line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <Github size={22} className="text-slate-400" />
            </div>
            <div>
              <div className="text-white font-black text-lg tracking-tight">
                HARRISAMIN432
              </div>
              <div className="text-slate-600 text-xs font-mono tracking-widest uppercase">
                github.com
              </div>
            </div>
          </div>
          <a
            href="https://github.com/HARRISAMIN432"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-slate-500 text-xs font-mono hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group/link"
          >
            View Profile
            <ExternalLink
              size={12}
              className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Repositories",
              val: "15+",
              icon: <GitBranch size={14} />,
              color: "text-blue-400",
            },
            {
              label: "Open Source",
              val: "Active",
              icon: <Star size={14} />,
              color: "text-yellow-400",
            },
            {
              label: "Contributions",
              val: "200+",
              icon: <Users size={14} />,
              color: "text-emerald-400",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 transition-colors group/stat cursor-default"
            >
              <div
                className={`${s.color} opacity-70 group-hover/stat:opacity-100 transition-opacity`}
              >
                {s.icon}
              </div>
              <div className={`text-xl font-black ${s.color} leading-none`}>
                {s.val}
              </div>
              <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest group-hover/stat:text-slate-500 transition-colors">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Contribution grid */}

        {/* Featured repos strip */}
        <div>
          <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest mb-3">
            Pinned Repos
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                name: "Real-Estate-App",
                lang: "JavaScript",
                stars: "⭐",
                desc: "UrbanNest — MERN real estate platform",
              },
              {
                name: "chat-app-ts",
                lang: "TypeScript",
                stars: "⭐",
                desc: "Chatty Engine — real-time messaging",
              },
              {
                name: "Blog-App",
                lang: "JavaScript",
                stars: "⭐",
                desc: "QuickBlog — AI-powered blog platform",
              },
              {
                name: "AI-Final-Project",
                lang: "Python",
                stars: "⭐",
                desc: "Stroke risk predictor w/ ML",
              },
            ].map((repo, i) => (
              <a
                key={i}
                href={`https://github.com/HARRISAMIN432/${repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="group/repo flex flex-col gap-1.5 p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 hover:bg-blue-500/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 group-hover/repo:text-white transition-colors">
                    {repo.name}
                  </span>
                  <ExternalLink
                    size={11}
                    className="text-slate-700 group-hover/repo:text-blue-400 transition-colors"
                  />
                </div>
                <div className="text-[10px] text-slate-600 leading-tight">
                  {repo.desc}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <span className="text-[9px] font-mono text-slate-700">
                    {repo.lang}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Achievements ─────────────────────────────────────────────────
const Achievements = () => {
  const secRef = useRef();

  const achievements = [
    {
      title: "ICPC Asia Regional Finalist",
      position: "Regional Finalist",
      date: "Feb 2026",
      location: "Asia Region",
      type: "ICPC",
      rankDisplay: "★",
      desc: "Qualified among the top competitive programming teams nationwide to compete in the ICPC Asia Regional Finals — one of the most prestigious CS competitions globally.",
      stats: [
        { val: "Top", label: "Teams Nationwide" },
        { val: "Asia", label: "Regional Stage" },
      ],
      accentColor: "text-yellow-400",
      borderColor: "#facc15",
      glowColor: "rgba(250,204,21,0.2)",
      badgeBg: "bg-yellow-500/10",
      badgeBorder: "border-yellow-500/30",
    },
    {
      title: "Runner-up, UTS 6.0 Programming Contest",
      position: "2nd Place",
      date: "Dec 2025",
      location: "On-site Final",
      type: "Programming",
      rankDisplay: "2nd",
      desc: "Secured 2nd place among 30 competing teams by solving 4 out of 5 problems in the contest — demonstrating speed and algorithmic precision under pressure.",
      stats: [
        { val: "4/5", label: "Problems Solved" },
        { val: "30", label: "Teams" },
      ],
      accentColor: "text-slate-300",
      borderColor: "#cbd5e1",
      glowColor: "rgba(203,213,225,0.1)",
      badgeBg: "bg-slate-500/10",
      badgeBorder: "border-slate-400/25",
    },
    {
      title: "Runner-up, Brainiac'25",
      position: "2nd Place",
      date: "Nov 2025",
      location: "On-site Competition",
      type: "Contest",
      rankDisplay: "2nd",
      desc: "Secured 2nd position by solving all 4 problems in the competition — achieving a perfect problem-solve rate in the entire contest set.",
      stats: [
        { val: "4/4", label: "Perfect Solve" },
        { val: "2nd", label: "Position" },
      ],
      accentColor: "text-slate-300",
      borderColor: "#cbd5e1",
      glowColor: "rgba(203,213,225,0.1)",
      badgeBg: "bg-slate-500/10",
      badgeBorder: "border-slate-400/25",
    },
    {
      title: "Runner-up, Cosmocon'25",
      position: "2nd Place",
      date: "Jul 2025",
      location: "On-site Final",
      type: "Programming",
      rankDisplay: "2nd",
      desc: "Placed 2nd among 75 competing teams by solving 5 out of 6 problems — standing out in a field of 75 teams across the full competition.",
      stats: [
        { val: "5/6", label: "Problems Solved" },
        { val: "75", label: "Teams" },
      ],
      accentColor: "text-slate-300",
      borderColor: "#cbd5e1",
      glowColor: "rgba(203,213,225,0.1)",
      badgeBg: "bg-slate-500/10",
      badgeBorder: "border-slate-400/25",
    },
    {
      title: "Top 25 — Digital Ignite Speed Programming",
      position: "Top 25 Finalist",
      date: "Feb 2026",
      location: "GIKI, On-site",
      type: "Speed Programming",
      rankDisplay: "T25",
      desc: "Qualified from over 1,400+ teams in the first round and secured a Top 25 position in the on-site final round held at GIKI — a major national competitive programming event.",
      stats: [
        { val: "1400+", label: "Teams in Round 1" },
        { val: "Top 25", label: "Final at GIKI" },
      ],
      accentColor: "text-blue-400",
      borderColor: "#3b82f6",
      glowColor: "rgba(59,130,246,0.15)",
      badgeBg: "bg-blue-500/10",
      badgeBorder: "border-blue-500/30",
    },
  ];

  useEffect(() => {
    if (!secRef.current) return;
    let ctx = gsap.context(() => {
      // Headline
      gsap.from(".ach-headline > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 75%" },
      });

      // Cards alternate sides
      gsap.utils.toArray(".achieve-card").forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        gsap.from(card, {
          x: fromLeft ? -80 : 80,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // GitHub island
      gsap.from(".gh-island", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".gh-island", start: "top 80%" },
      });

      // Timeline laser line draw
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-wrap",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      // Node dots pop
      gsap.from(".timeline-node", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(3)",
        scrollTrigger: { trigger: ".timeline-wrap", start: "top 70%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={secRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Bg section number */}
      <div
        className="absolute top-0 right-0 text-[20rem] font-black leading-none select-none pointer-events-none translate-x-1/4"
        style={{
          color: "rgba(255,255,255,0.012)",
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 0.8,
        }}
      >
        06
      </div>

      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(250,204,21,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-yellow-500/80 font-mono text-xs tracking-[0.5em] uppercase">
            06 / ACHIEVEMENTS
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-yellow-500/30 to-transparent" />
        </div>

        {/* Headline */}
        <div className="ach-headline mb-20">
          <h2
            className="text-6xl lg:text-8xl font-black text-white leading-[0.85] tracking-tighter"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            COMPETING
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(250,204,21,0.45)",
                color: "transparent",
              }}
            >
              AT THE TOP
            </span>
          </h2>
          <p className="text-slate-500 text-lg font-light mt-4 max-w-xl">
            National-level competitive programming achievements — from regional
            ICPC stages to on-site speed programming finals.
          </p>
        </div>

        {/* Two-column: timeline + GitHub */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          {/* ── Left: Timeline ──────────────────────────────────── */}
          <div className="timeline-wrap relative">
            {/* Center laser line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none overflow-hidden">
              <div
                className="timeline-line absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(250,204,21,0.4) 0%, rgba(59,130,246,0.4) 50%, rgba(250,204,21,0.2) 100%)",
                }}
              />
              {/* Moving photon */}
              <div
                className="absolute w-full h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(250,204,21,0.6), transparent)",
                  animation: "photon 3s linear infinite",
                }}
              />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-10 relative">
              {achievements.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline node dot */}
                  <div
                    className="timeline-node hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 items-center justify-center"
                    style={{
                      borderColor: item.borderColor,
                      background: item.badgeBg.includes("yellow")
                        ? "rgba(250,204,21,0.3)"
                        : item.badgeBg.includes("blue")
                          ? "rgba(59,130,246,0.3)"
                          : "rgba(203,213,225,0.15)",
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: item.borderColor }}
                    />
                  </div>
                  <AchievementCard item={item} index={i} />
                </div>
              ))}
            </div>

            {/* Terminal end of timeline */}
            <div className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 flex-col items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50" />
              <div className="text-[9px] font-mono text-slate-700 tracking-widest uppercase mt-1">
                ongoing
              </div>
            </div>
          </div>

          {/* ── Right: GitHub Island ──────────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <GitHubIsland />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes photon {
          from { top: -80px; }
          to   { top: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Achievements;
