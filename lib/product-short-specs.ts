export const BALL_VALVE_CATEGORY = "Краны шаровые";

export const VALVE_SHORT_SPEC_KEYS = [
  "Газовый",
  "Материал",
  "Тип присоединения",
  "Тип резьбы",
  "Номинальное давление (PN)",
  "Max температура применения",
  "Условный диаметр DN"
] as const;

const DN_ALIASES = ["Условный диаметр DN", "Диаметр трубы"] as const;

export function getOrderedShortSpecs(specs: Record<string, string>): [string, string][] {
  const rows: [string, string][] = [];

  for (const key of VALVE_SHORT_SPEC_KEYS) {
    if (key === "Условный диаметр DN") {
      const value = DN_ALIASES.map((alias) => specs[alias]).find(Boolean);
      if (value) rows.push([key, value]);
      continue;
    }

    const value = specs[key];
    if (value) rows.push([key, value]);
  }

  return rows;
}
