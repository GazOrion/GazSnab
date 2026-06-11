import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MORE_THAN_EQUIPMENT_CARDS } from "@/lib/more-than-equipment";

export function MoreThanEquipmentSection() {
  return (
    <section className="store-more-equipment" aria-labelledby="store-more-equipment-heading">
      <div className="store-more-equipment__inner">
        <header className="store-more-equipment__head">
          <h2 id="store-more-equipment-heading" className="store-more-equipment__title">
            Больше, чем оборудование
          </h2>
          <p className="store-more-equipment__lead">
            Мы в Орионе развиваем несколько направлений: от инженерной эксплуатации и поставок до
            IT-разработки, обучения детей и интерьерных проектов.
          </p>
        </header>

        <ul className="store-more-equipment__grid">
          {MORE_THAN_EQUIPMENT_CARDS.map((card) => (
            <li key={card.id}>
              <article className="store-more-equipment-card">
                <div className="store-more-equipment-card__icon-wrap">
                  <Image
                    src={card.image}
                    alt=""
                    className="store-more-equipment-card__icon"
                    width={112}
                    height={112}
                  />
                </div>
                <h3 className="store-more-equipment-card__title">{card.title}</h3>
                <p className="store-more-equipment-card__text">{card.text}</p>
                <Link
                  className="store-more-equipment-card__link"
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {card.linkLabel}
                  <ArrowRight
                    className="store-more-equipment-card__arrow"
                    size={16}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
