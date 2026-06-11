"use client";

import clsx from "clsx";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  isHeaderNavChildActive,
  isShopNavActive,
  SHOP_NAV_LINKS,
  type HeaderNavChild,
  type ShopNavItem
} from "@/lib/shop-nav";

function MobileNavGroup({
  item,
  pathname,
  search,
  onNavigate
}: {
  item: ShopNavItem & { children: HeaderNavChild[] };
  pathname: string;
  search: string;
  onNavigate: () => void;
}) {
  const groupActive = isShopNavActive(pathname, item, search);

  return (
    <div className="header-menu-group">
      <Link
        className={clsx("header-menu-link header-menu-link-parent", groupActive && "header-menu-link-active")}
        href={item.href}
        aria-current={groupActive ? "page" : undefined}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
      <div className="header-menu-subnav">
        {item.children.map((child) => (
          <Link
            key={`${child.href}-${child.label}`}
            className={clsx(
              "header-menu-sublink header-menu-sublink-mega",
              isHeaderNavChildActive(pathname, child, search) && "header-menu-link-active"
            )}
            href={child.href}
            aria-current={isHeaderNavChildActive(pathname, child, search) ? "page" : undefined}
            onClick={onNavigate}
          >
            <span className="header-menu-sublink-thumb">
              {child.imageUrl ? (
                <img src={child.imageUrl} alt="" width={40} height={40} className="header-menu-sublink-img" />
              ) : (
                <span className="header-menu-sublink-placeholder" aria-hidden />
              )}
            </span>
            <span className="header-menu-sublink-label">{child.label}</span>
            <ArrowRight size={16} strokeWidth={2.5} className="header-menu-sublink-arrow" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HeaderCatalogMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const routeKey = `${pathname}?${search}`;

  useEffect(() => {
    setOpen(false);
  }, [routeKey]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="header-menu-btn"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="header-catalog-panel"
        aria-label="Открыть меню каталога"
      >
        <Menu size={22} strokeWidth={2} aria-hidden />
        <span className="header-menu-btn-label">Меню</span>
      </button>

      <div
        className={clsx("header-menu-backdrop", open && "header-menu-backdrop-open")}
        aria-hidden={!open}
        onClick={close}
      />

      <aside
        id="header-catalog-panel"
        className={clsx("header-menu-panel", open && "header-menu-panel-open")}
        aria-hidden={!open}
        aria-label="Меню каталога"
      >
        <div className="header-menu-panel-head">
          <strong>Меню</strong>
          <button
            type="button"
            className="header-icon-btn"
            onClick={close}
            aria-label="Закрыть меню"
          >
            <X size={22} aria-hidden />
          </button>
        </div>
        <nav className="header-menu-nav">
          {SHOP_NAV_LINKS.map((item) =>
            item.children?.length ? (
              <MobileNavGroup
                key={item.label}
                item={item as ShopNavItem & { children: HeaderNavChild[] }}
                pathname={pathname}
                search={search}
                onNavigate={close}
              />
            ) : (
              <Link
                key={item.href}
                className={clsx(
                  "header-menu-link",
                  isShopNavActive(pathname, item, search) && "header-menu-link-active"
                )}
                href={item.href}
                aria-current={isShopNavActive(pathname, item, search) ? "page" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}
