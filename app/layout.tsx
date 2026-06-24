import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import "./globals.css";
import "./store-redesign.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "ГазСнаб | Производство газового оборудования",
  description: "Интернет-магазин производственной компании ГазСнаб",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={inter.className}>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
