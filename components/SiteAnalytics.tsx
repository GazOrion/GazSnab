"use client";

import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { FormDataLayerListener } from "@/components/analytics/FormDataLayerListener";
import { YandexMetrika } from "@/components/YandexMetrika";

export function SiteAnalytics() {
  return (
    <>
      <YandexMetrika />
      <FormDataLayerListener />
      <CookieConsentBanner />
    </>
  );
}
