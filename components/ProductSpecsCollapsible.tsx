"use client";

import type { ReactNode } from "react";
import { ProductMobileExpandable } from "@/components/ProductMobileExpandable";

type Props = {
  children: ReactNode;
};

export function ProductSpecsCollapsible({ children }: Props) {
  return (
    <ProductMobileExpandable
      expandLabel="Развернуть характеристики"
      collapseLabel="Свернуть характеристики"
      mode="truncate"
    >
      {children}
    </ProductMobileExpandable>
  );
}
