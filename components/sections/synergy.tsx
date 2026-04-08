"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Network, Sparkles, FileText, Download } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";

interface StarNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

// 8 Nodos (Estrellas) que formarán la constelación.
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

export function SynergySection() {
    const { t } = useLanguage();
    
    const [nodes, setNodes] = useState<StarNode[]>(INITIAL_STARS);
    const [isVictory, setIsVictory] = useState(false);
    const [connectedCount, setConnectedCount] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    
    // Distancia máxima mucho más corta para aumentar dificultad
    const connectionRadius = 180; 

    // Auto-ajustar espacio
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

    // Chequear si TODOS los nodos están conectados en una sola red unificada
    useEffect(() => {
        if (isVictory) return;
        
        const adjacencyList: number[][] = Array.from({ length: nodes.length }, () => []);
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionRadius) {
                    adjacencyList[i].push(j);
                    adjacencyList[j].push(i);
                }
            }
        }

        let maxClusterSize = 1;
        const globalVisited = new Set<number>();

        for (let i = 0; i < nodes.length; i++) {
            if (!globalVisited.has(i)) {
                const visited = new Set<number>();
                const queue = [i];
                visited.add(i);

                while (queue.length > 0) {
                    const current = queue.shift()!;
                    for (const neighbor of adjacencyList[current]) {
                        if (!visited.has(neighbor)) {
                            visited.add(neighbor);
                            queue.push(neighbor);
                        }
                    }
                }

                for (const node of visited) globalVisited.add(node);
                if (visited.size > maxClusterSize) {
                    maxClusterSize = visited.size;
                }
            }
        }

        setConnectedCount(maxClusterSize);

        if (maxClusterSize === nodes.length) {
            setIsVictory(true);
        }
    }, [nodes, isVictory]);

    const handleDrag = (id: string, info: any) => {
        if (isVictory) return;
        setNodes(prev => prev.map(n => 
            n.id === id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n
        ));
    };

    return (
        <section className="py-32 relative overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto px-6">
                
                <FadeIn className="mb-16 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> Arquitectura Neural
                    </h2>
                    <p className="text-muted text-lg max-w-2xl">
                        Un profesional no es un conjunto de habilidades aisladas. Arrastra las estrellas y únelas todas en una sola red para descubrir la sinergia.
                    </p>
                </FadeIn>

                <FadeIn delay={0.2} className="relative">
                    <div 
                        ref={containerRef} 
                        className="relative w-full h-[600px] bg-[#050505] dark:bg-card-bg/20 border border-brand-cyan/20 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md group"
                    >
                        {/* Grilla Animada Parallax */}
                        <motion.div 
                            animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-10 pointer-events-none" 
                            style={{ 
                                backgroundImage: `
                                linear-gradient(to right, var(--brand-cyan) 1px, transparent 1px),
                                linear-gradient(to bottom, var(--brand-cyan) 1px, transparent 1px)
                                `, 
                                backgroundSize: '100px 100px' 
                            }} 
                        />
                        
                        {/* Glow Central Pulzante y Luz Flotante */}
                        <motion.div 
                            animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" 
                        />
                        
                        <motion.div
                            animate={{ x: [0, 400, -200, 0], y: [0, -200, 200, 0] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none"
                        />

                        {/* Custom SVG Animation para flujo de datos */}
                        <style>{`
                            @keyframes dashFlow {
                                to { stroke-dashoffset: -16; }
                            }
                            .animate-flow { animation: dashFlow 1s linear infinite; }
                        `}</style>

                        {/* Lienzo SVG para las conexiones matemáticas */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                            <defs>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--brand-cyan)" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="var(--brand-cyan)" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                            {nodes.map((nodeA, i) => (
                                nodes.slice(i + 1).map((nodeB, j) => {
                                    const dx = nodeA.x - nodeB.x;
                                    const dy = nodeA.y - nodeB.y;
                                    const distance = Math.sqrt(dx * dx + dy * dy);
                                    const isConnected = distance < connectionRadius;
                                    
                                    if (!isConnected && !isVictory) return null;

                                    return (
                                        <line 
                                            key={`${nodeA.id}-${nodeB.id}`}
                                            x1={nodeA.x}
                                            y1={nodeA.y}
                                            x2={nodeB.x}
                                            y2={nodeB.y}
                                            stroke="url(#lineGrad)"
                                            strokeWidth={isVictory ? 3 : 1.5}
                                            strokeDasharray={isVictory ? "none" : "8 8"}
                                            className={`transition-all duration-300 ease-in-out drop-shadow-[0_0_5px_var(--brand-cyan)] ${isVictory ? '' : 'animate-flow'}`}
                                        />
                                    );
                                })
                            ))}
                        </svg>

                        {/* HUD de Progreso */}
                        {!isVictory && (
                            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-background/80 backdrop-blur-md border border-brand-cyan/20 rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-4 transition-all duration-500">
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Estabilidad de Red</span>
                                    <span className="text-lg font-mono font-bold text-brand-cyan">
                                        {Math.round((connectedCount / nodes.length) * 100)}%
                                    </span>
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_5px_var(--brand-cyan)]">
                                        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" className="text-muted/30" />
                                        <circle cx="20" cy="20" r="16" stroke="var(--brand-cyan)" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset={100 - (connectedCount / nodes.length) * 100} className="transition-all duration-500 ease-out" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Nodos (Estrellas miniatura elegantes) */}
                        <div className="absolute inset-0 z-10 overflow-hidden">
                            {nodes.map((node) => (
                                <motion.div
                                    key={node.id}
                                    drag={!isVictory}
                                    dragConstraints={containerRef}
                                    dragElastic={0}
                                    dragMomentum={false}
                                    onDrag={(e, info) => handleDrag(node.id, info)}
                                    animate={isVictory ? { 
                                        x: (dimensions.width / 2) + Math.cos(nodes.indexOf(node) * (Math.PI * 2) / nodes.length) * 180, 
                                        y: (dimensions.height / 2) + Math.sin(nodes.indexOf(node) * (Math.PI * 2) / nodes.length) * 180
                                    } : { x: node.x, y: node.y }}
                                    transition={isVictory ? { duration: 2, type: "spring", bounce: 0.4 } : { type: "tween", duration: 0 }}
                                    style={{ 
                                        x: node.x, 
                                        y: node.y 
                                    }}
                                    className="absolute flex items-center justify-center cursor-grab active:cursor-grabbing w-0 h-0"
                                >
                                    {/* Pulsación / Radar detrás del nodo */}
                                    <div className="absolute w-12 h-12 rounded-full bg-brand-cyan/20 animate-ping pointer-events-none" />

                                    {/* El núcleo de la estrella */}
                                    <div className={`absolute w-4 h-4 rounded-full transition-all duration-300 z-20 
                                        ${isVictory ? 'bg-white shadow-[0_0_30px_var(--brand-cyan)] scale-150 relative' : 'bg-brand-cyan shadow-[0_0_15px_var(--brand-cyan)] hover:scale-150 hover:bg-white'}
                                    `} />
                                    
                                    {/* Área invisible enorme para atrapar clics */}
                                    <div className="absolute w-20 h-20 rounded-full bg-transparent z-10" />

                                    {/* Etiqueta del Nodo Flotante */}
                                    <div className="absolute top-6 w-40 text-center pointer-events-none bg-background/50 backdrop-blur px-2 py-1 rounded-md border border-brand-cyan/10">
                                        <span className={`text-xs font-mono tracking-widest font-bold transition-colors duration-300
                                            ${isVictory ? 'text-white' : 'text-brand-cyan/90'}
                                        `}>
                                            {node.label}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Interfaz de Victoria */}
                        <AnimatePresence>
                            {isVictory && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.9)_0%,transparent_80%)]" />
                                    
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="relative z-10 flex flex-col items-center"
                                    >
                                        <Network size={50} className="text-white mb-6 animate-pulse" />
                                        <h3 className="text-4xl md:text-6xl font-primary font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-cyan mb-4 tracking-wider drop-shadow-[0_0_20px_var(--brand-cyan)] text-center">
                                            SISTEMA UNIFICADO
                                        </h3>
                                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-center px-6 leading-relaxed mb-8">
                                            Las habilidades aisladas son solo el inicio. Al crear una arquitectura neural perfecta, el desarrollo Frontend, Backend y el Diseño convergen para crear productos inigualables.
                                        </p>
                                        
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 2.5 }}
                                            className="flex flex-col items-center gap-4"
                                        >
                                            <div className="px-4 py-2 bg-brand-cyan/20 border border-brand-cyan/50 rounded-full flex items-center gap-2 mb-2 shadow-[0_0_15px_var(--brand-cyan)]">
                                                <Sparkles size={16} className="text-white animate-pulse" />
                                                <span className="text-sm text-white font-bold tracking-wider">RECOMPENSA DESBLOQUEADA</span>
                                            </div>
                                            
                                            <Button variant="primary" size="lg" className="gap-3 shadow-[0_0_20px_var(--brand-cyan)] hover:shadow-[0_0_40px_var(--brand-cyan)] transition-shadow font-bold group border border-brand-cyan/20" onClick={() => window.open('/cv.pdf', '_blank')}>
                                                <FileText size={22} className="group-hover:scale-110 transition-transform" />
                                                Descargar CV Ampliado
                                                <Download size={18} className="opacity-80 group-hover:translate-y-1 transition-transform" />
                                            </Button>

                                            <p className="text-xs text-brand-cyan/80 mt-1 max-w-xs text-center font-mono">
                                                Acceso a métricas clave y experiencia secreta.
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
