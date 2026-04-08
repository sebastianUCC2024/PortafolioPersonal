"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
                <div className="grid grid-cols-1 gap-12 lg:gap-20">
                    {t.projects.items.map((project, index) => (
                        <div key={index} className="group relative grid lg:grid-cols-2 gap-8 items-stretch rounded-3xl bg-card-bg/50 border border-brand-cyan/10 p-6 md:p-8 hover:bg-card-bg hover:border-brand-cyan/30 transition-all duration-500">
                            
                            {/* Glow de fondo interaccional para la tarjeta */}
                            <div className="absolute inset-0 bg-brand-cyan/0 rounded-3xl blur-2xl group-hover:bg-brand-cyan/5 transition-colors duration-500 -z-10" />

                            {/* Columna Izquierda: Imagen / Placeholder gigante */}
                            <div className="w-full aspect-video md:aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#12141a] to-[#0a0c10] border border-brand-cyan/10 flex items-center justify-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-transparent transition-colors duration-500" />
                                 {/* Logo/Icon placeholder centrado */}
                                 <div className="w-20 h-20 rounded-2xl bg-brand-cyan/10 backdrop-blur border border-brand-cyan/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                     <svg className="w-10 h-10 text-brand-cyan opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                     </svg>
                                 </div>
                            </div>

                            {/* Columna Derecha: Información */}
                            <div className="flex flex-col justify-center">
                                <div className="mb-4">
                                    <Badge className="mb-4">{project.status}</Badge>
                                    <h3 className="text-2xl md:text-4xl font-bold font-primary text-foreground group-hover:text-brand-cyan transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                </div>
                                
                                <p className="text-muted text-lg md:text-xl mb-8 leading-relaxed">
                                    {project.description}
                                </p>
                                
                                {/* Stack de Tech */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-md bg-background border border-brand-cyan/10 text-sm md:text-base text-foreground/80 font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Acciones */}
                                <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-brand-cyan/10">
                                    <Button variant="primary" size="md">
                                        {project.previewText} ↗
                                    </Button>
                                    <Button variant="outline" size="md">
                                        {project.githubText}
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
