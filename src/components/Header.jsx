import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Global Flashlight Cursor (mounted once here, affects whole site) ──
export const FlashlightCursor = () => {
  const lightRef = useRef();
  const dotRef = useRef();
  const posRef = useRef({ x: -300, y: -300 });
  const curRef = useRef({ x: -300, y: -300 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      curRef.current.x += (posRef.current.x - curRef.current.x) * 0.1;
      curRef.current.y += (posRef.current.y - curRef.current.y) * 0.1;
      if (lightRef.current) {
        lightRef.current.style.background = `radial-gradient(circle 280px at ${curRef.current.x}px ${curRef.current.y}px, rgba(59,130,246,0.07) 0%, transparent 70%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    // Cursor expand on hover
    const expand = () =>
      dotRef.current?.classList.add(
        "!w-8",
        "!h-8",
        "!opacity-50",
        "!bg-transparent",
        "!border",
        "!border-blue-400",
      );
    const shrink = () =>
      dotRef.current?.classList.remove(
        "!w-8",
        "!h-8",
        "!opacity-50",
        "!bg-transparent",
        "!border",
        "!border-blue-400",
      );
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Flashlight overlay */}
      <div
        ref={lightRef}
        className="fixed inset-0 z-[9990] pointer-events-none hidden md:block"
      />
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none hidden md:block w-2 h-2 rounded-full bg-blue-400 -translate-x-1/2 -translate-y-1/2 transition-all duration-150 mix-blend-difference"
        style={{ top: -300, left: -300 }}
      />
    </>
  );
};

// ── Header ─────────────────────────────────────────────────────────────
const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const pillRef = useRef(null);
  const navRef = useRef(null);
  const itemRefs = useRef([]);

  const navigation = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  // Sliding pill
  useEffect(() => {
    const idx = navigation.findIndex((n) => n.href === activeSection);
    if (idx < 0 || !itemRefs.current[idx] || !navRef.current) return;
    const el = itemRefs.current[idx];
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    gsap.to(pillRef.current, {
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [activeSection]);

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance
  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2,
    });
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="z-50">
      <FlashlightCursor />
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#02040f]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo — animated brackets */}
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-1.5"
          >
            <span className="text-blue-500 font-mono text-lg font-bold group-hover:text-blue-400 transition-colors">
              [
            </span>
            <span className="text-white font-black tracking-[0.15em] text-sm uppercase">
              HARRIS
            </span>
            <span className="text-blue-500 font-mono text-lg font-bold group-hover:text-blue-400 transition-colors">
              ]
            </span>
            <span className="ml-1 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </button>

          {/* Desktop Nav */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-1 relative"
          >
            <div
              ref={pillRef}
              className="absolute h-7 rounded-full bg-blue-500/10 border border-blue-500/25 pointer-events-none"
              style={{ opacity: 0, top: "50%", transform: "translateY(-50%)" }}
            />
            {navigation.map((item, i) => (
              <button
                key={item.name}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-200 rounded-full ${
                  activeSection === item.href
                    ? "text-blue-400"
                    : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
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
                className="text-slate-600 hover:text-white transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#02040f]/95 backdrop-blur-2xl border-b border-white/10 px-8 py-6 flex flex-col gap-5">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className={`text-left text-2xl font-black uppercase tracking-tighter transition-colors ${
                  activeSection === item.href ? "text-blue-400" : "text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
