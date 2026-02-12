"use client";
import React, { use } from 'react';
import { Navbar } from "@/app/components/ui/navbar";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import data from "@/json.json";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const blog = data.blogs.find((b: any) => b.id === id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-orange-500/30 selection:text-orange-200">
      <Navbar />

      {/* Progress Bar (Optional, simpler implementation) */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Writings
        </Link>
        
        {/* Header */}
        <header className="mb-12">
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500 font-mono mb-6">
                 <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                    <Calendar size={14} /> {blog.date}
                 </span>
                 <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                    <Clock size={14} /> {blog.readTime} read
                 </span>
            </div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            >
                {blog.title}
            </motion.h1>

             <div className="flex items-center justify-between border-y border-neutral-800 py-6">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600" />
                     <div>
                         <div className="text-white font-bold">Ahmed Ben Yahia</div>
                         <div className="text-neutral-500 text-xs">Full Stack Automation Engineer</div>
                     </div>
                 </div>
                 <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutral-400 hover:text-white">
                     <Share2 size={20} />
                 </button>
             </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
            {/* 
              In a real app, you'd use a Markdown renderer like 'react-markdown'. 
              For now, we'll split by newlines and basic header parsing for the static JSON content.
            */}
            {blog.content ? (
                blog.content.split('\n\n').map((paragraph: string, idx: number) => {
                    if (paragraph.startsWith('### ')) {
                        return <h3 key={idx} className="text-2xl font-bold text-white mt-12 mb-4">{paragraph.replace('### ', '')}</h3>
                    }
                    if (paragraph.startsWith('1. ')) {
                         return <div key={idx} className="pl-4 border-l-2 border-orange-500/50 my-4 text-neutral-300">{paragraph}</div>
                    }
                    return <p key={idx} className="mb-6 leading-relaxed text-lg text-neutral-400">{paragraph}</p>
                })
            ) : (
                <p>{blog.excerpt}</p>
            )}
        </div>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
            <h4 className="text-neutral-500 text-sm font-mono mb-4 uppercase tracking-wider">Tags</h4>
            <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-neutral-900 text-neutral-400 text-sm rounded-md border border-neutral-800 hover:border-orange-500/50 transition-colors cursor-default">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>

      </article>
    </main>
  );
}
