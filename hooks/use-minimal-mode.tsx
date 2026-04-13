"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MinimalModeContextType {
    isMinimal: boolean;
    toggleMinimal: () => void;
}

const MinimalModeContext = createContext<MinimalModeContextType | undefined>(undefined);

export function MinimalModeProvider({ children }: { children: ReactNode }) {
    const [isMinimal, setIsMinimal] = useState(false);

    const toggleMinimal = () => {
        setIsMinimal(prev => !prev);
    };

    return (
        <MinimalModeContext.Provider value={{ isMinimal, toggleMinimal }}>
            {children}
        </MinimalModeContext.Provider>
    );
}

export function useMinimalMode() {
    const context = useContext(MinimalModeContext);
    if (context === undefined) {
        throw new Error("useMinimalMode must be used within a MinimalModeProvider");
    }
    return context;
}
