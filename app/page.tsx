"use client";

import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
    return (
        <main className="flex-grow flex flex-col min-h-screen">
            <Hero />
            <Projects />
            <Experience />
            <About />
            <Testimonials />
            <Contact />
        </main>
    );
}
