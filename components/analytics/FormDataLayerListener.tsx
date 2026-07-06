"use client";

import { useEffect } from "react";
import { trackFormSubmit } from "@/lib/analytics/data-layer";

export function FormDataLayerListener() {
  useEffect(() => {
    function onSubmit(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLFormElement)) return;
      trackFormSubmit(target);
    }

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  return null;
}
