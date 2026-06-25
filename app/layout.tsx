import type { Metadata } from "next";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import "./globals.css";
import "./store-redesign.css";

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
    <html lang="ru">
      <body>
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
