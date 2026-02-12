"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@ai-sdk/react';

// Mock response for demo purposes if backend isn't connected
const mockResponse = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('stack')) return "My stack includes Next.js, React, Tailwind CSS, Node.js, Python, and n8n + Vector DBs for AI pipelines.";
    if (lower.includes('experience')) return "I have over 2 years of experience building RAG systems and automation pipelines at companies like Lean Orchester and Aziin.";
    return "I am an AI assistant trained on Ahmed's portfolio. Ask me about his tech stack, experience, or projects.";
}

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  // In a real app, useChat would connect to /api/chat
  // For this build, we'll simulate it with local state if no API is present, 
  // but let's try to set up the UI structure as if it were using the SDK.
  const [messages, setMessages] = useState<{id: string, role: string, content: string}[]>([
      { id: '1', role: 'assistant', content: "Hello! I'm Ahmed's AI Agent. Ask me anything about his work." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      const userMsg = { id: Date.now().toString(), role: 'user', content: input };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate network delay
      setTimeout(() => {
          const reply = mockResponse(userMsg.content);
          setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply }]);
          setIsTyping(false);
      }, 1000);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-100 hover:bg-white text-neutral-900 p-4 rounded-full shadow-lg border border-neutral-200 transition-all hover:scale-105"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
          >
            {/* Header */}
            <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex items-center gap-2">
                <Terminal size={16} className="text-green-500" />
                <span className="font-mono text-sm text-neutral-300">AI Command Center</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm" ref={scrollRef}>
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "p-3 rounded-lg max-w-[85%]",
                            m.role === 'user' 
                                ? "bg-neutral-800 text-white ml-auto" 
                                : "bg-neutral-900 text-neutral-300 border border-neutral-800"
                        )}
                    >
                        {m.content}
                    </div>
                ))}
                {isTyping && (
                    <div className="bg-neutral-900 text-neutral-300 border border-neutral-800 p-3 rounded-lg max-w-[85%] w-fit">
                        <span className="animate-pulse">...</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-neutral-900 border-t border-neutral-800 flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my projects..."
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neutral-700"
                />
                <button type="submit" className="bg-white text-black p-2 rounded-md hover:bg-neutral-200 transition-colors">
                    <Send size={16} />
                </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
