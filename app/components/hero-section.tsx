"use client";
import React from "react";
import { WorkflowBackground } from "./ui/workflow-background";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div className="mt-32 h-[35rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <WorkflowBackground />
      
      <div className="max-w-4xl mx-auto p-4 z-20 text-center space-y-6">
         <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="inline-block px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-sm font-mono mb-4 backdrop-blur-md"
         >
           AHMED BEN YAHIA • FULL STACK & AUTOMATION ENGINEER
         </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-4xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-600 text-center font-sans font-bold tracking-tight"
        >
          Engineering the <br/> Future of Autonomy
        </motion.h1>

        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl text-center relative z-10 font-normal leading-relaxed"
        >
          I build production-grade <span className="text-white font-semibold">RAG systems</span>, <span className="text-white font-semibold">Autonomous Agents</span>, and scalable <span className="text-white font-semibold">n8n workflows</span> that save businesses 1000+ hours.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="px-8 py-4 bg-white text-neutral-950 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1">
            Explore Work
          </button>
          <a 
            href="https://calendly.com/ahmedbenyahia654/30min" 
            target="_blank"
            className="px-8 py-4 bg-transparent border border-neutral-700 text-white rounded-full font-bold text-lg hover:bg-neutral-800 transition-all duration-300"
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </div>
  );
}
