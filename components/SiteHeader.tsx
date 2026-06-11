import Link from "next/link";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { company } from "@/lib/company";
import { CartLink } from "./CartLink";
import { FavoritesLink } from "./FavoritesLink";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderCatalogMenu } from "./HeaderCatalogMenu";
import { SiteHeaderNav } from "./SiteHeaderNav";

export function SiteHeader() {
  const phoneHref = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <header className="site-header site-header-pro">
      <div className="container header-pro-inner">
        <div className="header-pro-start">
          <Suspense fallback={<div className="header-pro-menu-slot" aria-hidden />}>
            <HeaderCatalogMenu />
          </Suspense>

          <HeaderBrand />
        </div>

        <Suspense fallback={<nav className="header-pro-nav" aria-hidden />}>
          <SiteHeaderNav />
        </Suspense>

        <div className="header-pro-actions">
          <div className="header-pro-phone-block">
            <a className="header-pro-phone" href={phoneHref}>
              <Phone size={14} strokeWidth={2} aria-hidden />
              <span>{company.phone}</span>
            </a>
            <Link className="header-pro-callback" href="/#consult">
              Заказать звонок
            </Link>
          </div>

          <div className="header-pro-user-actions">
            <FavoritesLink className="header-pro-icon-action" />
            <CartLink variant="header" />
          </div>
        </div>
      </div>
    </header>
  );
}
