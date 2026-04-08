"use client";

import { useLanguage } from "@/hooks/use-language";

export function Testimonials() {
    const { t } = useLanguage();

    return (
        <section id="testimonials" className="py-24 relative bg-card-bg/20">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Título de Sección */}
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> {t.testimonials.title}
                    </h2>
                    <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                </div>

                {/* Grid de Testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.testimonials.items.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="group relative rounded-3xl bg-card-bg/50 border border-brand-cyan/10 p-8 hover:bg-card-bg hover:border-brand-cyan/30 transition-all duration-300 flex flex-col gap-6"
                        >
                            {/* Icono de comillas decorativo */}
                            <div className="absolute top-6 right-8 text-5xl font-serif text-brand-cyan/10 group-hover:text-brand-cyan/20 transition-colors">
                                "
                            </div>

                            {/* Quote Text */}
                            <p className="text-muted leading-relaxed relative z-10 flex-grow">
                                "{testimonial.quote}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-brand-cyan/10">
                                {/* Pseud-Avatar (Inicial del nombre) */}
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center shrink-0 group-hover:bg-brand-cyan/20 transition-colors">
                                    <span className="text-brand-cyan font-bold font-primary">
                                        {testimonial.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-foreground font-semibold font-primary">
                                        {testimonial.name}
                                    </span>
                                    <span className="text-brand-cyan text-sm">
                                        {testimonial.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
