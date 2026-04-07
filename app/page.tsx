"use client";

// Importamos el hook de idioma que construimos antes
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-screen p-8 gap-8">

      {/* Botones temporales para probar nuestro cambio de idioma en vivo */}
      <div className="absolute top-4 right-4 flex gap-4">
        <Button
          variant={language === "es" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setLanguage("es")}
        >
          ES
        </Button>
        <Button
          variant={language === "en" ? "primary" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
        >
          EN
        </Button>
      </div>

      <div className="text-center space-y-6 flex flex-col items-center">
        <Badge>React + Tailwind v4</Badge>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {t.hero.greeting} <br className="md:hidden" />
          <span className="text-brand-cyan block mt-2">{t.hero.role}</span>
        </h1>

        <p className="text-muted text-lg max-w-lg mx-auto">
          {language === "es"
            ? "Construyendo interfaces memorables y experiencias digitales futuristas."
            : "Building memorable interfaces and futuristic digital experiences."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button variant="primary" size="lg">
            {language === "es" ? "Ver mis proyectos" : "View my projects"}
          </Button>
          <Button variant="outline" size="lg">
            {language === "es" ? "Contáctame" : "Contact me"}
          </Button>
        </div>
      </div>

    </main>
  );
}
