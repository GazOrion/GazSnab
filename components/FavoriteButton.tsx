"use client";

import clsx from "clsx";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/FavoritesProvider";

type Props = {
  productSlug: string;
  className?: string;
};

export function FavoriteButton({ productSlug, className }: Props) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(productSlug);

  return (
    <button
      type="button"
      className={clsx("favorite-btn", active && "favorite-btn-active", className)}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={active}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(productSlug);
      }}
    >
      <Heart size={18} strokeWidth={2} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
