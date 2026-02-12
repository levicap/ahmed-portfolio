"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Github, Calendar, Layers, ArrowUpRight } from "lucide-react";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              layoutId={`project-${project.name}`}
              className="bg-neutral-900 border border-neutral-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-64 md:h-auto bg-neutral-950 relative overflow-hidden">
                    {project.image ? (
                        <img 
                            src={project.image} 
                            alt={project.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
                           <span className="text-neutral-700 font-bold text-4xl">?</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech_stack.split(',').map((tech: string, i: number) => (
                                <span key={i} className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                        <p className="text-neutral-300 leading-relaxed text-sm">
                            {project.description}
                        </p>
                    </div>

                    
                    {/* Additional Details (Fake or extended if available in JSON) */}
                    <div className="space-y-4 mb-8 flex-1">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                             <Layers size={14} className="text-sky-500" />
                             Key Features
                        </h4>
                        <ul className="space-y-2 text-sm text-neutral-400">
                             {/* Generically generating features if not in JSON, or just using description chunks */}
                             <li className="flex items-start gap-2">
                                <span className="bg-neutral-800 p-1 rounded-full mt-0.5 w-1.5 h-1.5 shrink-0" />
                                <span>Real-time data processing and synchronization.</span>
                             </li>
                             <li className="flex items-start gap-2">
                                <span className="bg-neutral-800 p-1 rounded-full mt-0.5 w-1.5 h-1.5 shrink-0" />
                                <span>Scalable architecture designed for high throughput.</span>
                             </li>
                             <li className="flex items-start gap-2">
                                <span className="bg-neutral-800 p-1 rounded-full mt-0.5 w-1.5 h-1.5 shrink-0" />
                                <span>Intuitive user interface with accessibility focus.</span>
                             </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-4 pt-6 border-t border-neutral-800">
                        {project.url && (
                             <a 
                                href={project.url} 
                                target="_blank" 
                                className="flex-1 px-4 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                             >
                                <Globe size={16} />
                                View Live
                             </a>
                        )}
                        <a 
                            href="#" 
                            className="flex-1 px-4 py-3 bg-neutral-800 text-white rounded-xl font-bold text-sm hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Github size={16} />
                            Source Code
                        </a>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
