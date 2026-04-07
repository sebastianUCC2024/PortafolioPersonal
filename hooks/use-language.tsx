"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { es } from "@/dictionaries/es";
import { en } from "@/dictionaries/en";

// Definimos reglas estrictas con TypeScript para evitar errores de tipeo
type Language = "es" | "en";
type Dictionary = typeof es;

interface LanguageContextType {
    language: Language;
    t: Dictionary; // La "t" es el estándar mundial en programación para "translations"
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Por regla asignaste Español por defecto
    const [language, setLanguage] = useState<Language>("es");

    // Al cargar la página, revisamos si el usuario ya nos había visitado en inglés
    useEffect(() => {
        const savedLang = localStorage.getItem("portfolio-lang") as Language;
        if (savedLang === "es" || savedLang === "en") {
            setLanguage(savedLang);
        }
    }, []);

    // Función para cambiar idioma y guardar decisión
    const changeLanguage = (newLang: Language) => {
        setLanguage(newLang);
        localStorage.setItem("portfolio-lang", newLang);
    };

    // Variable mágica que evalúa qué diccionario escupir 
    const t = language === "es" ? es : en;

    return (
        <LanguageContext.Provider value={{ language, t, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook que usaremos en cualquier parte de la app
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
    }
    return context;
}
