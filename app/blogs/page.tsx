"use client";
import React from 'react';
import { Navbar } from "../components/ui/navbar";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import data from "@/json.json";

export default function BlogsPage() {
  const blogs = data.blogs || [];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
         {/* Header */}
         <div className="mb-20 text-center">
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
             >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Thought</span> Log
             </motion.h1>
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-neutral-400 text-lg max-w-2xl mx-auto"
             >
                Updates, tutorials, and rants about AI, Automation, and the chaos of modern engineering.
             </motion.p>
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {blogs.map((blog: any, i: number) => (
                 <a 
                    href={`/blogs/${blog.id}`} 
                    key={i}
                    className="group relative flex flex-col h-full bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-600 transition-colors duration-300 block"
                 >
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex flex-col h-full"
                     >
                     {/* Image Placeholder */}
                     <div className="h-48 bg-neutral-800 w-full overflow-hidden relative">
                         <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> 
                         {/* If you have images, uncomment this: */}
                         {/* <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> */}
                         <div className="absolute top-4 left-4 flex gap-2">
                             {blog.tags.map((tag: string) => (
                                 <span key={tag} className="px-2 py-1 bg-black/50 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-white border border-white/10 rounded-full">
                                     {tag}
                                 </span>
                             ))}
                         </div>
                     </div>
                     
                     <div className="p-6 flex flex-col flex-1">
                         <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4 font-mono">
                             <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                             <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                         </div>
                         
                         <h2 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
                             {blog.title}
                         </h2>
                         <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                             {blog.excerpt}
                         </p>
                         
                         <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-800">
                             <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600" />
                                 <span className="text-xs font-bold text-neutral-300">Ahmed Ben Yahia</span>
                             </div>
                             <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                         </div>
                     </div>
                 </motion.div>
                 </a>
             ))}
         </div>
      </div>
    </main>
  );
}
