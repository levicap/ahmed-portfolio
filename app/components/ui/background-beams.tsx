"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-800 opacity-40 z-0" />
      <div className="absolute h-full w-full left-0 top-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              rotate: 0,
              scale: 1,
              opacity: 0.5,
            }}
            animate={{
              rotate: 360,
              scale: 1.5,
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className={cn(
              "absolute left-[50%] top-[50%] h-[50vh] w-[50vh] ml-[-25vh] mt-[-25vh] rounded-full mix-blend-screen filter blur-3xl",
              i % 2 === 0 ? "bg-blue-900" : "bg-cyan-900"
            )}
          />
        ))}
      </div>
      <div className="absolute z-10 h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};
