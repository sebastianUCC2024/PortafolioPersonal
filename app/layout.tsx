import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { MinimalModeProvider } from "@/hooks/use-minimal-mode";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DecorativeElements } from "@/components/layout/minimal-wrapper";
import { LoadingScreen } from "@/components/ui/loading-screen";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
        className={[spaceGrotesk.variable, plusJakarta.variable, "antialiased", "min-h-screen", "flex", "flex-col", "relative"].join(" ")}
      >
        <LoadingScreen />
        <LanguageProvider>
          <MinimalModeProvider>
            <DecorativeElements />
            <ThemeProvider>
              <SmoothScrollProvider>
                <Navbar />
                {children}
                <Footer />
              </SmoothScrollProvider>
            </ThemeProvider>
          </MinimalModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
