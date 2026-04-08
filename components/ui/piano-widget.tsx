"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export function PianoWidget() {
    const { t } = useLanguage();
    const [hoveredKey, setHoveredKey] = useState<number | null>(null);

    return (
        <div className="fixed bottom-0 right-4 md:right-12 z-50 flex items-end">
            
            {/* Panel de Información Flotante */}
            <div 
                className={`absolute bottom-full right-0 mb-4 w-64 p-4 rounded-2xl bg-card-bg/95 border border-brand-cyan/20 shadow-[0_0_30px_rgba(0,229,153,0.15)] backdrop-blur-md transition-all duration-300 transform origin-bottom-right
                ${hoveredKey !== null ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"}`}
            >
                {hoveredKey !== null && (
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-wider text-brand-cyan font-bold">
                            {t.piano.keys.find(k => k.id === hoveredKey)?.label}
                        </span>
                        <p className="text-sm text-foreground leading-snug">
                            {t.piano.keys.find(k => k.id === hoveredKey)?.content}
                        </p>
                    </div>
                )}
            </div>

            {/* Teclado del Piano */}
            <div className="flex gap-[2px] bg-background border-t border-l border-r border-brand-cyan/20 p-[2px] rounded-t-xl shadow-2xl overflow-hidden">
                {t.piano.keys.map((key, index) => {
                    // Simular la estética de teclas blancas y negras pero en modo dark tech
                    const isBlackKey = index === 1 || index === 3;
                    
                    return (
                        <button
                            key={key.id}
                            onMouseEnter={() => setHoveredKey(key.id)}
                            onMouseLeave={() => setHoveredKey(null)}
                            className={`
                                relative transition-all duration-300 transform origin-top group
                                ${isBlackKey 
                                    ? "w-8 h-24 bg-[#0a0c10] border-b border-brand-cyan/10 z-10 -ml-4 -mr-4 hover:h-28" 
                                    : "w-10 h-32 bg-[#1a1f26] hover:bg-[#20252e] hover:h-36"}
                                rounded-b-md flex items-end justify-center pb-2
                            `}
                        >
                            {/* Resplandor al hacer hover */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Indicador visual de la tecla */}
                            <div className={`w-4 h-[2px] rounded-full transition-colors ${
                                hoveredKey === key.id ? "bg-brand-cyan" : "bg-muted/30"
                            }`} />
                        </button>
                    )
                })}
            </div>
            
        </div>
    );
}
