import { Factory, ShieldCheck, Wrench } from "lucide-react";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

import { buildPageMetadata } from "@/lib/site-seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/pod-obekt");
}

export default function PodObektPage() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page">
        <div className="container about-grid compact-static">
          <div>
            <span className="eyebrow">Под объект</span>
            <h1>Не только карточки в каталоге</h1>
            <p className="lead">
              В каталоге указаны ориентировочные цены и сроки. После заявки менеджер уточняет исходные данные:
              давление, расход, диаметр, схему монтажа, требования к комплектации и документам.
            </p>
            <p className="lead">
              Карточка товара или услуги открывается отдельно: внутри фото, характеристики, описание и ориентир по
              срокам исполнения. Услуги можно добавить в корзину так же, как оборудование.
            </p>
          </div>
          <div className="product-grid compact">
            {[
              ["Техническая комплектация", Wrench],
              ["Контроль качества", ShieldCheck],
              ["Производственная сборка", Factory]
            ].map(([title, Icon]) => (
              <div className="panel" key={String(title)}>
                <Icon size={26} color="#2563eb" />
                <h3>{String(title)}</h3>
                <p className="muted">Состав предложения согласуется под условия эксплуатации.</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
