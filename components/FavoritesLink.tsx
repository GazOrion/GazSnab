"use client";

import clsx from "clsx";
import Link from "next/link";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/components/FavoritesProvider";

type Props = {
  className?: string;
};

export function FavoritesLink({ className }: Props) {
  const { ids } = useFavorites();
  const pathname = usePathname();
  const active = pathname === "/favorites";
  const count = ids.length;

  return (
    <Link
      className={clsx("header-icon-btn", className, active && "header-icon-btn-active")}
      href="/favorites"
      aria-label={count ? `Избранное: ${count} позиций` : "Избранное"}
    >
      <Heart size={22} strokeWidth={1.75} aria-hidden />
      {count > 0 ? (
        <span className="header-icon-badge" aria-hidden>
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
