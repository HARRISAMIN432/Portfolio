import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin outside the component
gsap.registerPlugin(ScrollTrigger);

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const navigation = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Shrink header on scroll
      gsap.to(headerRef.current, {
        paddingTop: "1rem",
        paddingBottom: "1rem",
        backgroundColor: "rgba(5, 8, 22, 0.9)",
        scrollTrigger: {
          start: "top -50",
          end: "top -51",
          toggleActions: "play none reverse none",
        },
      });
    }, headerRef);

    return () => ctx.revert(); // Cleanup prevents the error
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300 backdrop-blur-md border-b border-white/5 bg-transparent"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter text-white">
          HARRIS<span className="text-blue-500">.</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`text-xs font-bold tracking-widest uppercase transition-all hover:text-blue-400 ${
                activeSection === item.href ? "text-blue-400" : "text-slate-400"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-5 text-slate-400">
          <a
            href="https://github.com/HARRISAMIN432"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/harris-amin-32a90a2a7/"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:harrisaminjutt@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#050816] border-b border-white/10 p-6 md:hidden flex flex-col gap-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-left text-xl font-bold text-white uppercase"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
