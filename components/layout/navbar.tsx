"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

import { Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme, systemTheme } = useTheme();

    // Solución contra el warning de "Hydration" visual al cargar SVGs condicionales
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.experience, href: "#experience" },
        { name: t.nav.about, href: "#about" },
        { name: t.nav.contact, href: "#contact" },
    ];

    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <header className="fixed top-0 w-full z-50 border-b border-brand-cyan/10 bg-background/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo minimalista textual */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-cyan flex items-center justify-center bg-brand-cyan/10 group-hover:bg-brand-cyan transition-colors">
                        <span className="font-primary font-bold text-lg text-brand-cyan group-hover:text-background">JP</span>
                    </div>
                </a>

                {/* Navegación de Escritorio */}
                <nav className="hidden md:flex gap-8 items-center font-secondary">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-muted hover:text-brand-cyan transition-colors">
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Accesorios y Botones de Escritorio */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Botón cambiar Idioma */}
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

                    {/* Botón cambiar Tema */}
                    {mounted && (
                        <button 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-card-bg hover:text-brand-cyan transition-colors border border-transparent hover:border-brand-cyan/20" 
                            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                            aria-label="Toggle Theme"
                        >
                            {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
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
                        <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-foreground hover:text-brand-cyan">
                            {link.name}
                        </a>
                    ))}
                    
                    <div className="flex flex-col gap-4 mt-2">
                        {/* Tema Mobile */}
                        {mounted && (
                            <div className="flex justify-between items-center py-4 border-t border-brand-cyan/10">
                                <span className="text-muted">{language === "es" ? "Apariencia" : "Appearance"}</span>
                                <button 
                                    className="flex items-center gap-2 font-medium text-foreground" 
                                    onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                >
                                    {currentTheme === "dark" ? <><Sun size={18} /> {t.theme.light}</> : <><Moon size={18} /> {t.theme.dark}</>}
                                </button>
                            </div>
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
