"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { Starfield } from "@/components/animations/starfield";

export function Hero() {
    const { t } = useLanguage();

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            
            {/* Elemento decorativo de fondo tipo "Glow" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Columna Izquierda: Textos */}
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 z-10">
                    <FadeIn delay={0.2}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                            {t.hero.greeting} <br />
                            <span className="text-brand-cyan block mt-1 drop-shadow-[0_0_15px_rgba(0,229,153,0.3)]">
                                {t.hero.name}
                            </span>
                            <span>{t.hero.lastName}</span>
                        </h1>
                    </FadeIn>
                    
                    <FadeIn delay={0.3}>
                        <p className="text-muted text-lg md:text-xl max-w-lg leading-relaxed">
                            {t.hero.description}
                        </p>
                    </FadeIn>
                    
                    <FadeIn delay={0.4}>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                            <Button variant="primary" size="lg">
                                {t.hero.primaryBtn}
                            </Button>
                            <Button variant="outline" size="lg">
                                {t.hero.secondaryBtn}
                            </Button>
                        </div>
                    </FadeIn>
                </div>

                {/* Columna Derecha: Avatar / Elemento Gráfico */}
                <div className="relative flex justify-center items-center mt-12 lg:mt-0 z-10">
                    {/* Anillos concéntricos neón */}
                    <div className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-brand-cyan/20 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full border border-brand-cyan/10 animate-[spin_15s_linear_infinite_reverse]" />
                    
                    {/* Círculo principal del Avatar */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-card-bg border-2 border-brand-cyan/50 shadow-[0_0_30px_rgba(0,229,153,0.15)] flex items-center justify-center overflow-hidden group">
                        
                        {/* Filtro interactivo en hover */}
                        <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                        
                        {/* Imagen de perfil */}
                        <Image 
                            src="/portafolio.jpg"
                            alt="Foto de perfil"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
