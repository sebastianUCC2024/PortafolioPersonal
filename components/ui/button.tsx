import * as React from "react";

// Definimos las propiedades que aceptará el botón, extendiendo las de un botón normal de HTML
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {

        // Estilos base que todos los botones comparten
        const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 disabled:opacity-50 disabled:pointer-events-none";

        // Diccionario de variantes visuales (Aquí inyectamos la estética futurista)
        const variants = {
            primary: "bg-brand-cyan text-[#0a0c10] hover:-translate-y-1 hover:bg-brand-cyan-hover shadow-[0_0_15px_rgba(0,229,153,0.3)] hover:shadow-[0_0_25px_rgba(0,229,153,0.6)]",
            outline: "border border-brand-cyan/50 text-brand-cyan hover:border-brand-cyan hover:bg-brand-cyan/10 hover:-translate-y-1",
            ghost: "text-foreground hover:bg-card-bg hover:text-brand-cyan",
        };

        // Tamaños estandarizados
        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg font-bold",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
