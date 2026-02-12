"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Command, LayoutGrid, BookOpen, User, Mail, Sparkles, FileText, Bot } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Projects", href: "/#projects", icon: LayoutGrid },
    { name: "Experience", href: "/#experience", icon: Command },
    { name: "Blogs", href: "/blogs", icon: BookOpen }, // Added per request
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <div className="fixed top-6 inset-x-0 max-w-2xl mx-auto z-50 px-4 pointer-events-none flex justify-center">
      <div className="pointer-events-auto">
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
              "flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 backdrop-blur-md",
              scrolled 
                ? "bg-neutral-900/80 border-neutral-800 shadow-2xl shadow-black/50" 
                : "bg-neutral-900/40 border-white/5"
            )}
        >
            {/* Logo / Home */}
            <a href="/" className="px-4 py-2 bg-neutral-800 rounded-full flex items-center gap-2 text-white font-medium text-sm hover:bg-neutral-700 transition-colors">
                <Bot size={16} className="text-orange-500" />
                <span>Ahmed.</span>
            </a>

            {/* Nav Links */}
            <nav className="flex items-center">
                {navItems.map((item) => (
                    <a 
                        key={item.name} 
                        href={item.href}
                        className="px-4 py-2 rounded-full text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                        {item.name === 'Blogs' && (
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                        )}
                        {item.name}
                    </a>
                ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-2 ml-1">
                <a 
                    href="/ahmedbenyahia-automation and full stakc-2026.pdf" 
                    target="_blank"
                    className="hidden sm:flex px-4 py-2 bg-neutral-800 text-white rounded-full text-xs font-medium hover:bg-neutral-700 transition-colors items-center gap-2"
                >
                    <FileText size={14} />
                    <span>CV</span>
                </a>
                <a 
                    href="mailto:ahmedbenyahia654@gmail.com" 
                    className="px-4 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                    Hire Me
                </a>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
