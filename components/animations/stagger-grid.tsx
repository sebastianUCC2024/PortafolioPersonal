"use client";

import { motion } from "framer-motion";
import { ReactNode, Children } from "react";

export function StaggerGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
    
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const } 
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {Children.map(children, (child, i) => (
                <motion.div key={i} variants={item}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}
