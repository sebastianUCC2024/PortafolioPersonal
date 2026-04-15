"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useMinimalMode } from "@/hooks/use-minimal-mode";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import { Sun, Moon, Menu, X, Minimize2, Maximize2 } from "lucide-react";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme, systemTheme } = useTheme();
    const { isMinimal, toggleMinimal } = useMinimalMode();

    // Solución contra el warning de "Hydration" visual al cargar SVGs condicionales
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.experience, href: "#experience" },
        { name: t.nav.about, href: "#about" },
        { name: t.nav.techStack, href: "#tech-stack" },
        { name: t.nav.synergy, href: "#synergy" },
        { name: t.nav.testimonials, href: "#testimonials" },
        { name: t.nav.contact, href: "#contact" },
    ];

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-[100] border-b border-brand-cyan/10 dark:border-brand-cyan/20 backdrop-blur-lg bg-background transition-colors duration-300 shadow-sm dark:shadow-brand-cyan/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* Logo con icono personalizado (Versión Final Corregida) */}
                <a href="#" className="flex items-center gap-2 group z-[110]">
                    <div className="w-10 h-10 relative transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain brightness-0 dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-all" 
                        />
                    </div>
                    <span className="text-base font-bold font-primary text-foreground tracking-tight group-hover:text-brand-cyan transition-colors duration-300">
                        Sebastián
                    </span>
                </a>
                

                {/* Navegación de Escritorio */}
                <nav className="hidden lg:flex gap-6 items-center font-secondary">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => {
                                e.preventDefault();
                                const target = document.querySelector(link.href);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            className="text-sm font-medium text-muted hover:text-brand-cyan transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Accesorios y Botones de Escritorio */}
                <div className="hidden lg:flex items-center gap-3">
                    {/* Botón cambiar Idioma */}
                    <div className="relative group">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase border border-brand-cyan/20 rounded-full px-2.5 py-1">
                            <button
                                onClick={() => setLanguage("es")}
                                className={`transition-colors ${language === "es" ? "text-brand-cyan" : "text-muted hover:text-foreground"}`}
                            >
                                ES
                            </button>
                            <span className="text-muted/30">|</span>
                            <button
                                onClick={() => setLanguage("en")}
                                className={`transition-colors ${language === "en" ? "text-brand-cyan" : "text-muted hover:text-foreground"}`}
                            >
                                EN
                            </button>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                            <p className="text-xs font-medium text-foreground">
                                {language === "es" ? "Cambiar Idioma" : "Change Language"}
                            </p>
                            <p className="text-[10px] text-muted mt-0.5">
                                {language === "es" ? "Español / English" : "Spanish / English"}
                            </p>
                        </div>
                    </div>

                    {/* Botón Descargar CV */}
                    <div className="relative group">
                        <button 
                            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-300 border border-brand-cyan/20 hover:border-brand-cyan/40" 
                            onClick={() => window.open('/cv.pdf', '_blank')}
                            aria-label="Download CV"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                        </button>
                        {/* Tooltip */}
                        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                            <p className="text-xs font-medium text-foreground">
                                {language === "es" ? "Descargar CV" : "Download CV"}
                            </p>
                            <p className="text-[10px] text-muted mt-0.5">
                                {language === "es" ? "Hoja de vida en PDF" : "Resume in PDF"}
                            </p>
                        </div>
                    </div>

                    {/* Botón cambiar Tema */}
                    {mounted && (
                        <>
                            <div className="relative group">
                                <button 
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-300 border border-brand-cyan/20 hover:border-brand-cyan/40" 
                                    onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                    aria-label="Toggle Theme"
                                >
                                    {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                </button>
                                {/* Tooltip */}
                                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                                    <p className="text-xs font-medium text-foreground">
                                        {currentTheme === "dark" ? (language === "es" ? "Modo Claro" : "Light Mode") : (language === "es" ? "Modo Oscuro" : "Dark Mode")}
                                    </p>
                                    <p className="text-[10px] text-muted mt-0.5">
                                        {currentTheme === "dark" ? (language === "es" ? "Activar tema claro" : "Enable light theme") : (language === "es" ? "Activar tema oscuro" : "Enable dark theme")}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Botón Modo Minimalista */}
                            <div className="relative group">
                                <button 
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-300 border border-brand-cyan/20 hover:border-brand-cyan/40" 
                                    onClick={toggleMinimal}
                                    aria-label="Toggle Minimal Mode"
                                >
                                    {isMinimal ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                                </button>
                                {/* Tooltip */}
                                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-card-bg border border-brand-cyan/20 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                                    <p className="text-xs font-medium text-foreground">
                                        {isMinimal ? (language === "es" ? "Modo Completo" : "Full Mode") : (language === "es" ? "Modo Minimalista" : "Minimal Mode")}
                                    </p>
                                    <p className="text-[10px] text-muted mt-0.5">
                                        {isMinimal ? (language === "es" ? "Activar animaciones" : "Enable animations") : (language === "es" ? "Diseño simplificado" : "Simplified design")}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Menú de Hamburguesa para Mobile */}
                <button
                    className="lg:hidden text-brand-cyan z-[110] p-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(prev => !prev);
                    }}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Navegación Desplegable Mobile - Versión Compacta */}
            <div className={`lg:hidden fixed top-16 left-0 right-0 backdrop-blur-lg bg-background/95 border-t border-brand-cyan/10 transition-all duration-300 z-[90] ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
                <div className="w-full px-3 sm:px-5 md:px-8 py-3 space-y-0.5 max-h-[calc(85vh-1rem)] overflow-y-auto">
                    {/* Enlaces de navegación */}
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsMobileMenuOpen(false);
                                setTimeout(() => {
                                    const target = document.querySelector(link.href);
                                    if (target) {
                                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                }, 100);
                            }}
                            className="block text-sm sm:text-base font-semibold text-foreground hover:text-brand-cyan py-2 hover:bg-brand-cyan/5 rounded-lg transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    
                    <div className="border-t border-brand-cyan/10 pt-1.5 mt-1.5 space-y-0.5">
                        {/* Descargar CV */}
                        <button 
                            className="w-full flex items-center justify-between py-2 hover:bg-brand-cyan/5 rounded-lg transition-colors text-left" 
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open('/cv.pdf', '_blank');
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <span className="text-xs sm:text-sm font-medium text-muted">CV</span>
                            <span className="text-xs sm:text-sm font-semibold text-brand-cyan flex items-center gap-1 sm:gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                                <span className="truncate">{language === "es" ? "Descargar" : "Download"}</span>
                            </span>
                        </button>
                        
                        {/* Idioma */}
                        <button 
                            className="w-full flex items-center justify-between py-2 hover:bg-brand-cyan/5 rounded-lg transition-colors text-left"
                            onClick={(e) => {
                                e.stopPropagation();
                                setLanguage(language === "es" ? "en" : "es");
                            }}
                        >
                            <span className="text-xs sm:text-sm font-medium text-muted">{language === "es" ? "Idioma" : "Language"}</span>
                            <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1 sm:gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="2" y1="12" x2="22" y2="12"/>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                </svg>
                                <span className="truncate">{language === "es" ? "Español" : "English"}</span>
                            </span>
                        </button>
                        
                        {/* Tema */}
                        {mounted && (
                            <button 
                                className="w-full flex items-center justify-between py-2 hover:bg-brand-cyan/5 rounded-lg transition-colors text-left"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTheme(currentTheme === "dark" ? "light" : "dark");
                                }}
                            >
                                <span className="text-xs sm:text-sm font-medium text-muted">{language === "es" ? "Tema" : "Theme"}</span>
                                <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1 sm:gap-1.5">
                                    {currentTheme === "dark" ? <><Sun size={14} className="sm:w-4 sm:h-4" /> <span className="truncate">{t.theme.light}</span></> : <><Moon size={14} className="sm:w-4 sm:h-4" /> <span className="truncate">{t.theme.dark}</span></>}
                                </span>
                            </button>
                        )}
                        
                        {/* Modo Minimalista */}
                        {mounted && (
                            <button 
                                className="w-full flex items-center justify-between py-2 hover:bg-brand-cyan/5 rounded-lg transition-colors text-left"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMinimal();
                                }}
                            >
                                <span className="text-xs sm:text-sm font-medium text-muted">{language === "es" ? "Modo" : "Mode"}</span>
                                <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1 sm:gap-1.5">
                                    {isMinimal ? <><Maximize2 size={14} className="sm:w-4 sm:h-4" /> <span className="truncate">{language === "es" ? "Completo" : "Full"}</span></> : <><Minimize2 size={14} className="sm:w-4 sm:h-4" /> <span className="truncate">Minimal</span></>}
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
