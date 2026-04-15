"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { useMinimalMode } from "@/hooks/use-minimal-mode";
import { Network, Sparkles, FileText, Download, CheckCircle2, Circle, RotateCcw, Lock, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Button } from "@/components/ui/button";

interface StarNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

const INITIAL_STARS: StarNode[] = [
    { id: "react", label: "React", x: 0.35, y: 0.30 },
    { id: "nextjs", label: "Next.js", x: 0.70, y: 0.25 },
    { id: "ts", label: "TypeScript", x: 0.80, y: 0.55 },
    { id: "ui", label: "UI/UX", x: 0.20, y: 0.70 },
    { id: "arch", label: "Arquitectura", x: 0.85, y: 0.80 },
    { id: "perf", label: "Performance", x: 0.50, y: 0.15 },
    { id: "backend", label: "APIs", x: 0.40, y: 0.50 },
    { id: "db", label: "Databases", x: 0.65, y: 0.65 },
    { id: "design", label: "Figma", x: 0.75, y: 0.88 },
    { id: "python", label: "Python", x: 0.15, y: 0.35 },
    { id: "cloud", label: "Cloud", x: 0.58, y: 0.82 },
    { id: "docker", label: "Docker", x: 0.28, y: 0.58 },
    { id: "git", label: "Git", x: 0.72, y: 0.40 },
    { id: "testing", label: "Testing", x: 0.45, y: 0.88 },
    { id: "node", label: "Node.js", x: 0.82, y: 0.22 },
    { id: "graphql", label: "GraphQL", x: 0.62, y: 0.18 },
    { id: "mongodb", label: "MongoDB", x: 0.18, y: 0.22 },
];

const TARGET_CONSTELLATIONS = [
    { 
        id: "orion", 
        nodes: ["perf", "docker", "ts", "git", "backend", "react", "db", "node", "ui", "design"], 
        edges: [
            ["perf", "docker"], // Hombro izquierdo
            ["perf", "ts"], // Hombro derecho
            ["docker", "backend"], // Brazo izquierdo
            ["ts", "git"], ["git", "node"], // Brazo derecho
            ["backend", "react"], ["react", "db"], // Cinturón
            ["node", "db"], // Conexión brazo a cinturón
            ["backend", "ui"], ["db", "design"], // Piernas
            ["ui", "design"], // Base
        ],
        positions: { 
            perf: {x: 0, y: -220}, 
            docker: {x: -100, y: -140},
            ts: {x: 100, y: -140}, 
            git: {x: 180, y: -80}, 
            node: {x: 150, y: 0}, 
            backend: {x: -50, y: -40}, 
            react: {x: 0, y: -30}, 
            db: {x: 50, y: -40}, 
            ui: {x: -90, y: 140}, 
            design: {x: 90, y: 140}, 
        }
    },
    { 
        id: "ursa-major", 
        nodes: ["perf", "ts", "backend", "react", "nextjs", "ui", "arch"], 
        edges: [
            ["perf", "ts"], ["ts", "backend"], ["backend", "react"], 
            ["react", "nextjs"], ["nextjs", "perf"],
            ["backend", "ui"], ["ui", "arch"],
        ],
        positions: { 
            perf: {x: -160, y: -100},
            ts: {x: -60, y: -100},
            backend: {x: 50, y: -100},
            react: {x: 150, y: -80},
            nextjs: {x: -120, y: 60},
            ui: {x: 120, y: 40},
            arch: {x: 180, y: 120},
        }
    },
    { 
        id: "cassiopeia", 
        nodes: ["ts", "perf", "react", "ui", "design"], 
        edges: [
            ["ts", "perf"], ["perf", "react"], ["react", "ui"], ["ui", "design"]
        ],
        positions: { 
            ts: {x: -200, y: -50}, 
            perf: {x: -100, y: 70}, 
            react: {x: 0, y: -30}, 
            ui: {x: 100, y: 70}, 
            design: {x: 200, y: -50} 
        }
    },
    { 
        id: "cygnus", 
        nodes: ["perf", "ts", "docker", "backend", "react", "cloud", "ui", "git", "arch", "graphql"], 
        edges: [
            ["perf", "ts"], ["ts", "docker"], // Cola
            ["docker", "backend"], ["backend", "react"], ["react", "cloud"], // Cuerpo
            ["ui", "git"], ["git", "backend"], // Ala izquierda
            ["arch", "graphql"], ["graphql", "backend"], // Ala derecha
        ],
        positions: { 
            perf: {x: 0, y: -220}, 
            ts: {x: 0, y: -150}, 
            docker: {x: 0, y: -80}, 
            backend: {x: 0, y: 0}, 
            react: {x: 0, y: 100}, 
            cloud: {x: 0, y: 200}, 
            ui: {x: -180, y: -30}, 
            git: {x: -90, y: -15}, 
            arch: {x: 180, y: -30}, 
            graphql: {x: 90, y: -15}, 
        }
    },
    { 
        id: "leo", 
        nodes: ["perf", "ts", "backend", "react", "db", "arch"], 
        edges: [
            ["perf", "ts"], ["ts", "backend"], ["backend", "react"],
            ["react", "db"], ["db", "arch"], ["arch", "backend"],
        ],
        positions: { 
            perf: {x: -140, y: -140},
            ts: {x: -80, y: -60}, 
            backend: {x: 0, y: 0}, 
            react: {x: 80, y: 60}, 
            db: {x: 140, y: 140}, 
            arch: {x: 40, y: 120},
        }
    }
];

