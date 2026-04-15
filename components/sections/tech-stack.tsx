"use client";

import { useLanguage } from "@/hooks/use-language";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Sparkles } from "lucide-react";

export function TechStack() {
    const { t } = useLanguage();

    return (
        <section id="tech-stack" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.techStack.title}
                        </h2>
                        <p className="text-muted text-lg">{t.techStack.subtitle}</p>
                        <div className="w-24 h-1 bg-brand-cyan/30 rounded-full mx-auto mt-6" />
                    </div>
                </ScrollReveal>

                {/* AI Section - Destacada */}
                <ScrollReveal animation="zoom" delay={0.2}>
                    <div className="mb-12 relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/20 to-transparent rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-70" />
                        
                        <div className="relative bg-card-bg border-2 border-brand-cyan/30 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 flex items-center justify-center">
                                    <Sparkles className="text-brand-cyan" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-primary text-foreground">
                                        {t.techStack.categories.ai.title}
                                    </h3>
                                    <p className="text-sm text-brand-cyan font-medium">
                                        {t.techStack.categories.ai.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {t.techStack.categories.ai.techs.map((tech: any, index: number) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-background/80 to-background/40 hover:from-brand-cyan/10 hover:to-brand-cyan/5 border border-brand-cyan/20 hover:border-brand-cyan/50 transition-all duration-300 group/tech hover:shadow-xl hover:shadow-brand-cyan/20"
                                    >
                                        <div className="w-24 h-24 flex items-center justify-center rounded-2xl bg-white p-5 group-hover/tech:scale-110 group-hover/tech:rotate-3 transition-all duration-300 shadow-lg">
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-base font-bold text-foreground text-center group-hover/tech:text-brand-cyan transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Otras categorías */}
                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Frontend */}
                    <ScrollReveal animation="slide-up" delay={0.3}>
                        <div className="bg-card-bg border border-brand-cyan/10 rounded-2xl p-6 hover:border-brand-cyan/30 transition-all duration-300">
                            <h3 className="text-xl font-bold font-primary text-foreground mb-6">
                                {t.techStack.categories.frontend.title}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {t.techStack.categories.frontend.techs.map((tech: any, index: number) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-brand-cyan/10 border border-transparent hover:border-brand-cyan/30 transition-all duration-300 group/tech"
                                    >
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white p-3 group-hover/tech:scale-110 group-hover/tech:-rotate-6 transition-all duration-300 shadow-sm">
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-muted group-hover/tech:text-foreground text-center transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Backend */}
                    <ScrollReveal animation="slide-up" delay={0.4}>
                        <div className="bg-card-bg border border-brand-cyan/10 rounded-2xl p-6 hover:border-brand-cyan/30 transition-all duration-300">
                            <h3 className="text-xl font-bold font-primary text-foreground mb-6">
                                {t.techStack.categories.backend.title}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {t.techStack.categories.backend.techs.map((tech: any, index: number) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-brand-cyan/10 border border-transparent hover:border-brand-cyan/30 transition-all duration-300 group/tech"
                                    >
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white p-3 group-hover/tech:scale-110 group-hover/tech:-rotate-6 transition-all duration-300 shadow-sm">
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-muted group-hover/tech:text-foreground text-center transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Tools */}
                    <ScrollReveal animation="slide-up" delay={0.5}>
                        <div className="bg-card-bg border border-brand-cyan/10 rounded-2xl p-6 hover:border-brand-cyan/30 transition-all duration-300">
                            <h3 className="text-xl font-bold font-primary text-foreground mb-6">
                                {t.techStack.categories.tools.title}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {t.techStack.categories.tools.techs.map((tech: any, index: number) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-brand-cyan/10 border border-transparent hover:border-brand-cyan/30 transition-all duration-300 group/tech"
                                    >
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white p-3 group-hover/tech:scale-110 group-hover/tech:-rotate-6 transition-all duration-300 shadow-sm">
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-muted group-hover/tech:text-foreground text-center transition-colors">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                </div>

            </div>
        </section>
    );
}
