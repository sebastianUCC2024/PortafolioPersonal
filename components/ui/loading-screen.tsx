"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simular progreso de carga
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
                >
                    {/* Fondo animado sutil */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[100px]"
                        />
                    </div>

                    {/* Contenido central */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Logo animado */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan w-20 h-20"
                            />
                            <div className="w-20 h-20 flex items-center justify-center">
                                <img 
                                    src="/logo.png" 
                                    alt="Logo" 
                                    className="w-12 h-12 object-contain brightness-0 dark:invert dark:brightness-100"
                                />
                            </div>
                        </motion.div>

                        {/* Texto */}
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <h2 className="text-2xl font-bold font-primary text-foreground mb-2">
                                Sebastián
                            </h2>
                            <p className="text-sm text-muted">Cargando portafolio...</p>
                        </motion.div>

                        {/* Barra de progreso */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 200, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="relative w-[200px] h-1 bg-muted/20 rounded-full overflow-hidden"
                        >
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3 }}
                                className="absolute left-0 top-0 h-full bg-brand-cyan rounded-full shadow-[0_0_10px_var(--brand-cyan)]"
                            />
                        </motion.div>

                        {/* Porcentaje */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs font-mono text-brand-cyan"
                        >
                            {Math.round(progress)}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
