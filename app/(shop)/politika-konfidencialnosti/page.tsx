import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company, companyPhoneHref } from "@/lib/company";
import {
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_PAGE_URL,
  PRIVACY_POLICY_SECTIONS
} from "@/lib/site-pages/privacy-policy";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | ОРИОН ГАЗСНАБ",
  description: `Политика обработки персональных данных ${company.name}`
};

export default function PrivacyPolicyPage() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page">
        <div className="container">
          <h1>Политика конфиденциальности</h1>
          <p className="lead">{PRIVACY_POLICY_INTRO}</p>

          {PRIVACY_POLICY_SECTIONS.map((section) => (
            <section key={section.id} className="static-page-block">
              <h2 className="static-page-block__title">{section.title}</h2>
              <div>
                {section.blocks.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="static-page-block static-page-contacts">
            <h2 className="static-page-block__title">Реквизиты оператора</h2>
            <p>
              <strong>{company.name}</strong>
            </p>
            <p>ИНН {company.inn}</p>
            <p>ОГРН {company.ogrn}</p>
            <p>{company.address}</p>
            <p>
              E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p>
              Телефон: <a href={companyPhoneHref(company.phone)}>{company.phone}</a>
            </p>
            <p className="muted">
              Действующая редакция политики:{" "}
              <a href={PRIVACY_POLICY_PAGE_URL}>{PRIVACY_POLICY_PAGE_URL}</a>
            </p>
            <p className="muted">г. Ростов-на-Дону</p>
          </section>

          <p style={{ marginTop: 24 }}>
            <Link href="/">← На главную</Link>
          </p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
