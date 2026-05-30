"use client";

import { useMinimalMode } from "@/hooks/use-minimal-mode";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

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
            <Contact />
        </main>
    );
}
