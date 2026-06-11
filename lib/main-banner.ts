import fs from "fs";
import path from "path";

const bannerPath = path.join(process.cwd(), "public", "media", "main-banner.png");

/** URL баннера с версией по дате файла — обновляется после `npm run sync:promo`. */
export function getMainBannerSrc(): string {
  try {
    const { mtimeMs } = fs.statSync(bannerPath);
    return `/media/main-banner.png?v=${mtimeMs}`;
  } catch {
    return "/media/main-banner.png";
  }
}
