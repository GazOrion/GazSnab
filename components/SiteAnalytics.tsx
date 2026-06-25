"use client";

import { useCallback, useEffect, useState } from "react";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { YandexMetrika } from "@/components/YandexMetrika";
import { COOKIE_PREFERENCES_UPDATED_EVENT } from "@/lib/analytics/cookie-preferences";
import { hasAnalyticsConsent } from "@/lib/analytics/yandex-metrika";

export function SiteAnalytics() {
  const [metrikaEnabled, setMetrikaEnabled] = useState(false);

  const syncMetrika = useCallback(() => {
    setMetrikaEnabled(hasAnalyticsConsent());
  }, []);

  useEffect(() => {
    syncMetrika();

    const handleUpdate = () => syncMetrika();
    window.addEventListener(COOKIE_PREFERENCES_UPDATED_EVENT, handleUpdate);

    return () => window.removeEventListener(COOKIE_PREFERENCES_UPDATED_EVENT, handleUpdate);
  }, [syncMetrika]);

  return (
    <>
      {metrikaEnabled ? <YandexMetrika /> : null}
      <CookieConsentBanner onPreferencesSaved={syncMetrika} />
    </>
  );
}
