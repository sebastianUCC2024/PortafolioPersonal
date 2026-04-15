"use client";

import { useLanguage } from "@/hooks/use-language";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Testimonials() {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    // Auto-play cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((prev) => (prev + 1) % t.testimonials.items.length);
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
    };

    const goToTestimonial = (index: number) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 'next' : 'prev');
        setCurrentIndex(index);
    };

    return (
        <section id="testimonials" className="py-16 md:py-24 relative bg-card-bg/20 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                
                {/* Título de Sección */}
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.testimonials.title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                    </div>
                </ScrollReveal>

                {/* Carrusel de Testimonios */}
                <ScrollReveal animation="zoom" delay={0.2}>
                    <div className="relative">
                        
                        {/* Contenedor del carrusel */}
                        <div className="relative min-h-[400px] md:min-h-[450px]">
                            {t.testimonials.items.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 ${
                                        index === currentIndex 
                                            ? direction === 'next' 
                                                ? 'animate-slideInRight' 
                                                : 'animate-slideInLeft'
                                            : 'opacity-0 pointer-events-none'
                                    }`}
                                    style={{
                                        zIndex: index === currentIndex ? 10 : 0
                                    }}
                                >
                                    <div className="rounded-3xl bg-card-bg border border-brand-cyan/20 p-6 md:p-8 lg:p-12 shadow-2xl h-full flex flex-col justify-between">
                                        
                                        {/* Icono de comillas decorativo */}
                                        <div className="absolute top-6 right-6 md:top-8 md:right-8 text-5xl md:text-7xl font-serif text-brand-cyan/10">
                                            "
                                        </div>

                                        {/* Quote Text */}
                                        <div className="relative z-10 mb-6 md:mb-8">
                                            <p className="text-base md:text-lg lg:text-xl text-muted leading-relaxed text-center">
                                                "{testimonial.quote}"
                                            </p>
                                        </div>

                                        {/* Author Info */}
                                        <div className="flex flex-col items-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-brand-cyan/10">
                                            {/* Avatar (Inicial del nombre) */}
                                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10 border-2 border-brand-cyan/30 flex items-center justify-center shadow-lg">
                                                <span className="text-brand-cyan font-bold font-primary text-xl md:text-2xl">
                                                    {testimonial.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-foreground font-bold font-primary text-base md:text-lg">
                                                    {testimonial.name}
                                                </span>
                                                <span className="text-brand-cyan text-xs md:text-sm text-center px-4">
                                                    {testimonial.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de Navegación */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-4 pointer-events-none z-20">
                            <button
                                onClick={handlePrev}
                                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-card-bg/90 backdrop-blur-sm border border-brand-cyan/30 hover:bg-brand-cyan/10 hover:border-brand-cyan/50 flex items-center justify-center text-brand-cyan transition-all duration-300 shadow-lg hover:scale-110"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} className="md:w-6 md:h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-card-bg/90 backdrop-blur-sm border border-brand-cyan/30 hover:bg-brand-cyan/10 hover:border-brand-cyan/50 flex items-center justify-center text-brand-cyan transition-all duration-300 shadow-lg hover:scale-110"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} className="md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Indicadores de Puntos */}
                        <div className="flex justify-center gap-2 mt-8">
                            {t.testimonials.items.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToTestimonial(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        index === currentIndex 
                                            ? 'w-8 bg-brand-cyan shadow-lg shadow-brand-cyan/50' 
                                            : 'w-2 bg-brand-cyan/30 hover:bg-brand-cyan/50 hover:w-4'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </ScrollReveal>

            </div>

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-slideInRight {
                    animation: slideInRight 0.6s ease-out forwards;
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
