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

    return (
        <div
            ref={ref}
            data-scroll-reveal={animation}
            className={`transition-all ease-out ${isVisible ? 'visible' : ''} ${className}`}
            style={{
                transitionDuration: `${duration}s`,
                transitionDelay: isVisible ? `${delay}s` : '0s',
            }}
        >
            {children}
        </div>
    );
}
