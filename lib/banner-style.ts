import type { CSSProperties } from "react";

export function responsiveBannerStyle(
  desktopSrc: string,
  mobileSrc?: string | null
): CSSProperties {
  return {
    "--hero-banner-desktop": `url("${desktopSrc}")`,
    ...(mobileSrc ? { "--hero-banner-mobile": `url("${mobileSrc}")` } : {})
  } as CSSProperties;
}
