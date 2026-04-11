"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGrid } from "@/components/animations/stagger-grid";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

export function Projects() {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Título de Sección */}
                <div className="mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> {t.projects.title}
                    </h2>
                    <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                </div>

                {/* Grid de Proyectos */}
                <StaggerGrid className="grid grid-cols-1 gap-12 lg:gap-20">
                    {t.projects.items.map((project, index) => (
                        <SpotlightCard key={index} project={project} />
                    ))}
                </StaggerGrid>

            </div>
        </section>
    );
}

// Componente individual separado para mantener su propio estado del ratón
function SpotlightCard({ project }: { project: any }) {
    const { t } = useLanguage();
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative grid lg:grid-cols-2 gap-8 items-stretch rounded-3xl bg-card-bg/50 border border-brand-cyan/10 p-6 md:p-8 overflow-hidden transition-all duration-500"
        >
            {/* Spotlight Background Flash */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0 rounded-3xl"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,229,153,.07), transparent 40%)`,
                }}
            />
            
            {/* Columna Izquierda: Imagen / Placeholder gigante */}
            <div className="relative z-10 w-full aspect-video md:aspect-[4/3] rounded-2xl bg-card-bg border border-brand-cyan/20 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-transparent transition-colors duration-500" />
                 {/* Icon placeholder centrado lucide */}
                 <div className="w-20 h-20 rounded-2xl bg-background backdrop-blur border border-brand-cyan/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
                     <Code2 className="w-10 h-10 text-brand-cyan opacity-80" />
                 </div>
                 {/* Texto decorativo para el placeholder */}
                 <span className="mt-6 text-sm font-medium text-muted tracking-widest uppercase">{t.projects.placeholder}</span>
            </div>

            {/* Columna Derecha: Información */}
            <div className="relative z-10 flex flex-col justify-center">
                <div className="mb-4">
                    <Badge className="mb-4">{project.status}</Badge>
                    <h3 className="text-2xl md:text-4xl font-bold font-primary text-foreground group-hover:text-brand-cyan transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>
                
                <p className="text-muted text-lg md:text-xl mb-8 leading-relaxed text-justify">
                    {project.description}
                </p>
                
                {/* Stack de Tech */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-background border border-brand-cyan/10 text-sm md:text-base text-foreground/80 font-medium">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Acciones */}
                <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-brand-cyan/10">
                    <a href={project.previewUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="primary" size="md">
                            {project.previewText} <ExternalLink className="ml-1 w-4 h-4 inline-block" />
                        </Button>
                    </a>
                </div>
            </div>

        </div>
    );
}
