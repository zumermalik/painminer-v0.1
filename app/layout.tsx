import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PainMiner | Creator Product Validator",
  description: "Turn comments into high-converting digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <nav className="border-b border-[var(--border)] p-4 flex justify-between items-center max-w-5xl mx-auto w-full">
            <h1 className="text-xl font-bold tracking-tighter">PainMiner.</h1>
            <ThemeToggle />
          </nav>
          <main className="max-w-5xl mx-auto w-full p-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
