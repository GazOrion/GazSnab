"use client";

import { CartQuantityControl } from "@/components/CartQuantityControl";
import { ServiceOrderButton } from "@/components/ServiceOrderButton";
import { PRODUCT_KIND } from "@/lib/catalog";

type Props = {
  kind: string;
  product: {
    id: string;
    title: string;
    price: number;
    unit: string;
    slug: string;
    imageUrl: string | null;
  };
};

export function ProductOrderActions({ kind, product }: Props) {
  if (kind === PRODUCT_KIND.SERVICE) {
    return <ServiceOrderButton product={{ id: product.id, title: product.title }} variant="accent" />;
  }

  return <CartQuantityControl variant="accent" product={product} />;
}
