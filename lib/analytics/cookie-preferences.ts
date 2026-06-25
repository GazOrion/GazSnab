export const COOKIE_PREFERENCES_KEY = "orion-cookie-preferences";
export const COOKIE_PREFERENCES_LEGACY_KEY = "orion-cookie-consent";
export const COOKIE_PREFERENCES_UPDATED_EVENT = "orion:cookie-preferences-updated";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export const COOKIE_PREFERENCES_ALL: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true
};

export const COOKIE_PREFERENCES_ESSENTIAL: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false
};

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        preferences: Boolean(parsed.preferences)
      };
    }

    if (window.localStorage.getItem(COOKIE_PREFERENCES_LEGACY_KEY) === "accepted") {
      return COOKIE_PREFERENCES_ALL;
    }
  } catch {
    return null;
  }

  return null;
}

export function hasCookiePreferences(): boolean {
  return readCookiePreferences() !== null;
}

export function hasAnalyticsConsent(): boolean {
  const preferences = readCookiePreferences();
  if (!preferences) {
    return false;
  }

  return preferences.analytics || preferences.marketing;
}

export function saveCookiePreferences(preferences: CookiePreferences): void {
  const payload = JSON.stringify(preferences);
  window.localStorage.setItem(COOKIE_PREFERENCES_KEY, payload);
  window.localStorage.removeItem(COOKIE_PREFERENCES_LEGACY_KEY);
  document.cookie = `orion_cookie_preferences=${encodeURIComponent(payload)}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new CustomEvent(COOKIE_PREFERENCES_UPDATED_EVENT));
}
