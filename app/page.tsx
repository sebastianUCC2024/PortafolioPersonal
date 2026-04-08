"use client";

import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            <Hero />
            <Projects />
        </main>
    );
}
