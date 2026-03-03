import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/contexts/theme";
import { Navbar } from "@/components/layout/Navbar";

const syne   = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400","500","600","700","800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300","400","500","600"] });

export const metadata: Metadata = {
  title: { template: "%s | Laboratório Ativo", default: "Laboratório Ativo — Projetos de Extensão" },
  description: "Plataforma que conecta pessoas em projetos de extensão universitária com impacto social real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-body antialiased transition-colors duration-200">
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <Navbar />
              <main>{children}</main>
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
