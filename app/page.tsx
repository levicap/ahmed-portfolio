"use client";

import { HeroSection } from "./components/hero-section";
import { ExperienceSection } from "./components/experience-section";
import { PipelineSection } from "./components/pipeline-section";
import { ProjectsCarousel } from "./components/projects-carousel";
import { IconCloud } from "./components/ui/icon-cloud";
import { Navbar } from "./components/ui/navbar";
import { Mail, Linkedin, Globe, MapPin, Phone } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-neutral-700 selection:text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Tech Stack Cloud */}
      <IconCloud />

      {/* Projects Carousel */}
      <ProjectsCarousel />
      
      {/* Experience / Timeline Section */}
      <ExperienceSection />
      
      {/* Interactive Pipeline Section */}
      <PipelineSection />
      
      <footer className="py-16 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-neutral-400">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-2xl mb-6 tracking-tight">AHMED BEN YAHIA</h3>
            <p className="max-w-sm mb-6 leading-relaxed">
              Engineering the future of autonomous systems with AI, RAG, and Workflow Automation. 
              Let's build scalable solutions that work for you.
            </p>
            <div className="flex gap-4">
                 <a href="https://linkedin.com/in/ahmedbenyahia" target="_blank" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 hover:text-white transition-colors border border-neutral-800">
                     <Linkedin size={20} />
                 </a>
                 <a href="mailto:ahmedbenyahia654@gmail.com" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 hover:text-white transition-colors border border-neutral-800">
                     <Mail size={20} />
                 </a>
                 <a href="https://ahmed-benyahia.vercel.app" target="_blank" className="p-2 bg-neutral-900 rounded-full hover:bg-neutral-800 hover:text-white transition-colors border border-neutral-800">
                     <Globe size={20} />
                 </a>
            </div>
          </div>
          
          <div>
             <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
             <ul className="space-y-4">
                <li>
                    <a href="/contact" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <Mail size={16} className="group-hover:text-orange-500 transition-colors" />
                        <span className="truncate">Contact Page & Form</span>
                    </a>
                </li>
                <li>
                    <a href="mailto:ahmedbenyahia654@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <Mail size={16} className="group-hover:text-orange-500 transition-colors" />
                        <span className="truncate">ahmedbenyahia654@gmail.com</span>
                    </a>
                </li>
                <li>
                     <a href="tel:+21650193344" className="flex items-center gap-3 hover:text-white transition-colors group">
                        <Phone size={16} className="group-hover:text-green-500 transition-colors" />
                        <span>+216 50 193 344</span>
                     </a>
                </li>
             </ul>
          </div>
          
           <div>
             <h3 className="text-white font-bold text-lg mb-6">Location</h3>
             <ul className="space-y-4">
                <li className="flex items-start gap-3">
                    <MapPin size={16} className="mt-1 text-sky-500" />
                    <div>
                        <p className="text-white">Sfax, Tunisia</p>
                        <p className="text-xs mt-1 text-neutral-500">Open to Remote Opportunities</p>
                    </div>
                </li>
             </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
             <p>© {new Date().getFullYear()} Ahmed Ben Yahia. All rights reserved.</p>
             <div className="flex gap-6 mt-4 md:mt-0">
                 <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Available for new projects
                 </span>
             </div>
        </div>
      </footer>
    </main>
  );
}
