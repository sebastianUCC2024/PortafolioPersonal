"use client";

import { useMinimalMode } from "@/hooks/use-minimal-mode";
import dynamic from "next/dynamic";

// Lazy load de componentes decorativos pesados
const AmbientBackground = dynamic(() => import("@/components/animations/ambient-background").then(mod => ({ default: mod.AmbientBackground })), {
    ssr: false,
    loading: () => null
});

const Starfield = dynamic(() => import("@/components/animations/starfield").then(mod => ({ default: mod.Starfield })), {
    ssr: false,
    loading: () => null
});

const NoiseFilter = dynamic(() => import("@/components/ui/noise-filter").then(mod => ({ default: mod.NoiseFilter })), {
    ssr: false,
    loading: () => null
});

const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress").then(mod => ({ default: mod.ScrollProgress })), {
    ssr: false,
    loading: () => null
});

export function DecorativeElements() {
    const { isMinimal } = useMinimalMode();

    if (isMinimal) return null;

    return (
        <>
            <AmbientBackground />
            <Starfield />
            <NoiseFilter />
            <ScrollProgress />
        </>
    );
}
