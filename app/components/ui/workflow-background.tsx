"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const WorkflowBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-neutral-950">
      
      {/* Grid Pattern - Made more visible */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.3]"
        style={{
            backgroundImage: `
                linear-gradient(to right, #333 1px, transparent 1px),
                linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* Complex Workflow Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <linearGradient id="n8nGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0" />
            <stop offset="50%" stopColor="#EA580C" stopOpacity="1" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
        
        {/* Main Flow Loop */}
        <motion.path
          d="M 100 300 H 300 C 400 300 400 500 500 500 H 700"
          fill="none"
          stroke="#333"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        {/* Active Data Packet on Main Flow */}
        <motion.path
          d="M 100 300 H 300 C 400 300 400 500 500 500 H 700"
          fill="none"
          stroke="url(#n8nGradient)"
          strokeWidth="3"
          strokeDasharray="100 800"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Branch Recall Loop (Iterative Logic) */}
        <motion.path
          d="M 500 500 C 450 600 350 600 300 500 V 400"
          fill="none"
          stroke="#333"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
         <motion.path
          d="M 500 500 C 450 600 350 600 300 500 V 400"
          fill="none"
          stroke="#EA580C"
          strokeWidth="2"
          strokeDasharray="20 400"
          initial={{ strokeDashoffset: 420 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
          className="opacity-60"
        />

        {/* Parallel Execution Threads */}
        <path d="M 300 300 V 150 H 600 V 300" fill="none" stroke="#222" strokeWidth="2" />
        <motion.path
          d="M 300 300 V 150 H 600 V 300"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="2"
          strokeDasharray="50 600"
          initial={{ strokeDashoffset: 650 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Failed Request Path (Red) */}
        <path d="M 600 300 L 700 200" fill="none" stroke="#331111" strokeWidth="2" />
        <motion.circle cx="650" cy="250" r="3" fill="#EF4444">
             <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </motion.circle>

        {/* Success Path (Green) */}
        <path d="M 600 300 L 700 400" fill="none" stroke="#113311" strokeWidth="2" />
         <motion.path
          d="M 600 300 L 700 400"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2"
          strokeDasharray="20 200"
          initial={{ strokeDashoffset: 220 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 2 }}
        />

        {/* Long connecting curve crossing screen */}
        <motion.path
          d="M -100 600 C 200 600 400 100 1200 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-800"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Floating API Nodes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Webhook Trigger */}
        <motion.div 
            className="absolute top-[280px] left-[80px] p-2 bg-neutral-900 border border-neutral-700 rounded-lg flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
        >
            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] items-center text-neutral-400 font-mono">Webhook: Start</span>
        </motion.div>

        {/* HTTP Request Node */}
        <div className="absolute top-[280px] left-[280px] p-2 bg-neutral-900 border border-blue-900/50 rounded-lg flex flex-col gap-1 w-32">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-[10px] text-blue-200 font-mono">GET /users</span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded overflow-hidden">
                <motion.div 
                    className="h-full bg-blue-500"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </div>

        {/* Logic Split Node */}
        <div className="absolute top-[480px] left-[480px] p-2 bg-neutral-900 border border-yellow-900/50 rounded-lg w-28 skew-x-6">
             <div className="text-[9px] text-yellow-500 font-mono text-center">IF Score &gt; 90</div>
        </div>

        {/* Loop Iterator */}
        <motion.div 
            className="absolute top-[400px] left-[300px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
            <div className="w-16 h-16 border-2 border-dashed border-neutral-800 rounded-full" />
        </motion.div>

      </div>
    </div>
  );
};
