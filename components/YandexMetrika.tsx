"use client";

import Script from "next/script";
import {
  YANDEX_METRIKA_ID,
  YANDEX_METRIKA_INIT_SCRIPT
} from "@/lib/analytics/yandex-metrika";

export function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {YANDEX_METRIKA_INIT_SCRIPT}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
