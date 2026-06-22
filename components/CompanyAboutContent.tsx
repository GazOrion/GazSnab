import Link from "next/link";
import {
  COMPANY_ABOUT_SECTIONS,
  type CompanyAboutSubsection
} from "@/lib/site-pages/company-about";
import { CATALOG_ROUTES } from "@/lib/catalog";

type Props = {
  companyName: string;
};

function SubsectionBlock({ block }: { block: CompanyAboutSubsection }) {
  return (
    <div className="company-about__block">
      {block.subheading ? <h3 className="company-about__subheading">{block.subheading}</h3> : null}
      {block.paragraph ? <p className="company-about__text">{block.paragraph}</p> : null}
      {block.listLabel ? (
        <h4 className="company-about__list-heading">{block.listLabel}</h4>
      ) : null}
      {block.listItems?.length ? (
        <ul className="static-page-list company-about__list">
          {block.listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function CompanyAboutContent({ companyName }: Props) {
  return (
    <div className="company-about">
      <p className="company-about__text">
        {companyName} — поставщик оборудования для газовых и водных систем, а также сопутствующих
        услуг для промышленных объектов, котельных и подрядных организаций. Работаем с позициями в
        наличии и под заказ.
      </p>
      <p className="company-about__text">
        В каталоге — насосы, фильтры для газа и воды, счётчики, клапаны и запорная арматура. Отдельно
        оказываем услуги металлообработки, инжиниринга и сервиса. Менеджер уточнит комплектацию,
        сроки и документы после вашей заявки.
      </p>
      <p className="company-about__text">
        Посмотреть актуальные позиции можно в разделах{" "}
        <Link href={CATALOG_ROUTES.equipment}>каталог</Link> и{" "}
        <Link href={CATALOG_ROUTES.services}>услуги</Link>.
      </p>

      {COMPANY_ABOUT_SECTIONS.map((section) => (
        <section className="company-about__section" key={section.heading}>
          <h2 className="static-page-block__title">{section.heading}</h2>
          {section.paragraph ? <p className="company-about__text">{section.paragraph}</p> : null}
          {section.listItems?.length ? (
            <ul className="static-page-list company-about__list">
              {section.listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.subsections?.map((block, index) => (
            <SubsectionBlock block={block} key={`${section.heading}-${index}`} />
          ))}
        </section>
      ))}

      <section className="company-about__section">
        <h2 className="static-page-block__title">Доставка</h2>
        <p className="company-about__text">Доставляем по Ростовской области или самовывоз.</p>
      </section>
    </div>
  );
}
