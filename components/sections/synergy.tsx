"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Network, Sparkles, FileText, Download, CheckCircle2, Circle, RotateCcw, Lock, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

interface StarNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

const INITIAL_STARS: StarNode[] = [
    { id: "react", label: "React & Next.js", x: 100, y: 150 },
    { id: "ts", label: "TypeScript", x: 650, y: 100 },
    { id: "ui", label: "UI / UX", x: 200, y: 400 },
    { id: "arch", label: "Arquitectura", x: 700, y: 400 },
    { id: "perf", label: "Performance", x: 400, y: 50 },
    { id: "backend", label: "APIs", x: 150, y: 250 },
    { id: "db", label: "Bases de Datos", x: 550, y: 250 },
    { id: "design", label: "Figma", x: 450, y: 450 },
];

const TARGET_CONSTELLATIONS = [
    { 
        id: "orion", 
        nodes: ["perf", "ts", "react", "ui", "design", "arch", "db", "backend"], 
        edges: [["perf", "ts"], ["perf", "react"], ["ts", "design"], ["react", "ui"], ["ui", "design"], ["react", "db"], ["design", "arch"], ["perf", "backend"]],
        positions: { 
            backend: {x: 0, y: -200},
            perf: {x: -160, y: -150}, ts: {x: 160, y: -130}, 
            react: {x: -100, y: -15}, ui: {x: 0, y: 0}, design: {x: 100, y: 15},
            db: {x: -120, y: 180}, arch: {x: 140, y: 160}
        }
    },
    { 
        id: "lyra", 
        nodes: ["perf", "ts", "arch", "db", "backend"], 
        edges: [["perf", "ts"], ["ts", "arch"], ["arch", "db"], ["db", "backend"], ["backend", "ts"]],
        positions: { 
            perf: {x: 0, y: -120}, 
            ts: {x: -30, y: -40}, arch: {x: 30, y: -40}, 
            db: {x: 40, y: 60}, backend: {x: -20, y: 60} 
        }
    },
    { 
        id: "cassiopeia", 
        nodes: ["ts", "perf", "react", "ui", "design"], 
        edges: [["ts", "perf"], ["perf", "react"], ["react", "ui"], ["ui", "design"]],
        positions: { 
            ts: {x: -120, y: -50}, perf: {x: -60, y: 50}, 
            react: {x: 0, y: -20}, 
            ui: {x: 60, y: 50}, design: {x: 120, y: -50} 
        }
    },
    { 
        id: "cygnus", 
        nodes: ["db", "backend", "react", "ui", "arch"], 
        edges: [["db", "backend"], ["backend", "react"], ["backend", "ui"], ["backend", "arch"]],
        positions: { 
            db: {x: 0, y: -150}, backend: {x: 0, y: 0}, react: {x: 0, y: 150}, 
            ui: {x: -120, y: 0}, arch: {x: 120, y: 0} 
        }
    },
    { 
        id: "pegasus", 
        nodes: ["perf", "ts", "arch", "backend"], 
        edges: [["perf", "ts"], ["ts", "arch"], ["arch", "backend"], ["backend", "perf"]],
        positions: { 
            perf: {x: -100, y: -100}, ts: {x: 100, y: -100}, 
            arch: {x: 100, y: 100}, backend: {x: -100, y: 100} 
        }
    }
];

