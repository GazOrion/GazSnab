"use client";

import clsx from "clsx";
import { ArrowRight, ChevronDown, Menu, Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { usePathname, useSearchParams } from "next/navigation";
import {
  isHeaderNavChildActive,
  isHeaderNavChildBranchActive,
  isShopNavActive,
  isShopNavBranchActive,
  SHOP_NAV_LINKS,
  type HeaderNavChild,
  type ShopNavItem
} from "@/lib/shop-nav";

function useMenuGroupExpanded(activeOnRoute: boolean, routeKey: string) {
  const [expanded, setExpanded] = useState(activeOnRoute);
  const routeKeyRef = useRef(routeKey);

  useEffect(() => {
    if (routeKeyRef.current === routeKey) return;
    routeKeyRef.current = routeKey;
    setExpanded(activeOnRoute);
  }, [routeKey, activeOnRoute]);

  const toggleExpanded = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setExpanded((current) => !current);
  };

  return { expanded, toggleExpanded };
}

function buildMenuGroupId(prefix: string, child: HeaderNavChild) {
  const slug = child.href.replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "");
  return `${prefix}-${slug || child.label.replace(/\s+/g, "-").toLowerCase()}`;
}

function MobileNavNestedGroup({
  child,
  pathname,
  search,
  onNavigate,
  variant = "mega",
  routeKey
}: {
  child: HeaderNavChild & { children: HeaderNavChild[] };
  pathname: string;
  search: string;
  onNavigate: () => void;
  variant?: "mega" | "compact";
  routeKey: string;
}) {
  const childActive = isHeaderNavChildActive(pathname, child, search);
  const branchActive = isHeaderNavChildBranchActive(pathname, child, search);
  const { expanded, toggleExpanded } = useMenuGroupExpanded(branchActive, routeKey);
  const groupId = buildMenuGroupId("header-menu-nested", child);
  const compact = variant === "compact";

  return (
    <div
      className={clsx(
        "header-menu-nested-group",
        compact && "header-menu-nested-group--compact",
        expanded && "header-menu-nested-group--expanded"
      )}
    >
      <div className="header-menu-nested-group-head">
        <Link
          className={clsx(
            compact
              ? "header-menu-nested-sublink header-menu-nested-sublink-parent"
              : "header-menu-sublink header-menu-sublink-mega header-menu-sublink-mega-no-arrow header-menu-sublink-parent",
            childActive && "header-menu-link-active"
          )}
          href={child.href}
          aria-current={child.match(pathname, search) ? "page" : undefined}
          onClick={onNavigate}
        >
          {!compact ? (
            <>
              <span className="header-menu-sublink-thumb">
                {child.imageUrl ? (
                  <img src={child.imageUrl} alt="" width={40} height={40} className="header-menu-sublink-img" />
                ) : (
                  <span className="header-menu-sublink-placeholder" aria-hidden />
                )}
              </span>
              <span className="header-menu-sublink-label">{child.label}</span>
            </>
          ) : (
            child.label
          )}
        </Link>
        <button
          type="button"
          className={clsx("header-menu-nested-group-toggle", compact && "header-menu-nested-group-toggle--compact")}
          aria-expanded={expanded}
          aria-controls={groupId}
          aria-label={expanded ? `Свернуть «${child.label}»` : `Развернуть «${child.label}»`}
          onClick={toggleExpanded}
        >
          {expanded ? (
            <Minus size={16} strokeWidth={2.5} className="header-menu-nested-group-toggle-icon" aria-hidden />
          ) : (
            <Plus size={16} strokeWidth={2.5} className="header-menu-nested-group-toggle-icon" aria-hidden />
          )}
        </button>
      </div>
      <div id={groupId} className="header-menu-nested-subnav">
        <div className="header-menu-nested-subnav-inner">
          {child.children.map((nested) => (
            <MobileNavNestedItem
              key={`${nested.href}-${nested.label}`}
              child={nested}
              pathname={pathname}
              search={search}
              onNavigate={onNavigate}
              routeKey={routeKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavNestedItem({
  child,
  pathname,
  search,
  onNavigate,
  routeKey
}: {
  child: HeaderNavChild;
  pathname: string;
  search: string;
  onNavigate: () => void;
  routeKey: string;
}) {
  if (child.children?.length) {
    return (
      <MobileNavNestedGroup
        child={child as HeaderNavChild & { children: HeaderNavChild[] }}
        pathname={pathname}
        search={search}
        onNavigate={onNavigate}
        variant="compact"
        routeKey={routeKey}
      />
    );
  }

  return (
    <Link
      className={clsx(
        "header-menu-nested-sublink",
        isHeaderNavChildActive(pathname, child, search) && "header-menu-link-active"
      )}
      href={child.href}
      aria-current={isHeaderNavChildActive(pathname, child, search) ? "page" : undefined}
      onClick={onNavigate}
    >
      {child.label}
    </Link>
  );
}

function MobileNavCatalogChild({
  child,
  pathname,
  search,
  onNavigate,
  routeKey
}: {
  child: HeaderNavChild;
  pathname: string;
  search: string;
  onNavigate: () => void;
  routeKey: string;
}) {
  if (child.children?.length) {
    return (
      <MobileNavNestedGroup
        child={child as HeaderNavChild & { children: HeaderNavChild[] }}
        pathname={pathname}
        search={search}
        onNavigate={onNavigate}
        routeKey={routeKey}
      />
    );
  }

  return (
    <Link
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
  );
}

function MobileNavGroup({
  item,
  pathname,
  search,
  onNavigate,
  routeKey
}: {
  item: ShopNavItem & { children: HeaderNavChild[] };
  pathname: string;
  search: string;
  onNavigate: () => void;
  routeKey: string;
}) {
  const groupActive = isShopNavActive(pathname, item, search);
  const branchActive = isShopNavBranchActive(pathname, item, search);
  const { expanded, toggleExpanded } = useMenuGroupExpanded(branchActive, routeKey);
  const groupId = `header-menu-group-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={clsx("header-menu-group", expanded && "header-menu-group--expanded")}>
      <div className="header-menu-group-head">
        <Link
          className={clsx("header-menu-link header-menu-link-parent", groupActive && "header-menu-link-active")}
          href={item.href}
          aria-current={groupActive ? "page" : undefined}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className="header-menu-group-toggle"
          aria-expanded={expanded}
          aria-controls={groupId}
          aria-label={expanded ? `Свернуть «${item.label}»` : `Развернуть «${item.label}»`}
          onClick={toggleExpanded}
        >
          <ChevronDown size={18} strokeWidth={2.5} className="header-menu-group-toggle-icon" aria-hidden />
        </button>
      </div>
      <div id={groupId} className="header-menu-subnav">
        <div className="header-menu-subnav-inner">
          {item.children.map((child) => (
            <MobileNavCatalogChild
              key={`${child.href}-${child.label}`}
              child={child}
              pathname={pathname}
              search={search}
              onNavigate={onNavigate}
              routeKey={routeKey}
            />
          ))}
        </div>
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
    const scrollY = window.scrollY;
    document.body.classList.add("header-menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("header-menu-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const menuOverlay =
    typeof document !== "undefined" ? (
      <>
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
                  routeKey={routeKey}
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
    ) : null;

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

      {menuOverlay ? createPortal(menuOverlay, document.body) : null}
    </>
  );
}
