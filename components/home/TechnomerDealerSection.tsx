import { Award, FileCheck, Headset, ShieldCheck } from "lucide-react";
import { TECHNOMER_DEALER_ASSETS, TECHNOMER_DEALER_BENEFITS } from "@/lib/technomer-dealer";

const BENEFIT_ICONS = {
  original: ShieldCheck,
  warranty: Award,
  support: Headset,
  status: FileCheck
} as const;

export function TechnomerDealerSection() {
  return (
    <section className="store-technomer-dealer" aria-labelledby="store-technomer-dealer-heading">
      <div className="store-technomer-dealer__banner">
        <div className="store-technomer-dealer__container store-promo-inner">
          <div className="store-technomer-dealer__grid">
            <div className="store-technomer-dealer__certificate-col">
              <img
                src={TECHNOMER_DEALER_ASSETS.certificate}
                alt="Свидетельство официального дилера Техномер"
                className="store-technomer-dealer__certificate-img"
                loading="lazy"
              />
            </div>

            <div className="store-technomer-dealer__copy">
              <h2 id="store-technomer-dealer-heading" className="store-technomer-dealer__title">
                <span className="store-technomer-dealer__title-line store-technomer-dealer__title-line--blue">
                  Единственный
                </span>
                <span className="store-technomer-dealer__title-line store-technomer-dealer__title-line--orange">
                  официальный дилер
                </span>
                <span className="store-technomer-dealer__title-line store-technomer-dealer__title-line--blue">
                  Техномер в Ростовской области
                </span>
              </h2>

              <p className="store-technomer-dealer__lead">
                Работаем напрямую с производителем, поставляем оригинальную продукцию с официальной
                гарантией и полной технической поддержкой.
              </p>

              <ul className="store-technomer-dealer__benefits">
                {TECHNOMER_DEALER_BENEFITS.map((item) => {
                  const Icon = BENEFIT_ICONS[item.id];
                  return (
                    <li className="store-technomer-dealer__benefit" key={item.id}>
                      <span className="store-technomer-dealer__benefit-icon" aria-hidden>
                        <Icon size={34} strokeWidth={1.75} />
                      </span>
                      <span className="store-technomer-dealer__benefit-label">{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
