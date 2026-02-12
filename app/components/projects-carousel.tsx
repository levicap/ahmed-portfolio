"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { ArrowUpRight, Github, Code2, Globe } from "lucide-react";
import data from "@/json.json";
import { cn } from "@/lib/utils";
import { ProjectModal } from "./project-modal";

export function ProjectsCarousel() {
    const projects = [...(data.projects || []), ...(data.projects || [])]; // Duplicate for infinite loop
    const [selectedProject, setSelectedProject] = useState<any>(null);
    
    // Auto-scroll controls
    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <section className="py-24 bg-neutral-950 border-y border-neutral-900 relative overflow-hidden" id="projects">
             <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .hover-pause:hover .animate-marquee {
                    animation-play-state: paused;
                }
             `}</style>

             <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                 <div>
                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">Shipped Code</h2>
                    <p className="text-neutral-400">Production deployments that live on the internet.</p>
                 </div>
                 <div className="hidden md:flex gap-2 text-xs font-mono text-neutral-500">
                     <span>Scrolls automatically</span>
                     <span className="text-orange-500">•</span>
                     <span>Pause on hover</span>
                     <span className="text-orange-500">•</span>
                     <span>Click for details</span>
                 </div>
             </div>

             {/* Marquee Container */}
             <div className="relative w-full overflow-hidden hover-pause">
                 <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neutral-950 to-transparent z-20 pointer-events-none" />
                 <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neutral-950 to-transparent z-20 pointer-events-none" />
                 
                 <div className="flex gap-6 w-max pl-6 animate-marquee">
                     {projects.map((project: any, index: number) => (
                         <div 
                            key={`${project.name}-${index}`}
                            onClick={() => setSelectedProject(project)}
                            className="group relative w-[350px] md:w-[450px] aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-colors shadow-2xl shrink-0 cursor-pointer"
                         >
                             {/* Image Background */}
                             {project.image ? (
                                 <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                             ) : (
                                 <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800" />
                             )}
                             
                             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

                             {/* Content */}
                             <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                 <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                     <div className="flex items-center justify-between mb-2">
                                         <div className="flex gap-2">
                                            {project.tech_stack.split(',').slice(0, 3).map((tech: string, i: number) => (
                                                <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                         </div>
                                         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                             <a href={project.url} target="_blank" className="p-2 bg-white text-black rounded-full hover:bg-neutral-200">
                                                 <ArrowUpRight size={14} />
                                             </a>
                                         </div>
                                     </div>
                                     
                                     <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                                     <p className="text-sm text-neutral-400 line-clamp-2 mb-4 group-hover:text-neutral-300 transition-colors">
                                         {project.description}
                                     </p>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
             
             {/* Modal */}
             <ProjectModal 
                project={selectedProject} 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
             />
        </section>
    );
}
