import { Suspense } from "react";
import { Phone } from "lucide-react";
import { company, companyPhoneHref } from "@/lib/company";
import { CartLink } from "./CartLink";
import { FavoritesLink } from "./FavoritesLink";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderCatalogMenu } from "./HeaderCatalogMenu";
import { SiteHeaderNav } from "./SiteHeaderNav";

export function SiteHeader() {
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
            <div className="header-pro-phones">
              {company.phones.map((entry) => (
                <div key={entry.number} className="header-pro-phone-item">
                  <span className="header-pro-phone-label">{entry.label}</span>
                  <a className="header-pro-phone" href={companyPhoneHref(entry.number)}>
                    <Phone size={14} strokeWidth={2} aria-hidden />
                    <span>{entry.number}</span>
                  </a>
                </div>
              ))}
            </div>
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
