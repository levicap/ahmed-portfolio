"use client";
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { RefreshCw, CheckCircle2, MoreHorizontal, Plus, AlertCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';

const N8nNode = ({ data, selected }: NodeProps) => {
  const Icon = data.icon;
  const isAgent = data.type === 'agent';
  const isTrigger = data.type === 'trigger';
  
  // Specific styling based on node purpose to match reference
  const isTool = data.type === 'tool'; 

  return (
    <div className={cn(
      "group relative flex flex-col items-center justify-center bg-white rounded-md border transition-all duration-200 shadow-sm overflow-hidden",
      isAgent ? "w-[120px] h-[120px] border-indigo-200 shadow-indigo-100" : "w-[90px] h-[90px] border-neutral-200",
      selected ? "ring-2 ring-orange-500/50 border-orange-500 shadow-lg" : "hover:border-neutral-400 hover:shadow-md",
      data.className
    )}>
       {/* Selection/Execution Halo */}
       {selected && (
            <div className="absolute -inset-1 rounded-md bg-orange-400/5 z-[-1] animate-pulse" />
       )}

       {/* --- Handles --- */}
       
       {/* 1. Standard Flow (Left -> Right) */}
       {!isTrigger && !isTool && (
           <Handle 
                type="target" 
                position={Position.Left} 
                className="!h-3 !w-3 !bg-white !border-[3px] !border-neutral-400 !rounded-full hover:!border-orange-500 hover:!scale-125 transition-all -ml-[6px] z-50" 
           />
       )}
       {!isTool && (
           <Handle 
                type="source" 
                position={Position.Right} 
                className="!h-3 !w-3 !bg-white !border-[3px] !border-neutral-400 !rounded-full hover:!border-orange-500 hover:!scale-125 transition-all -mr-[6px] z-50" 
           />
       )}

       {/* 2. Tool/Satellite Connections (Top of Tool -> Bottom of Agent) */}
       {isAgent && (
           <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2">
               {/* Multiple handles for different input types */}
               {['model', 'vector', 'output'].map((id, idx) => (
                   <Handle 
                        key={id}
                        type="target" 
                        id={id}
                        position={Position.Bottom} 
                        style={{ left: (idx + 1) * 25 + '%' }} 
                        className="!h-2.5 !w-2.5 !bg-indigo-100 !border-[2px] !border-indigo-400 !rounded-full hover:!bg-indigo-500 transition-colors" 
                   />
               ))}
           </div>
       )}

       {isTool && (
           <Handle 
                type="source" 
                position={Position.Top} 
                className="!h-2.5 !w-2.5 !bg-neutral-100 !border-[2px] !border-neutral-400 !rounded-full hover:!border-indigo-500 transition-all -mt-[6px] z-50" 
           />
       )}


      {/* --- Node Content (Vertical Square Layout) --- */}
      
      {/* 1. Icon Section (Centered) */}
      <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 mb-2 transition-transform group-hover:scale-105",
          data.type === 'trigger' ? "bg-orange-50" : "bg-neutral-50",
          data.color // Add specific bg color tint if provided
      )}>
         {Icon && <Icon size={24} className={data.iconColor || "text-neutral-700"} />}
      </div>
          
      {/* 2. Text Content (Centered below icon) */}
      <div className="w-full px-2 flex flex-col items-center text-center">
           <span className="text-[11px] font-bold text-neutral-800 truncate w-full leading-tight">
               {data.label}
           </span>
           
           {/* Context Menu Icon (Absolute) */}
           <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-neutral-600 transition-opacity">
               <MoreHorizontal size={12} />
           </button>
      </div>

    </div>
  );
};

export default memo(N8nNode);
