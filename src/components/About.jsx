import React, { useEffect, useRef } from "react";
import {
  Code,
  Trophy,
  Database,
  Cpu,
  GraduationCap,
  ChevronRight,
  Terminal,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if element exists before animating to prevent NaN/Undefined errors
    if (!sectionRef.current) return;

    let ctx = gsap.context(() => {
      // Reveal the "Terminal" and Text
      gsap.from(".reveal-up", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Subtle pulse for the "Live" indicator
      gsap.to(".live-dot", {
        scale: 1.5,
        opacity: 0,
        repeat: -1,
        duration: 2,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "LeetCode Solved", value: "500+", color: "text-orange-400" },
    {
      label: "Codeforces Rating",
      value: "1100+",
      color: "text-blue-400",
    },
    { label: "Academic CGPA", value: "3.75 / 4.0", color: "text-emerald-400" },
    { label: "Open Source", value: "15+ Repos", color: "text-purple-400" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 relative  overflow-hidden"
    >
      {/* Background Decorative Text (Watermark) */}
      <div className="absolute top-10 left-10 text-[15rem] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Logic
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: The Narrative */}
          <div className="lg:col-span-6">
            <div className="reveal-up inline-flex items-center gap-3 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">
                Engineering Identity
              </span>
            </div>

            <h2 className="reveal-up text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              BUILDING <br />
              <span className="text-slate-500 italic font-light underline decoration-blue-500/30 underline-offset-8">
                SCALABLE SOLUTIONS.
              </span>
            </h2>

            <p className="reveal-up text-xl text-slate-400 font-light leading-relaxed mb-10 max-w-xl">
              Computer Science student at{" "}
              <span className="text-white font-medium">UET Lahore</span>. I
              don't just build apps; I architect systems where every byte
              counts. My foundation is built on high-speed algorithms and
              scalable MERN architectures.
            </p>

            <div className="reveal-up space-y-4">
              {[
                "Full-Stack Web Applications (React + Node.js)",
                "Real-Time Applications with Socket.io",
                "REST API Development & Authentication",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <ChevronRight size={16} className="text-blue-500" />
                  <span className="font-mono text-sm tracking-tight">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: The Stats Terminal */}
          <div className="lg:col-span-6 reveal-up">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

              <div className="relative bg-[#0a0f1e] border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-10 opacity-40">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-4 font-mono text-xs tracking-widest uppercase">
                    system_stats.sh
                  </span>
                </div>

                <div className="space-y-8">
                  {stats.map((stat, i) => (
                    <div key={i} className="group/stat">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                          {stat.label}
                        </span>
                        <span className={`text-2xl font-black ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 w-full translate-x-[-100%] group-hover/stat:translate-x-0 transition-transform duration-700"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Icon */}
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                      <Terminal size={20} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm tracking-tight">
                        Muhammad Harris Amin
                      </div>
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                        Full-Stack Engineer
                      </div>
                    </div>
                  </div>
                  <GraduationCap className="text-slate-700" size={32} />
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
