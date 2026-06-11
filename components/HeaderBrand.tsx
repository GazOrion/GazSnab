"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const TAGLINE = "Оборудование для газа и производства";
const MIN_FONT_PX = 7;
const MAX_FONT_PX = 12;

export function HeaderBrand() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    const tagline = taglineRef.current;
    if (!title || !tagline) return;

    const fitTagline = () => {
      const targetWidth = title.getBoundingClientRect().width;
      let low = MIN_FONT_PX;
      let high = MAX_FONT_PX;
      let best = MIN_FONT_PX;

      while (high - low > 0.2) {
        const mid = (low + high) / 2;
        tagline.style.fontSize = `${mid}px`;
        const width = tagline.getBoundingClientRect().width;

        if (width <= targetWidth + 0.5) {
          best = mid;
          low = mid;
        } else {
          high = mid;
        }
      }

      tagline.style.fontSize = `${best}px`;
    };

    fitTagline();
    const observer = new ResizeObserver(fitTagline);
    observer.observe(title);
    if (title.parentElement) {
      observer.observe(title.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link className="header-pro-brand" href="/">
      <span ref={titleRef} className="header-pro-brand-main" aria-hidden>
        <span className="header-pro-brand-blue">ОРИОН</span>
        <span className="header-pro-brand-orange">ГАЗСНАБ</span>
      </span>
      <span ref={taglineRef} className="header-pro-brand-tagline">
        {TAGLINE}
      </span>
    </Link>
  );
}
