import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

export function Badge({ children, className = "", ...props }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-3 py-1 text-xs md:text-sm font-medium text-brand-cyan backdrop-blur-md ${className}`}
            {...props}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mr-2 animate-pulse" /> {/* Puntito estilo "live" */}
            {children}
        </span>
    );
}
