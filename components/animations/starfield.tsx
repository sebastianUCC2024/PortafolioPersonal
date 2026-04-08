"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;

    constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
    }

    update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        
        let mouseX = -1000;
        let mouseY = -1000;

        const init = () => {
            canvas.width = window.innerWidth;
            // Solo dibujamos en la altura del Hero aprox (ajustable) o pantalla completa
            canvas.height = window.innerHeight;
            
            // Cantidad de estrellas según ancho
            const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Colores basados en el tema
            const isDark = document.documentElement.classList.contains('dark');
            const starColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.3)';
            const lineColorRGB = isDark ? '0, 229, 153' : '13, 148, 136'; // brand-cyan colors

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(canvas.width, canvas.height);
                particles[i].draw(ctx, starColor);

                // Check distance with mouse (Interactividad Constelación)
                const dxMouse = mouseX - particles[i].x;
                const dyMouse = mouseY - particles[i].y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                
                if (distanceMouse < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${lineColorRGB}, ${1 - distanceMouse / 150})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }

                // Check distance with other particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${lineColorRGB}, ${0.2 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]); // Re-render animation colors if theme changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[-15] opacity-60"
        />
    );
}
