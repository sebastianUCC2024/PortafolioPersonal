"use client";

import { useLanguage } from "@/hooks/use-language";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-brand-cyan/10 bg-background py-10 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Logo y Nombre */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-cyan flex items-center justify-center bg-brand-cyan/10">
                        <span className="font-primary font-bold text-lg text-brand-cyan">JP</span>
                    </div>
                    <span className="font-primary font-bold text-xl text-foreground">
                        Juan Patiño
                    </span>
                </div>

                {/* Derechos y Copyright */}
                <div className="text-center md:text-right flex flex-col sm:flex-row sm:gap-2 text-muted text-sm font-secondary">
                    <span>
                        &copy; {new Date().getFullYear()} {t.footer.copyright} <span className="text-brand-cyan">Juan.</span>
                    </span>
                    <span>{t.footer.rights}</span>
                </div>

            </div>
        </footer>
    );
}
