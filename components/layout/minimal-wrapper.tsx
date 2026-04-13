"use client";

import { useMinimalMode } from "@/hooks/use-minimal-mode";
import { AmbientBackground } from "@/components/animations/ambient-background";
import { Starfield } from "@/components/animations/starfield";
import { NoiseFilter } from "@/components/ui/noise-filter";
import { ScrollProgress } from "@/components/ui/scroll-progress";

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
