import Link from "next/link";
import { FooterBrand } from "@/components/FooterBrand";
import { company } from "@/lib/company";

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
        <div>
          <strong>Телефон</strong>
          <p>
            <a href={`tel:${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>
          </p>
        </div>
        <div>
          <strong>Email</strong>
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>
        <div>
          <strong>Адрес</strong>
          <p>Ростов-на-Дону, 14-я Линия, 30/48</p>
        </div>
      </div>
    </footer>
  );
}
