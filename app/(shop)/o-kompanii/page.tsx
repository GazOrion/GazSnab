import { ClipboardCheck, Factory, Gauge, Truck } from "lucide-react";
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

      <article className="section static-page narrow">
        <div className="container">
          <span className="eyebrow">О компании</span>
          <h1>{company.name}</h1>
          <p className="lead">
            Поставляем насосы, фильтры для газа и воды, счётчики, клапаны и выполняем сопутствующие
            услуги. Добавьте позиции в корзину — менеджер свяжется для уточнения деталей.
          </p>
        </div>

        <div className="container static-page-section">
          <CompanyAboutContent companyName={company.name} warehouseAddress={company.address} />
        </div>

        <div className="container static-page-band">
          <div className="feature-band">
            {[
              ["Насосы и фильтры", "Оборудование для газовых и водных контуров, элементы фильтрации.", Factory],
              ["Счётчики и узлы", "Учёт расхода газа и комплектация под проект объекта.", Gauge],
              ["Клапаны и арматура", "Запорная и регулирующая арматура, ГРП и шкафные решения.", ClipboardCheck],
              ["Услуги", "Металлообработка, инжиниринг, монтаж и сервис по согласованию.", Truck]
            ].map(([title, text, Icon]) => (
              <div className="feature-item" key={String(title)}>
                <Icon size={24} />
                <div>
                  <h3>{String(title)}</h3>
                  <p>{String(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container static-page-section">
          <CompanyRequisites />
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
