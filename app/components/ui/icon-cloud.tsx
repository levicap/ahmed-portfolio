"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "supabase",
  "nginx",
  "vercel",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "cursor",
  "claude",
  "python",
  "langchain",
  "n8n",
  "mongodb"
];

// Map for specific custom requests or corrections
const customIcons: Record<string, string> = {
  n8n: "https://cdn.simpleicons.org/n8n/FF6501",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  visualstudiocode: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  supabase: "https://cdn.simpleicons.org/supabase/3ECF8E",
  claude: "https://cdn.simpleicons.org/anthropic/white", // Force white Anthropic logo
  cursor: "https://www.cursor.com/brand/icon.svg", // Official Cursor SVG (Black default)
};

export function IconCloud() {
  return (
    <div className="relative flex h-full max-w-3xl mx-auto w-full items-center justify-center overflow-hidden rounded-lg pb-20 pt-8 bg-neutral-950">
        <div className="text-center space-y-4">
             <h3 className="text-2xl font-bold text-neutral-400 mb-8">Powering Automation With</h3>
             <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
                {slugs.map((slug) => (
                    <div key={slug} className="flex flex-col items-center gap-2 group">
                        <div className="relative h-16 w-16 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800 shadow-xl group-hover:scale-110 transition-transform duration-300 group-hover:border-neutral-600 group-hover:shadow-2xl group-hover:shadow-sky-500/20">
                             <img 
                                src={customIcons[slug] || `https://cdn.simpleicons.org/${slug}`}
                                height="32" 
                                width="32"
                                alt={slug}
                                className={cn(
                                    "opacity-70 group-hover:opacity-100 transition-opacity",
                                    // Logic:
                                    // 1. If it's a known black icon that needs inversion (github, nextjs, vercel), invert it.
                                    // 2. If it's a custom icon (usually colored or fixed white), DO NOT invert.
                                    // 3. Defaults (simpleicons) often need inversion on dark mode if they are dark.
                                    // Let's rely on explicit white versions for custom ones and invert standard black ones.
                                    
                                    (slug === "github" || slug === "nextdotjs" || slug === "vercel" || slug === "express" || slug === "cursor") ? "invert" : "",
                                    
                                    // If NOT custom and NOT explicitly inverted above, assume it might need invert if it's black? 
                                    // Actually simpleicons are usually colored.
                                    // Only specific ones are black.
                                    // The previous logic `customIcons[slug] ? "" : "invert"` was too aggressive.
                                    // Let's just stick to "invert" for known black icons.
                                )}
                                onError={(e) => {
                                    // Fallback for n8n or others if simpleicons fails or doesn't have it
                                    if (slug === 'n8n' || slug === 'langchain') {
                                        (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;
                                    }
                                }}
                             />
                        </div>
                        <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-wider group-hover:text-neutral-400">{slug}</span>
                    </div>
                ))}
             </div>
        </div>
    </div>
  );
}
