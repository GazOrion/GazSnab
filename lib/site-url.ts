function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

/** Публичный URL сайта для абсолютных ссылок в фидах, письмах и т.п. */
export function getSiteUrl() {
  const fromEnv = process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }
  if (process.env.VERCEL_URL) {
    return `https://${normalizeSiteUrl(process.env.VERCEL_URL)}`;
  }
  return "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function absoluteMediaUrl(path: string | null | undefined) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return absoluteUrl(path.startsWith("/") ? path : `/${path}`);
}
