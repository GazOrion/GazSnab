import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Гарантии и возврат | ГазСнаб",
  description: "Гарантийные обязательства и условия возврата поставляемого оборудования"
};

const warrantyTerms = [
  "Гарантия распространяется на оборудование при соблюдении условий транспортировки, хранения и монтажа по документации производителя.",
  "Срок гарантии указывается в паспорте изделия и договоре поставки.",
  "Гарантия не действует при механических повреждениях, несанкционированном вмешательстве и нарушении правил эксплуатации.",
  "Для оборудования со встроенной телеметрией сохраняйте пломбы и отчётные данные при вводе в эксплуатацию."
];

const warrantySteps = [
  "Сообщите менеджеру номер заявки, модель прибора и описание неисправности.",
  "Подготовьте паспорт изделия, акт ввода в эксплуатацию и фото маркировки.",
  "По согласованию направьте оборудование на диагностику или ожидайте выезд специалиста.",
  "По результатам осмотра выполняется ремонт, замена или выдача заключения."
];

export default function WarrantyPage() {
  const phoneHref = `tel:${company.phone.replace(/\D/g, "")}`;

  return (
    <main className="site-shell">
      <SiteHeader />

      <article className="section static-page narrow">
        <div className="container">
          <span className="eyebrow">Гарантии и возврат</span>
          <h1>Гарантия и возврат товара</h1>
          <p className="lead">
            Мы сопровождаем поставленное оборудование на этапе ввода в эксплуатацию и при гарантийных
            обращениях. Свяжитесь с менеджером — подскажем порядок действий и необходимые документы.
          </p>

          <section className="static-page-block">
            <h2 className="static-page-block__title">Условия гарантии</h2>
            <ul className="static-page-list">
              {warrantyTerms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="static-page-block">
            <h2 className="static-page-block__title">Как оформить обращение</h2>
            <ol className="static-page-list static-page-list--ordered">
              {warrantySteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="static-page-block static-page-contacts">
            <h2 className="static-page-block__title">Связь по гарантии</h2>
            <p>
              Телефон: <a href={phoneHref}>{company.phone}</a>
            </p>
            <p>
              Email: <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
            <p className="muted">
              Или оставьте заявку через{" "}
              <Link href="/cart">корзину</Link> / форму на <Link href="/#consult">главной</Link>.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
