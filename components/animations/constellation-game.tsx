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

export function ConstellationGame() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES);
    const [isVictory, setIsVictory] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);

    // Revisar si todas las líneas están conectadas (distancia < 250px)
    useEffect(() => {
        if (!isOpen || isVictory) return;

        const checkConnections = () => {
            let connectedPairs = 0;
            const requiredPairs = (nodes.length * (nodes.length - 1)) / 2; // todas combinadas = 6

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 250) {
                        connectedPairs++;
                    }
                }
            }

            // Si están cerquita todas de todas (o al menos unidas en red), damos victoria.
            // Para simplificar, requerimos que estén todas en un clúster pequeño o al menos 4 conexiones
            if (connectedPairs >= 4) {
                setIsVictory(true);
            }
        };

        checkConnections();
    }, [nodes, isOpen, isVictory]);

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

            </div>
        </div>
    );
}
