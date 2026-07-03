import Link from "next/link";
import { FooterBrand } from "@/components/FooterBrand";
import { company, companyPhoneHref } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="footer store-footer">
      <div className="container footer-grid">
        <div className="store-footer-brand">
          <FooterBrand />
          <p className="store-footer-tagline">
            Производство, поставка газового оборудования и услуги металлообработки.
          </p>
          <Link className="button yellow store-footer-cta" href="/cart">
            Оставить заявку
          </Link>
        </div>
        <div className="store-footer-block">
          <strong className="store-footer-block__title">Телефон</strong>
          <div className="store-footer-phones">
            {company.phones.map((entry) => (
              <p key={entry.number} className="store-footer-phone">
                <span className="store-footer-phone-label">{entry.label}</span>
                <a href={companyPhoneHref(entry.number)}>{entry.number}</a>
              </p>
            ))}
          </div>
        </div>
        <div className="store-footer-block">
          <strong className="store-footer-block__title">Email</strong>
          <p className="store-footer-block__value">
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
        <div className="store-footer-block">
          <strong className="store-footer-block__title">Адрес</strong>
          <p className="store-footer-block__value">Ростов-на-Дону, 14-я Линия, 30/48</p>
        </div>
      </div>
      <div className="container store-footer-legal">
        <Link href="/politika-konfidencialnosti">Политика конфиденциальности</Link>
      </div>
    </footer>
  );
}