export function SynergySection() {
    const { t } = useLanguage();
    const { isMinimal } = useMinimalMode();
    
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
            const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
            return {
                x: (dimensions.width / 2) + Math.cos(index * (Math.PI * 2) / nodes.length) * radius,
                y: (dimensions.height / 2) + Math.sin(index * (Math.PI * 2) / nodes.length) * radius
            };
        }

        if (!activeMissionId) {
            // Default position using relative coordinates with padding
            const padding = 0.08; // 8% padding from edges
            return { 
                x: padding * dimensions.width + node.x * (dimensions.width * (1 - 2 * padding)), 
                y: padding * dimensions.height + node.y * (dimensions.height * (1 - 2 * padding))
            };
        }

        if (activeMissionId === "final") {
            // Final Mission: similar to victory but before connecting
            const radius = Math.min(dimensions.width, dimensions.height) * 0.32;
            return {
                x: (dimensions.width / 2) + Math.cos(index * (Math.PI * 2) / nodes.length) * radius,
                y: (dimensions.height / 2) + Math.sin(index * (Math.PI * 2) / nodes.length) * radius
            };
        }

        const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
        if (!mission) {
            const padding = 0.08;
            return { 
                x: padding * dimensions.width + node.x * (dimensions.width * (1 - 2 * padding)), 
                y: padding * dimensions.height + node.y * (dimensions.height * (1 - 2 * padding))
            };
        }

        const missionNodePos = (mission as any).positions?.[node.id];
        
        if (missionNodePos) {
            // Use specific position for this mission (scaled to canvas size)
            // Use a larger scale for smaller screens
            const baseSize = Math.min(dimensions.width, dimensions.height);
            const scale = baseSize < 500 ? baseSize / 500 : baseSize / 600;
            return {
                x: (dimensions.width / 2) + missionNodePos.x * scale,
                y: (dimensions.height / 2) + missionNodePos.y * scale
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

        // Validar que el nodo pertenece a la misión activa
        const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
        if (activeMissionId !== "final" && mission && !mission.nodes.includes(id)) {
            // El nodo no pertenece a esta constelación, no permitir selección
            setSelectedNodeId(null);
            return;
        }

        // Mechanics: Click-to-Connect / Drag-to-Connect hybrid
        if (!selectedNodeId) {
            setSelectedNodeId(id);
        } else {
            if (selectedNodeId === id) {
                setSelectedNodeId(null);
            } else {
                // Validar que ambos nodos pertenecen a la misión activa
                if (activeMissionId !== "final" && mission && !mission.nodes.includes(selectedNodeId)) {
                    setSelectedNodeId(null);
                    return;
                }

                // Verificar si la conexión ya existe (en cualquier dirección)
                const exists = userEdges.find(e => 
                    (e.from === selectedNodeId && e.to === id) || 
                    (e.from === id && e.to === selectedNodeId)
                );
                
                // Solo agregar si no existe
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
        <section id="synergy" className="py-20 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="mb-12 text-center flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.synergy.title}
                        </h2>
                        <p className="text-muted text-lg max-w-2xl">
                            {t.synergy.description}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col lg:flex-row gap-6 items-stretch relative">
                    
                    {/* Controles y Panel de Pistas / Nivel Selector */}
                    <ScrollReveal animation="slide-right" delay={0.2}>
                        <div className="lg:w-80 flex-shrink-0 flex flex-col gap-4">
                        
                        {/* Móvil: chips horizontales scrolleables */}
                        <div className="lg:hidden flex flex-col gap-3">
                            <h4 className="text-xs font-bold font-primary uppercase tracking-widest text-brand-cyan">
                                {t.synergy.missionsTitle || "Misiones"}
                            </h4>
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                {t.synergy.constellations?.map((c: any) => {
                                    const isFound = discoveredConstellations.includes(c.id);
                                    const isActive = activeMissionId === c.id;
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => playMission(c.id)}
                                            className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-semibold transition-all duration-300
                                                ${isActive ? 'bg-brand-cyan/20 border-brand-cyan/50 text-brand-cyan' : isFound ? 'border-brand-cyan/20 text-foreground' : 'border-brand-cyan/10 text-muted-foreground opacity-70'}`}
                                        >
                                            {isFound ? <CheckCircle2 size={12} className="text-brand-cyan" /> : <Circle size={12} />}
                                            {c.name}
                                        </button>
                                    );
                                })}
                            </div>
                            {activeMissionId && (
                                <p className="text-[10px] text-muted text-center">{t.synergy.onboarding}</p>
                            )}
                            
                            {/* Botón Descargar CV - Móvil */}
                            <button
                                onClick={() => window.open('/cv.pdf', '_blank')}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 font-medium text-xs transition-all duration-300"
                            >
                                <Download size={14} />
                                <span>{t.synergy.downloadCV || "Descargar CV"}</span>
                            </button>
                        </div>

                        {/* Desktop: panel vertical */}
                         <div className="hidden lg:flex bg-card-bg/50 border border-brand-cyan/20 rounded-3xl p-5 backdrop-blur-md flex-col gap-3">
                            <h4 className="text-sm font-bold font-primary uppercase tracking-widest text-brand-cyan mb-2">
                                {t.synergy.missionsTitle || "Misiones"}
                            </h4>
                            <div className="flex flex-col gap-1 flex-1">
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
                                                <p className="text-xs text-muted leading-relaxed mt-2 pl-7 text-justify">
                                                    {c.description}
                                                </p>
                                            )}
                                        </button>
                                    )
                                })}

                                {/* Instrucción */}
                                <div className="mt-auto pt-4 border-t border-brand-cyan/10 space-y-3">
                                    <p className="text-xs text-muted leading-relaxed text-center px-2">
                                        {t.synergy.onboarding}
                                    </p>
                                    
                                    {/* Botón Descargar CV */}
                                    <button
                                        onClick={() => window.open('/cv.pdf', '_blank')}
                                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 font-medium text-xs transition-all duration-300"
                                    >
                                        <Download size={14} />
                                        <span>{t.synergy.downloadCV || "Descargar CV"}</span>
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
                        </div>
                    </ScrollReveal>

                    <div className="flex-1 min-w-0">
                        <div 
                            ref={containerRef} 
                            onPointerDown={handleContainerPointerDown}
                            onPointerMove={handleContainerPointerMove}
                            className="relative w-full min-h-[400px] h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-card-bg/50 border border-brand-cyan/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md select-none touch-none"
                        >
                            {/* Grilla Animada Parallax - Ocultar en modo minimalista */}
                            {!isMinimal && (
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
                            )}
                            
                            {!isMinimal && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />
                            )}



                             {/* UI de Ayuda con barra de progreso vertical reducida */}
                             {activeMissionId && !isUltimateVictory && (
                                 <FadeIn className="absolute top-3 right-3 md:top-4 md:right-4 z-30 w-auto pointer-events-none">
                                     <div className="bg-background/80 border border-brand-cyan/20 px-3 py-2 md:px-4 md:py-3 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-3 md:gap-4">
                                         <div className="flex flex-col flex-1 gap-0.5 md:gap-1">
                                             <div className="flex flex-col gap-0">
                                                 <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
                                                     {t.synergy.progressTitle || "Progreso"}
                                                 </span>
                                                 <span className="text-lg md:text-xl font-mono font-bold text-foreground leading-tight">{progress}%</span>
                                             </div>
                                             <p className="text-[7px] md:text-[8px] text-muted uppercase tracking-normal hidden sm:block">
                                                 {t.synergy.connectHelp || "Conecta los nodos"}
                                             </p>
                                         </div>
                                         
                                         {/* Barra Vertical más pequeña */}
                                         <div className="w-1.5 h-10 md:h-12 bg-muted rounded-full overflow-hidden relative">
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
                                {/* Guía Visual (Líneas trazadoras) - Mantener siempre para intuitividad */}
                                {activeMissionId && !isUltimateVictory && (
                                    <g className={isMinimal ? "opacity-20" : "opacity-30"}>
                                        {(() => {
                                            const mission = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
                                            if (!mission || !mission.edges) return null;
                                            
                                            return mission.edges.map(([fromId, toId]) => {
                                                const n1 = nodes.find(n => n.id === fromId);
                                                const n2 = nodes.find(n => n.id === toId);
                                                if (!n1 || !n2) return null;
                                                
                                                const isConnected = userEdges.some(ue => 
                                                    (ue.from === fromId && ue.to === toId) || 
                                                    (ue.from === toId && ue.to === fromId)
                                                );
                                                
                                                if (isConnected) return null;

                                                const idx1 = nodes.indexOf(n1);
                                                const idx2 = nodes.indexOf(n2);
                                                const p1 = getDynamicNodePosition(n1, idx1);
                                                const p2 = getDynamicNodePosition(n2, idx2);
                                                
                                                return (
                                                    <line 
                                                        key={`guide-${fromId}-${toId}`}
                                                        x1={p1.x}
                                                        y1={p1.y}
                                                        x2={p2.x}
                                                        y2={p2.y}
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
                                    
                                    const p1 = getDynamicNodePosition(n1, nodes.indexOf(n1));
                                    const p2 = getDynamicNodePosition(n2, nodes.indexOf(n2));

                                    return (
                                        <motion.line 
                                            key={i}
                                            initial={{ x1: n1.x, y1: n1.y, x2: n2.x, y2: n2.y }}
                                            animate={{ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }}
                                            transition={{ 
                                                duration: 0.8,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                            stroke="var(--brand-cyan)"
                                            strokeWidth={isUltimateVictory ? 3 : 2}
                                            strokeOpacity={isUltimateVictory ? 1 : 0.8}
                                        />
                                    );
                                })}
                                
                                {/* Línea virtual temporal */}
                                {selectedNodeId && mousePos && (() => {
                                    const selectedNode = nodes.find(n => n.id === selectedNodeId);
                                    if (!selectedNode) return null;
                                    const selectedPos = getDynamicNodePosition(selectedNode, nodes.findIndex(n => n.id === selectedNodeId));
                                    return (
                                        <line 
                                            x1={selectedPos.x}
                                            y1={selectedPos.y}
                                            x2={mousePos.x}
                                            y2={mousePos.y}
                                            stroke="var(--brand-cyan)"
                                            strokeWidth={2}
                                            strokeOpacity={0.5}
                                            strokeDasharray="6 6"
                                        />
                                    );
                                })()}
                            </svg>

                            {/* Estrellas (Nodos) */}
                            <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                                {nodes.map((node, index) => {
                                    const isSelected = selectedNodeId === node.id;
                                    const activeMissionData = TARGET_CONSTELLATIONS.find(c => c.id === activeMissionId);
                                    const isTargetNode = activeMissionId === "final" || (activeMissionData && activeMissionData.nodes.includes(node.id));
                                    const isFaded = activeMissionId && !isTargetNode && activeMissionId !== "final";
                                    const targetPos = getDynamicNodePosition(node, index);

                                    return (
                                        <motion.div
                                            key={node.id}
                                            onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                                            onPointerDown={(e) => e.stopPropagation()}
                                            style={{ 
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                width: 0,
                                                height: 0
                                            }}
                                            animate={{ 
                                                x: targetPos.x,
                                                y: targetPos.y,
                                                opacity: isFaded ? 0.3 : 1
                                            }}
                                            transition={{ 
                                                duration: 0.8,
                                                ease: [0.25, 0.1, 0.25, 1]
                                            }}
                                            className={`touch-none
                                                ${activeMissionId ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}
                                                ${isSelected ? 'z-50' : 'z-20'}
                                            `}
                                        >
                                            {/* Aura para el nodo seleccionado */}
                                            {isSelected && (
                                                <motion.div 
                                                    initial={{ scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1.5, opacity: [0.3, 0] }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                                                    className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-16 md:h-16 rounded-full bg-brand-cyan/20 pointer-events-none"
                                                />
                                            )}

                                            {/* Punto Central de la Estrella */}
                                            <motion.div 
                                                animate={{
                                                    scale: isSelected ? 1.5 : isUltimateVictory ? 1.5 : 1,
                                                    boxShadow: isSelected 
                                                        ? '0 0 40px var(--brand-cyan)' 
                                                        : isUltimateVictory 
                                                        ? '0 0 30px var(--brand-cyan)' 
                                                        : '0 0 15px var(--brand-cyan)'
                                                }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className={`absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full
                                                    ${isSelected || isUltimateVictory ? 'bg-white' : 'bg-brand-cyan'}
                                                    ${isTargetNode && !isSelected ? 'animate-pulse border border-white' : ''}
                                                `} 
                                            />
                                            
                                            {/* Zona de click */}
                                            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-16 md:h-16 rounded-full bg-transparent z-10" />

                                            {/* Texto de la etiqueta */}
                                            <motion.div 
                                                animate={{ scale: isSelected ? 1.1 : 1 }}
                                                transition={{ duration: 0.2 }}
                                                className={`absolute left-0 -translate-x-1/2 w-28 md:w-32 text-center pointer-events-none
                                                    ${node.id === 'ui' && activeMissionId === 'orion' ? 'top-7 md:top-8' : '-top-7 md:-top-8'}
                                                `}
                                            >
                                                <span className={`text-[9px] md:text-[10px] lg:text-xs font-mono tracking-wide font-bold transition-all duration-300 whitespace-nowrap
                                                    ${isUltimateVictory || isSelected ? 'text-white drop-shadow-[0_0_8px_var(--brand-cyan)]' : 'text-brand-cyan/80'}
                                                `}>
                                                    {t.synergyNodes?.[node.id as keyof typeof t.synergyNodes] || node.label}
                                                </span>
                                            </motion.div>
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
                                        className="absolute inset-0 z-40 bg-background/60 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.9, y: 20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            className="bg-card-bg/90 border border-brand-cyan/30 p-6 md:p-8 rounded-3xl max-w-md w-full shadow-2xl"
                                        >
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                                <Star className="text-brand-cyan" size={24} />
                                            </div>
                                            <h4 className="text-xl md:text-2xl font-bold font-primary text-brand-cyan mb-3 leading-tight">
                                                {t.synergy.rewardTitle} - {t.synergy.constellations.find((c: any) => c.id === rewardMissionId)?.name}
                                            </h4>
                                            <p className="text-foreground/80 mb-6 md:mb-8 leading-relaxed max-h-[120px] md:max-h-[150px] overflow-y-auto px-2 custom-scrollbar text-sm md:text-base text-justify">
                                                {t.synergy.constellations.find((c: any) => c.id === rewardMissionId)?.description}
                                            </p>
                                            <div className="flex flex-col gap-2 md:gap-3">
                                                <Button variant="primary" size="md" className="gap-2 w-full" onClick={() => window.open('/cv.pdf', '_blank')}>
                                                    <Download size={18} /> {t.synergy.downloadCV}
                                                </Button>
                                                <Button variant="ghost" size="sm" className="w-full" onClick={() => setRewardMissionId(null)}>
                                                    {t.synergy.continueBtn}
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
                        </div>
                </div>
            </div>
        </section>
    );
}
