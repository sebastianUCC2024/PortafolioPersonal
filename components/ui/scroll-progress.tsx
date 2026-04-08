"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    
    // Suavizamos el progreso para que no se vea rígido
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-brand-cyan origin-left z-[100] shadow-[0_0_10px_rgba(0,229,153,0.8)]"
            style={{ scaleX }}
        />
    );
}
