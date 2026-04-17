import type { Metadata } from "next";
import { Orbitron, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/contexts/theme";
import { Navbar } from "@/components/layout/Navbar";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-syne", weight: ["600", "700", "800"] });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: { template: "Lexa | %s", default: "Lexa" },
  description: "Plataforma que conecta pessoas em projetos de extensão universitária com impacto social real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${orbitron.variable} ${openSans.variable}`} suppressHydrationWarning>
      <body className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-body antialiased transition-colors duration-200">
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
              <Toaster
                richColors
                position="top-right"
                offset="80px"
                expand={true}
                closeButton
                toastOptions={{ 
                  duration: 5000,
                  classNames: {
                    toast: "font-body rounded-2xl shadow-card-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4",
                    title: "font-display font-bold text-sm text-neutral-900 dark:text-neutral-100",
                    description: "text-xs text-neutral-500 dark:text-neutral-400 mt-1",
                    actionButton: "bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold rounded-xl px-4 py-2 transition-all mt-3",
                    cancelButton: "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xl px-4 py-2 transition-all mt-3",
                    closeButton: "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400 border-none transition-all",
                  }
                }}
              />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
