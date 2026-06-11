import clsx from "clsx";
import { Building2, Clock3, Headphones, ShieldCheck, Wrench } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Документы и качество",
    text: "Паспорта, спецификации и комплектация под объект."
  },
  {
    icon: Wrench,
    title: "Металлообработка",
    text: "Сварка, сверление, гибка и 3D-печать — цены «от»."
  },
  {
    icon: Clock3,
    title: "Сроки под задачу",
    text: "Производство и поставка в согласованные даты."
  },
  {
    icon: Headphones,
    title: "Инженерная поддержка",
    text: "Подбор оборудования и консультации на всех этапах."
  },
  {
    icon: Building2,
    title: "Работа с юр. лицами",
    text: "Счета, договоры и отгрузка по России."
  }
] as const;

type Props = {
  variant?: "hero" | "standalone";
};

export function BenefitsRow({ variant = "standalone" }: Props) {
  return (
    <section
      className={clsx("store-benefits", variant === "hero" && "store-benefits-hero")}
      aria-label="Преимущества"
    >
      <div className={clsx(variant === "hero" ? "store-hero-benefits-wrap" : "container")}>
        <div className="store-benefits-panel">
          <div className="store-benefits-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article className="store-benefit" key={title}>
                <span className="store-benefit-icon" aria-hidden>
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
