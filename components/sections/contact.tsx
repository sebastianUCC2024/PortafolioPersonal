"use client";

import { useState } from "react";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Mail, MapPin, CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Contact() {
    const { t } = useLanguage();
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 4000);
    };

    return (
        <section id="contact" className="py-24 relative">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md text-sm font-medium
                            ${toast.type === 'success'
                                ? 'bg-brand-cyan/10 border-brand-cyan/40 text-brand-cyan'
                                : 'bg-red-500/10 border-red-500/40 text-red-400'
                            }`}
                    >
                        {toast.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="max-w-7xl mx-auto px-6">
                
                <ScrollReveal animation="slide-up" delay={0.1}>
                    <div className="mb-16 md:mb-24 flex flex-col">
                        <h2 className="text-3xl md:text-5xl font-bold font-primary mb-4 text-foreground">
                            <span className="text-brand-cyan">/</span> {t.contact.title}
                        </h2>
                        <div className="w-24 h-1 bg-brand-cyan/30 rounded-full" />
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Columna Izquierda: Información */}
                    <ScrollReveal animation="slide-right" delay={0.2}>
                        <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold font-primary text-foreground leading-tight mb-6">
                                {t.contact.subtitle}
                            </h3>
                            <p className="text-muted text-lg leading-relaxed max-w-md text-justify">
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

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan transition-transform group-hover:scale-110">
                                    <LinkedinIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">LinkedIn</span>
                                    <a href="https://www.linkedin.com/in/juan-sebastian-patiño-a26461329/?trk=opento_sprofile_details" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-brand-cyan transition-colors">
                                        Juan Sebastián Patiño
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan transition-transform group-hover:scale-110">
                                    <GithubIcon size={20} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted text-sm uppercase tracking-wider">GitHub</span>
                                    <a href="https://github.com/sebastianUCC2024" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-brand-cyan transition-colors">
                                        @sebastianUCC2024
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Columna Derecha: Formulario */}
                    <ScrollReveal animation="slide-left" delay={0.3}>
                        <div className="relative group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-brand-cyan/5 rounded-3xl blur-xl group-hover:bg-brand-cyan/10 transition-colors duration-500 -z-10" />
                            
                            <form className="bg-card-bg/80 border border-brand-cyan/20 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col gap-6" onSubmit={async (e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
                                const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
                                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

                                const newErrors: { name?: string; email?: string; message?: string } = {};
                                if (!name) newErrors.name = "El nombre es requerido.";
                                if (!email) newErrors.email = "El correo es requerido.";
                                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Ingresa un correo válido.";
                                if (!message) newErrors.message = "El mensaje es requerido.";

                                setErrors(newErrors);
                                if (Object.keys(newErrors).length > 0) return;

                                const res = await fetch("https://formspree.io/f/mdapqpap", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                                    body: JSON.stringify({ name, email, message }),
                                });

                                if (res.ok) {
                                    form.reset();
                                    setErrors({});
                                    showToast('success', '¡Mensaje enviado! Te responderé pronto.');
                                } else {
                                    showToast('error', 'Hubo un error al enviar. Intenta de nuevo.');
                                }
                            }}>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.nameLabel}</label>
                                <input 
                                    name="name"
                                    type="text" 
                                    placeholder={t.contact.namePlaceholder}
                                    onChange={() => setErrors(p => ({ ...p, name: undefined }))}
                                    className={`bg-background/50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-1 transition-all text-foreground ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-brand-cyan/10 focus:border-brand-cyan focus:ring-brand-cyan'}`}
                                />
                                {errors.name && <span className="text-xs text-red-400 ml-1">{errors.name}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.emailLabel}</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    placeholder={t.contact.emailPlaceholder}
                                    onChange={() => setErrors(p => ({ ...p, email: undefined }))}
                                    className={`bg-background/50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-1 transition-all text-foreground ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-brand-cyan/10 focus:border-brand-cyan focus:ring-brand-cyan'}`}
                                />
                                {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email}</span>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-muted ml-1">{t.contact.messageLabel}</label>
                                <textarea 
                                    name="message"
                                    rows={4}
                                    placeholder={t.contact.messagePlaceholder}
                                    onChange={() => setErrors(p => ({ ...p, message: undefined }))}
                                    className={`bg-background/50 border px-4 py-3 rounded-xl focus:outline-none focus:ring-1 transition-all text-foreground resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-brand-cyan/10 focus:border-brand-cyan focus:ring-brand-cyan'}`}
                                />
                                {errors.message && <span className="text-xs text-red-400 ml-1">{errors.message}</span>}
                            </div>

                            <Button variant="primary" size="lg" className="w-full mt-4">
                                {t.contact.submitBtn}
                            </Button>
                        </form>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
}
