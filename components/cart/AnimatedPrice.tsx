"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

type Props = {
  value: number;
  className?: string;
};

export function AnimatedPrice({ value, className }: Props) {
  const [pulse, setPulse] = useState(false);
  const prev = useRef(value);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      prev.current = value;
      return;
    }
    if (prev.current === value) return;
    prev.current = value;
    setPulse(true);
    const timer = window.setTimeout(() => setPulse(false), 260);
    return () => window.clearTimeout(timer);
  }, [value]);

  return (
    <span className={clsx("animated-price", pulse && "animated-price-pulse", className)}>
      {formatPrice(value)}
    </span>
  );
}
