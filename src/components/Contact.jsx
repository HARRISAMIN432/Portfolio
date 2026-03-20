import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  MessageCircle,
  ArrowUpRight,
  Copy,
  Check,
  Github,
  Linkedin,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Particle burst ────────────────────────────────────────────────────
const useParticleBurst = () => {
  const canvasRef = useRef();
  const burst = (origin) => {
    const canvas = canvasRef.current;
    if (!canvas || !origin) return;
    const ctx = canvas.getContext("2d");
    const r = origin.getBoundingClientRect();
    const cr = canvas.getBoundingClientRect();
    const cx = r.left + r.width / 2 - cr.left;
    const cy = r.top + r.height / 2 - cr.top;
    const particles = Array.from({ length: 28 }, () => ({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 9,
      vy: (Math.random() - 0.5) * 9,
      r: Math.random() * 3.5 + 1.5,
      alpha: 1,
      color: ["#3b82f6", "#818cf8", "#34d399"][Math.floor(Math.random() * 3)],
    }));
    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;
        p.alpha -= 0.022;
        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      if (alive) raf = requestAnimationFrame(loop);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    cancelAnimationFrame(raf);
    loop();
  };
  return { canvasRef, burst };
};

// ── Main Contact ──────────────────────────────────────────────────────
const Contact = () => {
  const [copied, setCopied] = useState(false);
  const secRef = useRef();
  const copyRef = useRef();
  const containerRef = useRef();
  const { canvasRef, burst } = useParticleBurst();

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("harrisaminjutt@gmail.com");
    setCopied(true);
    burst(copyRef.current);
    setTimeout(() => setCopied(false), 2000);
  };

  // Canvas resize
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current && containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = r.width;
        canvasRef.current.height = r.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!secRef.current) return;
    let ctx = gsap.context(() => {
      gsap.from(".ct-left > *", {
        x: -60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 70%" },
      });
      gsap.from(".ct-right", {
        x: 80,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: secRef.current, start: "top 70%" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/HARRISAMIN432",
      icon: <Github size={18} />,
      sub: "HARRISAMIN432",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/harris-amin-32a90a2a7/",
      icon: <Linkedin size={18} />,
      sub: "harris-amin",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/923119870369",
      icon: <MessageCircle size={18} />,
      sub: "+92 311 9870369",
    },
  ];

  return (
    <section
      id="contact"
      ref={secRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Bg number */}
      <div
        className="absolute top-0 left-0 text-[20rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: "rgba(255,255,255,0.012)",
          fontFamily: "'Bebas Neue', sans-serif",
          lineHeight: 0.8,
        }}
      >
        05
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8">
        {/* Label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="text-blue-500 font-mono text-xs tracking-[0.5em] uppercase">
            05 / CONTACT
          </span>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-blue-500/30 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT: Big CTA text ─────────────────────────────── */}
          <div className="ct-left flex flex-col gap-8">
            <h2
              className="text-6xl lg:text-8xl font-black leading-[0.85] tracking-tighter"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="text-white block">LET'S</span>
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(90deg, #3b82f6, #818cf8, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                BUILD
              </span>
              <span className="text-white block">TOGETHER.</span>
            </h2>

            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              Open to work, collaborations, and exciting projects
              anywhere in the world. Let's create something remarkable.
            </p>

            {/* Status */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
                  Available Now
                </span>
              </div>
              <span className="text-slate-600 font-mono text-xs">
                for worldwide work
              </span>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socials.map(({ label, href, icon, sub }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-3 border-b border-white/[0.05] hover:border-blue-500/20 transition-colors"
                >
                  <span className="text-slate-600 group-hover:text-blue-400 transition-colors">
                    {icon}
                  </span>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                      {label}
                    </div>
                    <div className="text-white text-sm font-medium group-hover:text-blue-400 transition-colors">
                      {sub}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-700 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Holographic contact card ────────────────── */}
          <div
            className="ct-right"
            ref={containerRef}
            style={{ position: "relative" }}
          >
            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-50"
              style={{ borderRadius: "2rem" }}
            />

            {/* Card */}
            <div
              className="relative rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#05080f]"
              style={{
                background: "linear-gradient(135deg, #05080f 0%, #0a0f1e 100%)",
              }}
            >
              {/* Holographic shimmer */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.04) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 4s linear infinite",
                }}
              />

              {/* Scanline */}
              <div
                className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/15 to-transparent pointer-events-none"
                style={{ animation: "scanY 6s linear infinite", top: 0 }}
              />

              <div className="p-8 lg:p-10 flex flex-col gap-8">
                {/* Card top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">
                    contact.json
                  </span>
                  <div className="flex items-center gap-1">
                    <Zap size={10} className="text-blue-400 fill-blue-400" />
                    <span className="text-[10px] font-mono text-blue-400">
                      online
                    </span>
                  </div>
                </div>

                {/* JSON-style display */}
                <div className="font-mono text-sm space-y-1">
                  <div className="text-slate-600">{"{"}</div>
                  <div className="ml-4">
                    <span className="text-purple-400">"name"</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-emerald-400">
                      "Muhammad Harris Amin"
                    </span>
                    <span className="text-slate-600">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">"role"</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-emerald-400">
                      "Full-Stack Engineer"
                    </span>
                    <span className="text-slate-600">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">"location"</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-emerald-400">"Lahore, PK"</span>
                    <span className="text-slate-600">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">"status"</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-orange-400">"available"</span>
                    <span className="text-slate-600">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">"email"</span>
                    <span className="text-slate-600">: </span>
                    <span className="text-blue-400">
                      "harrisaminjutt@gmail.com"
                    </span>
                  </div>
                  <div className="text-slate-600">{"}"}</div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05]" />

                {/* Email CTA */}
                <div className="relative rounded-2xl overflow-hidden bg-blue-600 hover:bg-blue-500 transition-colors duration-300">
                  <a
                    href="mailto:harrisaminjutt@gmail.com"
                    className="absolute inset-0 z-10"
                  />

                  {/* Moving shimmer on card */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s linear infinite",
                    }}
                  />

                  <div className="relative z-20 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Mail size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="text-blue-100 text-[10px] font-mono uppercase tracking-widest mb-0.5">
                          Send Email
                        </div>
                        <div className="text-white font-bold text-sm">
                          harrisaminjutt@gmail.com
                        </div>
                      </div>
                    </div>
                    <button
                      ref={copyRef}
                      onClick={copyEmail}
                      className="relative z-30 w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all active:scale-90"
                    >
                      {copied ? (
                        <Check size={16} className="text-emerald-300" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp secondary */}
                <a
                  href="https://wa.me/923119870369"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.05] hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <MessageCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      WhatsApp
                    </div>
                    <div className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">
                      +92 311 9870369
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-700 group-hover:text-emerald-400 transition-colors"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { from { background-position: 200% 0% } to { background-position: -200% 0% } }
        @keyframes scanY   { from { top: -2px } to { top: 100% } }
      `}</style>
    </section>
  );
};

export default Contact;
