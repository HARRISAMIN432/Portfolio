import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="relative border-t border-white/[0.05] bg-[#02040f]">
    {/* Animated gradient top line */}
    <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
      <div
        className="h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, #3b82f6, #818cf8, #22d3ee, transparent)",
          backgroundSize: "200% 100%",
          animation: "lineSlide 4s linear infinite",
        }}
      />
    </div>

    <div className="max-w-7xl mx-auto px-8 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-slate-600 font-mono text-[10px]">[</span>
          <span className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">
            HARRIS
          </span>
          <span className="text-slate-600 font-mono text-[10px]">]</span>
          <span className="mx-3 text-slate-800">·</span>
          <span className="text-slate-700 font-mono text-[10px]">
            © {new Date().getFullYear()} Muhammad Harris Amin
          </span>
        </div>

        {/* Section index */}
        <div className="hidden md:flex items-center gap-6 text-slate-800 font-mono text-[10px] tracking-widest uppercase">
          {[
            "01 Home",
            "02 About",
            "03 Skills",
            "04 Projects",
            "05 Contact",
          ].map((s, i) => (
            <button
              key={i}
              onClick={() => {
                const id = s.split(" ")[1].toLowerCase();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-slate-500 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 text-slate-700">
          {[
            {
              href: "https://github.com/HARRISAMIN432",
              icon: <Github size={16} />,
            },
            {
              href: "https://www.linkedin.com/in/harris-amin-32a90a2a7/",
              icon: <Linkedin size={16} />,
            },
            {
              href: "mailto:harrisaminjutt@gmail.com",
              icon: <Mail size={16} />,
            },
          ].map(({ href, icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:drop-shadow-[0_0_6px_rgba(96,165,250,0.8)] transition-all"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes lineSlide { from { background-position: 0% 0% } to { background-position: 200% 0% } }
    `}</style>
  </footer>
);

export default Footer;
