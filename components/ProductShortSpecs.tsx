import { ChevronRight } from "lucide-react";

export function ProductShortSpecs({
  specs,
  specsHref = "#specs"
}: {
  specs: [string, string][];
  specsHref?: string;
}) {
  if (!specs.length) return null;

  return (
    <div className="product-short-specs">
      <dl className="product-short-specs__list">
        {specs.map(([label, value]) => (
          <div key={label} className="product-short-specs__row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <a className="product-short-specs__more" href={specsHref}>
        Все характеристики
        <ChevronRight size={16} aria-hidden />
      </a>
    </div>
  );
}
