import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/shared/context/LocaleContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luedan - Senior Full Stack Engineer",
  description: "Senior Full Stack Engineer | Technical Lead | Cloud Architecture & SaaS Platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
