"use client";

import { ConsultationPopup } from "@/components/ConsultationPopup";
import { CartProvider } from "@/components/CartProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { CatalogSearchProvider } from "@/contexts/CatalogSearchContext";

export function ShopLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <CatalogSearchProvider>
          {children}
          <ConsultationPopup />
        </CatalogSearchProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
