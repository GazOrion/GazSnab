import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeCategoryCard } from "@/lib/catalog-data";

type Props = {
  categories: HomeCategoryCard[];
};

export function HomeCategoryStrip({ categories }: Props) {
  if (!categories.length) return null;

  return (
    <div className="store-home-categories" aria-label="Разделы каталога">
      <div className="store-home-categories__inner">
        {categories.map((category) => (
          <Link key={category.href} href={category.href} className="store-home-category-card">
            <span className="store-home-category-card__thumb">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt=""
                  width={80}
                  height={80}
                  className="store-home-category-card__img"
                />
              ) : (
                <span className="store-home-category-card__placeholder" aria-hidden />
              )}
            </span>
            <span className="store-home-category-card__body">
              <span className="store-home-category-card__title">{category.title}</span>
              <span className="store-home-category-card__arrow" aria-hidden>
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
