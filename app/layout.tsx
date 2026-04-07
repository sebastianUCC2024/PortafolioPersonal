import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { Navbar } from "@/components/layout/navbar"; // <-- Nuevo import
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
        `}
      >
        <LanguageProvider>
          <ThemeProvider>
            <Navbar /> {/* <-- Inyectamos la cabecera permanentemente */}
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
