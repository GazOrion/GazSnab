/** Отображаемый артикул для строки корзины */
export function formatArticle(slug?: string, id?: string) {
  if (slug) {
    return slug.toUpperCase();
  }
  if (id) {
    return id.slice(0, 8).toUpperCase();
  }
  return "—";
}

export function positionsLabel(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${count} позиций`;
  if (mod10 === 1) return `${count} позиция`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} позиции`;
  return `${count} позиций`;
}
