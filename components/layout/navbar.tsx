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
                <div className="hidden md:flex items-center gap-4">
                    {/* Botón cambiar Idioma */}
                    <button
                        onClick={() => setLanguage(language === "es" ? "en" : "es")}
                        className="text-sm font-bold text-muted hover:text-brand-cyan uppercase"
                    >
                        {language === "es" ? "EN" : "ES"}
                    </button>

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
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMobileMenuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
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
                    <div className="flex justify-between items-center pt-4 border-t border-brand-cyan/10">
                        <span className="text-muted">{language === "es" ? "Idioma" : "Language"}</span>
                        <button onClick={() => setLanguage(language === "es" ? "en" : "es")} className="font-bold text-brand-cyan">
                            {language === "es" ? "English" : "Español"}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
