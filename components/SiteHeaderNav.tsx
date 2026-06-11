"use client";

import clsx from "clsx";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  HEADER_NAV_LINKS,
  isHeaderNavActive,
  isHeaderNavChildActive,
  type HeaderNavChild,
  type ShopNavItem
} from "@/lib/shop-nav";

function dismissNavDropdown() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

function chunkNavRows<T>(items: T[]): Array<[T, T | undefined]> {
  const rows: Array<[T, T | undefined]> = [];
  for (let index = 0; index < items.length; index += 2) {
    rows.push([items[index], items[index + 1]]);
  }
  return rows;
}

function HeaderNavMegaItem({
  child,
  pathname,
  search
}: {
  child: HeaderNavChild;
  pathname: string;
  search: string;
}) {
  const childActive = isHeaderNavChildActive(pathname, child, search);

  return (
    <Link
      className={clsx(
        "header-pro-nav-mega-item",
        childActive && "header-pro-nav-mega-item-active"
      )}
      href={child.href}
      role="menuitem"
      aria-current={childActive ? "page" : undefined}
      onClick={dismissNavDropdown}
    >
      <span className="header-pro-nav-mega-thumb">
        {child.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- без обёртки next/image, чтобы не было белой подложки при hover
          <img src={child.imageUrl} alt="" width={56} height={56} className="header-pro-nav-mega-img" />
        ) : (
          <span className="header-pro-nav-mega-placeholder" aria-hidden />
        )}
      </span>
      <span className="header-pro-nav-mega-label">{child.label}</span>
      <span className="header-pro-nav-mega-arrow" aria-hidden>
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
    </Link>
  );
}

function HeaderNavDropdown({
  item,
  pathname,
  search
}: {
  item: ShopNavItem & { children: HeaderNavChild[] };
  pathname: string;
  search: string;
}) {
  const parentActive = isHeaderNavActive(pathname, item, search);
  const rows = chunkNavRows(item.children);

  return (
    <div className="header-pro-nav-item">
      <Link
        className={clsx("header-pro-nav-link", parentActive && "header-pro-nav-link-active")}
        href={item.href}
        aria-current={parentActive ? "page" : undefined}
        aria-haspopup="true"
        onClick={dismissNavDropdown}
      >
        <span>{item.label}</span>
        <ChevronDown size={14} strokeWidth={2.5} aria-hidden />
      </Link>
      <div
        className="header-pro-nav-dropdown header-pro-nav-dropdown-mega"
        role="menu"
        aria-label={item.label}
      >
        <div className="header-pro-nav-dropdown-panel header-pro-nav-mega-panel">
          {rows.map(([left, right], rowIndex) => (
            <div
              key={`${left.label}-${right?.label ?? "solo"}`}
              className={clsx(
                "header-pro-nav-mega-row",
                rowIndex < rows.length - 1 && "header-pro-nav-mega-row-divider"
              )}
            >
              <HeaderNavMegaItem child={left} pathname={pathname} search={search} />
              {right ? (
                <HeaderNavMegaItem child={right} pathname={pathname} search={search} />
              ) : (
                <span className="header-pro-nav-mega-item header-pro-nav-mega-item-empty" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeaderNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const routeKey = `${pathname}?${search}`;

  useEffect(() => {
    dismissNavDropdown();
  }, [routeKey]);

  return (
    <nav className="header-pro-nav" aria-label="Основное меню">
      {HEADER_NAV_LINKS.map((item) =>
        item.children?.length ? (
          <HeaderNavDropdown
            key={`${item.href}-${item.label}`}
            item={item as ShopNavItem & { children: HeaderNavChild[] }}
            pathname={pathname}
            search={search}
          />
        ) : (
          <Link
            key={`${item.href}-${item.label}`}
            className={clsx(
              "header-pro-nav-link",
              isHeaderNavActive(pathname, item, search) && "header-pro-nav-link-active"
            )}
            href={item.href}
            aria-current={isHeaderNavActive(pathname, item, search) ? "page" : undefined}
            onClick={dismissNavDropdown}
          >
            <span>{item.label}</span>
          </Link>
        )
      )}
    </nav>
  );
}
