"use client";

import { ConsultationPopup } from "@/components/ConsultationPopup";
import { PhoneFabWidget } from "@/components/PhoneFabWidget";
import { CartProvider } from "@/components/CartProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { CatalogSearchProvider } from "@/contexts/CatalogSearchContext";

export function ShopLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <CatalogSearchProvider>
          {children}
          <PhoneFabWidget />
          <ConsultationPopup />
        </CatalogSearchProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
