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
  title: "Juan Patiño | Frontend Developer",
  description: "Portafolio profesional de Juan Patiño. Desarrollador Frontend y Diseñador UI/UX.",
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
          md:cursor-none
        `}
      >
        <AmbientBackground />
        <NoiseFilter />
        <CustomCursor />
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
