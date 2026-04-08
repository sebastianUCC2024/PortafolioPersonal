"use client";

import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";

export default function Home() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            <Hero />
            <Projects />
            <Experience />
        </main>
    );
}
