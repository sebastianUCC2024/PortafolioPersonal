"use client";

import { useMinimalMode } from "@/hooks/use-minimal-mode";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

// Lazy load de la sección más pesada
const SynergySection = dynamic(() => import("@/components/sections/synergy").then(mod => ({ default: mod.SynergySection })), {
    ssr: false,
    loading: () => (
        <section className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="animate-pulse">
                    <div className="h-12 bg-card-bg/50 rounded-lg w-64 mx-auto mb-4"></div>
                    <div className="h-96 bg-card-bg/50 rounded-3xl"></div>
                </div>
            </div>
        </section>
    )
});

export default function Home() {
    const { isMinimal } = useMinimalMode();

    return (
        <main className={`flex-grow flex flex-col min-h-screen pt-16 transition-all duration-500 ${isMinimal ? 'minimal-mode' : ''}`}>
            <Hero />
            <Projects />
            <Experience />
            <About />
            <TechStack />
            <Testimonials />
            <SynergySection />
            <Contact />
        </main>
    );
}
