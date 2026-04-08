"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerGrid } from "@/components/animations/stagger-grid";

export function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Grid principal */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Columna Izquierda: Conóceme Textos */}
                    <FadeIn delay={0.1} className="flex flex-col">
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                                <span className="text-brand-cyan">/</span> {t.about.title}
                            </h2>
                            <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                        </div>
                        
                        <div className="space-y-6 text-muted text-lg leading-relaxed">
                            <p>{t.about.description1}</p>
                            <p>{t.about.description2}</p>
                        </div>
                        
                        {/* Redes Sociales "Abstractas" */}
                        <div className="flex gap-4 mt-10">
                            <Button variant="outline" size="sm" className="px-6 rounded-xl hover:bg-brand-cyan hover:text-background">
                                LinkedIn
                            </Button>
                            <Button variant="outline" size="sm" className="px-6 rounded-xl hover:bg-brand-cyan hover:text-background">
                                GitHub
                            </Button>
                        </div>
                    </FadeIn>

                    {/* Columna Derecha: Bloque de Tecnologías / Skills Destacado */}
                    <div className="relative group">
                        
                        {/* Efecto de borde premium y sombra */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent rounded-3xl blur-md transition-all duration-500 group-hover:blur-lg opacity-70" />
                        
                        {/* Contenedor principal del Skill Box */}
                        <div className="relative bg-[#0d1017] border border-brand-cyan/10 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
                            
                            {/* Reflexión superior tipo glass */}
                            <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
                            
                            <h3 className="text-xl font-medium font-primary text-foreground mb-8">
                                {t.about.skillsTitle}
                            </h3>
                            
                            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {t.about.skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center shrink-0 border border-brand-cyan/20 group-hover:border-brand-cyan/40 transition-colors">
                                            <span className="text-brand-cyan text-sm block -translate-y-[1px]">⚡</span>
                                        </div>
                                        <span className="text-muted group-hover:text-foreground transition-colors font-medium">
                                            {skill}
                                        </span>
                                    </li>
                                ))}
                            </StaggerGrid>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
