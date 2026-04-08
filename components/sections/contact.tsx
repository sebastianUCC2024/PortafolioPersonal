"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";

export function Contact() {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                <FadeIn className="mb-16 md:mb-24 flex flex-col">
                    <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                        <span className="text-brand-cyan">/</span> {t.contact.title}
                    </h2>
                    <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Columna Izquierda: Información */}
                    <FadeIn delay={0.1} className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold font-primary text-foreground leading-tight mb-6">
                                {t.contact.subtitle}
                            </h3>
                            <p className="text-muted text-lg leading-relaxed max-w-md">
                                {t.contact.description}
                            </p>
                        </div>

                        {/* Bloques de Info Directa */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan transition-transform group-hover:scale-110">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">{t.contact.emailLabel}</span>
                                    <a href="mailto:hola@juanpatino.com" className="text-foreground font-medium hover:text-brand-cyan transition-colors">
                                        hola@juanpatino.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan transition-transform group-hover:scale-110">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">Ubicación</span>
                                    <span className="text-foreground font-medium">Colombia</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Columna Derecha: Formulario */}
                    <FadeIn delay={0.2} className="relative group">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-brand-cyan/5 rounded-3xl blur-xl group-hover:bg-brand-cyan/10 transition-colors duration-500 -z-10" />
                        
                        <form className="bg-card-bg/80 border border-brand-cyan/20 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.nameLabel}</label>
                                <input 
                                    type="text" 
                                    placeholder={t.contact.namePlaceholder}
                                    className="bg-background/50 border border-brand-cyan/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-foreground"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.emailLabel}</label>
                                <input 
                                    type="email" 
                                    placeholder={t.contact.emailPlaceholder}
                                    className="bg-background/50 border border-brand-cyan/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-foreground"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.messageLabel}</label>
                                <textarea 
                                    rows={4}
                                    placeholder={t.contact.messagePlaceholder}
                                    className="bg-background/50 border border-brand-cyan/10 px-4 py-3 rounded-xl focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all text-foreground resize-none"
                                />
                            </div>

                            <Button variant="primary" size="lg" className="w-full mt-4">
                                {t.contact.submitBtn}
                            </Button>
                        </form>
                    </FadeIn>

                </div>
            </div>
        </section>
    );
}
