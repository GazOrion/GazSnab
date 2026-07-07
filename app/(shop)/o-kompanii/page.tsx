import type { Metadata } from "next";
import { CompanyAboutContent } from "@/components/CompanyAboutContent";
import { CompanyRequisites } from "@/components/CompanyRequisites";
import { ShopPageShell } from "@/components/ShopPageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { company } from "@/lib/company";
import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/o-kompanii");
}

export default function CompanyPage() {
  return (
    <ShopPageShell className="site-shell">

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
    </ShopPageShell>
  );
}
