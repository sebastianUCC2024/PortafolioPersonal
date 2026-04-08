"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Mail, MapPin } from "lucide-react";

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
                                    <Mail size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">{t.contact.emailLabel}</span>
                                    <a href="mailto:juan17patino@gmail.com" className="text-foreground font-medium hover:text-brand-cyan transition-colors">
                                        juan17patino@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan transition-transform group-hover:scale-110">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">{t.contact.locationLabel}</span>
                                    <span className="text-foreground font-medium">{t.contact.location}</span>
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
