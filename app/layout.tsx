import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { NoiseFilter } from "@/components/ui/noise-filter";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AmbientBackground } from "@/components/animations/ambient-background";
import { Starfield } from "@/components/animations/starfield";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Sebastián Patiño | Software Developer",
  description: "Portafolio profesional de Juan Sebastián Patiño. Desarrollador de Software y Soluciones Web Inteligentes.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`
          ${outfit.variable} 
          ${inter.variable} 
          antialiased 
          min-h-screen
          flex flex-col
          relative
          flex flex-col
          relative
        `}
      >
        <AmbientBackground />
        <Starfield />
        <NoiseFilter />
        <ScrollProgress />
        <LanguageProvider>
          <ThemeProvider>
            <SmoothScrollProvider>
              <Navbar />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
