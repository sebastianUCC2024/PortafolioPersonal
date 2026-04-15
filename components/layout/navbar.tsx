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
        { name: t.nav.synergy, href: "#synergy" },
        { name: t.nav.testimonials, href: "#testimonials" },
        { name: t.nav.contact, href: "#contact" },
    ];

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <header className="fixed top-0 w-full z-50 border-b border-brand-cyan/10 dark:border-brand-cyan/20 backdrop-blur-lg transition-colors duration-300 shadow-sm dark:shadow-brand-cyan/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo con icono personalizado (Versión Final Corregida) */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-18 h-18 relative transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className="w-full h-full object-contain brightness-0 dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-all" 
                        />
                    </div>
                    <span className="text-lg font-bold font-primary text-foreground tracking-tight group-hover:text-brand-cyan transition-colors duration-300">
                        Sebastián
                    </span>
                </a>
                

                {/* Navegación de Escritorio */}
                <nav className="hidden md:flex gap-8 items-center font-secondary">
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
                            className="text-sm font-medium text-muted hover:text-brand-cyan transition-colors cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Accesorios y Botones de Escritorio */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Botón cambiar Idioma */}
                    <div className="relative group">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase border border-brand-cyan/20 rounded-full px-3 py-1">
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

                    {/* Botón cambiar Tema */}
                    {mounted && (
                        <>
                            <div className="relative group">
                                <button 
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-300 border border-brand-cyan/20 hover:border-brand-cyan/40" 
                                    onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                    aria-label="Toggle Theme"
                                >
                                    {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-300 border border-brand-cyan/20 hover:border-brand-cyan/40" 
                                    onClick={toggleMinimal}
                                    aria-label="Toggle Minimal Mode"
                                >
                                    {isMinimal ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
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
                    className="md:hidden text-brand-cyan"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Navegación Desplegable Mobile */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-brand-cyan/10 bg-background absolute w-full left-0 flex flex-col p-6 gap-6 shadow-xl">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => {
                                e.preventDefault();
                                setIsMobileMenuOpen(false);
                                const target = document.querySelector(link.href);
                                if (target) {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            className="text-lg font-medium text-foreground hover:text-brand-cyan cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                    
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Tema Mobile */}
                        {mounted && (
                            <>
                                <div className="flex justify-between items-center py-4 border-t border-brand-cyan/10">
                                    <span className="text-muted">{language === "es" ? "Apariencia" : "Appearance"}</span>
                                    <button 
                                        className="flex items-center gap-2 font-medium text-foreground" 
                                        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                    >
                                        {currentTheme === "dark" ? <><Sun size={18} /> {t.theme.light}</> : <><Moon size={18} /> {t.theme.dark}</>}
                                    </button>
                                </div>
                                
                                {/* Modo Minimalista Mobile */}
                                <div className="flex justify-between items-center py-4 border-t border-brand-cyan/10">
                                    <div className="flex flex-col">
                                        <span className="text-muted">{language === "es" ? "Modo Minimalista" : "Minimal Mode"}</span>
                                        <span className="text-xs text-muted/70">{language === "es" ? "Diseño simplificado" : "Simplified design"}</span>
                                    </div>
                                    <button 
                                        className="flex items-center gap-2 font-medium text-foreground" 
                                        onClick={toggleMinimal}
                                    >
                                        {isMinimal ? <><Maximize2 size={18} /> {language === "es" ? "Completo" : "Full"}</> : <><Minimize2 size={18} /> {language === "es" ? "Minimal" : "Minimal"}</>}
                                    </button>
                                </div>
                            </>
                        )}
                        
                        {/* Idioma Mobile */}
                        <div className="flex justify-between items-center py-4 border-t border-brand-cyan/10">
                            <span className="text-muted">{language === "es" ? "Idioma" : "Language"}</span>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => { setLanguage("es"); setIsMobileMenuOpen(false); }} 
                                    className={`font-bold ${language === "es" ? "text-brand-cyan" : "text-muted"}`}
                                >
                                    <span className={language === "es" ? "border-b border-brand-cyan" : ""}>Español</span>
                                </button>
                                <button 
                                    onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }} 
                                    className={`font-bold ${language === "en" ? "text-brand-cyan" : "text-muted"}`}
                                >
                                    <span className={language === "en" ? "border-b border-brand-cyan" : ""}>English</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
