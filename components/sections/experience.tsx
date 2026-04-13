"use client";

import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { GraduationCap, CheckCircle2 } from "lucide-react";

export function Experience() {
    const { t } = useLanguage();

    return (
        <section id="experience" className="py-24 relative bg-card-bg/20">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Título de Sección centrado */}
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="mb-16 text-center flex flex-col items-center">
                        <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.experience.title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Tarjeta de Experiencia Principal */}
                <ScrollReveal animation="zoom" delay={0.2}>
                    <div className="relative rounded-3xl bg-card-bg/80 border-t-2 border-l border-r border-b border-t-brand-cyan/50 border-brand-cyan/10 p-8 md:p-12 shadow-2xl backdrop-blur-sm overflow-hidden group">
                        
                        {/* Elemento decorativo visual */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[80px] -z-10 group-hover:bg-brand-cyan/10 transition-colors duration-500" />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <Badge className="mb-6">{t.experience.badge}</Badge>
                            <h3 className="text-3xl md:text-4xl font-bold font-primary text-foreground mb-2">
                                {t.experience.degree}
                            </h3>
                            <h4 className="text-xl font-medium text-brand-cyan flex items-center gap-2">
                                <GraduationCap size={24} />
                                {t.experience.university}
                            </h4>
                        </div>
                        {/* Logo UCC */}
                        <div className="hidden md:flex w-20 h-20 rounded-2xl bg-white border border-brand-cyan/20 items-center justify-center shrink-0 shadow-inner rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden p-1">
                            <img src="/ucc.png" alt="Universidad Cooperativa de Colombia" className="w-full h-full object-contain" />
                        </div>
                    </div>

                    <p className="text-muted text-lg leading-relaxed mb-10 border-l-2 border-brand-cyan/20 pl-6 text-justify">
                        {t.experience.description}
                    </p>

                    <div>
                        <h5 className="text-foreground font-semibold text-lg mb-4 opacity-90">
                            {t.experience.skillsTitle}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {t.experience.skills.map(skill => (
                                <div key={skill} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-brand-cyan/10 hover:bg-brand-cyan/5 transition-all">
                                    <CheckCircle2 size={16} className="text-brand-cyan shrink-0" />
                                    <span className="text-muted group-hover:text-foreground transition-colors font-medium text-sm">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
