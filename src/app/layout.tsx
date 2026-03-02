import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SettingsProvider } from "@/components/SettingsProvider";
import { VisualEditsMessenger } from "orchids-visual-edits";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auto Escola Pardim Rezende",
  description: "Sistema de Gestão Administrativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-mint/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
            <SettingsProvider>
              {children}
              <Toaster position="bottom-right" richColors closeButton />
            </SettingsProvider>
        </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
