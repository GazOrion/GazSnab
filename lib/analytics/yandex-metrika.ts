import {
  COOKIE_PREFERENCES_KEY,
  COOKIE_PREFERENCES_LEGACY_KEY,
  hasAnalyticsConsent
} from "@/lib/analytics/cookie-preferences";

export const YANDEX_METRIKA_ID = 110145822;

export { hasAnalyticsConsent };

export const YANDEX_METRIKA_INIT_SCRIPT = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

ym(${YANDEX_METRIKA_ID}, 'init', {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: "dataLayer",
  referrer: document.referrer,
  url: location.href,
  accurateTrackBounce: true,
  trackLinks: true
});
`.trim();

export const YANDEX_METRIKA_CONSENT_BOOTSTRAP = `
try {
  var analytics = false;
  var raw = localStorage.getItem("${COOKIE_PREFERENCES_KEY}");
  if (raw) {
    var prefs = JSON.parse(raw);
    analytics = !!(prefs.analytics || prefs.marketing);
  } else if (localStorage.getItem("${COOKIE_PREFERENCES_LEGACY_KEY}") === "accepted") {
    analytics = true;
  }
  if (analytics) {
    ${YANDEX_METRIKA_INIT_SCRIPT}
  }
} catch (e) {}
`.trim();
