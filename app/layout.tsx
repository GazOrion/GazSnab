import type { Metadata } from "next";
import Script from "next/script";
import { ScrollRestoration } from "@/components/ScrollRestoration";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { YANDEX_METRIKA_BOOTSTRAP } from "@/lib/analytics/yandex-metrika";
import "./globals.css";
import "./store-redesign.css";
import "./mobile-store.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

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
      <head>
        <Script id="yandex-metrika-bootstrap" strategy="beforeInteractive">
          {YANDEX_METRIKA_BOOTSTRAP}
        </Script>
      </head>
      <body>
        <SiteAnalytics />
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
