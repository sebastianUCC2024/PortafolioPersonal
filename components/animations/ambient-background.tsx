"use client";

import { motion } from "framer-motion";
import { memo } from "react";

export const AmbientBackground = memo(function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none ambient-background">
            {/* Orbe 1 - Verde oscuro */}
            <motion.div
                animate={{
                    x: ["0%", "20%", "-20%", "0%"],
                    y: ["0%", "10%", "-10%", "0%"],
                    scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#0a4d3c]/20 dark:bg-brand-cyan/20 blur-[120px] md:blur-[200px] will-change-transform"
            />

            {/* Orbe 2 - Verde oscuro */}
            <motion.div
                animate={{
                    x: ["0%", "-30%", "10%", "0%"],
                    y: ["0%", "20%", "-20%", "0%"],
                    scale: [1, 0.9, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0a4d3c]/15 dark:bg-[rgba(0,180,229,0.15)] blur-[120px] md:blur-[250px] will-change-transform"
            />

            {/* Orbe 3 - Verde oscuro (Centro) */}
            <motion.div
                animate={{
                    x: ["0%", "15%", "-15%", "0%"],
                    y: ["0%", "-15%", "15%", "0%"],
                    scale: [1, 1.5, 0.8, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5
                }}
                className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-[#0a4d3c]/10 dark:bg-brand-cyan/10 blur-[100px] md:blur-[180px]"
            />
        </div>
    );
}
