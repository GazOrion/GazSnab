import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | ОРИОН ГАЗСНАБ",
  description: `Политика обработки персональных данных ${company.name}`
};

export default function PrivacyPolicyPage() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page">
        <div className="container" style={{ maxWidth: 720 }}>
          <header className="store-section-head">
            <div>
              <h1>Политика конфиденциальности</h1>
              <p className="muted">
                Настоящая политика описывает порядок обработки персональных данных при оформлении
                заявок на сайте {company.name}.
              </p>
            </div>
          </header>

          <div className="panel" style={{ padding: "24px 28px" }}>
            <p>
              Мы обрабатываем имя и номер телефона исключительно для связи по вашей заявке, подготовки
              коммерческого предложения и счёта. Данные не передаются третьим лицам, за исключением
              случаев, предусмотренных законодательством РФ.
            </p>
            <p className="muted" style={{ marginTop: 16 }}>
              По вопросам обработки данных:{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>, тел.{" "}
              <a href={`tel:${company.phone.replace(/\D/g, "")}`}>{company.phone}</a>.
            </p>
            <p style={{ marginTop: 24 }}>
              <Link href="/cart">← Вернуться в корзину</Link>
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
