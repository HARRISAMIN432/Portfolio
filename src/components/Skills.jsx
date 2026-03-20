import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

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
    },
    {
      title: "Data Systems",
      skills: ["PostgreSQL", "MongoDB", "SQL"],
    },
    {
      title: "Core Engineering",
      skills: ["C++ (DSA)", "Python", "Problem Solving"],
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal category titles
      gsap.from(".cat-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Reveal skills with a "flip" effect
      gsap.from(".skill-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background Tech Grid Decor */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24">
          <h2 className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-blue-500"></span> Technical Toolkit
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            SOLVING WITH <br />
            <span className="text-slate-700 italic">PRECISION.</span>
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {categories.map((cat, i) => (
            <div key={cat.title} className="flex flex-col gap-8">
              {/* Category Title */}
              <div className="cat-title flex items-center gap-3">
                <span className="text-blue-500 font-mono text-xs">
                  0{i + 1}.
                </span>
                <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2 w-full">
                  {cat.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-col gap-6">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-item group relative cursor-default"
                  >
                    {/* Hover Indicator Dot */}
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_10px_#3b82f6]" />

                    <div className="flex flex-col">
                      <span className="text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-black text-slate-800 group-hover:text-white transition-all duration-500 leading-none group-hover:translate-x-2 inline-block">
                        {skill}
                      </span>
                      {/* Subtle Sub-label (Optional) */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Watermark */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 rotate-90 pointer-events-none select-none">
        <span className="text-[10rem] font-black text-white/[0.02] tracking-widest">
          STACK
        </span>
      </div>
    </section>
  );
};

export default Skills;
