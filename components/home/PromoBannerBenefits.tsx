import { Cog, Headphones, ShieldCheck, Truck } from "lucide-react";

export const PROMO_BANNER_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Сертифицированная продукция",
    text: "Поставляем оборудование с документами, соответствующее ТР ТС и ГОСТ."
  },
  {
    icon: Truck,
    title: "Быстрая доставка",
    text: "Отправляем заказы по России — удобным для вас способом."
  },
  {
    icon: Cog,
    title: "Подбор оборудования",
    text: "Бесплатно поможем подобрать решение под ваш объект."
  },
  {
    icon: Headphones,
    title: "Техподдержка",
    text: "Консультации инженеров на всех этапах работы."
  }
] as const;

type Props = {
  classPrefix: "store-hero-industrial" | "store-equipment-hero";
};

export function PromoBannerBenefits({ classPrefix }: Props) {
  const isHero = classPrefix === "store-hero-industrial";

  return (
    <div className={`${classPrefix}__banner-benefits`} aria-label="Преимущества">
      {PROMO_BANNER_BENEFITS.map(({ icon: Icon, title, text }) => (
        <article key={title} className="store-equipment-benefit">
          <span className="store-equipment-benefit__icon" aria-hidden>
            <Icon
              size={isHero ? undefined : 28}
              strokeWidth={1.5}
              className={isHero ? "store-equipment-benefit__icon-svg" : undefined}
            />
          </span>
          <div className="store-equipment-benefit__body">
            <h3 className="store-equipment-benefit__title">{title}</h3>
            <p className="store-equipment-benefit__text">{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
