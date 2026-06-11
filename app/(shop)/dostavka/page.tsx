import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Доставка и оплата | ГазСнаб",
  description: "Условия доставки газового оборудования и способы оплаты"
};

const paymentMethods = [
  "Безналичный расчёт по счёту для юридических лиц и ИП",
  "Оплата по выставленному счёту после согласования спецификации",
  "Отсрочка платежа — для постоянных клиентов по договору"
];

const deliveryOptions = [
  "Самовывоз со склада в Ростове-на-Дону по предварительному согласованию",
  "Доставка транспортными компаниями по России",
  "Доставка до терминала ТК в вашем городе или до адреса объекта"
];

export default function DeliveryPage() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page narrow">
        <div className="container">
          <span className="eyebrow">Доставка и оплата</span>
          <h1>Доставка и оплата</h1>
          <p className="lead">
            Отгружаем оборудование после подтверждения заявки. Сроки и стоимость доставки зависят от
            региона, габаритов и комплектации — менеджер уточнит детали при обработке заказа.
          </p>

          <section className="static-page-block">
            <h2 className="static-page-block__title">Способы получения</h2>
            <ul className="static-page-list">
              {deliveryOptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted static-page-note">
              Склад: {company.address}. График отгрузки согласуется с менеджером.
            </p>
          </section>

          <section className="static-page-block">
            <h2 className="static-page-block__title">Оплата</h2>
            <ul className="static-page-list">
              {paymentMethods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted static-page-note">
              Реквизиты для оплаты — в разделе{" "}
              <Link href="/o-kompanii#rekvizity">реквизиты компании</Link>.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
