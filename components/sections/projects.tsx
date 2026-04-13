"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGrid } from "@/components/animations/stagger-grid";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Projects() {
    const { t } = useLanguage();

    return (
        <section id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Título de Sección */}
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.projects.title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Grid de Proyectos */}
                <div className="grid grid-cols-1 gap-12 lg:gap-20">
                    {t.projects.items.map((project, index) => (
                        <ScrollReveal key={index} animation="slide-up" delay={0.2 + index * 0.1}>
                            <SpotlightCard project={project} index={index} />
                        </ScrollReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}

// Componente individual separado para mantener su propio estado del ratón
function SpotlightCard({ project, index }: { project: any; index: number }) {
    const { t } = useLanguage();
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    
    const isEven = index % 2 === 0;

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
            className="group relative grid lg:grid-cols-5 gap-8 items-center rounded-3xl bg-card-bg/50 border border-brand-cyan/10 p-6 md:p-8 overflow-hidden transition-all duration-500"
        >
            {/* Spotlight Background Flash */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0 rounded-3xl"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,229,153,.07), transparent 40%)`,
                }}
            />
            
            {/* Columna Izquierda: Imagen */}
            <div className={`relative z-10 lg:col-span-2 w-full aspect-video rounded-2xl bg-card-bg border border-brand-cyan/20 flex flex-col items-center justify-center overflow-hidden shadow-inner ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                 {project.image ? (
                     <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                 ) : (
                     <>
                         <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-transparent transition-colors duration-500" />
                         <div className="w-16 h-16 rounded-2xl bg-background backdrop-blur border border-brand-cyan/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
                             <Code2 className="w-8 h-8 text-brand-cyan opacity-80" />
                         </div>
                         <span className="mt-4 text-xs font-medium text-muted tracking-widest uppercase">{t.projects.placeholder}</span>
                     </>
                 )}
            </div>

            {/* Columna Derecha: Información */}
            <div className={`relative z-10 lg:col-span-3 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="mb-3">
                    <Badge className="mb-3">{project.status}</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold font-primary text-foreground group-hover:text-brand-cyan transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>
                
                <p className="text-muted text-base mb-6 leading-relaxed text-justify">
                    {project.description}
                </p>
                
                {/* Stack de Tech */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 rounded-md bg-background border border-brand-cyan/10 text-sm text-foreground/80 font-medium">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-brand-cyan/10">
                    <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="relative group/btn">
                        <Button variant="primary" size="md">
                            {project.previewText} <ExternalLink className="ml-1 w-4 h-4 inline-block" />
                        </Button>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                            <p className="text-xs font-medium text-foreground">Ver proyecto en vivo</p>
                        </div>
                    </a>
                    <div className="relative group/github">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-brand-cyan/20 flex items-center justify-center text-muted hover:text-brand-cyan hover:border-brand-cyan/50 transition-all duration-300">
                            <GithubIcon size={18} />
                        </a>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                            <p className="text-xs font-medium text-foreground">Ver código fuente</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
