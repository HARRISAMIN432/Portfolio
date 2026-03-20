import React, { useState, useEffect } from "react";
import { Mail, MessageCircle, ArrowUpRight, Copy, Check } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("harrisaminjutt@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-40 relative bg-[#030712]">
      <div className="container mx-auto px-6">
        {/* Subtle Section Label */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
            <span className="text-[10px] font-mono tracking-[0.5em] text-slate-500 uppercase">
              Next Steps
            </span>
          </div>
        </div>

        {/* Central Heading - Simplified Scale */}
        <h2 className="text-5xl md:text-7xl font-black text-white text-center mb-20 tracking-tighter">
          LEAD THE <span className="text-blue-500 italic">INNOVATION.</span>
        </h2>

        {/* The Unified Command Strip */}
        <div className="max-w-5xl mx-auto">
          <div className="relative group p-2 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row items-stretch gap-2 transition-all duration-500 hover:border-blue-500/20">
            {/* WhatsApp Side - The "Soft" Action */}
            <a
              href="https://wa.me/923119870369"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-between p-8 md:p-12 rounded-[3rem] bg-transparent hover:bg-emerald-500/5 transition-all duration-500 group/wa"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover/wa:scale-110 transition-transform">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                    WhatsApp
                  </p>
                  <p className="text-xl font-bold text-white">
                    +92 311 9870369
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-slate-600 group-hover/wa:text-emerald-500 transition-colors"
              />
            </a>

            {/* The Vertical Divider (Desktop Only) */}
            <div className="hidden md:block w-px bg-white/10 my-8" />

            {/* Email Side - The "Main" Action */}
            <div className="flex-[1.2] flex items-center justify-between p-8 md:p-12 rounded-[3rem] bg-blue-600 hover:bg-blue-500 transition-all duration-500 shadow-xl group/mail relative overflow-hidden">
              <a
                href="mailto:harrisaminjutt@gmail.com"
                className="absolute inset-0 z-10"
              />

              <div className="flex items-center gap-6 relative z-20">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-blue-100 uppercase tracking-widest mb-1">
                    Direct Email
                  </p>
                  <p className="text-xl font-bold text-white">
                    harrisaminjutt@gmail.com
                  </p>
                </div>
              </div>

              {/* Functional Copy Button */}
              <button
                onClick={copyEmail}
                className="relative z-30 w-12 h-12 rounded-xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-all active:scale-90"
              >
                {copied ? (
                  <Check size={18} className="text-emerald-400" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta Text */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open for worldwide collaboration
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
