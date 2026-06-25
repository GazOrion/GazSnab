"use client";

import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { YandexMetrika } from "@/components/YandexMetrika";

export function SiteAnalytics() {
  return (
    <>
      <YandexMetrika />
      <CookieConsentBanner />
    </>
  );
}
