"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CookieConsentToggle } from "@/components/CookieConsentToggle";
import {
  COOKIE_PREFERENCES_ALL,
  COOKIE_PREFERENCES_ESSENTIAL,
  hasCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences
} from "@/lib/analytics/cookie-preferences";

type Props = {
  onPreferencesSaved: () => void;
};

type ViewMode = "banner" | "settings";

export function CookieConsentBanner({ onPreferencesSaved }: Props) {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<ViewMode>("banner");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [functionalEnabled, setFunctionalEnabled] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(!hasCookiePreferences());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!visible) {
    return null;
  }

  function persist(preferences: CookiePreferences) {
    saveCookiePreferences(preferences);
    setVisible(false);
    onPreferencesSaved();
  }

  const policyText = (
    <>
      Наш сайт использует cookie-файлы для аналитики и персонализации. Продолжая использовать сайт
      после ознакомления с этим сообщением и предоставления своего выбора, вы соглашаетесь с нашей{" "}
      <Link href="/politika-konfidencialnosti">политикой обработки персональных данных</Link>.
    </>
  );

  return (
    <div className="cookie-consent-wrap" aria-live="polite">
      <section
        className="cookie-consent"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-modal="false"
      >
        <h2 id="cookie-consent-title" className="cookie-consent__title">
          Мы используем cookie-файлы
        </h2>

        {mode === "banner" ? (
          <>
            <p className="cookie-consent__text">{policyText}</p>
            <div className="cookie-consent__actions">
              <button
                type="button"
                className="button yellow cookie-consent__btn"
                onClick={() => persist(COOKIE_PREFERENCES_ALL)}
              >
                Разрешить все
              </button>
              <button
                type="button"
                className="button secondary cookie-consent__btn"
                onClick={() => persist(COOKIE_PREFERENCES_ESSENTIAL)}
              >
                Разрешить обязательные
              </button>
              <button
                type="button"
                className="button secondary cookie-consent__btn"
                onClick={() => {
                  setAnalyticsEnabled(false);
                  setFunctionalEnabled(false);
                  setMode("settings");
                }}
              >
                Настроить
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="cookie-consent__text">{policyText}</p>
            <ul className="cookie-consent__settings">
              <li className="cookie-consent__setting">
                <div className="cookie-consent__setting-copy">
                  <h3 className="cookie-consent__setting-title">Технические cookie (обязательные)</h3>
                  <p className="cookie-consent__setting-text">
                    Нужны для корректной работы сайта и его основных функций. Не используются для
                    маркетинга и отслеживания.
                  </p>
                </div>
                <CookieConsentToggle
                  checked
                  disabled
                  label="Технические cookie включены"
                  onChange={() => {}}
                />
              </li>
              <li className="cookie-consent__setting">
                <div className="cookie-consent__setting-copy">
                  <h3 className="cookie-consent__setting-title">Аналитические cookie</h3>
                  <p className="cookie-consent__setting-text">
                    Помогают понять, как посетители используют сайт: какие страницы открывают, сколько
                    времени проводят на сайте. Данные собираются в обезличенном виде для улучшения
                    работы сайта.
                  </p>
                </div>
                <CookieConsentToggle
                  checked={analyticsEnabled}
                  label="Аналитические cookie"
                  onChange={setAnalyticsEnabled}
                />
              </li>
              <li className="cookie-consent__setting">
                <div className="cookie-consent__setting-copy">
                  <h3 className="cookie-consent__setting-title">Функциональные cookie</h3>
                  <p className="cookie-consent__setting-text">
                    Запоминают ваш выбор и настройки, чтобы сделать работу с сайтом удобнее.
                  </p>
                </div>
                <CookieConsentToggle
                  checked={functionalEnabled}
                  label="Функциональные cookie"
                  onChange={setFunctionalEnabled}
                />
              </li>
            </ul>
            <div className="cookie-consent__actions">
              <button
                type="button"
                className="button yellow cookie-consent__btn"
                onClick={() =>
                  persist({
                    necessary: true,
                    analytics: analyticsEnabled,
                    marketing: analyticsEnabled,
                    preferences: functionalEnabled
                  })
                }
              >
                Разрешить выбранные
              </button>
              <button
                type="button"
                className="button secondary cookie-consent__btn"
                onClick={() => persist(COOKIE_PREFERENCES_ESSENTIAL)}
              >
                Разрешить обязательные
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
