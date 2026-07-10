/**
 * Переносит PageMeta со старых path (?equipment_category=...) на новые (/oborudovanie/gas-meters).
 *
 * Запуск:
 *   node scripts/migrate-page-meta-paths.mjs
 *   node scripts/migrate-page-meta-paths.mjs --dry-run
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

const CATALOG_FILTER_PARAMS = {
  equipment: {
    category: "equipment_category",
    subcategory: "equipment_subcategory",
    list: "equipment_list"
  },
  services: {
    category: "services_category",
    list: "services_list"
  }
};

const EQUIPMENT_CATEGORY_TO_SLUG = {
  "Счётчики газа": "gas-meters",
  Телеметрия: "telemetry",
  ПО: "software",
  "Дополнительное оборудование": "additional-equipment",
  "Кабели БПЭК": "bpek-cables",
  Датчики: "sensors",
  "Газорегуляторные пункты": "sensors",
  ГРПШ: "gas-metering-units",
  Фильтры: "filters",
  Насосы: "pumps",
  "Краны шаровые": "ball-valves",
  "Корректоры газа": "gas-correctors"
};

const GAS_METER_SUBCATEGORY_SLUGS = {
  "СМТ-Комплексы": "smt-kompleks",
  Мембранные: "membrane",
  Ротационные: "rotary",
  Турбинные: "turbine",
  "Комплексы СГ-ТК": "sg-tk",
  "СГ-ТК-Т (на базе турбинных счетчиков газа)": "sg-tk-t",
  "СГ-ТК-Р (на базе ротационных счетчиков газа)": "sg-tk-r",
  "СГ-ТК-Д (на базе диафрагменных счетчиков газа)": "sg-tk-d",
  "Комплексы СГ-ЭК": "sg-ek"
};

const PUMP_SUBCATEGORY_SLUGS = {
  "Интеллектуальные циркуляционные насосы с «мокрым» ротором": "intelligent-wet-rotor",
  "Трехскоростные циркуляционные насосы с «мокрым» ротором": "three-speed-wet-rotor",
  "Линейные циркуляционные насосы": "inline-circulation",
  "Вертикальные многоступенчатые центробежные насосы": "vertical-multistage",
  "Горизонтальные многоступенчатые центробежные насосы": "horizontal-multistage",
  "Консольно-моноблочные центробежные насосы": "monoblock-console",
  "Центробежные насосы консольного типа": "console-centrifugal",
  "Погружные канализационные насосы": "submersible-sewage"
};

const SERVICE_CATEGORY_SLUGS = {
  Инжиниринг: "inzhiniring",
  Сервис: "servis"
};

function normalizeEquipmentCategory(category) {
  return category === "Газорегуляторные пункты" ? "Датчики" : category;
}

function buildEquipmentPath(category, subcategory) {
  const categorySlug = EQUIPMENT_CATEGORY_TO_SLUG[normalizeEquipmentCategory(category)];
  if (!categorySlug) return null;

  let path = `/oborudovanie/${categorySlug}`;
  if (subcategory) {
    let subSlug = null;
    if (category === "Счётчики газа" || normalizeEquipmentCategory(category) === "Счётчики газа") {
      subSlug = GAS_METER_SUBCATEGORY_SLUGS[subcategory];
    }
    if (category === "Насосы") {
      subSlug = PUMP_SUBCATEGORY_SLUGS[subcategory];
    }
    if (subSlug) {
      path = `${path}/${subSlug}`;
    }
  }

  return path;
}

function legacyPathToCurrent(path) {
  const [pathname, search = ""] = path.split("?");
  const params = new URLSearchParams(search);

  if (pathname === "/oborudovanie") {
    const category = params.get(CATALOG_FILTER_PARAMS.equipment.category);
    const subcategory = params.get(CATALOG_FILTER_PARAMS.equipment.subcategory) ?? undefined;
    const list = params.get(CATALOG_FILTER_PARAMS.equipment.list) === "1";
    if (!category) return null;

    const nextPath = buildEquipmentPath(category, subcategory);
    if (!nextPath) return null;
    return list ? `${nextPath}?${CATALOG_FILTER_PARAMS.equipment.list}=1` : nextPath;
  }

  if (pathname === "/uslugi") {
    const category = params.get(CATALOG_FILTER_PARAMS.services.category);
    const list = params.get(CATALOG_FILTER_PARAMS.services.list) === "1";
    if (!category) return null;

    const slug = SERVICE_CATEGORY_SLUGS[category];
    if (!slug) return null;

    const nextPath = `/uslugi/${slug}`;
    return list ? `${nextPath}?${CATALOG_FILTER_PARAMS.services.list}=1` : nextPath;
  }

  return null;
}

async function main() {
  const rows = await prisma.pageMeta.findMany({ orderBy: { path: "asc" } });
  let migrated = 0;
  let skipped = 0;
  let deleted = 0;

  for (const row of rows) {
    const nextPath = legacyPathToCurrent(row.path);
    if (!nextPath || nextPath === row.path) {
      skipped += 1;
      continue;
    }

    console.log(`\n${row.path}\n  -> ${nextPath}`);
    console.log(`  title: ${row.title}`);

    if (dryRun) {
      migrated += 1;
      continue;
    }

    await prisma.pageMeta.upsert({
      where: { path: nextPath },
      create: {
        path: nextPath,
        title: row.title,
        description: row.description
      },
      update: {
        title: row.title,
        description: row.description
      }
    });

    await prisma.pageMeta.delete({ where: { id: row.id } });
    migrated += 1;
    deleted += 1;
  }

  console.log(
    `\nDone.${dryRun ? " (dry run)" : ""} Migrated: ${migrated}, skipped: ${skipped}, deleted legacy: ${deleted}`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
