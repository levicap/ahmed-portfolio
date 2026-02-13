"use client";
import React, { useRef } from "react";
import { 
    motion, 
    useScroll, 
    useTransform, 
    useSpring, 
    useInView 
} from "framer-motion";
import { 
    GitCommit, 
    Briefcase, 
    AlertTriangle, 
    CheckCircle2, 
    Terminal, 
    Cpu 
} from "lucide-react";
import data from "@/json.json";
import { cn } from "@/lib/utils";

const ExperienceCard = ({ exp, index }: { exp: any, index: number }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className={cn(
            "flex justify-between items-start w-full mb-12 relative",
            isEven ? "flex-row-reverse" : "flex-row"
        )}>
            {/* Center Line Node */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center h-full">
                <div className="w-8 h-8 rounded-full bg-neutral-950 border-4 border-neutral-800 z-10 flex items-center justify-center shadow-2xl">
                    <div className={cn("w-2.5 h-2.5 rounded-full", isEven ? "bg-orange-500" : "bg-blue-500")} />
                </div>
                <div className="w-0.5 flex-1 bg-neutral-800 my-2" />
            </div>

            {/* Empty Space for layout balance */}
            <div className="w-5/12 hidden md:block" />

            {/* Content Card */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? 10 : -10 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                className={cn(
                    "w-full md:w-5/12 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl hover:bg-neutral-900/60 hover:border-neutral-700 transition-all backdrop-blur-sm group",
                    "relative overflow-hidden"
                )}
            >
                {/* Header: "Release Version" Style */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                             {/* Logo handling */}
                             {exp.logo ? (
                                <img src={exp.logo} alt={exp.company} className="w-6 h-6 object-contain" />
                             ) : (
                                <Briefcase size={20} className="text-neutral-400" />
                             )}
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-white leading-none">v{data.experience.length - index}.0 <span className="text-neutral-500 font-normal text-sm">/ {exp.role}</span></h3>
                             <p className="text-xs text-orange-400 font-mono mt-1">@{exp.company} • {exp.period}</p>
                         </div>
                    </div>
                </div>

                {/* "Patch Notes" List */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">
                        <Terminal size={12} />
                        <span>Changelog & Fixes</span>
                    </div>
                    
                    <ul className="space-y-3">
                        {exp.responsibilities.map((resp: string, i: number) => {
                             // "Funny" / "Modern" categorization based on regex keywords
                             let type = 'feat';
                             let icon = <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />;
                             let prefix = "FEAT";
                             let color = "text-green-400";
                             
                             if (resp.toLowerCase().includes("fix") || resp.toLowerCase().includes("issue") || resp.toLowerCase().includes("bug")) {
                                 type = 'fix';
                                 icon = <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />;
                                 prefix = "FIX";
                                 color = "text-red-400";
                             } else if (resp.toLowerCase().includes("optimized") || resp.toLowerCase().includes("reduced") || resp.toLowerCase().includes("saving")) {
                                 type = 'perf';
                                 icon = <Cpu size={14} className="text-blue-500 mt-0.5 shrink-0" />;
                                 prefix = "PERF";
                                 color = "text-blue-400";
                             }

                             return (
                                <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.2 + (i * 0.05) }}
                                    className="flex gap-3 text-sm text-neutral-400 leading-relaxed"
                                >
                                    <div className={`font-mono text-[10px] ${color} bg-white/5 px-1.5 py-0.5 rounded h-fit border border-white/5`}>
                                        {prefix}
                                    </div>
                                    <span>{resp}</span>
                                </motion.li>
                             );
                        })}
                    </ul>
                </div>
            </motion.div>
        </div>
    );
};

export function ExperienceSection() {
    const experience = data.experience || [];

    return (
        <section className="py-32 bg-neutral-950 relative overflow-hidden" id="experience">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-white mb-4">System Updates</h2>
                    <p className="text-neutral-400">A history of upgrades, patches, and hotfixes deployed to production.</p>
                </div>

                <div className="relative">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neutral-800 via-neutral-700 to-transparent hidden md:block" />

                    {experience.map((exp: any, index: number) => (
                        <ExperienceCard key={index} exp={exp} index={index} />
                    ))}
                    
                    {/* "Init" Node at the bottom */}
                     <div className="flex justify-center mt-8">
                        <div className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 font-mono text-xs flex items-center gap-2">
                            <GitCommit size={14} />
                            <span>Initial Commit</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
