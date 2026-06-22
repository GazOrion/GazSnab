import type { Metadata } from "next";
import { CompanyAboutContent } from "@/components/CompanyAboutContent";
import { CompanyRequisites } from "@/components/CompanyRequisites";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "О компании | ГазСнаб",
  description: `${company.name} — производство, поставка и сервис`
};

export default function CompanyPage() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page">
        <div className="container">
          <h1>{company.name}</h1>
        </div>

        <div className="container static-page-section">
          <CompanyAboutContent companyName={company.name} />
        </div>

        <div className="container static-page-section">
          <CompanyRequisites />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
