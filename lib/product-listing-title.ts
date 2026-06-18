export function getProductListingTitle(
  title: string,
  specs?: Record<string, string> | null
): string {
  const manufacturer = specs?.["Производитель"];
  if (!manufacturer) return title;

  const escaped = manufacturer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return title
    .replace(new RegExp(`\\s*${escaped}\\s*`, "gi"), " ")
    .replace(/\s+/g, " ")
    .trim();
}
