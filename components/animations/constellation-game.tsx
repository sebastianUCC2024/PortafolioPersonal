"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { Trophy, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Node {
    id: string;
    label: string;
    x: number;
    y: number;
}

const INITIAL_NODES: Node[] = [
    { id: "projects", label: "Proyectos", x: 100, y: 100 },
    { id: "experience", label: "Experiencia", x: 300, y: 50 },
    { id: "about", label: "Conóceme", x: 150, y: 300 },
    { id: "contact", label: "Contacto", x: 400, y: 250 },
];

// Target positions for the star-shaped constellation (same ids, different coordinates)
const TARGET_NODES: Node[] = [
    { id: "projects", label: "Proyectos", x: 250, y: 80 },   // top point
    { id: "experience", label: "Experiencia", x: 320, y: 200 }, // right upper
    { id: "about", label: "Conóceme", x: 200, y: 250 }, // left lower
    { id: "contact", label: "Contacto", x: 280, y: 340 }, // bottom right
];

export function ConstellationGame() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
    const [isVictory, setIsVictory] = useState(false);
    const [showGuide, setShowGuide] = useState(true); // show shape guide initially
    const [completedConstellation, setCompletedConstellation] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    
    const containerRef = useRef<HTMLDivElement>(null);

    // Revisar si todas las líneas están conectadas (distancia < 250px)
    useEffect(() => {
        if (!isOpen) return;

        // Check generic connections for victory (same as before)
        const checkConnections = () => {
            let connectedPairs = 0;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 250) connectedPairs++;
                }
            }
            if (connectedPairs >= 4) setIsVictory(true);
        };

        // Check if nodes match the target star shape
        const checkStarShape = () => {
            const tolerance = 30; // pixels
            const matches = TARGET_NODES.every(target => {
                const node = nodes.find(n => n.id === target.id);
                if (!node) return false;
                return Math.abs(node.x - target.x) < tolerance && Math.abs(node.y - target.y) < tolerance;
            });
            if (matches) {
                setCompletedConstellation("Estrella");
                setShowGuide(false);
            }
        };

        checkConnections();
        checkStarShape();
    }, [nodes, isOpen]);

    const handleDrag = (id: string, info: any) => {
        setNodes(prev => prev.map(n => 
            n.id === id ? { ...n, x: n.x + info.delta.x, y: n.y + info.delta.y } : n
        ));
    };

    const handleReset = () => {
        setNodes(INITIAL_NODES);
        setIsVictory(false);
    };

    if (!isOpen) {
        return (
            <div className="flex justify-center my-16">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 font-mono text-xs opacity-50 hover:opacity-100 transition-opacity"
                    onClick={() => setIsOpen(true)}
                >
                    <Star size={14} /> [EASTER_EGG.exe]
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-16 px-6">
            <div className="relative w-full h-[500px] bg-card-bg/50 border border-brand-cyan/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col">
                
                {/* Header Mini Juego */}
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-background/50 border-b border-brand-cyan/10 z-10">
                    <div className="flex items-center gap-2 text-brand-cyan">
                        <Target size={18} />
                        <span className="font-mono text-sm font-bold tracking-widest uppercase">Constelación de Habilidades</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground">
                        Cerrar
                    </Button>
                </div>
                {/* Shape guide overlay (faint star) */}
                {showGuide && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
                        {/* Definir marcador de flecha */}
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="var(--brand-cyan)" />
                            </marker>
                        </defs>
                        {/* Líneas punteadas de la constelación completa */}
                        {TARGET_NODES.map((nodeA, i) => (
                            TARGET_NODES.slice(i + 1).map((nodeB) => (
                                <line
                                    key={`${nodeA.id}-${nodeB.id}`}
                                    x1={nodeA.x + 50}
                                    y1={nodeA.y + 20}
                                    x2={nodeB.x + 50}
                                    y2={nodeB.y + 20}
                                    stroke="var(--brand-cyan)"
                                    strokeWidth={1}
                                    strokeDasharray="4 4"
                                />
                            ))
                        ))}
                        {/* Ruta ordenada con flechas */}
                        <polyline
                            points={TARGET_NODES.map(n => `${n.x + 50},${n.y + 20}`).join(' ')}
                            fill="none"
                            stroke="var(--brand-cyan)"
                            strokeWidth={2}
                            markerEnd="url(#arrowhead)"
                        />
                        {/* Números de orden para cada nodo */}
                        {TARGET_NODES.map((node, idx) => (
                            <text
                                key={node.id + "-label"}
                                x={node.x + 55}
                                y={node.y + 15}
                                fill="var(--brand-cyan)"
                                fontSize={12}
                                fontWeight="bold"
                                textAnchor="middle"
                            >{idx + 1}</text>
                        ))}
                    </svg>
                )}
<div className="absolute top-12 left-0 w-full flex justify-center"><p className="text-sm text-muted">Arrastra los nodos para formar una figura de estrella y desbloquear la sinergia.</p></div>
                {/* Barra de progreso de la constelación */}
                <div className="absolute top-24 left-0 w-full flex justify-center items-center px-4">
                    <div className="w-3/4 bg-muted rounded-full h-2 overflow-hidden">
                        <div className="bg-brand-cyan h-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="ml-2 text-sm text-foreground">{progress}%</span>
                </div>

                {/* SVG para dibujar las líneas de energía */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {nodes.map((nodeA, i) => (
                        nodes.slice(i + 1).map((nodeB, j) => {
                            const dx = nodeA.x - nodeB.x;
                            const dy = nodeA.y - nodeB.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            const isConnected = distance < 250;
                            
                            return (
                                <line 
                                    key={`${nodeA.id}-${nodeB.id}`}
                                    x1={nodeA.x + 50} // offset to center of roughly 100px node
                                    y1={nodeA.y + 20} 
                                    x2={nodeB.x + 50} 
                                    y2={nodeB.y + 20} 
                                    stroke={isVictory ? "#00e599" : isConnected ? "var(--brand-cyan)" : "var(--muted)"}
                                    strokeWidth={isVictory ? 3 : isConnected ? 2 : 0.5}
                                    strokeOpacity={isVictory ? 1 : isConnected ? 0.8 : 0.2}
                                    className="transition-all duration-300"
                                />
                            );
                        })
                    ))}
                </svg>

                {/* Nodos Draggeables */}
                <div ref={containerRef} className="relative flex-1 w-full h-full z-10 mt-14 overflow-hidden">
                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            drag
                            dragConstraints={containerRef}
                            dragElastic={0.2}
                            dragMomentum={false}
                            onDrag={(e, info) => handleDrag(node.id, info)}
                            animate={{ x: node.x, y: node.y }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`absolute w-28 h-12 rounded-full border-2 flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-colors shadow-lg
                                ${isVictory ? 'bg-brand-cyan text-foreground border-brand-cyan' : 'bg-background text-foreground border-brand-cyan/40 hover:border-brand-cyan'}`}
                            style={{ x: node.x, y: node.y }} // Usar style en vez de top/left evita re-renders bruscos completos
                        >
                            <span className="text-xs font-bold uppercase tracking-wider">{node.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Overlay de Victoria */}
                {isVictory && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center"
                    >
                        <Trophy size={64} className="text-brand-cyan mb-6 animate-bounce" />
                        <h3 className="text-3xl md:text-4xl font-primary font-bold text-foreground mb-4">
                            ¡Sinergia Desbloqueada!
                        </h3>
                        <p className="text-muted text-lg max-w-md mb-8">
                            Al igual que las estrellas forman constelaciones, todas mis habilidades técnicas y blandas se unen para crear productos digitales excepcionales.
                        </p>
                        <Button variant="primary" size="md" onClick={handleReset}>
                            Reiniciar Red
                        </Button>
                    </motion.div>
                )}
                {/* Constellation info panel when shape completed */}
                {completedConstellation && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card-bg/90 border border-brand-cyan/30 rounded-xl p-4 shadow-lg"
                    >
                        <h4 className="text-lg font-bold text-brand-cyan mb-2">Constelación: {completedConstellation}</h4>
                        <p className="text-sm text-foreground">Esta constelación representa la unión de mis principales habilidades: desarrollo, experiencia, conocimiento y contacto.</p>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
