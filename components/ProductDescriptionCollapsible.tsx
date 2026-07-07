"use client";

import type { ReactNode } from "react";
import { ProductMobileExpandable } from "@/components/ProductMobileExpandable";

type Props = {
  children: ReactNode;
};

export function ProductDescriptionCollapsible({ children }: Props) {
  return (
    <ProductMobileExpandable
      expandLabel="Развернуть описание"
      collapseLabel="Свернуть описание"
      mode="truncate"
    >
      {children}
    </ProductMobileExpandable>
  );
}