export function SynergySection() {
    const { t } = useLanguage();
    
    // Core game state
    const [nodes, setNodes] = useState<StarNode[]>(INITIAL_STARS);
    const [userEdges, setUserEdges] = useState<{from: string, to: string}[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    
    // Level System State
    const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
    const [discoveredConstellations, setDiscoveredConstellations] = useState<string[]>([]);
    const [rewardMissionId, setRewardMissionId] = useState<string | null>(null);

    // Derived states
    const [isUltimateVictory, setIsUltimateVictory] = useState(false);
    const [progress, setProgress] = useState(0);
    
    // Dimension setup
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null);

    // Initial resize calculation
    useEffect(() => {
        if (!containerRef.current) return;
        const updateDims = () => {
             if (containerRef.current) {
                 setDimensions({
                     width: containerRef.current.offsetWidth,
                     height: containerRef.current.offsetHeight
                 });
             }
        };
        updateDims();
        window.addEventListener('resize', updateDims);
        return () => window.removeEventListener('resize', updateDims);
    }, []);

    const playMission = (missionId: string) => {
        setActiveMissionId(missionId);
        setUserEdges([]);
        setSelectedNodeId(null);
    };

    // Calculate Dynamic Positions based on Active Mission
    const getDynamicNodePosition = (node: StarNode, index: number): { x: number, y: number } => {
        if (isUltimateVictory) {
            // All nodes form a massive ring for the ultimate victory
            return {
                x: (dimensions.width / 2) + Math.cos(index * (Math.PI * 2) / nodes.length) * 180,
                y: (dimensions.height / 2) + Math.sin(index * (Math.PI * 2) / nodes.length) * 180
            };
        }

        if (!activeMissionId) return { x: node.x, y: node.y }; // Default position if no mission

        if (activeMissionId === "final") {
            // Final Mission: similar to victory but before connecting
            return {
                x: (dimensions.width / 2) + Math.cos(index * (Math.PI * 2) / nodes.length) * 160,
                y: (dimensions.height / 2) + Math.sin(index * (Math.PI * 2) / nodes.length) * 160
            };
        }

        const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
        if (!mission) return { x: node.x, y: node.y };

        const missionNodePos = (mission as any).positions?.[node.id];
        
        if (missionNodePos) {
            // Use specific position for this mission
            return {
                x: (dimensions.width / 2) + missionNodePos.x,
                y: (dimensions.height / 2) + missionNodePos.y
            };
        } else {
            // Node is NOT in the mission -> Scatter them predictably to the edges
            const outerRadius = Math.min(dimensions.width, dimensions.height) / 2 + 50;
            const angle = (index * (Math.PI * 2)) / nodes.length;
            return {
                x: Math.max(50, Math.min(dimensions.width - 50, (dimensions.width / 2) + Math.cos(angle) * outerRadius)),
                y: Math.max(50, Math.min(dimensions.height - 50, (dimensions.height / 2) + Math.sin(angle) * outerRadius))
            };
        }
    };

    // Main logic: Evaluate connections against active mission
    useEffect(() => {
        if (!activeMissionId || isUltimateVictory) {
            setProgress(0);
            return;
        }
        
        const adjacencyList: Map<string, string[]> = new Map();
        nodes.forEach(n => adjacencyList.set(n.id, []));
        
        userEdges.forEach(edge => {
            adjacencyList.get(edge.from)?.push(edge.to);
            adjacencyList.get(edge.to)?.push(edge.from);
        });

        if (activeMissionId === "final") {
            // Sub-victory condition for final: all nodes connected in a single graph
            let visitedCount = 0;
            const visited = new Set<string>();
            const queue = [nodes[0].id];
            visited.add(nodes[0].id);

            while (queue.length > 0) {
                const current = queue.shift()!;
                visitedCount++;
                for (const neighbor of adjacencyList.get(current) || []) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }

            setProgress(Math.round((visitedCount / nodes.length) * 100));

            if (visitedCount === nodes.length) {
                setIsUltimateVictory(true);
            }
        } else {
            // Sub-victory condition for normal missions
            const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
            if (!mission) return;

            // Calculate progress based on target edges matched
            let matchedEdges = 0;
            mission.edges?.forEach(([from, to]) => {
                const exists = userEdges.some(e => 
                    (e.from === from && e.to === to) || (e.from === to && e.to === from)
                );
                if (exists) matchedEdges++;
            });
            const totalTargetEdges = mission.edges?.length || 1;
            setProgress(Math.round((matchedEdges / totalTargetEdges) * 100));

            // Check if all mission nodes form a connected component exclusively among themselves
            const startNode = mission.nodes[0];
            const visited = new Set<string>();
            const queue = [startNode];
            visited.add(startNode);

            while (queue.length > 0) {
                const current = queue.shift()!;
                for (const neighbor of adjacencyList.get(current) || []) {
                    if (mission.nodes.includes(neighbor) && !visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }

            const isCurrentlyComplete = visited.size === mission.nodes.length;
            
            if (isCurrentlyComplete && !discoveredConstellations.includes(mission.id)) {
                setDiscoveredConstellations(prev => [...prev, mission.id]);
            }

            // Trigger reward if it just became complete
            // We only trigger if it's currently complete and the reward popup is not already showing
            // To allow "repeating", we must ensure it triggers again after a reset.
            if (isCurrentlyComplete && !rewardMissionId) {
                // If it's complete and we haven't shown a reward for this specific completion state yet
                // We'll use the progress at 100% as a proxy or just the fact that it's complete.
                // To avoid it popping up constantly while at 100%, we'll check if it was already 100% in a state?
                // Actually, the user can just close it, and then if they move a node and move it back, it might pop again.
                // That's fine if they "repeat" it.
                if (progress === 100 && !discoveredConstellations.includes(mission.id + "_reward_shown")) {
                     setRewardMissionId(mission.id);
                     setDiscoveredConstellations(prev => [...prev, mission.id + "_reward_shown"]);
                }
            } else if (!isCurrentlyComplete) {
                // Reset the "shown" flag if it becomes incomplete, allowing it to trigger again
                if (discoveredConstellations.includes(mission.id + "_reward_shown")) {
                    setDiscoveredConstellations(prev => prev.filter(id => id !== mission.id + "_reward_shown"));
                }
            }
        }
    }, [userEdges, nodes, isUltimateVictory, activeMissionId, discoveredConstellations, rewardMissionId, progress]);

    // Handlers
    const handleDragEnd = (id: string, info: any) => {
        if (isUltimateVictory) return;
        setNodes(prev => prev.map(n => 
            n.id === id ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y } : n
        ));
    };

    const handleNodePointerUp = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        if (isUltimateVictory) return;

        // Si no hay misión activa, no permitimos dibujar
        if (!activeMissionId) {
            setSelectedNodeId(id); // Para que al menos resalte visualmente
            return;
        }

        // Mechanics: Click-to-Connect / Drag-to-Connect hybrid
        if (!selectedNodeId) {
            setSelectedNodeId(id);
        } else {
            if (selectedNodeId === id) {
                setSelectedNodeId(null);
            } else {
                const exists = userEdges.find(e => 
                    (e.from === selectedNodeId && e.to === id) || 
                    (e.to === selectedNodeId && e.from === id)
                );
                
                if (!exists) {
                    setUserEdges(prev => [...prev, { from: selectedNodeId, to: id }]);
                }
                
                setSelectedNodeId(null);
                setMousePos(null);
            }
        }
    };

    const handleContainerPointerDown = (e: React.PointerEvent) => {
        if (selectedNodeId) {
            setSelectedNodeId(null);
            setMousePos(null);
        }
        // También actualizar posición del ratón al pulsar en móvil
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleContainerPointerMove = (e: React.PointerEvent) => {
        if (!selectedNodeId || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const clearLevel = () => {
        setUserEdges([]);
        setSelectedNodeId(null);
        setMousePos(null);
    };

    const isFinalUnlocked = discoveredConstellations.length === TARGET_CONSTELLATIONS.length;

    return (
        <section className="py-20 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6">
                
                <FadeIn className="mb-12 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> {t.synergy.title}
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        {t.synergy.description}
                    </p>
                </FadeIn>

                <div className="grid lg:grid-cols-4 gap-8 items-start relative">
                    
                    {/* Controles y Panel de Pistas / Nivel Selector */}
                    <FadeIn delay={0.2} className="lg:col-span-1 flex flex-col gap-4">
                        
                         <div className="bg-card-bg/50 border border-brand-cyan/20 rounded-3xl p-5 backdrop-blur-md flex flex-col gap-3">
                            <h4 className="text-sm font-bold font-primary uppercase tracking-widest text-brand-cyan mb-2">
                                {t.synergy.missionsTitle || "Misiones"}
                            </h4>
                            <div className="flex flex-col gap-1">
                                {t.synergy.constellations?.map((c: any) => {
                                    const isFound = discoveredConstellations.includes(c.id);
                                    const isActive = activeMissionId === c.id;
                                    
                                    return (
                                        <button 
                                            key={c.id} 
                                            onClick={() => playMission(c.id)}
                                            className={`flex flex-col text-left py-3 px-4 rounded-xl transition-all duration-300 ${
                                                isActive ? 'bg-brand-cyan/10 border border-brand-cyan/30' : 'hover:bg-card-bg/80 border border-transparent opacity-80'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {isFound ? (
                                                    <CheckCircle2 size={18} className="text-brand-cyan shrink-0" />
                                                ) : (
                                                    <Circle size={18} className="text-muted shrink-0" />
                                                )}
                                                <h5 className={`font-semibold text-sm ${isActive ? 'text-brand-cyan' : isFound ? 'text-foreground' : 'text-muted-foreground'}`}>{c.name}</h5>
                                            </div>
                                            {(isFound || isActive) && (
                                                <p className="text-xs text-muted leading-relaxed mt-2 pl-7">
                                                    {c.description}
                                                </p>
                                            )}
                                        </button>
                                    )
                                })}

                                {/* Misión Final Secreta */}
                                <div className="mt-4 pt-4 border-t border-brand-cyan/10">
                                    <button 
                                        disabled={!isFinalUnlocked}
                                        onClick={() => playMission("final")}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-500
                                            ${isFinalUnlocked 
                                                ? activeMissionId === "final" ? 'bg-brand-cyan/20 border-brand-cyan/50 shadow-[0_0_20px_rgba(0,229,153,0.2)]' : 'bg-brand-cyan/10 border-brand-cyan/30 hover:bg-brand-cyan/20 cursor-pointer animate-pulse'
                                                : 'bg-background/50 border-white/5 opacity-50 cursor-not-allowed'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isFinalUnlocked ? <Star className="text-brand-cyan" size={20} /> : <Lock className="text-muted" size={20} />}
                                            <span className={`font-bold text-sm tracking-wider uppercase ${isFinalUnlocked ? 'text-brand-cyan' : 'text-muted'}`}>
                                                 {t.synergy.finalMissionObj || "Red Global"}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Botón Acción Rápida */}
                        {userEdges.length > 0 && !isUltimateVictory && (
                            <button 
                                onClick={clearLevel}
                                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 font-medium text-sm transition-colors"
                            >
                                <RotateCcw size={16} /> {t.synergy.tools?.reset || "Reiniciar Constelación actual"}
                            </button>
                        )}
                        
                    </FadeIn>

                    <FadeIn delay={0.3} className="lg:col-span-3 relative">
                        <div 
                            ref={containerRef} 
                            onPointerDown={handleContainerPointerDown}
                            onPointerMove={handleContainerPointerMove}
                            className="relative w-full h-[400px] md:h-[500px] bg-card-bg/50 border border-brand-cyan/20 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md select-none touch-none"
                        >
                            {/* Grilla Animada Parallax */}
                            <motion.div 
                                animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none" 
                                style={{ 
                                    backgroundImage: `
                                    linear-gradient(to right, var(--brand-cyan) 1px, transparent 1px),
                                    linear-gradient(to bottom, var(--brand-cyan) 1px, transparent 1px)
                                    `, 
                                    backgroundSize: '100px 100px' 
                                }} 
                            />
                            
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />

                            {/* UI de Ayuda Inicial (Cero Misiones Seleccionadas) */}
                            {!activeMissionId && (
                                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
                                    <span className="text-xl md:text-3xl font-primary text-muted font-bold tracking-widest uppercase">
                                        Selecciona una Constelación
                                    </span>
                                </div>
                            )}

                             {/* UI de Ayuda con barra de progreso vertical reducida */}
                             {activeMissionId && !isUltimateVictory && (
                                 <FadeIn className="absolute top-4 right-4 z-20 w-auto min-w-[180px] md:min-w-[220px] pointer-events-none">
                                     <div className="bg-background/80 border border-brand-cyan/20 px-4 py-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-4">
                                         <div className="flex flex-col flex-1 gap-1">
                                             <div className="flex flex-col gap-0">
                                                 <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                                                     {t.synergy.progressTitle || "Progreso"}
                                                 </span>
                                                 <span className="text-xl font-mono font-bold text-foreground leading-tight">{progress}%</span>
                                             </div>
                                             <p className="text-[8px] text-muted uppercase tracking-normal">
                                                 {t.synergy.connectHelp || "Conecta los nodos"}
                                             </p>
                                         </div>
                                         
                                         {/* Barra Vertical más pequeña */}
                                         <div className="w-1.5 h-12 bg-muted rounded-full overflow-hidden relative">
                                             <motion.div 
                                                 initial={{ height: 0 }}
                                                 animate={{ height: `${progress}%` }}
                                                 className="absolute bottom-0 left-0 right-0 bg-brand-cyan shadow-[0_0_10px_var(--brand-cyan)]"
                                             />
                                         </div>
                                     </div>
                                 </FadeIn>
                             )}

                            {/* Canvas SVG para Ejes (Líneas) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {/* Guía Visual (Líneas trazadoras) */}
                                {activeMissionId && !isUltimateVictory && (
                                    <g className="opacity-30 scale-[1.01]">
                                        {(() => {
                                            const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
                                            if (!mission || !mission.edges) return null;
                                            
                                            // Pre-calculate positions to avoid redundant calls in render
                                            return mission.edges.map(([fromId, toId], i) => {
                                                const n1 = nodes.find(n => n.id === fromId);
                                                const n2 = nodes.find(n => n.id === toId);
                                                if (!n1 || !n2) return null;
                                                
                                                // Check if user already connected these two nodes
                                                const isConnected = userEdges.some(ue => 
                                                    (ue.from === fromId && ue.to === toId) || 
                                                    (ue.from === toId && ue.to === fromId)
                                                );
                                                
                                                if (isConnected) return null;

                                                const p1 = getDynamicNodePosition(n1, nodes.indexOf(n1));
                                                const p2 = getDynamicNodePosition(n2, nodes.indexOf(n2));
                                                
                                                return (
                                                    <line 
                                                        key={`guide-${i}`}
                                                        x1={p1.x} y1={p1.y}
                                                        x2={p2.x} y2={p2.y}
                                                        stroke="var(--brand-cyan)"
                                                        strokeWidth={1}
                                                        strokeDasharray="4 4"
                                                    />
                                                );
                                            });
                                        })()}
                                    </g>
                                )}
                                {/* Conexiones reales creadas por el usuario */}
                                {userEdges.map((edge, i) => {
                                    const n1 = nodes.find(n => n.id === edge.from);
                                    const n2 = nodes.find(n => n.id === edge.to);
                                    if (!n1 || !n2) return null;
                                    
                                    // Utilizar la pos final de las estrelllas tras su animación para el trazado sincrónico no es estrictamente directo en SVG framer,
                                    // pero como las vinculamos estáticamente, las trazamos directo. Para que se sigan, usaríamos un hook de coordenadas (MotionValue),
                                    // pero como las organizamos al centro, la UX percibe que unen los puntos en reposo. Para simplificar, usamos las Coords calculadas estáticas
                                    const p1 = getDynamicNodePosition(n1, nodes.indexOf(n1));
                                    const p2 = getDynamicNodePosition(n2, nodes.indexOf(n2));

                                    return (
                                        <line 
                                            key={i}
                                            x1={p1.x}
                                            y1={p1.y}
                                            x2={p2.x}
                                            y2={p2.y}
                                            stroke="var(--brand-cyan)"
                                            strokeWidth={isUltimateVictory ? 3 : 2}
                                            strokeOpacity={isUltimateVictory ? 1 : 0.8}
                                            className="transition-all duration-500 delay-300" 
                                        />
                                    );
                                })}
                                
                                {/* Línea virtual temporal */}
                                {selectedNodeId && mousePos && (
                                    <line 
                                        x1={getDynamicNodePosition(nodes.find(n => n.id === selectedNodeId)!, nodes.findIndex(n => n.id === selectedNodeId)).x || 0}
                                        y1={getDynamicNodePosition(nodes.find(n => n.id === selectedNodeId)!, nodes.findIndex(n => n.id === selectedNodeId)).y || 0}
                                        x2={mousePos.x}
                                        y2={mousePos.y}
                                        stroke="var(--brand-cyan)"
                                        strokeWidth={2}
                                        strokeOpacity={0.5}
                                        strokeDasharray="6 6"
                                        className="transition-opacity duration-100 hidden md:block" 
                                    />
                                )}
                            </svg>

                            {/* Estrellas (Nodos) */}
                            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                                {nodes.map((node, index) => {
                                    const isSelected = selectedNodeId === node.id;
                                    
                                    const activeMissionData = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
                                    const isTargetNode = activeMissionId === "final" || (activeMissionData && activeMissionData.nodes.includes(node.id));
                                    
                                    // Si hay misión activa y somos target, brillamos algo más
                                    const isFaded = activeMissionId && !isTargetNode && activeMissionId !== "final";

                                    const targetPos = getDynamicNodePosition(node, index);

                                    return (
                                        <motion.div
                                            key={node.id}
                                            onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                                            onPointerDown={(e) => e.stopPropagation()}
                                            animate={{ 
                                                x: targetPos.x,
                                                y: targetPos.y,
                                                opacity: isFaded ? 0.3 : 1
                                            }}
                                            transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                                            className={`absolute flex items-center justify-center w-0 h-0 touch-none
                                                ${activeMissionId ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}
                                                ${isSelected ? 'z-50' : 'z-20'}
                                            `}
                                        >
                                            {/* Aura para el nodo seleccionado */}
                                            <div className={`absolute w-16 h-16 rounded-full bg-brand-cyan/20 pointer-events-none transition-transform duration-300 
                                                ${isSelected ? 'animate-ping scale-150 opacity-100' : 'opacity-0 scale-50'}`} 
                                            />

                                            {/* Punto Central de la Estrella */}
                                            <div className={`absolute w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-500 ease-out flex items-center justify-center shadow-[0_0_15px_var(--brand-cyan)]
                                                ${isSelected 
                                                    ? 'bg-white scale-150 shadow-[0_0_40px_var(--brand-cyan)]' 
                                                    : isUltimateVictory ? 'bg-white shadow-[0_0_30px_var(--brand-cyan)] scale-150' : 'bg-brand-cyan'}
                                                ${isTargetNode && !isSelected ? 'animate-pulse bg-brand-cyan/90 border border-white' : ''}
                                            `} />
                                            
                                            {/* Zona de click */}
                                            <div className="absolute w-16 h-16 rounded-full bg-transparent z-10" />

                                            {/* Texto de la etiqueta */}
                                            <div className={`absolute w-32 text-center pointer-events-none transition-all duration-500
                                                ${isSelected ? 'scale-110' : ''}
                                                ${node.id === 'ui' && activeMissionId === 'orion' ? 'bottom-8' : 'top-8'}
                                            `}>
                                                <span className={`text-[10px] md:text-xs font-mono tracking-wider font-bold transition-colors duration-300
                                                    ${isUltimateVictory || isSelected ? 'text-white drop-shadow-[0_0_5px_var(--brand-cyan)]' : 'text-brand-cyan/80'}
                                                `}>
                                                    {t.synergyNodes?.[node.id as keyof typeof t.synergyNodes] || node.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Recompensa Individual */}
                            <AnimatePresence>
                                {rewardMissionId && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-40 bg-background/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, y: 20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            className="bg-card-bg/90 border border-brand-cyan/30 p-8 rounded-3xl max-w-md shadow-2xl"
                                        >
                                            <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Star className="text-brand-cyan" size={32} />
                                            </div>
                                            <h4 className="text-2xl font-bold font-primary text-brand-cyan mb-2">
                                                {t.synergy.constellations.find((c: any) => c.id === rewardMissionId)?.name}
                                            </h4>
                                            <p className="text-foreground/80 mb-8 leading-relaxed">
                                                {t.synergy.constellations.find((c: any) => c.id === rewardMissionId)?.description}
                                            </p>
                                            <div className="flex flex-col gap-3">
                                                <Button variant="primary" size="md" className="gap-2" onClick={() => window.open('/cv.pdf', '_blank')}>
                                                    <Download size={18} /> {t.synergy.downloadCV}
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => setRewardMissionId(null)}>
                                                    Continuar Explorando
                                                </Button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Recompensa Final (Victoria) */}
                            <AnimatePresence>
                                {isUltimateVictory && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1, duration: 1 }}
                                        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
                                    >
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,transparent_80%)]" />
                                        
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 1.5 }}
                                            className="relative z-10 flex flex-col items-center pointer-events-auto"
                                        >
                                            <Network size={50} className="text-brand-cyan mb-6 animate-pulse" />
                                            <h3 className="text-4xl md:text-6xl font-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-foreground to-brand-cyan mb-4 tracking-wider drop-shadow-sm text-center">
                                                {t.synergy.unifiedSystem}
                                            </h3>
                                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-center px-6 leading-relaxed mb-8">
                                                {t.synergy.unifiedDescription}
                                            </p>
                                            
                                            <motion.div 
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 2.5 }}
                                                className="flex flex-col items-center gap-4"
                                            >
                                                <div className="px-4 py-2 bg-brand-cyan/20 border border-brand-cyan/50 rounded-full flex items-center gap-2 mb-2 shadow-lg">
                                                    <Sparkles size={16} className="text-brand-cyan animate-pulse" />
                                                    <span className="text-sm text-brand-cyan font-bold tracking-wider">{t.synergy.rewardUnlocked}</span>
                                                </div>
                                                
                                                <Button variant="primary" size="lg" className="gap-3 transition-shadow font-bold group" onClick={() => window.open('/cv.pdf', '_blank')}>
                                                    <FileText size={22} className="group-hover:scale-110 transition-transform" />
                                                    {t.synergy.downloadCV}
                                                    <Download size={18} className="opacity-80 group-hover:translate-y-1 transition-transform" />
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
