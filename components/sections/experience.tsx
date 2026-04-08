"use client";

import { useLanguage } from "@/hooks/use-language";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";

export function Experience() {
    const { t } = useLanguage();

    return (
        <section id="experience" className="py-24 relative bg-card-bg/20">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Título de Sección centrado */}
                <FadeIn className="mb-16 text-center flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> {t.experience.title}
                    </h2>
                    <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                </FadeIn>

                {/* Tarjeta de Experiencia Principal */}
                <FadeIn delay={0.2}>
                    <div className="relative rounded-3xl bg-card-bg/80 border-t-2 border-l border-r border-b border-t-brand-cyan/50 border-brand-cyan/10 p-8 md:p-12 shadow-2xl backdrop-blur-sm overflow-hidden group">
                        
                        {/* Elemento decorativo visual */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-[80px] -z-10 group-hover:bg-brand-cyan/10 transition-colors duration-500" />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                        <div>
                            <Badge className="mb-6">{t.experience.badge}</Badge>
                            <h3 className="text-3xl md:text-4xl font-bold font-primary text-foreground mb-2">
                                {t.experience.degree}
                            </h3>
                            <h4 className="text-xl font-medium text-brand-cyan">
                                {t.experience.university}
                            </h4>
                        </div>
                        {/* Decoración de marca de agua estilo "🎓" o abstracta */}
                        <div className="hidden md:flex w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 items-center justify-center shrink-0">
                            <span className="text-brand-cyan text-3xl opacity-80 font-primary font-bold">UCC</span>
                        </div>
                    </div>

                    <p className="text-muted text-lg leading-relaxed mb-10">
                        {t.experience.description}
                    </p>

                    <div>
                        <h5 className="text-foreground font-semibold text-lg mb-4">
                            {t.experience.skillsTitle}
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {t.experience.skills.map(skill => (
                                <div key={skill} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-cyan" />
                                    <span className="text-muted group-hover:text-foreground/90 transition-colors">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                </FadeIn>

            </div>
        </section>
    );
}
