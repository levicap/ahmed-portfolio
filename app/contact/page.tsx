"use client";

import { Navbar } from "../components/ui/navbar";
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { WorkflowBackground } from "../components/ui/workflow-background";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 relative overflow-hidden">
      <Navbar />
      
      {/* Background Reused for Consistency */}
      <div className="absolute inset-0 opacity-50 z-0 pointer-events-none">
          <WorkflowBackground />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <div className="text-center mb-16">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6"
            >
                Start a Conversation
            </motion.h1>
            <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                className="text-xl text-neutral-400 max-w-2xl mx-auto"
            >
              Ready to automate your workflows or build something extraordinary? 
              <br/>Drop a message or schedule a direct consultation.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form Portion */}
            <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="space-y-8"
            >
                <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl backdrop-blur-xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <MessageSquare className="text-orange-500" size={24}/>
                        Send a Message
                    </h2>
                    <form className="space-y-4" action="mailto:ahmedbenyahia654@gmail.com" method="GET">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">First Name</label>
                                <input type="text" name="subject" placeholder="John" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-400">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Email Address</label>
                            <input type="email" placeholder="john@example.com" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-400">Message</label>
                            <textarea name="body" rows={4} placeholder="Tell me about your project..." className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-white text-neutral-950 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 group">
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Direct Contact & Scheduling */}
            <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
            >
                {/* Contact Cards */}
                <div className="grid gap-4">
                    <a href="mailto:ahmedbenyahia654@gmail.com" className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-800/50 transition-colors group flex items-start gap-4">
                        <div className="p-3 bg-neutral-800 rounded-full group-hover:bg-orange-500/20 group-hover:text-orange-500 transition-colors">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Email Directly</h3>
                            <p className="text-neutral-400 text-sm">ahmedbenyahia654@gmail.com</p>
                            <span className="text-orange-500 text-xs mt-2 inline-block font-medium">Click to copy</span>
                        </div>
                    </a>

                    <a href="tel:+21650193344" className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-800/50 transition-colors group flex items-start gap-4">
                        <div className="p-3 bg-neutral-800 rounded-full group-hover:bg-green-500/20 group-hover:text-green-500 transition-colors">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Phone Call</h3>
                            <p className="text-neutral-400 text-sm">+216 50 193 344</p>
                            <span className="text-green-500 text-xs mt-2 inline-block font-medium">Available 9am - 5pm</span>
                        </div>
                    </a>
                    
                    <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex items-start gap-4">
                         <div className="p-3 bg-neutral-800 rounded-full text-sky-500">
                            <MapPin size={24} />
                        </div>
                         <div>
                            <h3 className="text-white font-bold mb-1">Location</h3>
                            <p className="text-neutral-400 text-sm">Sfax, Tunisia</p>
                            <p className="text-neutral-500 text-xs">Available for Remote Work</p>
                        </div>
                    </div>
                </div>

                <a 
                    href="https://calendly.com/ahmedbenyahia654/30min" 
                    target="_blank"
                    className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl hover:bg-neutral-800/50 transition-colors group flex items-start gap-4"
                >
                    <div className="p-3 bg-neutral-800 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-500 transition-colors">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-1">Book Consultation</h3>
                        <p className="text-neutral-400 text-sm">30-minute discovery call</p>
                        <span className="text-purple-500 text-xs mt-2 inline-block font-medium">Click to schedule</span>
                    </div>
                </a>

            </motion.div>
        </div>
      </div>
    </main>
  );
}
