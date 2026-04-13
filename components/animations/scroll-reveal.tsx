"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom";
    delay?: number;
    duration?: number;
}

export function ScrollReveal({
    children,
    className = "",
    animation = "fade",
    delay = 0,
    duration = 0.6,
}: ScrollRevealProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

    const animations = {
        fade: {
            initial: "opacity-0",
            animate: "opacity-100",
        },
        "slide-up": {
            initial: "opacity-0 translate-y-12",
            animate: "opacity-100 translate-y-0",
        },
        "slide-left": {
            initial: "opacity-0 translate-x-12",
            animate: "opacity-100 translate-x-0",
        },
        "slide-right": {
            initial: "opacity-0 -translate-x-12",
            animate: "opacity-100 translate-x-0",
        },
        zoom: {
            initial: "opacity-0 scale-95",
            animate: "opacity-100 scale-100",
        },
    };

    const selectedAnimation = animations[animation];

    return (
        <div
            ref={ref}
            className={`transition-all ${className} ${
                isVisible ? selectedAnimation.animate : selectedAnimation.initial
            }`}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
