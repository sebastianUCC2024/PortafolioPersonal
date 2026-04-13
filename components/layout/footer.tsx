"use client";

import { useLanguage } from "@/hooks/use-language";

export function Footer() {
    const { t } = useLanguage();

    const navLinks = [
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.experience, href: "#experience" },
        { name: t.nav.about, href: "#about" },
        { name: t.nav.contact, href: "#contact" },
    ];

    return (
        <footer className="border-t border-brand-cyan/10 dark:border-brand-cyan/20 backdrop-blur-md mt-12">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top Section: Logo + Nav */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    
                    {/* Logo + Nombre (igual que el navbar) */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-14 h-14 relative transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                            <img 
                                src="/logo.png" 
                                alt="Logo" 
                                className="w-full h-full object-contain brightness-0 dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-all" 
                            />
                        </div>
                        <span className="text-xl font-bold font-primary text-foreground tracking-tight group-hover:text-brand-cyan transition-colors duration-300">
                            Sebastián
                        </span>
                    </a>

                    {/* Navegación rápida */}
                    <nav className="flex flex-wrap justify-center gap-6">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="text-sm font-medium text-muted hover:text-brand-cyan transition-colors duration-300"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/20 dark:via-brand-cyan/30 to-transparent mb-8" />

                {/* Bottom: Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
                    <span>
                        &copy; {new Date().getFullYear()} {t.footer.copyright} <span className="font-semibold text-foreground">Sebastián.</span>
                    </span>
                    <span>{t.footer.rights}</span>
                </div>

            </div>
        </footer>
    );
}
