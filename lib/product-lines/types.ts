export type ProductLineVariant = {
  /** Условный проход, мм */
  du: string;
  /** Маркировка модели, если отличается от серии */
  model?: string;
  /** Рабочее давление */
  pressure: string;
  /** Цена за шт. — null = «по запросу» */
  price?: number | null;
  note?: string;
};

export type ProductLineSeries = {
  id: string;
  title: string;
  article: string;
  pressureNote?: string;
  description?: string;
  variants: ProductLineVariant[];
};

export type ProductLineCatalog = {
  slug: string;
  brand: string;
  title: string;
  lead: string;
  features: string[];
  series: ProductLineSeries[];
  orderHint?: string;
};
