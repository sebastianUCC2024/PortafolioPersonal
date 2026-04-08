"use client";

import { Hero } from "@/components/sections/hero";

export default function Home() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            {/* Aquí irán apilándose todas las secciones de tu portafolio */}
            <Hero />
        </main>
    );
}
