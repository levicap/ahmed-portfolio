"use client";
import React, { useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ConnectionMode,
  ReactFlowProvider,
  useReactFlow,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import N8nNode from './ui/n8n-node';
import { 
    Zap, Brain, Database, FileText, Split, ChevronsRight, 
    RefreshCw, Play, MoreHorizontal, Layers, Plus, 
    ChevronLeft, Search, Code, Bot, Share2, MousePointer2,
    Globe, Mail, MessageSquare, ShieldCheck, UserCheck, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const nodeTypes = {
  n8n: N8nNode,
};

// --- Complex Enterprise Workflow Topology ---
const initialNodes: Node[] = [
  // 1. Trigger Area
  {
    id: 'webhook',
    type: 'n8n',
    data: { label: 'Webhook', subLabel: 'Incoming Lead', icon: Zap, color: 'bg-orange-100', iconColor: 'text-orange-600', type: 'trigger' },
    position: { x: 0, y: 300 },
  },
  {
    id: 'auth',
    type: 'n8n',
    data: { label: 'Auth Check', subLabel: 'Verify API Key', icon: ShieldCheck, color: 'bg-green-100', iconColor: 'text-green-600' },
    position: { x: 250, y: 300 },
  },

  // 2. Data Fetching
  {
    id: 'get-crm',
    type: 'n8n',
    data: { label: 'Get CRM Contact', subLabel: 'HubSpot', icon: Database, color: 'bg-orange-50', iconColor: 'text-orange-600' },
    position: { x: 500, y: 300 },
  },
  
  // 3. Parallel Processing (The "Brain")
  {
    id: 'parallel-split',
    type: 'n8n',
    data: { label: 'Parallel', subLabel: 'Split Tasks', icon: Split, color: 'bg-neutral-100', iconColor: 'text-neutral-600' },
    position: { x: 750, y: 300 },
  },
  
  // Top Branch: Enrichment
  {
    id: 'enrich',
    type: 'n8n',
    data: { label: 'Enrich Data', subLabel: 'Clearbit API', icon: Globe, color: 'bg-blue-100', iconColor: 'text-blue-600' },
    position: { x: 1000, y: 100 },
  },
  // Middle Branch: AI Analysis
  {
    id: 'ai-score',
    type: 'n8n',
    data: { label: 'Lead Score', subLabel: 'GPT-4 Analysis', icon: Brain, color: 'bg-purple-100', iconColor: 'text-purple-600' },
    position: { x: 1000, y: 300 },
  },
  // Bottom Branch: History Check
  {
    id: 'history',
    type: 'n8n',
    data: { label: 'Check History', subLabel: 'Postgres DB', icon: Database, color: 'bg-indigo-100', iconColor: 'text-indigo-600' },
    position: { x: 1000, y: 500 },
  },

  // 4. Convergence & Logic
  {
    id: 'merge',
    type: 'n8n',
    data: { label: 'Merge Data', subLabel: 'Wait All', icon: Layers, color: 'bg-neutral-100', iconColor: 'text-neutral-600' },
    position: { x: 1300, y: 300 },
  },
  {
    id: 'decision',
    type: 'n8n',
    data: { label: 'IF High Value', subLabel: 'Score > 80', icon: Split, color: 'bg-green-100', iconColor: 'text-green-600' },
    position: { x: 1550, y: 300 },
  },

  // 5. Action Branches
  // High Value Path
  {
    id: 'slack',
    type: 'n8n',
    data: { label: 'Slack Alert', subLabel: '#sales-hot', icon: MessageSquare, color: 'bg-red-50', iconColor: 'text-red-500' },
    position: { x: 1850, y: 150 },
  },
  {
    id: 'email',
    type: 'n8n',
    data: { label: 'Draft Email', subLabel: 'Personalized', icon: Mail, color: 'bg-blue-50', iconColor: 'text-blue-500' },
    position: { x: 1850, y: 300 },
  },
  
  // Low Value Path
  {
    id: 'nurture',
    type: 'n8n',
    data: { label: 'Nurture Seq', subLabel: 'Add to List', icon: UserCheck, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    position: { x: 1850, y: 500 },
  },

  // 6. Loop Back
  {
    id: 'loop-check',
    type: 'n8n',
    data: { label: 'Loop Check', subLabel: 'More Items?', icon: RefreshCw, color: 'bg-neutral-100', iconColor: 'text-neutral-600' },
    position: { x: 2150, y: 300 },
  }
];

const initialEdges: Edge[] = [
  // Setup
  { id: '1', source: 'webhook', target: 'auth', type: 'smoothstep', animated: true },
  { id: '2', source: 'auth', target: 'get-crm', type: 'smoothstep', animated: true },
  { id: '3', source: 'get-crm', target: 'parallel-split', type: 'smoothstep', animated: true },
  
  // Parallel Split
  { id: '4', source: 'parallel-split', target: 'enrich', type: 'smoothstep', animated: true },
  { id: '5', source: 'parallel-split', target: 'ai-score', type: 'smoothstep', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } }, // AI Path highlighted
  { id: '6', source: 'parallel-split', target: 'history', type: 'smoothstep', animated: true },

  // Merge
  { id: '7', source: 'enrich', target: 'merge', type: 'smoothstep', animated: true },
  { id: '8', source: 'ai-score', target: 'merge', type: 'smoothstep', animated: true },
  { id: '9', source: 'history', target: 'merge', type: 'smoothstep', animated: true },

  // Logic
  { id: '10', source: 'merge', target: 'decision', type: 'smoothstep', animated: true },

  // Branching
  { id: '11', source: 'decision', target: 'slack', label: 'True', type: 'smoothstep', style: { stroke: '#22c55e' } },
  { id: '12', source: 'decision', target: 'email', label: 'True', type: 'smoothstep', style: { stroke: '#22c55e' } },
  { id: '13', source: 'decision', target: 'nurture', label: 'False', type: 'smoothstep', style: { stroke: '#ef4444' } },

  // Loop
  { id: '14', source: 'slack', target: 'loop-check', type: 'smoothstep' },
  { id: '15', source: 'email', target: 'loop-check', type: 'smoothstep' },
  { id: '16', source: 'nurture', target: 'loop-check', type: 'smoothstep' },
];

const Editor = () => {
    const { fitView } = useReactFlow();
    const [executing, setExecuting] = useState(false);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    useEffect(() => {
        setTimeout(() => fitView({ padding: 0.2, duration: 1000 }), 500);
    }, [fitView]);

    const runExecution = () => {
        setExecuting(true);
        // Pulse main edges
        setEdges(eds => eds.map(e => {
            if (e.id.startsWith('t')) return e; // Skip tools
            return { ...e, style: { ...e.style, stroke: '#f97316', strokeWidth: 3 }, animated: true };
        }));

        setTimeout(() => {
            setExecuting(false);
            setEdges(initialEdges); // Reset
        }, 3000);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full h-[750px] rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-2xl flex flex-col relative font-sans group text-neutral-900"
        >
            {/* --- App Header (The 'Dashboard' Header requested) --- */}
            <div className="h-14 bg-white border-b border-neutral-200 flex items-center justify-between px-4 z-20 relative shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors">
                        <div className="p-1.5 bg-orange-100 rounded-md">
                            <ChevronLeft size={16} className="text-orange-600" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Workflow</span>
                            <span className="text-sm font-bold text-neutral-800">High-Ticket Lead Scraper</span>
                        </div>
                    </div>
                </div>

                {/* Central Stats */}
                <div className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-500 bg-neutral-50 px-4 py-1.5 rounded-full border border-neutral-100">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active</span>
                    </div>
                    <div className="w-px h-3 bg-neutral-300" />
                    <div className="flex items-center gap-2">
                        <RefreshCw size={12} />
                        <span>Every 15m</span>
                    </div>
                    <div className="w-px h-3 bg-neutral-300" />
                    <div>24,930 Executions</div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                     <button className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
                        <Share2 size={18} />
                     </button>
                     <button 
                        onClick={runExecution}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-lg transition-all shadow-md active:scale-95",
                            executing ? "bg-neutral-800 cursor-wait" : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500"
                        )}
                     >
                         {executing ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                         {executing ? 'Stopping...' : 'Test Workflow'}
                     </button>
                </div>
            </div>

            {/* --- Canvas --- */}
            <div className="flex-1 relative bg-[#F9FAFB]">
                {/* Dot Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
                
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    minZoom={0.5}
                    maxZoom={2}
                    fitView
                    connectionMode={ConnectionMode.Loose}
                    proOptions={{ hideAttribution: true }}
                    className="touch-none"
                    nodesDraggable={false}
                >
                    <Controls className="!bg-white !border-neutral-200 !shadow-lg !rounded-lg !m-4 !p-1 text-neutral-500" />
                    <Background color="#eee" gap={24} size={1} variant={BackgroundVariant.Dots} className="opacity-0" />
                </ReactFlow>

                {/* Floating Overlay Elements */}
                {/* <div className="absolute bottom-6 left-6 flex gap-2">
                    <div className="px-3 py-1.5 bg-white border border-neutral-200 rounded-md shadow-sm text-xs font-mono text-neutral-500 flex items-center gap-2">
                        <MousePointer2 size={12} />
                        <span>x: 231, y: 894</span>
                    </div>
                </div> */}
            </div>
        </motion.div>
    );
};

export function PipelineSection() {
  return (
    <section className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 space-y-12">
         {/* Section Header */}
         <div className="flex flex-col items-center text-center gap-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider">
                 <Zap size={12} fill="currentColor" />
                 Workflow Engine
             </div>
             <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Visual Logic <span className="text-neutral-500">at Scale</span>
             </h2>
             <p className="text-neutral-400 max-w-xl text-lg">
                Designing autonomous systems that seamlessly integrate AI agents, vector databases, and traditional APIs.
             </p>
         </div>
         
         {/* The Editor Component */}
         <ReactFlowProvider>
             <Editor />
         </ReactFlowProvider>
      </div>
    </section>
  );
}
