import React, { useEffect, useRef } from "react";
import { Download, ChevronDown, Terminal, Trophy, Cpu } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef();
  const meshRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Main Text Reveal
      gsap.from(".hero-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });

      // Stats Bar Pop-in
      gsap.from(".stat-pill", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.8,
        ease: "back.out(1.7)",
      });

      // Subtle Background Mesh Movement
      gsap.to(".mesh-gradient", {
        duration: 20,
        repeat: -1,
        yoyo: true,
        backgroundPosition: "100% 100%",
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Animated Mesh */}

      <div className="container mx-auto px-6 text-center z-10">
        {/* Academic/Status Tag */}
        <div className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
            UET CS '27 • Available for Internships
          </span>
        </div>

        <h1 className="hero-reveal text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
          HARRIS <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent italic">
            AMIN.
          </span>
        </h1>

        <p className="hero-reveal text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Full-Stack Developer crafting scalable systems.
          <span className="text-white font-medium block md:inline ml-1">
            Mastering algorithms at 500+ LeetCode problems.
          </span>
        </p>

        {/* Dynamic Stats Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {[
            {
              label: "LeetCode",
              val: "500+",
              icon: <Terminal size={14} />,
              color: "text-orange-400",
            },
            {
              label: "Codeforces",
              val: "280+",
              icon: <Trophy size={14} />,
              color: "text-blue-400",
            },
            {
              label: "CGPA",
              val: "3.75/4.0",
              icon: <Cpu size={14} />,
              color: "text-emerald-400",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-pill flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className={`${stat.color}`}>{stat.icon}</div>
              <div className="text-left">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-tighter leading-none">
                  {stat.label}
                </div>
                <div className="text-lg font-black text-white">{stat.val}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-reveal flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-10 py-4 bg-white text-black rounded-full font-bold transition-all hover:bg-blue-500 hover:text-white active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Projects
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>

            {/* Add this "Glow" effect for the Next Level look */}
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
          </button>

          <a
            href={`react-vite-deploy/Harris_Resume.pdf`}
            download="Harris_Resume.pdf"
            className="flex items-center gap-2 px-8 py-4 text-white font-bold hover:text-blue-400 transition-all group"
          >
            <Download
              size={20}
              className="group-hover:-translate-y-1 transition-transform"
            />
            Get Resume
          </a>
        </div>
      </div>

      {/* Floating Elements for Depth */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-500/10 blur-[80px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500/10 blur-[80px] rounded-full animate-pulse delay-700" />

      <ChevronDown
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce opacity-50"
        size={24}
      />
    </section>
  );
};

// Simple helper icon
const ArrowRight = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

export default Hero;
