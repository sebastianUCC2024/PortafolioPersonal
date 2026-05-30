"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { theme, setTheme, systemTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/Bogota",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            setCurrentTime(formatter.format(now));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    const navLinks = [
        { name: t.nav.about, href: "#about" },
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.contact, href: "#contact" },
        { name: t.nav.experience, href: "#experience" },
        { name: t.nav.techStack, href: "#tech-stack" },
        { name: t.nav.testimonials, href: "#testimonials" },
    ];

    const currentTheme = theme === "system" ? systemTheme : theme;

    const handleNavClick = useCallback((href: string) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 400);
    }, []);

    /* ─── animation variants ─── */
    const overlayVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const panelVariants: Variants = {
        hidden: { x: "100%" },
        visible: {
            x: "0%",
            transition: { type: "tween", duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        exit: {
            x: "100%",
            transition: { type: "tween", duration: 0.4, ease: [0.55, 0.06, 0.68, 0.19] },
        },
    };

    const stagger: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
    };

    const linkItem: Variants = {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45 } },
    };

    /* ─── portal menu ─── */
    const menuPanel = mounted
        ? createPortal(
              <AnimatePresence>
                  {isMenuOpen && (
                      <div className="fixed inset-0" style={{ zIndex: 9999 }}>
                          {/* backdrop */}
                          <motion.div
                              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                              variants={overlayVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              transition={{ duration: 0.3 }}
                              onClick={() => setIsMenuOpen(false)}
                          />

                          {/* panel */}
                          <motion.aside
                              className="absolute right-0 top-0 h-full w-full max-w-[480px] overflow-y-auto border-l border-white/10 bg-menu-bg shadow-[-24px_0_80px_rgba(0,0,0,0.1)] dark:shadow-[-24px_0_80px_rgba(0,0,0,0.6)]"
                              variants={panelVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                          >
                              <div className="flex h-full flex-col px-8 py-7 sm:px-12 sm:py-9">
                                  {/* ── top bar: Menu label + Close ── */}
                                  <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/50">
                                          Menu
                                      </span>
                                      <div className="flex items-center gap-3">
                                          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/50 hidden sm:inline">
                                              Close
                                          </span>
                                          <button
                                              type="button"
                                              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:rotate-90"
                                              onClick={() => setIsMenuOpen(false)}
                                              aria-label="Cerrar menú"
                                          >
                                              <X size={15} />
                                          </button>
                                      </div>
                                  </div>

                                  {/* thin separator */}
                                  <div className="mt-5 h-px w-full bg-white/10" />

                                  {/* ── nav links ── */}
                                  <motion.nav
                                      className="mt-10 flex flex-col flex-1"
                                      variants={stagger}
                                      initial="hidden"
                                      animate="visible"
                                  >
                                      {navLinks.map((link) => (
                                          <motion.div key={link.name} variants={linkItem}>
                                              <button
                                                  onClick={() => handleNavClick(link.href)}
                                                  className="group relative flex items-center w-full text-left py-[14px] border-b border-white/10 transition-all duration-300"
                                              >
                                                  {/* number / bullet */}
                                                  <span className="w-5 text-[11px] text-white/40 font-mono opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white">
                                                      →
                                                  </span>
                                                  <span className="text-[1.6rem] sm:text-[1.85rem] font-semibold text-white tracking-tight transition-all duration-300 group-hover:text-white/60 group-hover:translate-x-1 inline-block leading-tight">
                                                      {link.name}
                                                  </span>
                                              </button>
                                          </motion.div>
                                      ))}
                                  </motion.nav>

                                  {/* ── bottom section ── */}
                                  <motion.div variants={fadeUp} initial="hidden" animate="visible">
                                      {/* separator */}
                                      <div className="h-px w-full bg-white/10 mb-5" />

                                      {/* contact + social — two columns */}
                                      <div className="grid grid-cols-2 gap-x-6 gap-y-0">
                                          {/* contact col */}
                                          <div>
                                              <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-white/50 block mb-2.5">
                                                  Contact
                                              </span>
                                              <a href="mailto:juan17patino@gmail.com" className="block text-[13px] text-white/70 hover:text-white transition-colors duration-300 leading-relaxed">
                                                  juan17patino@gmail.com
                                              </a>
                                              <a href="tel:+573233561695" className="block text-[13px] text-white/70 hover:text-white transition-colors duration-300 leading-relaxed mt-1">
                                                  +57 323 356 1695
                                              </a>
                                          </div>

                                          {/* social col */}
                                          <div className="text-right">
                                              <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-white/50 block mb-2.5">
                                                  Social
                                              </span>
                                              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-[13px] text-white/70 hover:text-white transition-colors duration-300 leading-relaxed">GitHub</a>
                                              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block text-[13px] text-white/70 hover:text-white transition-colors duration-300 leading-relaxed mt-1">LinkedIn</a>
                                          </div>
                                      </div>

                                      {/* toggles row + CV */}
                                      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                                          {/* Descargar CV */}
                                          <a
                                              href="/cv.pdf"
                                              download
                                              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0a0a0b] transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
                                          >
                                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                              Descargar CV
                                          </a>

                                          <div className="flex w-full sm:w-auto gap-2">
                                              <button
                                                  type="button"
                                                  className="flex-1 sm:flex-none inline-flex h-9 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] font-bold uppercase text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
                                                  onClick={() => setLanguage(language === "es" ? "en" : "es")}
                                              >
                                                  {language === "es" ? "EN" : "ES"}
                                              </button>

                                              {mounted && (
                                                  <button
                                                      type="button"
                                                      className="flex-1 sm:flex-none inline-flex h-9 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/10"
                                                      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                                                  >
                                                      {currentTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                                                  </button>
                                              )}
                                          </div>
                                      </div>
                                  </motion.div>
                              </div>
                          </motion.aside>
                      </div>
                  )}
              </AnimatePresence>,
              document.body
          )
        : null;

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed inset-x-0 top-0 z-[100] w-full transition-colors duration-500 ${
                    scrolled
                        ? "pointer-events-auto bg-background/80 backdrop-blur-2xl border-b border-foreground/[0.03] shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
                        : "pointer-events-none bg-transparent"
                }`}
            >
                <div
                    className={`mx-auto max-w-7xl flex items-center justify-between transition-all duration-500 ${
                        scrolled ? "px-6 sm:px-8 py-4" : "px-6 sm:px-8 py-6 md:py-10"
                    }`}
                >
                    {/* Logo + Name */}
                    <a
                        href="#"
                        className="pointer-events-auto group flex items-center gap-3.5"
                    >
                        <div className="w-9 h-9 relative flex items-center justify-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12">
                            {/* Glowing aura */}
                            <div className="absolute inset-0 bg-brand-cyan/20 rounded-full blur-md scale-0 group-hover:scale-[1.8] transition-transform duration-700 ease-out"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="relative z-10 w-full h-full object-contain brightness-0 dark:invert dark:brightness-100 opacity-90 transition-opacity group-hover:opacity-100"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 mt-[2px]">
                            <span className="text-[17px] font-extrabold font-primary tracking-tighter text-foreground uppercase transition-colors group-hover:text-brand-cyan">
                                Sebastián
                            </span>
                            {/* Pulsing Dot (Available status) */}
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-cyan"></span>
                            </span>
                        </div>
                    </a>

                    {/* Center Widget (Time) - Desktop Only */}
                    <div className="hidden lg:flex items-center gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto opacity-80 hover:opacity-100 transition-opacity">
                        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                            Bogotá, CO
                        </span>
                        <span className="h-3 w-[1px] bg-foreground/20"></span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground min-w-[70px] text-center">
                            {mounted ? currentTime : "--:--"}
                        </span>
                    </div>

                    {/* Menu Button */}
                    <button
                        type="button"
                        className="pointer-events-auto group flex items-center gap-4 text-foreground"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="hidden sm:block text-[12px] font-bold uppercase tracking-[0.4em] opacity-80 transition-opacity group-hover:opacity-100 mt-[2px]">
                            Menu
                        </span>
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 transition-all duration-500 ease-out group-hover:border-foreground group-hover:scale-105 overflow-hidden group-hover:text-background">
                            {/* Swipe fill effect */}
                            <div className="absolute inset-0 bg-foreground translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                            <Menu size={18} className="relative z-10 transition-all duration-500 group-hover:rotate-180" />
                        </div>
                    </button>
                </div>
            </motion.header>

            {menuPanel}
        </>
    );
}
