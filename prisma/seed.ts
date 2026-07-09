import { PrismaClient } from "@prisma/client";
import { SMT_KOMPLEKS_CONTENT } from "../lib/product-content/smt-kompleks";
import { SMT_KOMPLEKS_G40_CONTENT } from "../lib/product-content/smt-kompleks-g40";
import { SMT_KOMPLEKS_G65_G100_CONTENT } from "../lib/product-content/smt-kompleks-g65-g100";
import { SMT_KOMPLEKS_K_CONTENT } from "../lib/product-content/smt-kompleks-k";
import { SMT_SMART_CONTENT } from "../lib/product-content/smt-smart";
import { SMT_SMART_K_CONTENT } from "../lib/product-content/smt-smart-k";
import { SMT_SMART_DKZ_CONTENT } from "../lib/product-content/smt-smart-dkz";
import { SMT_SMART_110_CONTENT } from "../lib/product-content/smt-smart-110";
import { RASKO_VK_COMMUNAL_SHORT_DESCRIPTION, RASKO_VK_SHORT_DESCRIPTION } from "../lib/product-content/rasko-vk";
import {
  RGR_R_CARD_IMAGE,
  RGR_R_GALLERY,
  RGR_R_PRODUCTS,
  buildRgrListingDescription,
  RGR_R_SHORT_DESCRIPTION
} from "../lib/product-content/rgr-r";
import {
  RVG_CARD_IMAGE,
  RVG_GALLERY,
  RVG_PRODUCTS,
  buildRvgListingDescription,
  RVG_SHORT_DESCRIPTION
} from "../lib/product-content/rvg";
import { RABO_CARD_IMAGE, RABO_GALLERY, RABO_PRODUCTS, buildRaboListingDescription, RABO_SHORT_DESCRIPTION } from "../lib/product-content/rabo";
import {
  RGT_T_CARD_IMAGE,
  RGT_T_GALLERY,
  RGT_T_PRODUCTS,
  buildRgtListingDescription,
  RGT_T_SHORT_DESCRIPTION
} from "../lib/product-content/rgt-t";
import {
  SG_TK_CARD_IMAGE,
  SG_TK_D_CARD_DESCRIPTION,
  SG_TK_D_SLUG,
  SG_TK_D_TITLE,
  SG_TK_GALLERY,
  SG_TK_R_CARD_DESCRIPTION,
  SG_TK_R_SLUG,
  SG_TK_R_TITLE,
  SG_TK_SHORT_DESCRIPTION,
  SG_TK_T_CARD_DESCRIPTION,
  SG_TK_T_CARD_IMAGE,
  SG_TK_T_GALLERY,
  SG_TK_T_SLUG,
  SG_TK_T_TITLE
} from "../lib/product-content/sg-tk-kompleks";
import {
  SG_EK_CARD_DESCRIPTION,
  SG_EK_CARD_IMAGE,
  SG_EK_GALLERY,
  SG_EK_SHORT_DESCRIPTION,
  SG_EK_SLUG,
  SG_EK_TITLE
} from "../lib/product-content/sg-ek-kompleks";
import {
  GAS_METER_ACCESSORIES_CARD_IMAGE,
  GAS_METER_ACCESSORIES_ROTARY_SLUG,
  GAS_METER_ACCESSORIES_TURBINE_SLUG,
  GAS_METER_ACCESSORIES_SHORT_DESCRIPTION,
  GAS_METER_ACCESSORIES_TITLE,
  GAS_METER_ACCESSORIES_TURBINE_SLUG
} from "../lib/product-content/gas-meter-accessories";
import {
  GAS_METER_KPU_CARD_IMAGE,
  GAS_METER_KPU_SHORT_DESCRIPTION,
  GAS_METER_KPU_SLUG,
  GAS_METER_KPU_TITLE,
  GAS_METER_KPU_TURBINE_SHORT_DESCRIPTION,
  GAS_METER_KPU_TURBINE_SLUG,
  GAS_METER_KPU_TURBINE_TITLE,
  GAS_METER_KPU_SG_SHORT_DESCRIPTION,
  GAS_METER_KPU_SG_SLUG,
  GAS_METER_KPU_SG_TITLE
} from "../lib/product-content/gas-meter-kpu";
import {
  RASKO_FG_CARD_IMAGE,
  RASKO_FG_GALLERY,
  RASKO_FG_PRODUCTS,
  RASKO_FG_SHORT_DESCRIPTION,
  buildFgListingDescription,
  buildFgSeedSpecs
} from "../lib/product-content/rasko-fg-filters";
import {
  KORREKTOR_TS220_CARD_DESCRIPTION,
  KORREKTOR_TS220_CARD_IMAGE,
  KORREKTOR_TS220_GALLERY,
  KORREKTOR_TS220_SLUG
} from "../lib/product-content/korrektor-ts220";
import {
  KORREKTOR_EK270_CARD_DESCRIPTION,
  KORREKTOR_EK270_CARD_IMAGE,
  KORREKTOR_EK270_GALLERY,
  KORREKTOR_EK270_SLUG
} from "../lib/product-content/korrektor-ek270";
import {
  PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_DESCRIPTION,
  PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_IMAGE,
  PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_GALLERY,
  PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_SLUG
} from "../lib/product-content/preobrazovateli-i-kmch-dlya-korrektorov";
import {
  GAS_METER_PURPOSE_INDUSTRIAL,
  GAS_METER_SUBCATEGORY_SG_TK_D,
  GAS_METER_SUBCATEGORY_SG_TK_R,
  GAS_METER_SUBCATEGORY_SG_TK_T
} from "../lib/gas-meters-catalog";
import {
  GRP_SH_04_IMAGE,
  GRP_SH_10MS_IMAGE,
  GRP_SH_32_IMAGE
} from "../lib/gas-metering-units-media";
import { CDL_VERTICAL_PUMPS, type VerticalMultistagePumpRow } from "./data/cdl-vertical-pumps";
import { CHJ_HORIZONTAL_PUMPS } from "./data/chj-horizontal-pumps";
import { CHL_HORIZONTAL_PUMPS } from "./data/chl-horizontal-pumps";
import { CHT_HORIZONTAL_PUMPS, type HorizontalMultistagePumpRow } from "./data/cht-horizontal-pumps";
import { CDLF_VERTICAL_PUMPS } from "./data/cdlf-vertical-pumps";
import { GSM_CONSOLE_CENTRIFUGAL_PUMPS, type ConsoleCentrifugalPumpRow } from "./data/gsm-console-centrifugal-pumps";
import { GF_MONOBLOCK_PUMPS } from "./data/gf-monoblock-pumps";
import { GFM_MONOBLOCK_PUMPS, type MonoblockConsolePumpRow } from "./data/gfm-monoblock-pumps";
import { WQ_SUBMERSIBLE_SEWAGE_PUMPS, WQK_SUBMERSIBLE_SEWAGE_PUMPS, type SubmersibleSewagePumpRow } from "./data/wq-submersible-sewage-pumps";
import { GTD_INLINE_PUMPS, type InlineCirculationPumpRow } from "./data/gtd-inline-pumps";

const prisma = new PrismaClient();

function richContentIntro(
  content: typeof SMT_KOMPLEKS_CONTENT,
  maxParagraphs = 3
) {
  return content.description
    .filter((block) => block.type === "paragraph")
    .slice(0, maxParagraphs)
    .map((block) => block.text)
    .join("\n\n");
}

const smtKompleksDetailsIntro = richContentIntro(SMT_KOMPLEKS_CONTENT);
const smtKompleksKDetailsIntro = richContentIntro(SMT_KOMPLEKS_K_CONTENT, 4);
const smtKompleksG40DetailsIntro = richContentIntro(SMT_KOMPLEKS_G40_CONTENT);
const smtKompleksG65G100DetailsIntro = richContentIntro(SMT_KOMPLEKS_G65_G100_CONTENT);
const smtSmartDetailsIntro = richContentIntro(SMT_SMART_CONTENT);
const smtSmartKDetailsIntro = richContentIntro(SMT_SMART_K_CONTENT, 4);
const smtSmartDkzDetailsIntro = richContentIntro(SMT_SMART_DKZ_CONTENT, 4);
const smtSmart110DetailsIntro = richContentIntro(SMT_SMART_110_CONTENT);

const GRP_SHKAFNY_CATEGORY = "Газорегуляторные пункты шкафного исполнения";

const CABLE_MANUFACTURER = "Техномер";
const RASKO_MANUFACTURER = "РАСКО";

const SMT_KOMPLEKS_TYPE_SIZES = "G4, G6, G10, G16, G25";
const SMT_SMART_TYPE_SIZES = "G4, G6, G10";
const SMT_SMART_110_TYPE_SIZES = "G4, G6";
const SMT_KOMPLEKS_G40_TYPE_SIZES = "G40, G40-2";
const SMT_KOMPLEKS_G65_G100_TYPE_SIZES = "G65, G100";

const BPEK_EK_CABLE_DESCRIPTION =
  "Для подключения модулей телеметрии БПЭК к электронным корректорам ЕК260, ЕК270, ЕК280, ЕК290, счётчикам газа СМТ-Комплекс (до 50 м).";

const BPEK_EK_CABLE_LENGTHS = [5, 10, 20, 30, 40, 50, 100] as const;

const BPEK_SMT_TM07_CABLE_DESCRIPTION =
  "Для подключения цифровых коммуникационных блоков БПЭК-ЦК к корректору ТМ-07, а также для подключения БПЭК-03/ЦК к счётчикам газа СМТ-Комплекс.";

const BPEK_SMT_TM07_CABLE_LENGTHS = [5, 10, 20, 30, 40, 50] as const;

const BPEK_TS_CABLE_DESCRIPTION =
  "Для подключения модулей телеметрии БПЭК к электронным корректорам ТС220.";

const BPEK_TS_CABLE_LENGTHS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] as const;

const BPEK_FLOWGAZ_CABLE_DESCRIPTION =
  "Для подключения модулей телеметрии БПЭК к электронным корректорам Флоугаз, Флоугаз-Т, Ultramag.";

const BPEK_FLOWGAZ_CABLE_LENGTHS = [5, 10, 20, 30, 40, 50, 100] as const;

const GSM_ANTENNA_CABLE_DESCRIPTION =
  "Предназначен для выноса антенны от БПЭК для улучшения приёма сигнала, длина кабеля 8м.";

const POWER_ELEMENTS_DESCRIPTION =
  "ER34615M-PHR3\nFANSO\nТМР.563121.001\nER34615M FANSO";

const BPEK_VKG_CABLE_DESCRIPTION =
  "Для подключения модулей телеметрии БПЭК к электронным корректорам ВКГ.";

const BPEK_VKG_CABLE_LENGTHS = [5, 10, 20, 30, 40, 50] as const;

const BPEK_SPG_IRVIS_CABLE_DESCRIPTION =
  "Для подключения модулей телеметрии БПЭК к электронным корректорам СПГ, Ирвис.";

const BPEK_SPG_IRVIS_CABLE_LENGTHS = [5, 10, 20, 30, 40, 50] as const;

function cablePriceByLength(prices: Record<number, string>, length: number) {
  return prices[length] ?? "0";
}

const BPEK_EK_CABLE_PRICES: Record<number, string> = {
  5: "2700",
  10: "4510",
  20: "7570",
  30: "10520",
  40: "13710",
  50: "16910",
  100: "32670"
};

const BPEK_SMT_TM07_CABLE_PRICES: Record<number, string> = {
  5: "2570",
  10: "4030",
  20: "6960",
  30: "10010",
  40: "13060",
  50: "15870"
};

const BPEK_TS_CABLE_PRICES: Record<number, string> = {
  5: "4260",
  10: "6240",
  15: "7790",
  20: "9400",
  25: "10880",
  30: "12490",
  35: "14040",
  40: "15980",
  45: "17640",
  50: "19460"
};

const BPEK_FLOWGAZ_CABLE_PRICES: Record<number, string> = {
  5: "2820",
  10: "4430",
  20: "7690",
  30: "11020",
  40: "14350",
  50: "18330",
  100: "37750"
};

const BPEK_VKG_CABLE_PRICES: Record<number, string> = {
  5: "2220",
  10: "3570",
  20: "6260",
  30: "8950",
  40: "10560",
  50: "13970"
};

const BPEK_SPG_IRVIS_CABLE_PRICES: Record<number, string> = {
  5: "2700",
  10: "4510",
  20: "7570",
  30: "10520",
  40: "13710",
  50: "16910"
};

function bulletDetails(lines: string[]) {
  return lines.map((line) => `• ${line}`).join("\n");
}

const PUMP_INTELLIGENT_SUBCATEGORY =
  "Интеллектуальные циркуляционные насосы с «мокрым» ротором";

const PUMP_INTELLIGENT_IMAGE_1 = "/media/products/pumps/intelligent-wet-rotor/1.png";
const PUMP_INTELLIGENT_IMAGE_3 = "/media/products/pumps/intelligent-wet-rotor/3.png";
const PUMP_INTELLIGENT_IMAGE_4 = "/media/products/pumps/intelligent-wet-rotor/4.png";
const PUMP_INTELLIGENT_IMAGE_5 = "/media/products/pumps/intelligent-wet-rotor/5.png";

const PUMP_INTELLIGENT_DETAILS_GEB =
  "Насосы серии GEB представляют собой высокоэффективные интеллектуальные циркуляционные насосы с «мокрым» ротором. Насос оснащён двигателем с постоянным магнитом и адаптивной системой выбора режима.";

const PUMP_INTELLIGENT_DETAILS_GEM =
  "Насосы серии GEM представляют собой высокоэффективные интеллектуальные циркуляционные насосы с «мокрым» ротором. Насос оснащён двигателем с постоянным магнитом и «умной» системой контроля давления.";

const PUMP_INTELLIGENT_DETAILS_GEM_PRO =
  "Насосы серии GEM-PRO представляют собой высокоэффективные интеллектуальные циркуляционные насосы с «мокрым» ротором в корпусе из чугуна. Насос оснащён двигателем с постоянным магнитом и «умной» системой контроля давления.";

const PUMP_INTELLIGENT_DETAILS_GEM_FN_PRO =
  "Насосы серии GEM FN-PRO представляют собой высокоэффективные интеллектуальные циркуляционные насосы с «мокрым» ротором в корпусе из нержавеющей стали. Насос оснащён двигателем с постоянным магнитом и «умной» системой контроля давления.";

type IntelligentPumpRow = {
  model: string;
  connection?: string;
  dn?: string;
  power: string;
  flow: string;
  head: string;
  material: string;
  image: string;
};

const INTELLIGENT_WET_ROTOR_PUMPS: IntelligentPumpRow[] = [
  {
    model: "GEB25-4-180",
    connection: "G1½\"",
    power: "9 ~ 60",
    flow: "6,5",
    head: "4",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-6-180",
    connection: "G1½\"",
    power: "9 ~ 105",
    flow: "7,5",
    head: "6",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-8-180",
    connection: "G1½\"",
    power: "9 ~ 150",
    flow: "8,5",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-10-180",
    connection: "G1½\"",
    power: "9 ~ 200",
    flow: "9,5",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-12-180",
    connection: "G1½\"",
    power: "9 ~ 220",
    flow: "9,7",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-4-180",
    connection: "G1½\"",
    power: "9 ~ 78",
    flow: "7,6",
    head: "4",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-6-180",
    connection: "G1½\"",
    power: "9 ~ 120",
    flow: "9,2",
    head: "6",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-8-180",
    connection: "G1½\"",
    power: "9 ~ 168",
    flow: "10,2",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-10-180",
    connection: "G1½\"",
    power: "9 ~ 200",
    flow: "10,5",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-12-180",
    connection: "G1½\"",
    power: "9 ~ 220",
    flow: "9,7",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-4-180N",
    connection: "1½\"",
    power: "9 ~ 60",
    flow: "6,5",
    head: "4",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-6-180N",
    connection: "1½\"",
    power: "9 ~ 105",
    flow: "7,5",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-8-180N",
    connection: "1½\"",
    power: "9 ~ 150",
    flow: "8,5",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-10-180N",
    connection: "1½\"",
    power: "9 ~ 200",
    flow: "9,5",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB25-12-180N",
    connection: "1½\"",
    power: "9 ~ 220",
    flow: "9,7",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-4-180N",
    connection: "2\"",
    power: "9 ~ 78",
    flow: "7,6",
    head: "4",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-6-180N",
    connection: "2\"",
    power: "9 ~ 120",
    flow: "9,2",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-8-180N",
    connection: "2\"",
    power: "9 ~ 168",
    flow: "10,2",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-10-180N",
    connection: "2\"",
    power: "9 ~ 200",
    flow: "10,5",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEB32-12-180N",
    connection: "2\"",
    power: "9 ~ 220",
    flow: "9,7",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_1
  },
  {
    model: "GEM32-120FN",
    dn: "DN32",
    power: "15 ~ 329",
    flow: "11",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM40-80FN",
    dn: "DN40",
    power: "17 ~ 370",
    flow: "22",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM40-100FN",
    dn: "DN40",
    power: "17 ~ 370",
    flow: "22",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM40-120FN",
    dn: "DN40",
    power: "15 ~ 463",
    flow: "24",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM40-150FN",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM40-180FN",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "18",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-60FN",
    dn: "DN50",
    power: "21 ~ 252",
    flow: "24,5",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-80FN",
    dn: "DN50",
    power: "21 ~ 331",
    flow: "27",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-100FN",
    dn: "DN50",
    power: "21 ~ 425",
    flow: "30",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-120FN",
    dn: "DN50",
    power: "20 ~ 533",
    flow: "33",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-150FN",
    dn: "DN50",
    power: "22 ~ 649",
    flow: "35",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM50-180FN",
    dn: "DN50",
    power: "22 ~ 769",
    flow: "37,5",
    head: "18",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-40FN",
    dn: "DN65",
    power: "23 ~ 190",
    flow: "28,5",
    head: "4",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-60FN",
    dn: "DN65",
    power: "23 ~ 365",
    flow: "36",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-80FN",
    dn: "DN65",
    power: "24 ~ 476",
    flow: "40",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-100FN",
    dn: "DN65",
    power: "25 ~ 619",
    flow: "44",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-120FN",
    dn: "DN65",
    power: "24 ~ 774",
    flow: "47",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM65-150FN",
    dn: "DN65",
    power: "31 ~ 1263",
    flow: "56",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_3
  },
  {
    model: "GEM32-120F-PRO",
    dn: "DN32",
    power: "15 ~ 329",
    flow: "17",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM40-80F-PRO",
    dn: "DN40",
    power: "17 ~ 267",
    flow: "19",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM40-100F-PRO",
    dn: "DN40",
    power: "17 ~ 370",
    flow: "22",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM40-120F-PRO",
    dn: "DN40",
    power: "15 ~ 463",
    flow: "24",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM40-150F-PRO",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "15",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM40-180F-PRO",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "18",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-60F-PRO",
    dn: "DN50",
    power: "21 ~ 252",
    flow: "24,7",
    head: "6",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-80F-PRO",
    dn: "DN50",
    power: "21 ~ 331",
    flow: "27",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-100F-PRO",
    dn: "DN50",
    power: "21 ~ 425",
    flow: "30",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-120F-PRO",
    dn: "DN50",
    power: "20 ~ 533",
    flow: "33",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-150F-PRO",
    dn: "DN50",
    power: "23 ~ 649",
    flow: "35",
    head: "15",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM50-180F-PRO",
    dn: "DN50",
    power: "22 ~ 769",
    flow: "37,5",
    head: "18",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-40F-PRO",
    dn: "DN65",
    power: "23 ~ 190",
    flow: "26",
    head: "4",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-60F-PRO",
    dn: "DN65",
    power: "23 ~ 365",
    flow: "32",
    head: "6",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-80F-PRO",
    dn: "DN65",
    power: "24 ~ 476",
    flow: "35",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-100F-PRO",
    dn: "DN65",
    power: "25 ~ 619",
    flow: "37",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-120F-PRO",
    dn: "DN65",
    power: "24 ~ 774",
    flow: "40",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM65-150F-PRO",
    dn: "DN65",
    power: "31 ~ 1263",
    flow: "49",
    head: "15",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM80-60F-PRO",
    dn: "DN80",
    power: "24 ~ 550",
    flow: "44,5",
    head: "6",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM80-80F-PRO",
    dn: "DN80",
    power: "26 ~ 750",
    flow: "49,5",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM80-100F-PRO",
    dn: "DN80",
    power: "33 ~ 1014",
    flow: "50",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM80-120F-PRO",
    dn: "DN80",
    power: "33 ~ 1277",
    flow: "60",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM100-80F-PRO",
    dn: "DN100",
    power: "32 ~ 1067",
    flow: "58",
    head: "8",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM100-100F-PRO",
    dn: "DN100",
    power: "32 ~ 1413",
    flow: "63",
    head: "10",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM100-120F-PRO",
    dn: "DN100",
    power: "32 ~ 1523",
    flow: "63",
    head: "12",
    material: "чугун",
    image: PUMP_INTELLIGENT_IMAGE_4
  },
  {
    model: "GEM32-120FN-PRO",
    dn: "DN32",
    power: "15 ~ 329",
    flow: "17",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM40-80FN-PRO",
    dn: "DN40",
    power: "17 ~ 267",
    flow: "19",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM40-100FN-PRO",
    dn: "DN40",
    power: "17 ~ 370",
    flow: "22",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM40-120FN-PRO",
    dn: "DN40",
    power: "15 ~ 463",
    flow: "24",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM40-150FN-PRO",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM40-180FN-PRO",
    dn: "DN40",
    power: "16 ~ 615",
    flow: "26,2",
    head: "18",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-60FN-PRO",
    dn: "DN50",
    power: "21 ~ 252",
    flow: "24,7",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-80FN-PRO",
    dn: "DN50",
    power: "21 ~ 331",
    flow: "27",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-100FN-PRO",
    dn: "DN50",
    power: "21 ~ 425",
    flow: "30",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-120FN-PRO",
    dn: "DN50",
    power: "20 ~ 533",
    flow: "33",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-150FN-PRO",
    dn: "DN50",
    power: "23 ~ 649",
    flow: "35",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM50-180FN-PRO",
    dn: "DN50",
    power: "22 ~ 769",
    flow: "37,5",
    head: "18",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-40FN-PRO",
    dn: "DN65",
    power: "23 ~ 190",
    flow: "26",
    head: "4",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-60FN-PRO",
    dn: "DN65",
    power: "23 ~ 365",
    flow: "32",
    head: "6",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-80FN-PRO",
    dn: "DN65",
    power: "24 ~ 476",
    flow: "35",
    head: "8",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-100FN-PRO",
    dn: "DN65",
    power: "25 ~ 619",
    flow: "37",
    head: "10",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-120FN-PRO",
    dn: "DN65",
    power: "24 ~ 774",
    flow: "40",
    head: "12",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  },
  {
    model: "GEM65-150FN-PRO",
    dn: "DN65",
    power: "31 ~ 1263",
    flow: "49",
    head: "15",
    material: "нержав. сталь",
    image: PUMP_INTELLIGENT_IMAGE_5
  }
];

function intelligentPumpDescription(row: IntelligentPumpRow) {
  const lines = [
    row.connection ? `Присоединение: ${row.connection}` : `Номинальный диаметр: ${row.dn}`,
    "Питание: 1×220В / 50Гц",
    `Мощность: ${row.power} Вт`,
    `Пропускная способность: ${row.flow} м³/ч`,
    `Напор: ${row.head} м`,
    `Материал корпуса: ${row.material}`
  ];

  return lines.join("\n");
}

function intelligentPumpSpecs(row: IntelligentPumpRow) {
  return {
    Модель: row.model,
    Подкатегория: PUMP_INTELLIGENT_SUBCATEGORY,
    ...(row.connection ? { Присоединение: row.connection } : { "Номинальный диаметр": row.dn! }),
    Питание: "1×220В / 50Гц",
    Мощность: `${row.power} Вт`,
    "Пропускная способность": `${row.flow} м³/ч`,
    Напор: `${row.head} м`,
    "Материал корпуса": row.material
  };
}

function intelligentPumpSlug(model: string) {
  return `nasos-${model.toLowerCase()}`;
}

function intelligentPumpDetailsText(model: string) {
  if (model.endsWith("FN-PRO")) {
    return PUMP_INTELLIGENT_DETAILS_GEM_FN_PRO;
  }
  if (model.includes("-PRO")) {
    return PUMP_INTELLIGENT_DETAILS_GEM_PRO;
  }
  if (model.startsWith("GEM")) {
    return PUMP_INTELLIGENT_DETAILS_GEM;
  }
  return PUMP_INTELLIGENT_DETAILS_GEB;
}

const intelligentWetRotorPumpProducts = INTELLIGENT_WET_ROTOR_PUMPS.map((row) => ({
  title: `Интеллектуальный циркуляционный насос ${row.model}`,
  slug: intelligentPumpSlug(row.model),
  kind: "Товар" as const,
  category: "Насосы",
  description: intelligentPumpDescription(row),
  details: intelligentPumpDetailsText(row.model),
  specs: intelligentPumpSpecs(row),
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: row.image,
  gallery: [row.image]
}));

const PUMP_THREE_SPEED_SUBCATEGORY =
  "Трехскоростные циркуляционные насосы с «мокрым» ротором";

const PUMP_THREE_SPEED_GALLERY_IMAGE = "/media/categories/pumps/three-speed-wet-rotor.webp";
const PUMP_THREE_SPEED_CARD_IMAGE = "/media/categories/pumps/three-speed-wet-rotor-card.webp";

const PUMP_THREE_SPEED_SHORT_DESCRIPTION = [
  "Бесшумная работа",
  "Отсутствие вибрации",
  "Возможность регулировки режимов работы"
].join("\n");

const PUMP_THREE_SPEED_DETAILS_GS_F =
  "Насосы серии GS-F представляют собой трехскоростные циркуляционные насосы с «мокрым» ротором. Предназначен для обеспечения циркуляции жидкости в системах отопления, охлаждения, кондиционирования и горячего водоснабжения различных объектов.";

const PUMP_THREE_SPEED_DETAILS_UPS =
  "Насосы серии UPS представляют собой трехскоростные циркуляционные насосы с «мокрым» ротором. Предназначен для обеспечения циркуляции жидкости в системах отопления, охлаждения, кондиционирования и горячего водоснабжения различных объектов.";

type ThreeSpeedPumpRow = {
  model: string;
  dn: string;
  supply: string;
  power: string;
  current?: string;
  flow: string;
  head: string;
  series?: "GS-F" | "UPS";
};

const THREE_SPEED_WET_ROTOR_PUMPS: ThreeSpeedPumpRow[] = [
  {
    model: "GS32-6-220TF",
    dn: "DN32",
    supply: "3×380В / 50Гц",
    power: "250 / 175 / 155",
    current: "0,53 / 0,29 / 0,26",
    flow: "12 / 10,2 / 9,5",
    head: "6,3 / 5,8 / 5,6"
  },
  {
    model: "GS32-12-220TF",
    dn: "DN32",
    supply: "3×380В / 50Гц",
    power: "400 / 280 / 250",
    current: "0,79 / 0,46 / 0,4",
    flow: "13 / 11 / 10",
    head: "9 / 8 / 7,5"
  },
  {
    model: "GS40-6-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "260 / 180 / 170",
    current: "0,62 / 0,4 / 0,35",
    flow: "16 / 13 / 12",
    head: "5,8 / 5,3 / 5"
  },
  {
    model: "GS40-12-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "585 / 430 / 420",
    current: "1,15 / 0,75 / 0,73",
    flow: "23 / 18 / 11,5",
    head: "9,5 / 8,5 / 7"
  },
  {
    model: "GS40-18-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "750 / 520 / 450",
    current: "1,4 / 0,87 / 0,75",
    flow: "15,3 / 12,7 / 11,6",
    head: "12,2 / 10,2 / 9,3"
  },
  {
    model: "GS40-18.5-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "1050 / 695 / 585",
    current: "2 / 1,24 / 1,1",
    flow: "17,5 / 13,1 / 11,2",
    head: "17 / 12,5 / 11"
  },
  {
    model: "GS50-6-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "400 / 260 / 220",
    current: "0,85 / 0,48 / 0,4",
    flow: "15,5 / 12,6 / 11,4",
    head: "6 / 5 / 4,5"
  },
  {
    model: "GS50-12-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "710 / 490 / 430",
    current: "1,6 / 1 / 0,8",
    flow: "20,1 / 17 / 15,2",
    head: "9,2 / 8,2 / 7,5"
  },
  {
    model: "GS50-18-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "1150 / 735 / 615",
    current: "2,1 / 1,3 / 1,1",
    flow: "25,9 / 19,6 / 17,6",
    head: "13 / 10,8 / 10"
  },
  {
    model: "GS50-18.5-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "1350 / 1000 / 900",
    current: "3 / 1,8 / 1,6",
    flow: "24,7 / 22,1 / 20,6",
    head: "18 / 15 / 14"
  },
  {
    model: "GS65-6-340TF",
    dn: "DN65",
    supply: "3×380В / 50Гц",
    power: "575 / 420 / 380",
    current: "1,3 / 0,78 / 0,66",
    flow: "25,3 / 22,4 / 21",
    head: "7 / 6,5 / 6"
  },
  {
    model: "GS65-12-340TF",
    dn: "DN65",
    supply: "3×380В / 50Гц",
    power: "1030 / 670 / 560",
    current: "2 / 1,2 / 1",
    flow: "36 / 27,4 / 24",
    head: "8,5 / 7,5 / 7"
  },
  {
    model: "GS65-18-340TF",
    dn: "DN65",
    supply: "3×380В / 50Гц",
    power: "1390 / 1000 / 900",
    current: "3,3 / 2 / 1,8",
    flow: "40,8 / 34,5 / 22,8",
    head: "13,5 / 12 / 11"
  },
  {
    model: "GS65-18.5-340TF",
    dn: "DN65",
    supply: "3×380В / 50Гц",
    power: "1900 / 1300 / 1120",
    current: "3,6 / 2,3 / 2",
    flow: "44,5 / 35,9 / 32,4",
    head: "18 / 15 / 14"
  },
  {
    model: "GS80-6-360TF",
    dn: "DN80",
    supply: "3×380В / 50Гц",
    power: "800 / 500 / 420",
    current: "2,5 / 1,1 / 0,9",
    flow: "44 / 35,5 / 32",
    head: "5 / 4,5 / 4"
  },
  {
    model: "GS80-12-360TF",
    dn: "DN80",
    supply: "3×380В / 50Гц",
    power: "1250 / 910 / 830",
    current: "2,7 / 1,7 / 1,5",
    flow: "52,8 / 44,1 / 40,6",
    head: "9,2 / 8,2 / 7,6"
  },
  {
    model: "GS32-6-220F",
    dn: "DN32",
    supply: "1×220В / 50Гц",
    power: "245 / 215 / 205",
    current: "1,25 / 1,1 / 1",
    flow: "12,2 / 11,2 / 9,5",
    head: "6,3 / 6,1 / 5,8"
  },
  {
    model: "GS32-12-220F",
    dn: "DN32",
    supply: "1×220В / 50Гц",
    power: "400 / 350 / 300",
    current: "1,8 / 1,7 / 1,65",
    flow: "14 / 11,2 / 8",
    head: "9,2 / 8,9 / 8,4"
  },
  {
    model: "GS40-6-250F",
    dn: "DN40",
    supply: "1×220В / 50Гц",
    power: "260 / 240 / 220",
    current: "1,4 / 1,2 / 1,17",
    flow: "17 / 15 / 12,8",
    head: "5,8 / 5,7 / 5,3"
  },
  {
    model: "GS40-12-250F",
    dn: "DN40",
    supply: "1×220В / 50Гц",
    power: "580 / 560 / 540",
    current: "3,1 / 3 / 2,9",
    flow: "19 / 18 / 17",
    head: "10 / 9,5 / 9"
  },
  {
    model: "GS40-18-250F",
    dn: "DN40",
    supply: "1×220В / 50Гц",
    power: "800 / 760 / 720",
    current: "4,1 / 3,5 / 3,4",
    flow: "22 / 21 / 18,5",
    head: "13 / 12,5 / 11,5"
  },
  {
    model: "GS40-18.5-250F",
    dn: "DN40",
    supply: "1×220В / 50Гц",
    power: "1100 / 900 / 750",
    current: "5,4 / 5,5 / 4,9",
    flow: "24 / 19 / 12",
    head: "18,5 / 17 / 14,5"
  },
  {
    model: "GS50-6-280F",
    dn: "DN50",
    supply: "1×220В / 50Гц",
    power: "430 / 390 / 320",
    current: "2,5 / 2,3 / 1,7",
    flow: "18 / 11,5 / 6,8",
    head: "6,4 / 6,1 / 5,8"
  },
  {
    model: "GS50-12-280F",
    dn: "DN50",
    supply: "1×220В / 50Гц",
    power: "780 / 700 / 650",
    current: "4,4 / 4,3 / 4,1",
    flow: "24 / 21 / 14,8",
    head: "9,5 / 9,3 / 9"
  },
  {
    model: "GS50-18-280F",
    dn: "DN50",
    supply: "1×220В / 50Гц",
    power: "1150 / 980 / 810",
    current: "6,2 / 5,2 / 4,4",
    flow: "35 / 25 / 15",
    head: "13 / 12,5 / 11,5"
  },
  {
    model: "GS50-18.5-280F",
    dn: "DN50",
    supply: "1×220В / 50Гц",
    power: "1200 / 1050 / 850",
    current: "6,4 / 5,5 / 4,5",
    flow: "28 / 24 / 15",
    head: "17,5 / 16 / 13,5"
  },
  {
    model: "GS65-6-340F",
    dn: "DN65",
    supply: "1×220В / 50Гц",
    power: "635 / 550 / 520",
    current: "3,3 / 2,9 / 2,7",
    flow: "30 / 29,5 / 28",
    head: "7,2 / 7 / 6,5"
  },
  {
    model: "GS65-12-340F",
    dn: "DN65",
    supply: "1×220В / 50Гц",
    power: "1200 / 1000 / 800",
    current: "6,1 / 5,3 / 4,4",
    flow: "38 / 30 / 20,5",
    head: "9,2 / 9 / 8,4"
  }
];

const THREE_SPEED_UPS_PUMPS: ThreeSpeedPumpRow[] = [
  {
    model: "UPS25-16-230T",
    dn: 'G1"',
    supply: "3×380В / 50Гц",
    power: "700 / 450 / 400",
    flow: "14,5 / 12 / 9,2",
    head: "16 / 13 / 11",
    series: "UPS"
  },
  {
    model: "UPS25-20-230T",
    dn: 'G1"',
    supply: "3×380В / 50Гц",
    power: "1000 / 700 / 600",
    flow: "17 / 14 / 12,5",
    head: "20 / 17 / 14",
    series: "UPS"
  },
  {
    model: "UPS32-8-200F",
    dn: "DN32",
    supply: "1×220В / 50Гц",
    power: "245 / 190 / 135",
    flow: "8 / 5,2 / 3,5",
    head: "8 / 7 / 5",
    series: "UPS"
  },
  {
    model: "UPS40-12-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "700 / 450 / 400",
    flow: "14 / 11,2 / 8",
    head: "14,5 / 12,5 / 11",
    series: "UPS"
  },
  {
    model: "UPS40-16-250TF",
    dn: "DN40",
    supply: "3×380В / 50Гц",
    power: "1000 / 700 / 600",
    flow: "17 / 14 / 12",
    head: "16,2 / 15,5 / 14,5",
    series: "UPS"
  },
  {
    model: "UPS50-12-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "1000 / 700 / 600",
    flow: "24 / 18,5 / 13",
    head: "13,2 / 11 / 10",
    series: "UPS"
  },
  {
    model: "UPS50-20-280TF",
    dn: "DN50",
    supply: "3×380В / 50Гц",
    power: "1300 / 1000 / 900",
    flow: "24,5 / 22 / 18,5",
    head: "20 / 17 / 16",
    series: "UPS"
  },
  {
    model: "UPS65-8-280TF",
    dn: "DN65",
    supply: "3×380В / 50Гц",
    power: "700 / 450 / 400",
    flow: "35 / 28 / 25",
    head: "8,2 / 6,7 / 5,5",
    series: "UPS"
  },
  {
    model: "UPS80-12-300TF",
    dn: "DN80",
    supply: "3×380В / 50Гц",
    power: "1300 / 1000 / 900",
    flow: "41,2 / 35 / 33",
    head: "12,2 / 10 / 9,3",
    series: "UPS"
  }
];

const ALL_THREE_SPEED_WET_ROTOR_PUMPS = [...THREE_SPEED_WET_ROTOR_PUMPS, ...THREE_SPEED_UPS_PUMPS];

function threeSpeedPumpSpecs(row: ThreeSpeedPumpRow) {
  const specs: Record<string, string> = {
    Модель: row.model,
    Подкатегория: PUMP_THREE_SPEED_SUBCATEGORY,
    "Номинальный диаметр": row.dn,
    Питание: row.supply,
    Мощность: `${row.power} Вт`,
    "Пропускная способность": `${row.flow} м³/ч`,
    Напор: `${row.head} м`
  };

  if (row.current) {
    specs.Ток = `${row.current} А`;
  }

  return specs;
}

function threeSpeedPumpDetails(row: ThreeSpeedPumpRow) {
  return row.series === "UPS" ? PUMP_THREE_SPEED_DETAILS_UPS : PUMP_THREE_SPEED_DETAILS_GS_F;
}

function threeSpeedPumpSlug(model: string) {
  return `nasos-${model.toLowerCase()}`;
}

const threeSpeedWetRotorPumpProducts = ALL_THREE_SPEED_WET_ROTOR_PUMPS.map((row) => ({
  title: `Трехскоростной циркуляционный насос ${row.model}`,
  slug: threeSpeedPumpSlug(row.model),
  kind: "Товар" as const,
  category: "Насосы",
  description: PUMP_THREE_SPEED_SHORT_DESCRIPTION,
  details: threeSpeedPumpDetails(row),
  specs: threeSpeedPumpSpecs(row),
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: PUMP_THREE_SPEED_CARD_IMAGE,
  gallery: [PUMP_THREE_SPEED_GALLERY_IMAGE]
}));

const PUMP_INLINE_SUBCATEGORY = "Линейные циркуляционные насосы";

const PUMP_INLINE_GALLERY_IMAGE = "/media/categories/pumps/inline-circulation.webp";
const PUMP_INLINE_CARD_IMAGE = "/media/categories/pumps/inline-circulation-card.webp";

const PUMP_INLINE_SHORT_DESCRIPTION =
  "Циркуляционный центробежный насос линейного исполнения серии GTD";

const PUMP_INLINE_DETAILS =
  "Циркуляционный центробежный насос GTD представляет собой одноступенчатый центробежный насос линейного исполнения. При проектировании используется отлично выполненная гидравлическая модель. Проточная часть насоса изготовлена по технологии точного литья. Технология делает проточную часть гладкой с небольшим трением и высокой эффективностью. Насосы серии GTD не предназначены для перекачивания питьевой воды и работы в централизованных системах водоснабжения.";

const PUMP_INLINE_SUPPLY = "3×380В / 50Гц";

function formatPumpDecimal(value: string) {
  return value.replace(/\./g, ",");
}

function inlinePumpSlug(model: string) {
  return `nasos-${model.toLowerCase().replace(/\./g, "-").replace(/\//g, "-")}`;
}

function inlinePumpSpecs(row: InlineCirculationPumpRow) {
  return {
    Модель: row.model,
    Подкатегория: PUMP_INLINE_SUBCATEGORY,
    "Присоединение вход/выход": row.connection,
    Питание: PUMP_INLINE_SUPPLY,
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": `${formatPumpDecimal(row.currentA)} А`,
    "Номинальный расход": `${formatPumpDecimal(row.flow)} м³/ч`,
    "Номинальный напор": `${formatPumpDecimal(row.head)} м`,
    "Номинальная частота вращения": `${row.speed} об/мин`
  };
}

const inlineCirculationPumpProducts = GTD_INLINE_PUMPS.map((row) => ({
  title: `Линейный циркуляционный насос ${row.model}`,
  slug: inlinePumpSlug(row.model),
  kind: "Товар" as const,
  category: "Насосы",
  description: PUMP_INLINE_SHORT_DESCRIPTION,
  details: PUMP_INLINE_DETAILS,
  specs: inlinePumpSpecs(row),
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: PUMP_INLINE_CARD_IMAGE,
  gallery: [PUMP_INLINE_GALLERY_IMAGE]
}));

const PUMP_VERTICAL_SUBCATEGORY = "Вертикальные многоступенчатые центробежные насосы";

const PUMP_VERTICAL_IMAGE = "/media/categories/pumps/vertical-multistage-card.webp";

const PUMP_VERTICAL_SHORT_DESCRIPTION = [
  "Низкий уровень шума",
  "Малая вибрация",
  "Высокая долговечность"
].join("\n");

const PUMP_VERTICAL_DETAILS =
  "Серия CDL представляет собой вертикальный многоступенчатый центробежный насос с всасывающим и нагнетательным патрубками на одном уровне. Проточная часть выполнена из нержавеющей стали.";

const PUMP_VERTICAL_CDLF_DETAILS =
  "Серия CDLF представляет собой вертикальный многоступенчатый центробежный насос с всасывающим и нагнетательным патрубками на одном уровне. Насос, двигатель и база выполнены из нержавеющей стали.";

const PUMP_VERTICAL_SUPPLY = "3×380В / 50Гц";

function verticalPumpSlug(model: string) {
  return `nasos-${model.toLowerCase()}`;
}

function verticalPumpConnectionToDn(connection: string) {
  const match = connection.match(/^(\d+)x\d+$/i);
  return match ? `DN${match[1]}` : connection;
}

function verticalPumpSpecs(row: VerticalMultistagePumpRow) {
  return {
    Модель: row.model,
    Подкатегория: PUMP_VERTICAL_SUBCATEGORY,
    "Присоединение вход/выход": row.connection,
    "Номинальный диаметр": verticalPumpConnectionToDn(row.connection),
    Питание: PUMP_VERTICAL_SUPPLY,
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": `${formatPumpDecimal(row.currentA)} А`,
    "Пропускная способность": `${formatPumpDecimal(row.flow)} м³/ч`,
    Напор: `${formatPumpDecimal(row.head)} м`,
    "Максимальное рабочее давление": `${row.maxPressure} бар`
  };
}

function buildVerticalMultistagePumpProducts(rows: VerticalMultistagePumpRow[], details: string) {
  return rows.map((row) => ({
    title: `Вертикальный многоступенчатый насос ${row.model}`,
    slug: verticalPumpSlug(row.model),
    kind: "Товар" as const,
    category: "Насосы",
    description: PUMP_VERTICAL_SHORT_DESCRIPTION,
    details,
    specs: verticalPumpSpecs(row),
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: PUMP_VERTICAL_IMAGE,
    gallery: [PUMP_VERTICAL_IMAGE]
  }));
}

const verticalMultistagePumpProducts = [
  ...buildVerticalMultistagePumpProducts(CDL_VERTICAL_PUMPS, PUMP_VERTICAL_DETAILS),
  ...buildVerticalMultistagePumpProducts(CDLF_VERTICAL_PUMPS, PUMP_VERTICAL_CDLF_DETAILS)
];

const PUMP_HORIZONTAL_SUBCATEGORY = "Горизонтальные многоступенчатые центробежные насосы";

const PUMP_CHT_IMAGE = "/media/categories/pumps/horizontal-multistage-card.webp";
const PUMP_CHL_IMAGE = "/media/categories/pumps/chl-horizontal-multistage-card.webp";
const PUMP_CHJ_IMAGE = "/media/categories/pumps/chj-horizontal-multistage-card.webp";

const PUMP_CHT_SHORT_DESCRIPTION = [
  "Горизонтальная компоновка",
  "Проточная часть из нержавеющей стали",
  "Присоединительные патрубки из чугуна"
].join("\n");

const PUMP_CHL_SHORT_DESCRIPTION = [
  "Горизонтальная компоновка",
  "Проточная часть из нержавеющей стали",
  "Присоединительные патрубки из нержавеющей стали"
].join("\n");

const PUMP_CHT_DETAILS =
  "Насосы серии CHT предназначены для перекачивания низковязких, нейтральных, невзрывоопасных жидкостей, не содержащих твердых частиц и волокон, в системах повышения давления в котельных и на промышленных объектах. Они не предназначены для перекачивания питьевой воды и работы в централизованных системах водоснабжения. Проточная часть насоса выполнена из нержавеющей стали. Патрубки присоединительные из чугуна.";

const PUMP_CHL_DETAILS =
  "Насосы серии CHS/CHL предназначены для перекачивания низковязких, нейтральных, невзрывоопасных жидкостей, не содержащих твердых частиц и волокон, в системах повышения давления в котельных и на промышленных объектах. Они не предназначены для перекачивания питьевой воды и работы в централизованных системах водоснабжения. Проточная часть насоса и патрубки присоединительные выполнены из нержавеющей стали.";

function horizontalPumpSlug(model: string) {
  return `nasos-${model.toLowerCase()}`;
}

function horizontalPumpConnectionLabel(connection: string) {
  return connection.replace(/x/gi, "×");
}

function horizontalPumpConnectionToDn(connection: string) {
  const inchToDn: Record<string, string> = {
    "1": "DN25",
    "1.25": "DN32",
    "1.5": "DN40",
    "2": "DN50"
  };
  const match = connection.match(/^(\d+(?:\.\d+)?)"/);
  return match && inchToDn[match[1]] ? inchToDn[match[1]] : connection;
}

function horizontalPumpSupply(voltage: HorizontalMultistagePumpRow["voltage"]) {
  return voltage === "220" ? "1×220В / 50Гц" : "3×380В / 50Гц";
}

function formatPumpCurrent(currentA: string) {
  if (currentA.includes("Δ")) {
    return currentA.replace(/\./g, ",");
  }

  return `${formatPumpDecimal(currentA)} А`;
}

function horizontalPumpSpecs(row: HorizontalMultistagePumpRow) {
  return {
    Модель: row.model,
    Подкатегория: PUMP_HORIZONTAL_SUBCATEGORY,
    "Присоединение вход/выход": horizontalPumpConnectionLabel(row.connection),
    "Номинальный диаметр": horizontalPumpConnectionToDn(row.connection),
    Питание: horizontalPumpSupply(row.voltage),
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": formatPumpCurrent(row.currentA),
    "Пропускная способность": `${formatPumpDecimal(row.flow)} м³/ч`,
    Напор: `${formatPumpDecimal(row.head)} м`,
    "Материал корпуса": "нержавеющая сталь"
  };
}

function buildHorizontalMultistagePumpProducts(
  rows: HorizontalMultistagePumpRow[],
  {
    description,
    details,
    imageUrl
  }: {
    description: string;
    details: string;
    imageUrl: string;
  }
) {
  return rows.map((row) => ({
    title: `Горизонтальный многоступенчатый насос ${row.model}`,
    slug: horizontalPumpSlug(row.model),
    kind: "Товар" as const,
    category: "Насосы",
    description,
    details,
    specs: horizontalPumpSpecs(row),
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl,
    gallery: [imageUrl]
  }));
}

const horizontalMultistagePumpProducts = [
  ...buildHorizontalMultistagePumpProducts(CHT_HORIZONTAL_PUMPS, {
    description: PUMP_CHT_SHORT_DESCRIPTION,
    details: PUMP_CHT_DETAILS,
    imageUrl: PUMP_CHT_IMAGE
  }),
  ...buildHorizontalMultistagePumpProducts(CHL_HORIZONTAL_PUMPS, {
    description: PUMP_CHL_SHORT_DESCRIPTION,
    details: PUMP_CHL_DETAILS,
    imageUrl: PUMP_CHL_IMAGE
  }),
  ...buildHorizontalMultistagePumpProducts(CHJ_HORIZONTAL_PUMPS, {
    description: PUMP_CHL_SHORT_DESCRIPTION,
    details: PUMP_CHL_DETAILS,
    imageUrl: PUMP_CHJ_IMAGE
  })
];

const PUMP_MONOBLOCK_SUBCATEGORY = "Консольно-моноблочные центробежные насосы";

const PUMP_GFM_IMAGE = "/media/categories/pumps/monoblock-console-card.webp";
const PUMP_GF_IMAGE = "/media/categories/pumps/gf-monoblock-console-card.webp";

const PUMP_GFM_SHORT_DESCRIPTION = [
  "Моноблочная консольная компоновка",
  "Проточная часть из точного литья",
  "Высокая эффективность перекачивания"
].join("\n");

const PUMP_GFM_DETAILS =
  "Центробежный горизонтальный насос GF(m) представляет собой одноступенчатый центробежный моноблочный насос консольного типа. Предназначен для перекачивания воды или промышленных жидкостей. Адаптированные к различным температурам, скорости потока и диапазону давления. Проточная часть насоса изготовлена по технологии точного литья. Технология делает проточную часть гладкой с небольшим трением и высокой эффективностью.";

function monoblockPumpSlug(model: string) {
  return `nasos-${model.toLowerCase().replace(/[()*]/g, "").replace(/[/]/g, "-").replace(/\s+/g, "-")}`;
}

function monoblockPumpSpecs(row: MonoblockConsolePumpRow) {
  return {
    Модель: row.model,
    Подкатегория: PUMP_MONOBLOCK_SUBCATEGORY,
    "Присоединение вход/выход": horizontalPumpConnectionLabel(row.connection),
    "Номинальный диаметр": horizontalPumpConnectionToDn(row.connection),
    Питание: horizontalPumpSupply(row.voltage),
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": formatPumpCurrent(row.currentA),
    "Пропускная способность": `${formatPumpDecimal(row.flow)} м³/ч`,
    Напор: `${formatPumpDecimal(row.head)} м`,
    "Номинальная частота вращения": `${row.speed} об/мин`,
    "Материал корпуса": row.material
  };
}

function buildMonoblockConsolePumpProducts(
  rows: MonoblockConsolePumpRow[],
  {
    description,
    details,
    imageUrl
  }: {
    description: string;
    details: string;
    imageUrl: string;
  }
) {
  return rows.map((row) => ({
    title: `Консольно-моноблочный насос ${row.model}`,
    slug: monoblockPumpSlug(row.model),
    kind: "Товар" as const,
    category: "Насосы",
    description,
    details,
    specs: monoblockPumpSpecs(row),
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl,
    gallery: [imageUrl]
  }));
}

const monoblockConsolePumpProducts = [
  ...buildMonoblockConsolePumpProducts(GFM_MONOBLOCK_PUMPS, {
    description: PUMP_GFM_SHORT_DESCRIPTION,
    details: PUMP_GFM_DETAILS,
    imageUrl: PUMP_GFM_IMAGE
  }),
  ...buildMonoblockConsolePumpProducts(GF_MONOBLOCK_PUMPS, {
    description: PUMP_GFM_SHORT_DESCRIPTION,
    details: PUMP_GFM_DETAILS,
    imageUrl: PUMP_GF_IMAGE
  })
];

const PUMP_CONSOLE_CENTRIFUGAL_SUBCATEGORY = "Центробежные насосы консольного типа";

const PUMP_GSM_IMAGE = "/media/categories/pumps/gsm-console-centrifugal-card.webp";

const PUMP_GSM_SHORT_DESCRIPTION = [
  "Консольная компоновка с креплением на валу",
  "Проточная часть из точного литья",
  "Высокая эффективность перекачивания"
].join("\n");

const PUMP_GSM_DETAILS =
  "Центробежный горизонтальный насос GSM представляет собой одноступенчатый центробежный насос консольного типа. Предназначен для перекачивания воды или промышленных жидкостей. Адаптированные к различным температурам, скорости потока и диапазону давления. Проточная часть насоса изготовлена по технологии точного литья. Технология делает проточную часть гладкой с небольшим трением и высокой эффективностью.";

function consoleCentrifugalPumpSlug(model: string) {
  return `nasos-${model.toLowerCase().replace(/[()*]/g, "").replace(/[/]/g, "-").replace(/\s+/g, "-")}`;
}

function consoleCentrifugalPumpSpecs(row: ConsoleCentrifugalPumpRow) {
  const specs: Record<string, string> = {
    Модель: row.model,
    Подкатегория: PUMP_CONSOLE_CENTRIFUGAL_SUBCATEGORY,
    "Присоединение вход/выход": horizontalPumpConnectionLabel(row.connection),
    "Номинальный диаметр": horizontalPumpConnectionToDn(row.connection),
    "Номинальное напряжение": horizontalPumpSupply(row.voltage),
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": formatPumpCurrent(row.currentA),
    "Пропускная способность": `${formatPumpDecimal(row.flow)} м³/ч`,
    Напор: `${formatPumpDecimal(row.head)} м`,
    "Номинальная частота вращения": `${row.speed} об/мин`
  };

  if (row.npshr) {
    specs["Допускаемый кавитационный запас"] = `${formatPumpDecimal(row.npshr)} м`;
  }

  if (row.maxPressure) {
    specs["Максимальное рабочее давление"] = `${formatPumpDecimal(row.maxPressure)} бар`;
  }

  return specs;
}

function buildConsoleCentrifugalPumpProducts(
  rows: ConsoleCentrifugalPumpRow[],
  {
    description,
    details,
    imageUrl
  }: {
    description: string;
    details: string;
    imageUrl: string;
  }
) {
  return rows.map((row) => ({
    title: `Насос консольного типа ${row.model}`,
    slug: consoleCentrifugalPumpSlug(row.model),
    kind: "Товар" as const,
    category: "Насосы",
    description,
    details,
    specs: consoleCentrifugalPumpSpecs(row),
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl,
    gallery: [imageUrl]
  }));
}

const consoleCentrifugalPumpProducts = buildConsoleCentrifugalPumpProducts(
  GSM_CONSOLE_CENTRIFUGAL_PUMPS,
  {
    description: PUMP_GSM_SHORT_DESCRIPTION,
    details: PUMP_GSM_DETAILS,
    imageUrl: PUMP_GSM_IMAGE
  }
);

const PUMP_SUBMERSIBLE_SEWAGE_SUBCATEGORY = "Погружные канализационные насосы";

const PUMP_WQ_IMAGE = "/media/categories/pumps/wq-submersible-sewage-card.webp";

const PUMP_WQ_SHORT_DESCRIPTION = [
  "Погружной насос для сточных вод",
  "Канальное рабочее колесо",
  "Непрерывная длительная работа"
].join("\n");

const PUMP_WQ_DETAILS =
  "Насосы серии WQ представляют собой базовые погружные насосы для сточных вод с канальными рабочими колесами. Существует широкая линейка продуктов, которые можно легко установить в сочетании с рельсовыми системами с автоматической муфтой или использовать отдельно с гибким шлангом или фланцевым соединением. Обладая превосходной надежностью и долговечностью, он может работать непрерывно в течение длительного времени.";

const PUMP_WQK_SHORT_DESCRIPTION = [
  "Погружной насос для сточных вод",
  "Канальное колесо с режущим устройством",
  "Непрерывная длительная работа"
].join("\n");

const PUMP_WQK_DETAILS =
  "Насосы серии WQK представляют собой погружные насосы для сточных вод с канальными рабочими колесами и режущим устройством. Их можно установить в сочетании с рельсовыми системами с автоматической муфтой или использовать отдельно с гибким шлангом или фланцевым соединением. Обладая превосходной надежностью и долговечностью, насос может работать непрерывно в течение длительного времени.";

function submersibleSewagePumpSlug(model: string) {
  return `nasos-${model.toLowerCase().replace(/[()*]/g, "").replace(/[/]/g, "-").replace(/\s+/g, "-")}`;
}

function submersibleSewagePumpOutletDn(model: string) {
  const wq = model.match(/^(\d+)WQ/i)?.[1];
  if (wq) return `DN${wq}`;

  const wqk = model.match(/^WQK(\d+)/i)?.[1];
  if (wqk) return `DN${wqk}`;

  return "";
}

function submersibleSewagePumpOutletInchesLabel(outletInches: string) {
  return `${formatPumpDecimal(outletInches)}"`;
}

function submersibleSewagePumpSpecs(row: SubmersibleSewagePumpRow) {
  const specs: Record<string, string> = {
    Модель: row.model,
    Подкатегория: PUMP_SUBMERSIBLE_SEWAGE_SUBCATEGORY,
    Присоединение: submersibleSewagePumpOutletInchesLabel(row.outletInches),
    "Номинальный диаметр": submersibleSewagePumpOutletDn(row.model),
    "Номинальное напряжение": horizontalPumpSupply(row.voltage),
    "Номинальная мощность": `${formatPumpDecimal(row.powerKw)} кВт`,
    "Номинальный ток": formatPumpCurrent(row.currentA),
    "Пропускная способность": `${formatPumpDecimal(row.flow)} м³/ч`,
    Напор: `${formatPumpDecimal(row.head)} м`,
    "Номинальная частота вращения": `${row.speed} об/мин`
  };

  if (row.maxHeadM) {
    specs["Максимальный напор"] = `${formatPumpDecimal(row.maxHeadM)} м`;
  }

  if (row.weightKg) {
    specs.Масса = `${formatPumpDecimal(row.weightKg)} кг`;
  }

  if (row.solidsMm) {
    specs["Диаметр прохождения"] = `${row.solidsMm} мм`;
  }

  return specs;
}

function buildSubmersibleSewagePumpProducts(
  rows: SubmersibleSewagePumpRow[],
  {
    description,
    details
  }: {
    description: string;
    details: string;
  }
) {
  return rows.map((row) => ({
    title: `Погружной канализационный насос ${row.model}`,
    slug: submersibleSewagePumpSlug(row.model),
    kind: "Товар" as const,
    category: "Насосы",
    description,
    details,
    specs: submersibleSewagePumpSpecs(row),
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: PUMP_WQ_IMAGE,
    gallery: [PUMP_WQ_IMAGE]
  }));
}

const submersibleSewagePumpProducts = [
  ...buildSubmersibleSewagePumpProducts(WQ_SUBMERSIBLE_SEWAGE_PUMPS, {
    description: PUMP_WQ_SHORT_DESCRIPTION,
    details: PUMP_WQ_DETAILS
  }),
  ...buildSubmersibleSewagePumpProducts(WQK_SUBMERSIBLE_SEWAGE_PUMPS, {
    description: PUMP_WQK_SHORT_DESCRIPTION,
    details: PUMP_WQK_DETAILS
  })
];

const rgrRotaryMeterSeedProducts = RGR_R_PRODUCTS.map((product) => ({
  title: product.title,
  slug: product.slug,
  kind: "Товар",
  category: "Счётчики газа",
  description: buildRgrListingDescription(product),
  details: RGR_R_SHORT_DESCRIPTION.split("\n\n")[0],
  specs: {
    Серия: "РГ-Р",
    Подкатегория: "Ротационные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    ...Object.fromEntries(product.extraSpecs.map((row) => [row.characteristic, row.value]))
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: RGR_R_CARD_IMAGE,
  gallery: RGR_R_GALLERY,
  featured: true
}));

const rvgRotaryMeterSeedProducts = RVG_PRODUCTS.map((product) => ({
  title: product.title,
  slug: product.slug,
  kind: "Товар",
  category: "Счётчики газа",
  description: buildRvgListingDescription(product),
  details: RVG_SHORT_DESCRIPTION,
  specs: {
    Серия: "RVG",
    Подкатегория: "Ротационные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    ...Object.fromEntries(product.extraSpecs.map((row) => [row.characteristic, row.value]))
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: RVG_CARD_IMAGE,
  gallery: RVG_GALLERY,
  featured: true
}));

const raboRotaryMeterSeedProducts = RABO_PRODUCTS.map((product) => ({
  title: product.title,
  slug: product.slug,
  kind: "Товар",
  category: "Счётчики газа",
  description: buildRaboListingDescription(product),
  details: RABO_SHORT_DESCRIPTION,
  specs: {
    Серия: "RABO",
    Подкатегория: "Ротационные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    ...Object.fromEntries(product.extraSpecs.map((row) => [row.characteristic, row.value]))
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: RABO_CARD_IMAGE,
  gallery: RABO_GALLERY,
  featured: true
}));

const rgtTurbineMeterSeedProducts = RGT_T_PRODUCTS.map((product) => ({
  title: product.title,
  slug: product.slug,
  kind: "Товар",
  category: "Счётчики газа",
  description: buildRgtListingDescription(product),
  details: RGT_T_SHORT_DESCRIPTION.split("\n\n")[0],
  specs: {
    Серия: "РГ-Т",
    Подкатегория: "Турбинные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    ...Object.fromEntries(product.extraSpecs.map((row) => [row.characteristic, row.value]))
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: RGT_T_CARD_IMAGE,
  gallery: RGT_T_GALLERY,
  featured: true
}));

const sgTkDSeedProduct = {
  title: SG_TK_D_TITLE,
  slug: SG_TK_D_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: SG_TK_D_CARD_DESCRIPTION,
  details: SG_TK_SHORT_DESCRIPTION,
  specs: {
    Серия: "СГ-ТК",
    Подкатегория: GAS_METER_SUBCATEGORY_SG_TK_D,
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    Модель: "СГ-ТК-Д"
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: SG_TK_CARD_IMAGE,
  gallery: SG_TK_GALLERY,
  featured: true
};

const sgTkRSeedProduct = {
  title: SG_TK_R_TITLE,
  slug: SG_TK_R_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: SG_TK_R_CARD_DESCRIPTION,
  details: SG_TK_SHORT_DESCRIPTION,
  specs: {
    Серия: "СГ-ТК",
    Подкатегория: GAS_METER_SUBCATEGORY_SG_TK_R,
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    Модель: "СГ-ТК-Р"
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: SG_TK_CARD_IMAGE,
  gallery: SG_TK_GALLERY,
  featured: true
};

const sgTkTSeedProduct = {
  title: SG_TK_T_TITLE,
  slug: SG_TK_T_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: SG_TK_T_CARD_DESCRIPTION,
  details: SG_TK_SHORT_DESCRIPTION,
  specs: {
    Серия: "СГ-ТК",
    Подкатегория: GAS_METER_SUBCATEGORY_SG_TK_T,
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    Модель: "СГ-ТК-Т"
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: SG_TK_T_CARD_IMAGE,
  gallery: SG_TK_T_GALLERY,
  featured: true
};

const sgEkKompleksSeedProduct = {
  title: SG_EK_TITLE,
  slug: SG_EK_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: SG_EK_SHORT_DESCRIPTION,
  details: `${SG_EK_SHORT_DESCRIPTION} ${SG_EK_CARD_DESCRIPTION}`,
  specs: {
    Серия: "СГ-ЭК",
    Подкатегория: "Комплексы СГ-ЭК",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL,
    Модель: "СГ-ЭК"
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: SG_EK_CARD_IMAGE,
  gallery: SG_EK_GALLERY,
  featured: true
};

function buildGasMeterAccessoriesSeedProduct(subcategory: "Ротационные" | "Турбинные", slug: string) {
  return {
    title: GAS_METER_ACCESSORIES_TITLE,
    slug,
    kind: "Товар",
    category: "Счётчики газа",
    description: GAS_METER_ACCESSORIES_SHORT_DESCRIPTION,
    details: GAS_METER_ACCESSORIES_SHORT_DESCRIPTION,
    specs: {
      Серия: "Аксессуары",
      Подкатегория: subcategory,
      Производитель: RASKO_MANUFACTURER,
      Назначение: GAS_METER_PURPOSE_INDUSTRIAL
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: GAS_METER_ACCESSORIES_CARD_IMAGE,
    gallery: [GAS_METER_ACCESSORIES_CARD_IMAGE],
    featured: false
  };
}

const gasMeterAccessoriesRotarySeedProduct = buildGasMeterAccessoriesSeedProduct(
  "Ротационные",
  GAS_METER_ACCESSORIES_ROTARY_SLUG
);

const gasMeterKpuSeedProduct = {
  title: GAS_METER_KPU_TITLE,
  slug: GAS_METER_KPU_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: GAS_METER_KPU_SHORT_DESCRIPTION,
  details: GAS_METER_KPU_SHORT_DESCRIPTION,
  specs: {
    Серия: "КПУ",
    Подкатегория: "Ротационные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: GAS_METER_KPU_CARD_IMAGE,
  gallery: [GAS_METER_KPU_CARD_IMAGE],
  featured: false
};

const gasMeterKpuTurbineSeedProduct = {
  title: GAS_METER_KPU_TURBINE_TITLE,
  slug: GAS_METER_KPU_TURBINE_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: GAS_METER_KPU_TURBINE_SHORT_DESCRIPTION,
  details: GAS_METER_KPU_TURBINE_SHORT_DESCRIPTION,
  specs: {
    Серия: "КПУ",
    Подкатегория: "Турбинные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: GAS_METER_KPU_CARD_IMAGE,
  gallery: [GAS_METER_KPU_CARD_IMAGE],
  featured: false
};

const raskoFgFilterSeedProducts = RASKO_FG_PRODUCTS.map((product) => ({
  title: product.title,
  slug: product.slug,
  kind: "Товар",
  category: "Фильтры",
  description: buildFgListingDescription(product),
  details: RASKO_FG_SHORT_DESCRIPTION,
  specs: buildFgSeedSpecs(product),
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: RASKO_FG_CARD_IMAGE,
  gallery: RASKO_FG_GALLERY,
  featured: false
}));

const gasMeterKpuSgSeedProduct = {
  title: GAS_METER_KPU_SG_TITLE,
  slug: GAS_METER_KPU_SG_SLUG,
  kind: "Товар",
  category: "Счётчики газа",
  description: GAS_METER_KPU_SG_SHORT_DESCRIPTION,
  details: GAS_METER_KPU_SG_SHORT_DESCRIPTION,
  specs: {
    Серия: "КПУ",
    Подкатегория: "Турбинные",
    Производитель: RASKO_MANUFACTURER,
    Назначение: GAS_METER_PURPOSE_INDUSTRIAL
  },
  leadTime: "по наличию, уточняется в заявке",
  price: "0",
  unit: "шт.",
  imageUrl: GAS_METER_KPU_CARD_IMAGE,
  gallery: [GAS_METER_KPU_CARD_IMAGE],
  featured: false
};

const products = [
  {
    title: "Газорегуляторный пункт шкафной ГРПШ-04-2У1",
    slug: "grp-sh-04-2u1",
    kind: "Товар",
    category: "ГРПШ",
    description: GRP_SHKAFNY_CATEGORY,
    details: bulletDetails([
      "Компактное шкафное исполнение для наружной установки.",
      "Регулирование и стабилизация давления газа на выходе из пункта.",
      "Комплектация запорной и предохранительной арматурой по проекту.",
      "Подход для объектов с малым и средним расходом газа.",
      "Готовая поверхность для монтажа на подготовленном фундаменте или основании."
    ]),
    specs: {
      Модель: "ГРПШ-04-2У1",
      Категория: GRP_SHKAFNY_CATEGORY
    },
    leadTime: "по запросу у отдела продаж",
    price: "172000",
    unit: "компл.",
    imageUrl: GRP_SH_04_IMAGE,
    gallery: [GRP_SH_04_IMAGE],
    featured: true
  },
  {
    title: "Газорегуляторный пункт шкафной ГРПШ-32-2У1",
    slug: "grp-sh-32-2u1",
    kind: "Товар",
    category: "ГРПШ",
    description: GRP_SHKAFNY_CATEGORY,
    details: bulletDetails([
      "Усиленная компоновка шкафа для повышенных расходов.",
      "Согласование комплектации под требования техусловий и объекта.",
      "Узел учёта и фильтрация по согласованию с проектом.",
      "Защита оборудования от осадков и доступа посторонних лиц.",
      "Возможность поэтапного ввода после пусконаладки и проверки герметичности."
    ]),
    specs: {
      Модель: "ГРПШ-32-2У1",
      Категория: GRP_SHKAFNY_CATEGORY
    },
    leadTime: "по запросу у отдела продаж",
    price: "248000",
    unit: "компл.",
    imageUrl: GRP_SH_32_IMAGE,
    gallery: [GRP_SH_32_IMAGE],
    featured: true
  },
  {
    title: "Газорегуляторный пункт шкафной ГРПШ-10МС-2У1 на базе двух РДГК-10М",
    slug: "grp-sh-10ms-2u1",
    kind: "Товар",
    category: "ГРПШ",
    description: GRP_SHKAFNY_CATEGORY,
    details: bulletDetails([
      "Рабочая линия на базе двух регуляторов давления газа РДГК-10М.",
      "Резервирование по линии регулирования для повышения надёжности подачи газа.",
      "Сборка и обвязка в шкафу с удобством обслуживания и доступом к узлам ТО.",
      "Параметры настройки и пропускная способность согласуются с расчётом на объект.",
      "Поставка в комплекте с сопроводительной документацией и обозначениями по схеме."
    ]),
    specs: {
      Модель: "ГРПШ-10МС-2У1",
      Категория: GRP_SHKAFNY_CATEGORY,
      Регуляторы: "2 × РДГК-10М"
    },
    leadTime: "по запросу у отдела продаж",
    price: "315000",
    unit: "компл.",
    imageUrl: GRP_SH_10MS_IMAGE,
    gallery: [GRP_SH_10MS_IMAGE]
  },
  {
    title: "Проектирование газового оборудования",
    slug: "proektirovanie-gazovogo-oborudovaniya",
    kind: "Услуга",
    category: "Инжиниринг",
    description:
      "Подготовка технического решения, спецификации и комплекта документации для производства газового узла.",
    details:
      "Помогаем сформировать техническое задание, подобрать оборудование и подготовить документацию для согласования. Услуга подходит, когда известны исходные параметры объекта, но нужно быстро собрать рабочую конфигурацию.",
    specs: {
      "Результат": "техническое решение и спецификация",
      "Исходные данные": "давление, расход, объект, требования",
      "Формат": "PDF, таблица комплектации",
      "Сопровождение": "консультация инженера",
      "Для кого": "проектировщики, подрядчики, службы эксплуатации"
    },
    leadTime: "3-7 рабочих дней",
    price: "25000",
    unit: "услуга",
    imageUrl: "/media/services/proektirovanie-gazovogo-oborudovaniya.webp",
    gallery: ["/media/services/proektirovanie-gazovogo-oborudovaniya.webp"],
    featured: true
  },
  ...raskoFgFilterSeedProducts,
  {
    title: "Корректор ТС220",
    slug: KORREKTOR_TS220_SLUG,
    kind: "Товар",
    category: "Корректоры газа",
    description: KORREKTOR_TS220_CARD_DESCRIPTION,
    details: KORREKTOR_TS220_CARD_DESCRIPTION,
    specs: {
      Серия: "ТС",
      Модель: "ТС-220",
      Производитель: RASKO_MANUFACTURER
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: KORREKTOR_TS220_CARD_IMAGE,
    gallery: KORREKTOR_TS220_GALLERY,
    featured: false
  },
  {
    title: "Корректор объема газа ЕК270",
    slug: KORREKTOR_EK270_SLUG,
    kind: "Товар",
    category: "Корректоры газа",
    description: KORREKTOR_EK270_CARD_DESCRIPTION,
    details: KORREKTOR_EK270_CARD_DESCRIPTION,
    specs: {
      Серия: "ЕК270",
      Модель: "ЕК270",
      Производитель: RASKO_MANUFACTURER
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: KORREKTOR_EK270_CARD_IMAGE,
    gallery: KORREKTOR_EK270_GALLERY,
    featured: false
  },
  {
    title: "Преобразователи и КМЧ для корректоров",
    slug: PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_SLUG,
    kind: "Товар",
    category: "Корректоры газа",
    description: PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_DESCRIPTION,
    details: PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_DESCRIPTION,
    specs: {
      Серия: "ЕК270",
      Модель: "ЕК270",
      Производитель: RASKO_MANUFACTURER,
      Назначение: "Преобразователи и монтажные части"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_CARD_IMAGE,
    gallery: PREOBRAZOVATELI_I_KMCH_DLYA_KORREKTOROV_GALLERY,
    featured: false
  },
  {
    title: "Кран шаровой латунный LD Pride",
    slug: "krany-sharovye-ld-pride",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Латунный кран с никелевым покрытием, ручка-рычаг, внутренняя резьба 1/2″ (Ду 15). Для воды, пара и неагрессивных сред.",
    details:
      "Запорная арматура для полного перекрывания потока. Быстрое перекрытие регулируется рукояткой. PN 40, DN 15.",
    specs: {
      Газовый: "нет",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1/2F-1/2F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "15 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р Ду 20 Ру 40 рычаг",
    slug: "kran-sharovoy-ld-pride-du20",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Латунный кран с никелевым покрытием, ручка-рычаг, внутренняя резьба 3/4″ (Ду 20). Для воды, пара и неагрессивных сред.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара.",
    specs: {
      Газовый: "нет",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "3/4F-3/4F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "20 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-du20.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-du20.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-du20-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-du20-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р Ду 25 Ру 40 рычаг",
    slug: "kran-sharovoy-ld-pride-du25",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Латунный кран с никелевым покрытием, ручка-рычаг, внутренняя резьба 1″ (Ду 25). Для воды, пара и неагрессивных сред.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара.",
    specs: {
      Газовый: "нет",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1F-1F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "25 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-du25.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-du25.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-du25-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-du25-3.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-du25-4.png"
    ]
  },
  {
    title: "Кран шаровый латунный LD Pride 47.32.В-В.Р Ду 32 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-47-32-du25",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Кран 47.32.В-В.Р, никелированная латунь, ручка-рычаг, резьба 1 1/4″ (Ду 32). PN 25.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара.",
    specs: {
      Газовый: "нет",
      Материал: "никелированная латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1 1/4F-1 1/4F",
      "Номинальное давление (PN)": "25 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "32 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-47-32-du25.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-47-32-du25.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-32-du25-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-32-du25-3.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-32-du25-4.png"
    ]
  },
  {
    title: "Кран шаровый латунный LD Pride 47.40.В-В.Р Ду 40 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-47-40-du25",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Кран 47.40.В-В.Р, латунь с никелевым покрытием, ручка-рычаг, резьба 1 1/2″ (Ду 40). PN 40.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара.",
    specs: {
      Газовый: "нет",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1 1/2F-1 1/2F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "40 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25-3.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25-4.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-40-du25-5.png"
    ]
  },
  {
    title: "Кран шаровый латунный LD Pride 47.50.В-В.Р Ду 50 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-47-50-du25",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Кран 47.50.В-В.Р, никелированная латунь, ручка-рычаг, резьба 2F-2F (Ду 50). PN 25. Для воды.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для жидких сред, неагрессивных к материалам крана, а также пара.",
    specs: {
      Газовый: "нет",
      Материал: "никелированная латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "2F-2F",
      "Номинальное давление (PN)": "25 бар",
      "Max температура применения": "150 °С",
      "Условный диаметр DN": "50 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-47-50-du25.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-47-50-du25.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-50-du25-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-47-50-du25-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 15 Ру 40 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du15",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран В-В.Р GAS, никелированная латунь, ручка-рычаг жёлтая, резьба 1/2″ (Ду 15). PN 40.",
    details:
      "Температура рабочей среды — от −60 °С до 80 °С. Рабочая среда — природный и сжиженный углеводородный газ.",
    specs: {
      Газовый: "да",
      Материал: "никелированная латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1/2F-1/2F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "120 °С",
      "Условный диаметр DN": "15 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du15.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du15.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du15-2.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 20 Ру 40 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du20",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран В-В.Р GAS серии 47, никелированная латунь, ручка-рычаг жёлтая, резьба 3/4″ (Ду 20). PN 40.",
    details:
      "Для перекрытия потока природного газа и газообразных сред на трубопроводах. Климатическое исполнение У, УХЛ, ХЛ, ТВ.",
    specs: {
      Газовый: "да",
      Материал: "никелированная латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "3/4F-3/4F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "120 °С",
      "Условный диаметр DN": "20 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du20.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du20.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du20-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du20-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 25 Ру 40 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du25",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран 47.25.В-В.Р GAS, латунь с никелированным покрытием, ручка-рычаг жёлтая, резьба 1F-1F (Ду 25). PN 40.",
    details:
      "Температура рабочей среды — от −60 °С до 80 °С. Рабочая среда — природный и сжиженный углеводородный газ. Ресурс — 10 000 циклов.",
    specs: {
      Газовый: "да",
      Материал: "латунь с никелированным покрытием",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1F-1F",
      "Номинальное давление (PN)": "40 бар",
      "Max температура применения": "120 °С",
      "Условный диаметр DN": "25 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du25.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du25.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du25-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du25-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 32 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du32",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран 47.32.В-В.Р GAS, латунь, ручка-рычаг, резьба 1 1/4F-1 1/4F (Ду 32). PN 25.",
    details:
      "Краны шаровые латунные LD Pride (серия 47) предназначены для перекрытия потока природного газа и газообразных сред. Климатическое исполнение У, УХЛ, ХЛ, ТВ ГОСТ 15150.",
    specs: {
      Газовый: "да",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1 1/4F-1 1/4F",
      "Номинальное давление (PN)": "25 бар",
      "Max температура применения": "80 °С",
      "Условный диаметр DN": "32 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du32.png",
    gallery: [
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du32.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du32-2.png",
      "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du32-3.png"
    ]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 40 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du40",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран 47.40.В-В.Р GAS, латунь с никелированным покрытием, ручка-рычаг, резьба 1 1/2F-1 1/2F (Ду 40). PN 25.",
    details:
      "Кран шаровой латунный LD Pride с никелевым покрытием предназначен для неагрессивных газов и сжатого воздуха. Климатическое исполнение УХЛ 1, 2, 3 ГОСТ 15150.",
    specs: {
      Газовый: "да",
      Материал: "латунь с никелированным покрытием",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "1 1/2F-1 1/2F",
      "Номинальное давление (PN)": "25 бар",
      "Max температура применения": "80 °С",
      "Условный диаметр DN": "40 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du40.png",
    gallery: ["/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du40.png"]
  },
  {
    title: "Кран шаровой латунный LD Pride В-В.Р GAS Ду 50 Ру 25 рычаг",
    slug: "kran-sharovoy-ld-pride-vv-r-gas-du50",
    kind: "Товар",
    category: "Краны шаровые",
    description:
      "Газовый кран 47.50.В-В.Р GAS, латунь, ручка-рычаг, резьба 2F-2F (Ду 50). PN 25.",
    details:
      "Краны шаровые латунные LD Pride (серия 47) для перекрытия потока на трубопроводах. Климатическое исполнение У, УХЛ, ХЛ, ТВ ГОСТ 15150.",
    specs: {
      Газовый: "да",
      Материал: "латунь",
      "Тип присоединения": "резьбовой",
      "Тип резьбы": "2F-2F",
      "Номинальное давление (PN)": "25 бар",
      "Max температура применения": "80 °С",
      "Условный диаметр DN": "50 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du50.png",
    gallery: ["/media/products/catalog/kran-sharovoy-ld-pride-vv-r-gas-du50.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G6",
    slug: "taugaz-vkr-g6",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V2L, A-250, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V2L, A-250, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G6"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g6.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g6.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G6T",
    slug: "taugaz-vkr-g6t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Мембранный счётчик с механической термокоррекцией. V2L, A-250, левый.",
    details:
      "Мембранные счётчики газа ТАУГАЗ серии ВКР с механической термокоррекцией. V2L, A-250, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G6T",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g6.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g6.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G10",
    slug: "taugaz-vkr-g10-v35",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V3,5L, A-250, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V3,5L, A-250, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G10",
      "Циклический объём": "3,5 л"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g10.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g10.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G10T",
    slug: "taugaz-vkr-g10t-v35",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V3,5L, A-250, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V3,5L, A-250, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G10T",
      "Циклический объём": "3,5 л"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g10.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g10.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G10 (V6L)",
    slug: "taugaz-vkr-g10-v6",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V6L, A-280, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V6L, A-280, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G10",
      "Циклический объём": "6 л"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g10.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g10.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G16",
    slug: "taugaz-vkr-g16",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V6L, A-280, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V6L, A-280, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G16"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g10.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g10.png"]
  },
  {
    title: "Мембранный счётчик газа ТАУГАЗ ВКР G25",
    slug: "taugaz-vkr-g25",
    kind: "Товар",
    category: "Счётчики газа",
    description: "Мембранный счётчик газа серии ВКР. V12L, A-335, левый.",
    details: "Мембранные счётчики газа ТАУГАЗ серии ВКР. V12L, A-335, левый.",
    specs: {
      Производитель: "ТАУГАЗ",
      Подкатегория: "Мембранные",
      Серия: "ВКР",
      Типоразмер: "G25"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/taugaz/taugaz-vkr-g25.png",
    gallery: ["/media/products/taugaz/taugaz-vkr-g25.png"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G1,6",
    slug: "rasko-vk-g16",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_SHORT_DESCRIPTION,
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G1,6",
      "Диапазон рабочих расходов": "0,016 — 2,5 м³/ч",
      "Номинальный расход": "1,6 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G1,6T",
    slug: "rasko-vk-g16t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Диафрагменный счётчик газа ВК-G1,6T с механической температурной компенсацией.",
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G1,6T",
      "Диапазон рабочих расходов": "0,016 — 2,5 м³/ч",
      "Номинальный расход": "1,6 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4t.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4t.webp",
      "/media/products/rasko/rasko-vk-g4t-alt.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G2,5",
    slug: "rasko-vk-g25",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_SHORT_DESCRIPTION,
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G2,5",
      "Диапазон рабочих расходов": "0,025 — 4 м³/ч",
      "Номинальный расход": "2,5 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G2,5T",
    slug: "rasko-vk-g25t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Диафрагменный счётчик газа ВК-G2,5T с механической температурной компенсацией.",
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G2,5T",
      "Диапазон рабочих расходов": "0,025 — 4 м³/ч",
      "Номинальный расход": "2,5 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4t.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4t.webp",
      "/media/products/rasko/rasko-vk-g4t-alt.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G4",
    slug: "rasko-vk-g4",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_SHORT_DESCRIPTION,
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G4",
      "Диапазон рабочих расходов": "0,04 — 6 м³/ч",
      "Номинальный расход": "4 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4.webp",
      "/media/products/rasko/rasko-vk-g4-alt.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G4T",
    slug: "rasko-vk-g4t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Диафрагменный счётчик газа ВК-G4T с механической температурной компенсацией.",
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G4T",
      "Диапазон рабочих расходов": "0,04 — 6 м³/ч",
      "Номинальный расход": "4 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g4t.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g4t.webp",
      "/media/products/rasko/rasko-vk-g4t-alt.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G6",
    slug: "rasko-vk-g6",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_SHORT_DESCRIPTION,
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G6",
      "Диапазон рабочих расходов": "0,06 — 10 м³/ч",
      "Номинальный расход": "6 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g6t.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g6t.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G6T",
    slug: "rasko-vk-g6t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Диафрагменный счётчик газа ВК-G6T с механической температурной компенсацией.",
    details: RASKO_VK_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Бытовые",
      Типоразмер: "G6T",
      "Диапазон рабочих расходов": "0,06 — 10 м³/ч",
      "Номинальный расход": "6 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g6t.webp",
    gallery: [
      "/media/products/rasko/rasko-vk-g6t.webp",
      "/media/products/rasko/rasko-vk-g6t-alt.webp",
      "/media/products/rasko/rasko-vk-side.webp"
    ]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G10",
    slug: "rasko-vk-g10",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G10",
      "Диапазон рабочих расходов": "0,10 — 16 м³/ч",
      "Номинальный расход": "10 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g10.webp",
    gallery: ["/media/products/rasko/rasko-vk-g10.webp"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G10T",
    slug: "rasko-vk-g10t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Коммунальный диафрагменный счётчик газа ВК-G10T с механической температурной компенсацией.",
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G10T",
      "Диапазон рабочих расходов": "0,10 — 16 м³/ч",
      "Номинальный расход": "10 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g10.webp",
    gallery: ["/media/products/rasko/rasko-vk-g10.webp"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G16",
    slug: "rasko-vk-comm-g16",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G16",
      "Диапазон рабочих расходов": "0,16 — 25 м³/ч",
      "Номинальный расход": "16 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g25.webp",
    gallery: ["/media/products/rasko/rasko-vk-g25.webp"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G16T",
    slug: "rasko-vk-comm-g16t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Коммунальный диафрагменный счётчик газа ВК-G16T с механической температурной компенсацией.",
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G16T",
      "Диапазон рабочих расходов": "0,16 — 25 м³/ч",
      "Номинальный расход": "16 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g25.webp",
    gallery: ["/media/products/rasko/rasko-vk-g25.webp"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G25",
    slug: "rasko-vk-comm-g25",
    kind: "Товар",
    category: "Счётчики газа",
    description: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G25",
      "Диапазон рабочих расходов": "0,25 — 40 м³/ч",
      "Номинальный расход": "25 м³/ч"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g25.webp",
    gallery: ["/media/products/rasko/rasko-vk-g25.webp"]
  },
  {
    title: "Мембранный счётчик газа РАСКО ВК-G25T",
    slug: "rasko-vk-comm-g25t",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Коммунальный диафрагменный счётчик газа ВК-G25T с механической температурной компенсацией.",
    details: RASKO_VK_COMMUNAL_SHORT_DESCRIPTION,
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Мембранные",
      Серия: "ВК",
      Назначение: "Коммунальные",
      Типоразмер: "G25T",
      "Диапазон рабочих расходов": "0,25 — 40 м³/ч",
      "Номинальный расход": "25 м³/ч",
      Термокоррекция: "механическая"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/rasko/rasko-vk-g25.webp",
    gallery: ["/media/products/rasko/rasko-vk-g25.webp"]
  },
  ...rgrRotaryMeterSeedProducts,
  ...rvgRotaryMeterSeedProducts,
  ...raboRotaryMeterSeedProducts,
  gasMeterAccessoriesRotarySeedProduct,
  gasMeterKpuSeedProduct,
  ...rgtTurbineMeterSeedProducts,
  sgTkDSeedProduct,
  sgTkRSeedProduct,
  sgTkTSeedProduct,
  sgEkKompleksSeedProduct,
  gasMeterKpuTurbineSeedProduct,
  gasMeterKpuSgSeedProduct,
  {
    title: "Счётчик газа микротермальный СМТ-Комплекс",
    slug: "smt-kompleks",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик природного газа с прямым методом измерения объёма, приведённого к стандартным условиям. Типоразмеры G4–G25.",
    details: smtKompleksDetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_KOMPLEKS_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "48050",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-kompleks.webp",
    gallery: [
      "/media/products/smt/smt-kompleks.webp",
      "/media/products/smt/smt-kompleks-1-60-3-1.webp",
      "/media/products/smt/smt-kompleks-2-30-3-1.webp",
      "/media/products/smt/smt-kompleks-3-0-3-1.webp",
      "/media/products/smt/smt-kompleks-4-30-3-1.webp",
      "/media/products/smt/smt-kompleks-5-60-3-1.webp"
    ],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Комплекс-К",
    slug: "smt-kompleks-k",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик с встроенным запорным клапаном, дистанционным управлением и телеметрией. Типоразмеры G4–G25.",
    details: smtKompleksKDetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_KOMPLEKS_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "66620",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-kompleks-k.webp",
    gallery: [
      "/media/products/smt/smt-kompleks-k.webp",
      "/media/products/smt/smt-kompleks-k-1-60-4-1.webp",
      "/media/products/smt/smt-kompleks-k-2-30-4-1.webp",
      "/media/products/smt/smt-kompleks-k-3-0-4-1.webp",
      "/media/products/smt/smt-kompleks-k-4-30-4-1.webp",
      "/media/products/smt/smt-kompleks-k-5-60-4-1.webp"
    ],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Комплекс G40 и G40-2",
    slug: "smt-kompleks-g40",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик для повышенного расхода газа — исполнения G40 (фланец DN 50) и G40-2 (фланец DN 80). Qном = 40 м³/ч.",
    details: smtKompleksG40DetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_KOMPLEKS_G40_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "192200",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-kompleks-g40.webp",
    gallery: [
      "/media/products/smt/smt-kompleks-g40.webp",
      "/media/products/smt/smt-kompleks-g40-1-60-5-1.webp",
      "/media/products/smt/smt-kompleks-g40-2-30-5-1.webp",
      "/media/products/smt/smt-kompleks-g40-3-0-5-1.webp",
      "/media/products/smt/smt-kompleks-g40-4-30-5-1.webp",
      "/media/products/smt/smt-kompleks-g40-5-60-5-1.webp"
    ]
  },
  {
    title: "Счётчик газа микротермальный СМТ-Смарт",
    slug: "smt-smart",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик СМТ-Смарт с телеметрией и прямым методом измерения. Типоразмеры G4, G6 и G10.",
    details: smtSmartDetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_SMART_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "19350",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-smart.webp",
    gallery: [
      "/media/products/smt/smt-smart.webp",
      "/media/products/smt/smt-smart-1-60.webp",
      "/media/products/smt/smt-smart-2-30.webp",
      "/media/products/smt/smt-smart-3-0.webp",
      "/media/products/smt/smt-smart-4-30.webp",
      "/media/products/smt/smt-smart-5-60.webp"
    ],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Смарт-К",
    slug: "smt-smart-k",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик СМТ-Смарт-К со встроенным запорным клапаном и телеметрией. Типоразмеры G4, G6 и G10.",
    details: smtSmartKDetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_SMART_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "25690",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-smart-k.webp",
    gallery: [
      "/media/products/smt/smt-smart-k.webp",
      "/media/products/smt/smt-smart-k-1-60.webp",
      "/media/products/smt/smt-smart-k-2-30.webp",
      "/media/products/smt/smt-smart-k-3-0.webp",
      "/media/products/smt/smt-smart-k-4-30.webp",
      "/media/products/smt/smt-smart-k-5-60.webp"
    ],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Смарт-ДКЗ",
    slug: "smt-smart-dkz",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик СМТ-Смарт-ДКЗ со встроенным запорным клапаном, интерфейсом для датчиков контроля загазованности и телеметрией. Типоразмеры G4, G6 и G10.",
    details: smtSmartDkzDetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_SMART_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "28190",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-smart-dkz.png",
    gallery: [
      "/media/products/smt/smt-smart-dkz.png",
      "/media/products/smt/smt-smart-dkz-1-60.png",
      "/media/products/smt/smt-smart-dkz-2-30.png",
      "/media/products/smt/smt-smart-dkz-3-0.png",
      "/media/products/smt/smt-smart-dkz-4-30.png",
      "/media/products/smt/smt-smart-dkz-5-60.png"
    ],
    featured: true
  },
  {
    title: "Система безопасного использования газа (СБИГ)",
    slug: "sbig",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Комплекс учёта природного газа, контроля загазованности и автоматического отключения подачи газа. Пороги CH₄: 10% и 20% НКПР; CO: 20 и 100 мг/м³. На базе счётчика СМТ-Смарт-ДКЗ.",
    details:
      "Система безопасного использования газа (СБИГ) — комплекс для учёта природного газа, контроля загазованности и автоматического отключения подачи газа при аварийных ситуациях.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_SMART_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/smt/sbig.webp",
    gallery: [
      "/media/products/smt/sbig.webp",
      "/media/products/smt/sbig-front.webp",
      "/media/products/smt/sbig-left.webp",
      "/media/products/smt/sbig-right.webp",
      "/media/products/smt/sbig-3.webp",
      "/media/products/smt/sbig-4.webp",
      "/media/products/smt/sbig-5.webp"
    ],
    featured: true
  },
  {
    title: "Цифровой коммуникационный блок БПЭК-02/ЦК",
    slug: "bpek-02-ck",
    kind: "Товар",
    category: "Телеметрия",
    description:
      "Цифровой коммуникационный блок для автоматизированного сбора данных с измерительных комплексов учёта газа. GSM/GPRS-телеметрия, питание 220 В, 2 SIM-карты, 4 дискретных входа.",
    details:
      "БПЭК-02/ЦК устанавливается вне взрывоопасной зоны и обеспечивает питание, опрос и передачу данных с корректоров и счётчиков газа по RS-232/RS-422/RS-485.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "БПЭК"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "98000",
    unit: "шт.",
    imageUrl: "/media/products/smt/bpek-02-ck.webp",
    gallery: [
      "/media/products/smt/bpek-02-ck.webp",
      "/media/products/smt/bpek-02-ck-1-60.webp",
      "/media/products/smt/bpek-02-ck-2-30.webp",
      "/media/products/smt/bpek-02-ck-30.webp",
      "/media/products/smt/bpek-02-ck-430.webp",
      "/media/products/smt/bpek-02-ck-560.webp"
    ],
    featured: true
  },
  {
    title: "Цифровой коммуникационный блок БПЭК-02/ЦК-Ультра",
    slug: "bpek-02-ck-ultra",
    kind: "Товар",
    category: "Телеметрия",
    description:
      "Цифровой коммуникационный блок для промышленных расходомеров и ультразвуковых счётчиков. GSM/GPRS-телеметрия, питание 220 В, до 20 Вт, 2 SIM-карты, 4 дискретных входа.",
    details:
      "БПЭК-02/ЦК-Ультра устанавливается вне взрывоопасной зоны. Подключение TurboFlow UFG/GFG, Вымпел-500, FLOWSIC 500 и FLOWSIC600-XT.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "БПЭК"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "116580",
    unit: "шт.",
    imageUrl: "/media/products/smt/bpek-02-ck-ultra.webp",
    gallery: [
      "/media/products/smt/bpek-02-ck-ultra.webp",
      "/media/products/smt/bpek-02-ck-ultra-1-60.webp",
      "/media/products/smt/bpek-02-ck-ultra-2-30.webp",
      "/media/products/smt/bpek-02-ck-ultra-4-30.webp",
      "/media/products/smt/bpek-02-ck-ultra-5-60.webp"
    ],
    featured: true
  },
  {
    title: "Цифровой коммуникационный блок БПЭК-03/ЦК",
    slug: "bpek-03-ck",
    kind: "Товар",
    category: "Телеметрия",
    description:
      "Цифровой коммуникационный блок для автоматизированного сбора данных с измерительных комплексов учёта газа. Питание 220 В, до 10 Вт, GSM/GPRS-телеметрия (CSD/FTP/SMS/TCP), 2 SIM-карты, 4 дискретных входа. Рабочая температура от −40 до +55 °С.",
    details:
      "БПЭК-03/ЦК устанавливается вне взрывоопасной зоны и обеспечивает питание, опрос и передачу данных с корректоров и счётчиков газа по RS-232/RS-422/RS-485.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "БПЭК"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "34500",
    unit: "шт.",
    imageUrl: "/media/products/smt/bpek-03-ck.webp",
    gallery: [
      "/media/products/smt/bpek-03-ck.webp",
      "/media/products/smt/bpek-03-ck-1-60.webp",
      "/media/products/smt/bpek-03-ck-2-30.webp",
      "/media/products/smt/bpek-03-ck-4-30.webp",
      "/media/products/smt/bpek-03-ck-5-60.webp",
      "/media/products/smt/bpek-03-ck-left.webp"
    ],
    featured: true
  },
  {
    title: "Цифровой коммуникационный блок БПЭК-04/ЦК-Ex",
    slug: "bpek-04-ck-ex",
    kind: "Товар",
    category: "Телеметрия",
    description:
      "Цифровой коммуникационный блок для установки во взрывоопасных зонах. Питание 7,2 В, до 10 Вт, GSM/GPRS-телеметрия (CSD/FTP/SMS/TCP), 2 SIM-карты, 4 дискретных входа. Рабочая температура от −40 до +60 °С.",
    details:
      "БПЭК-04/ЦК-Ex устанавливается во взрывоопасной зоне и обеспечивает опрос и передачу данных с корректоров и счётчиков газа по RS-232/RS-422/RS-485.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "БПЭК"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "89550",
    unit: "шт.",
    imageUrl: "/media/products/smt/bpek-04-ck-ex.webp",
    gallery: [
      "/media/products/smt/bpek-04-ck-ex.webp",
      "/media/products/smt/bpek-04-ck-ex-1.webp",
      "/media/products/smt/bpek-04-ck-ex-2.webp",
      "/media/products/smt/bpek-04-ck-ex-4.webp",
      "/media/products/smt/bpek-04-ck-ex-5.webp"
    ],
    featured: true
  },
  {
    title: "Цифровой коммуникационный блок БПЭК-05/ЦК",
    slug: "bpek-05-ck",
    kind: "Товар",
    category: "Телеметрия",
    description:
      "Цифровой коммуникационный блок для автоматизированного сбора данных с измерительных комплексов учёта газа. Питание 220 В, до 10 Вт, GSM/GPRS-телеметрия (CSD/FTP/SMS/TCP), 2 SIM-карты, 4 дискретных входа. Рабочая температура от −40 до +60 °С.",
    details:
      "БПЭК-05/ЦК устанавливается вне взрывоопасной зоны и обеспечивает питание, опрос и передачу данных с электронных корректоров по RS-232/RS-422/RS-485.",
    specs: {
      Производитель: "СМТ",
      Подкатегория: "БПЭК"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "39210",
    unit: "шт.",
    imageUrl: "/media/products/smt/bpek-05-ck.webp",
    gallery: [
      "/media/products/smt/bpek-05-ck.webp",
      "/media/products/smt/bpek-05-ck-1.webp",
      "/media/products/smt/bpek-05-ck-2.webp",
      "/media/products/smt/bpek-05-ck-4.webp",
      "/media/products/smt/bpek-05-ck-5.webp"
    ],
    featured: true
  },
  {
    title: "ПО «Газсеть: Стандарт»",
    slug: "gazset-standart",
    kind: "Товар",
    category: "ПО",
    description:
      "Программное обеспечение «Газсеть» в редакции «Стандарт» для сбора, хранения и использования данных от приборов учёта в сторонних информационных системах. Рекомендовано собственникам узлов учёта при небольшом количестве корректоров; для крупного парка — «Газсеть: Экстра».",
    details:
      "Гибкая конфигурация ПО «Газсеть: Стандарт» позволяет организовать переносной пункт сбора данных и настольную систему дистанционного опроса узлов учёта газа, анализа данных и печати отчётов.",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Газсеть"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "17300",
    unit: "шт.",
    imageUrl: "/media/products/software/gazset-standart.webp",
    gallery: ["/media/products/software/gazset-standart.webp"],
    featured: true
  },
  ...BPEK_EK_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-ЕК (${length}М.)`,
    slug: `bpek-ek-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_EK_CABLE_DESCRIPTION,
    details: BPEK_EK_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_EK_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-ek-cable.webp",
    gallery: ["/media/products/accessories/bpek-ek-cable.webp"],
    featured: true
  })),
  ...BPEK_SMT_TM07_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-СМТ/ТМ-07 (${length}М.)`,
    slug: `bpek-smt-tm07-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_SMT_TM07_CABLE_DESCRIPTION,
    details: BPEK_SMT_TM07_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_SMT_TM07_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-smt-tm07-cable.webp",
    gallery: ["/media/products/accessories/bpek-smt-tm07-cable.webp"],
    featured: true
  })),
  ...BPEK_TS_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-ТС (${length} М.)`,
    slug: `bpek-ts-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_TS_CABLE_DESCRIPTION,
    details: BPEK_TS_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_TS_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-ts-cable.webp",
    gallery: ["/media/products/accessories/bpek-ts-cable.webp"],
    featured: true
  })),
  ...BPEK_FLOWGAZ_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-Флоугаз (${length}М.)`,
    slug: `bpek-flowgaz-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_FLOWGAZ_CABLE_DESCRIPTION,
    details: BPEK_FLOWGAZ_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_FLOWGAZ_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-flowgaz-cable.webp",
    gallery: ["/media/products/accessories/bpek-flowgaz-cable.webp"],
    featured: true
  })),
  ...BPEK_VKG_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-ВКГ (${length}м)`,
    slug: `bpek-vkg-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_VKG_CABLE_DESCRIPTION,
    details: BPEK_VKG_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_VKG_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-ts-cable.webp",
    gallery: ["/media/products/accessories/bpek-ts-cable.webp"],
    featured: true
  })),
  ...BPEK_SPG_IRVIS_CABLE_LENGTHS.map((length) => ({
    title: `Кабель БПЭК-СПГ/Ирвис (${length}м)`,
    slug: `bpek-spg-irvis-cable-${length}m`,
    kind: "Товар",
    category: "Кабели БПЭК",
    description: BPEK_SPG_IRVIS_CABLE_DESCRIPTION,
    details: BPEK_SPG_IRVIS_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: `${length} м`
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: cablePriceByLength(BPEK_SPG_IRVIS_CABLE_PRICES, length),
    unit: "шт.",
    imageUrl: "/media/products/accessories/bpek-spg-irvis-cable.webp",
    gallery: ["/media/products/accessories/bpek-spg-irvis-cable.webp"],
    featured: true
  })),
  {
    title: "Кабель для выносного монтажа GSM-антенны 8м",
    slug: "gsm-antenna-cable-8m",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description: GSM_ANTENNA_CABLE_DESCRIPTION,
    details: GSM_ANTENNA_CABLE_DESCRIPTION,
    specs: {
      Производитель: CABLE_MANUFACTURER,
      Длина: "8 м"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "1930",
    unit: "шт.",
    imageUrl: "/media/products/accessories/gsm-antenna-cable.webp",
    gallery: ["/media/products/accessories/gsm-antenna-cable.webp"],
    featured: true
  },
  {
    title: "Антенна выносная GSM 3 м",
    slug: "gsm-external-antenna-3m",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Выносная компактная GSM-антенна для установки на горизонтальные поверхности. Предназначена для мест со слабым уровнем сигнала сети GSM. Антенна используется в качестве усиливающей приёмно-передающей антенны для счётчиков газа СМТ-Комплекс.",
    details:
      "Выносная компактная GSM-антенна для установки на горизонтальные поверхности. Предназначена для мест со слабым уровнем сигнала сети GSM.",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Антенны"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "2500",
    unit: "шт.",
    imageUrl: "/media/products/accessories/antenna.webp",
    gallery: ["/media/products/accessories/antenna.webp"],
    featured: true
  },
  {
    title: "Устройство считывающее оптическое КАО-USB",
    slug: "kao-usb",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Используется для работы в составе ПТК «Газсеть» при подключении электронного оборудования с внешним оптическим интерфейсом к персональному компьютеру/ноутбуку используя USB-порт при помощи ПО «Газсеть: Стандарт» или других программ.",
    details:
      "Используется для работы в составе ПТК «Газсеть» при подключении электронного оборудования с внешним оптическим интерфейсом к персональному компьютеру или ноутбуку через USB-порт.",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Устройства считывания"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "5500",
    unit: "шт.",
    imageUrl: "/media/products/accessories/kao-usb-min.webp",
    gallery: [
      "/media/products/accessories/kao-usb-min.webp",
      "/media/products/accessories/kao-usb-2.webp",
      "/media/products/accessories/kao-usb-3.webp",
      "/media/products/accessories/kao-usb-4.webp",
      "/media/products/accessories/kao-usb-5.webp"
    ],
    featured: true
  },
  {
    title: "Элементы питания",
    slug: "elementy-pitaniya",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description: POWER_ELEMENTS_DESCRIPTION,
    details: "",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Элементы питания"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "1540",
    unit: "шт.",
    imageUrl: "/media/products/accessories/power.webp",
    gallery: ["/media/products/accessories/power.webp"],
    featured: true
  },
  {
    title: "Присоединительное оборудование для монтажа",
    slug: "montazhnoe-prisoedinitelnoe-oborudovanie",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Предназначен для упрощения монтажа счётчиков газа СМТ-Смарт и СМТ-Комплекс.",
    details: "",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Присоединительное оборудование"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "690",
    unit: "шт.",
    imageUrl: "/media/products/accessories/montazh/gallery/kmch-s-20-25.webp",
    gallery: [
      "/media/products/accessories/montazh/gallery/kmch-s-20-25.webp",
      "/media/products/accessories/montazh/gallery/kmch-k-32.webp",
      "/media/products/accessories/montazh/gallery/kmch-k-f.webp",
      "/media/products/accessories/montazh/gallery/diafragm-kmch-s.webp",
      "/media/products/accessories/montazh/gallery/diafragm-kmch-sk.webp",
      "/media/products/accessories/montazh/gallery/diafragm-kmch-k.webp"
    ],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G10(Т)",
    slug: "komplekt-fitingov-vk-g10t",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G10(Т). Гайка накидная 1 ¾\", патрубок без резьбы d=38 мм, Ду=32 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмера G10(Т).",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G10(Т)",
      "Гайка накидная": "1 ¾\"",
      "Патрубок без резьбы": "d=38 мм",
      "Условный диаметр": "Ду=32 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G10, G16",
    slug: "komplekt-fitingov-vk-g10-g16",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G10, G16. Гайка накидная 2\", патрубок без резьбы d=48 мм, Ду=40 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмеров G10 и G16.",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G10, G16",
      "Гайка накидная": "2\"",
      "Патрубок без резьбы": "d=48 мм",
      "Условный диаметр": "Ду=40 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G25",
    slug: "komplekt-fitingov-vk-g25",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G25. Гайка накидная 2 ½\", патрубок без резьбы d=60 мм, Ду=50 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмера G25.",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G25",
      "Гайка накидная": "2 ½\"",
      "Патрубок без резьбы": "d=60 мм",
      "Условный диаметр": "Ду=50 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G1,6(Т)-G6(Т)",
    slug: "komplekt-fitingov-vk-g16-g6t-dy15",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G1,6(Т)-G6(Т). Гайка накидная 1¼\", патрубок без резьбы d=22 мм, Ду=15 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмеров G1,6(Т)-G6(Т).",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G1,6(Т)-G6(Т)",
      "Гайка накидная": "1¼\"",
      "Патрубок без резьбы": "d=22 мм",
      "Условный диаметр": "Ду=15 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G1,6(Т)-G6(Т)",
    slug: "komplekt-fitingov-vk-g16-g6t-dy20",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G1,6(Т)-G6(Т). Гайка накидная 1¼\", патрубок без резьбы d=26,5 мм, Ду=20 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмеров G1,6(Т)-G6(Т).",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G1,6(Т)-G6(Т)",
      "Гайка накидная": "1¼\"",
      "Патрубок без резьбы": "d=26,5 мм",
      "Условный диаметр": "Ду=20 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Комплект фитингов ВК G1,6(Т)-G6(Т)",
    slug: "komplekt-fitingov-vk-g16-g6t-dy25",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Комплект фитингов для счётчиков газа ВК G1,6(Т)-G6(Т). Гайка накидная 1¼\", патрубок без резьбы d=33,5 мм, Ду=25 мм.",
    details:
      "Комплект фитингов для монтажа диафрагменных счётчиков газа РАСКО серии ВК типоразмеров G1,6(Т)-G6(Т).",
    specs: {
      Производитель: "РАСКО",
      Подкатегория: "Присоединительное оборудование",
      Серия: "ВК",
      Совместимость: "ВК G1,6(Т)-G6(Т)",
      "Гайка накидная": "1¼\"",
      "Патрубок без резьбы": "d=33,5 мм",
      "Условный диаметр": "Ду=25 мм"
    },
    leadTime: "по наличию, уточняется в заявке",
    price: "0",
    unit: "компл.",
    imageUrl: "/media/products/accessories/rasko-vk-fittings.webp",
    gallery: ["/media/products/accessories/rasko-vk-fittings.webp"],
    featured: true
  },
  {
    title: "Шкаф защитный ШГ",
    slug: "shkaf-zashchitnyy-shg",
    kind: "Товар",
    category: "Дополнительное оборудование",
    description:
      "Шкафы защитные ШГ-1, ШГ-2 и ШГ-3 используются для защиты от механических нагрузок, несанкционированного доступа и воздействия атмосферных осадков при установке счётчиков газа СМТ-Смарт и СМТ-Комплекс на трубопровод. Конструкция шкафа имеет антивандальное исполнение, возможность пломбировки и механический замок.",
    details:
      "Шкаф защитный ШГ рассчитан для работы в диапазоне температур от -50°С до +50°С и имеет 3 варианта исполнения: ШГ-1, ШГ-2 и ШГ-3.",
    specs: {
      Производитель: "Техномер",
      Подкатегория: "Шкафы защитные"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "6200",
    unit: "шт.",
    imageUrl: "/media/products/accessories/shg/shg-3-0.webp",
    gallery: [
      "/media/products/accessories/shg/shg-3-0.webp",
      "/media/products/accessories/shg/shg-1-60.webp",
      "/media/products/accessories/shg/shg-2-30.webp",
      "/media/products/accessories/shg/shg-4-30.webp",
      "/media/products/accessories/shg/shg-5-60.webp",
      "/media/products/accessories/shg/shg-left.webp"
    ],
    featured: true
  },
  {
    title: "Датчик импульсов IN-Z61 0,65м",
    slug: "in-z61-065m",
    kind: "Товар",
    category: "Датчики",
    description:
      "Предназначен для дистанционной передачи данных о расходе с коммунальных и бытовых счётчиков газа типа ВК.",
    details:
      "Датчик импульсов IN-Z61 предназначен для автоматизированного сбора данных и устанавливается на газовые счётчики без вмешательства в их конструкцию.",
    specs: {
      Производитель: "Техномер"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "1670",
    unit: "шт.",
    imageUrl: "/media/products/accessories/in-z61.webp",
    gallery: [
      "/media/products/accessories/in-z61.webp",
      "/media/products/accessories/in-z61-2.webp"
    ],
    featured: true
  },
  {
    title: "Датчик импульсов IN-Z61 2.5м",
    slug: "in-z61-25m",
    kind: "Товар",
    category: "Датчики",
    description:
      "Предназначен для дистанционной передачи данных о расходе с коммунальных и бытовых счётчиков газа типа ВК.",
    details:
      "Датчик импульсов IN-Z61 предназначен для автоматизированного сбора данных и устанавливается на газовые счётчики без вмешательства в их конструкцию.",
    specs: {
      Производитель: "Техномер"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "1860",
    unit: "шт.",
    imageUrl: "/media/products/accessories/in-z61.webp",
    gallery: [
      "/media/products/accessories/in-z61.webp",
      "/media/products/accessories/in-z61-2.webp"
    ],
    featured: true
  },
  {
    title: "Датчик импульсов IN-S10 0,8м",
    slug: "in-s10-08m",
    kind: "Товар",
    category: "Датчики",
    description:
      "Предназначен для дистанционной передачи данных с ротационных (типа RVG, RABO) и турбинных (типа TRZ) счётчиков газа.",
    details:
      "Низкочастотный датчик E1 IN-S10 – высокоточное устройство для удалённого получения данных с ротационных (RVG) и турбинных (TRZ) счётчиков расхода газа.",
    specs: {
      Производитель: "Техномер"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "3080",
    unit: "шт.",
    imageUrl: "/media/products/accessories/in-s10.webp",
    gallery: ["/media/products/accessories/in-s10.webp"],
    featured: true
  },
  {
    title: "Датчик импульсов IN-S10 2.5м",
    slug: "in-s10-25m",
    kind: "Товар",
    category: "Датчики",
    description:
      "Предназначен для дистанционной передачи данных с ротационных (типа RVG, RABO) и турбинных (типа TRZ) счётчиков газа.",
    details:
      "Низкочастотный датчик E1 IN-S10 – высокоточное устройство для удалённого получения данных с ротационных (RVG) и турбинных (TRZ) счётчиков расхода газа.",
    specs: {
      Производитель: "Техномер"
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "3270",
    unit: "шт.",
    imageUrl: "/media/products/accessories/in-s10.webp",
    gallery: ["/media/products/accessories/in-s10.webp"],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Смарт 110",
    slug: "smt-smart-110",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Микротермальный счётчик СМТ-Смарт 110 для замены диафрагменных счётчиков 110 мм. Типоразмеры G4 и G6, прямой метод измерения, IP68.",
    details: smtSmart110DetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_SMART_110_TYPE_SIZES
    },
    leadTime: "скоро в продаже",
    price: "0",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-smart-110.webp",
    gallery: [
      "/media/products/smt/smt-smart-110.webp",
      "/media/products/smt/smt-smart-110-2.webp",
      "/media/products/smt/smt-smart-110-3.webp",
      "/media/products/smt/smt-smart-110-4.webp",
      "/media/products/smt/smt-smart-110-5.webp",
      "/media/products/smt/smt-smart-110-6.webp"
    ],
    featured: true
  },
  {
    title: "Счётчик газа микротермальный СМТ-Комплекс G65 и G100",
    slug: "smt-kompleks-g65-g100",
    kind: "Товар",
    category: "Счётчики газа",
    description:
      "Промышленно-коммунальный микротермальный счётчик линейки СМТ-Комплекс — исполнения G65 и G100. Qном до 100 м³/ч, фланец DN 80.",
    details: smtKompleksG65G100DetailsIntro,
    specs: {
      Производитель: "СМТ",
      Подкатегория: "СМТ-Комплексы",
      Типоразмеры: SMT_KOMPLEKS_G65_G100_TYPE_SIZES
    },
    leadTime: "по наличию у дилера, уточняется в заявке",
    price: "244680",
    unit: "шт.",
    imageUrl: "/media/products/smt/smt-kompleks-g65.webp",
    gallery: [
      "/media/products/smt/smt-kompleks-g65.webp",
      "/media/products/smt/smt-kompleks-g65-1-60-6-1.webp",
      "/media/products/smt/smt-kompleks-g65-2-30-6-1.webp",
      "/media/products/smt/smt-kompleks-g65-3-0-6-1.webp",
      "/media/products/smt/smt-kompleks-g65-4-30-6-1.webp",
      "/media/products/smt/smt-kompleks-g65-5-60-6-1.webp"
    ]
  },
  ...intelligentWetRotorPumpProducts,
  ...threeSpeedWetRotorPumpProducts,
  ...inlineCirculationPumpProducts,
  ...verticalMultistagePumpProducts,
  ...horizontalMultistagePumpProducts,
  ...monoblockConsolePumpProducts,
  ...consoleCentrifugalPumpProducts,
  ...submersibleSewagePumpProducts,
  {
    title: "Заточка свёрл до 20 мм на профессиональном оборудовании",
    slug: "zatochka-sverl-20mm",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Заточка спиральных свёрл по металлу на профессиональном оборудовании — восстановим режущую кромку и геометрию под вашу задачу.",
    details:
      "Принимаем свёрла диаметром до 20 мм. После заточки инструмент готов к сверлению конструкционных и нержавеющих сталей. Работаем для частных заказчиков и производств в Ростовской области.",
    specs: {
      "Диаметр": "до 20 мм",
      "Тип инструмента": "спиральные свёрла по металлу",
      "Оборудование": "профессиональный заточной станок",
      "Срок": "от 1 рабочего дня",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "1–2 рабочих дня",
    price: "100",
    unit: "шт.",
    imageUrl: "/media/services/zatochka-sverl-20mm.webp",
    gallery: ["/media/services/zatochka-sverl-20mm.webp"],
    featured: true
  },
  {
    title: "Роботизированная сварка металла",
    slug: "robotizirovannaya-svarka-metalla",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Роботизированная сварка металлоконструкций и трубопроводной арматуры с повторяемым качеством шва.",
    details:
      "Выполняем сварочные работы на роботизированном комплексе для серийных и единичных изделий. Подходит для ответственных соединений на производственных площадках и в мастерских.",
    specs: {
      "Тип работ": "дуговая роботизированная сварка",
      "Материалы": "углеродистая и нержавеющая сталь",
      "Применение": "трубы, фланцы, металлоконструкции",
      "Контроль": "визуальный осмотр шва",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "по согласованию",
    price: "1000",
    unit: "услуга",
    imageUrl: "/media/services/robotizirovannaya-svarka-metalla.webp",
    gallery: ["/media/services/robotizirovannaya-svarka-metalla.webp"],
    featured: true
  },
  {
    title: "Сверление металла",
    slug: "sverlenie-metalla",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Сверление отверстий в металле на станках — от единичных деталей до небольших партий.",
    details:
      "Сверлим заготовки и готовые изделия по чертежу или образцу. Подбираем инструмент под марку стали и требуемую точность отверстий.",
    specs: {
      "Операции": "сверление, зенкерование по задаче",
      "Материалы": "сталь, нержавейка, цветные сплавы",
      "Основание": "чертёж или образец",
      "Партия": "от 1 детали",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "1–3 рабочих дня",
    price: "1000",
    unit: "услуга",
    imageUrl: "/media/services/sverlenie-metalla.webp",
    gallery: ["/media/services/sverlenie-metalla.webp"],
    featured: true
  },
  {
    title: "Гибка листового металла на листогибе",
    slug: "gibka-listovogo-metalla",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Гибка листового металла на листогибочном прессе — корпусные элементы, кронштейны, панели.",
    details:
      "Изготавливаем гнутые детали по эскизу или чертежу. Помогаем подобрать радиус гиба и последовательность операций для серии или разового заказа.",
    specs: {
      "Оборудование": "листогибочный пресс",
      "Материал": "листовой прокат",
      "Документы": "эскиз, DXF или чертёж",
      "Применение": "кожухи, панели, крепёж",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "2–5 рабочих дней",
    price: "100",
    unit: "услуга",
    imageUrl: "/media/services/gibka-listovogo-metalla.webp",
    gallery: ["/media/services/gibka-listovogo-metalla.webp"],
    featured: true
  },
  {
    title: "Нарезка резьбы на трубах 1/2–2 дюйма",
    slug: "narrezka-rezby-trub",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Нарезка резьбы на стальных трубах диаметром от 1/2 до 2 дюймов для монтажа и комплектации.",
    details:
      "Готовим трубные заготовки с наружной или внутренней резьбой под вашу арматуру. Удобно для монтажных бригад и небольших производств.",
    specs: {
      "Диаметр": "1/2″ – 2″",
      "Тип резьбы": "цилиндрическая трубная",
      "Материал": "стальные трубы",
      "Партия": "от 1 шт.",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "в день обращения",
    price: "90",
    unit: "шт.",
    imageUrl: "/media/services/narrezka-rezby-trub.webp",
    gallery: ["/media/services/narrezka-rezby-trub.webp"],
    featured: true
  },
  {
    title: "3D-печать пластиком и TPU (резиной)",
    slug: "3d-pechat-plastik-tpu",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "3D-печать деталей из инженерного пластика и гибкого TPU — прототипы, оснастка, мелкосерийные изделия.",
    details:
      "Печатаем функциональные детали, крепёж, прокладки и прототипы. TPU подходит для упругих элементов и защитных накладок.",
    specs: {
      "Материалы": "PLA, PETG, ABS, TPU",
      "Назначение": "прототипы, оснастка, запчасти",
      "Файлы": "STL, STEP",
      "Точность": "по модели и настройкам печати",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "1–4 рабочих дня",
    price: "100",
    unit: "услуга",
    imageUrl: "/media/services/3d-pechat-plastik-tpu.webp",
    gallery: ["/media/services/3d-pechat-plastik-tpu.webp"],
    featured: true
  },
  {
    title: "Распил металла на ленточнопильном станке",
    slug: "raspil-metalla-lentopilnyy",
    kind: "Услуга",
    category: "Металлообработка",
    description:
      "Распил металлопроката и заготовок на ленточнопильном станке с точным резом под размер.",
    details:
      "Режем прутки, трубы и профиль по заданной длине. Подходит для подготовки заготовок под дальнейшую мехобработку или отгрузку на объект.",
    specs: {
      "Оборудование": "ленточнопильный станок",
      "Заготовки": "пруток, труба, профиль",
      "Точность": "по размеру заказчика",
      "Партия": "от 1 реза",
      "Регион": "Ростовская обл., Аксайский р-н"
    },
    leadTime: "в день обращения",
    price: "100",
    unit: "рез",
    imageUrl: "/media/services/raspil-metalla-lentopilnyy.webp",
    gallery: ["/media/services/raspil-metalla-lentopilnyy.webp"],
    featured: true
  },
  {
    title: "Сервисное обслуживание газового узла",
    slug: "servis-gazovogo-uzla",
    kind: "Услуга",
    category: "Сервис",
    description:
      "Диагностика, настройка и регламентное обслуживание газорегуляторных пунктов и узлов учета.",
    details:
      "Проводим осмотр оборудования, проверку герметичности, настройку регуляторов и составляем рекомендации по дальнейшей эксплуатации. Стоимость зависит от состава узла и удаленности объекта.",
    specs: {
      "Выезд": "по согласованию",
      "Работы": "осмотр, настройка, рекомендации",
      "Объекты": "ГРПШ, УУГ, регуляторные линии",
      "Отчет": "акт и перечень замечаний",
      "Гарантия": "на выполненные работы"
    },
    leadTime: "по графику, обычно 2-5 дней",
    price: "18000",
    unit: "выезд",
    imageUrl: "/media/services/servis-gazovogo-uzla.webp",
    gallery: ["/media/services/servis-gazovogo-uzla.webp"]
  },
  {
    title: "Заявка на консультацию",
    slug: "zayavka-konsultaciya",
    kind: "Услуга",
    category: "Служебное",
    description: "Служебная позиция для заявок с формы консультации на сайте.",
    details: "",
    specs: {},
    leadTime: "—",
    price: "0",
    unit: "заявка",
    imageUrl: null,
    gallery: [],
    featured: false
  }
];

const RETIRED_PRODUCT_SLUGS = [
  "bpg-40",
  "rdg-80",
  "kpz-100",
  "fg-50",
  "uug-25",
  "grp-sh-10",
  "grp-shkafnoy",
  "uzel-ucheta-gaza",
  "taugaz-vkr-g16-g25-g4",
  "taugaz-vkr-g16-g25-g4t",
  "rabo-g10-dn40",
  "filtr-gazovyy-fg",
  "klapan-kpz",
  "kmch-dlya-korrektorov",
  "sg-ek-r-25-1-6",
  "sg-ek-r-40-1-6",
  "sg-ek-r-65-1-6",
  "sg-ek-r-100-1-6",
  "sg-ek-r-160-1-6",
  "sg-ek-r-250-1-6",
  "sg-ek-r-400-1-6",
  "sg-ek-r-650-1-6",
  "sg-ek-r-1000-1-6",
  "sg-ek-r-1600-1-6",
  "sg-tk-d-2-5-6",
  "sg-tk-d-10",
  "sg-tk-d-16",
  "sg-tk-d-25",
  "sg-tk-d-40",
  "sg-tk-d-65",
  "sg-tk-d-100",
  GAS_METER_ACCESSORIES_TURBINE_SLUG
];

async function main() {
  const retired = await prisma.product.findMany({
    where: { slug: { in: RETIRED_PRODUCT_SLUGS } },
    select: { id: true }
  });
  const retiredIds = retired.map((product) => product.id);
  if (retiredIds.length > 0) {
    await prisma.orderItem.deleteMany({ where: { productId: { in: retiredIds } } });
    await prisma.product.deleteMany({ where: { id: { in: retiredIds } } });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
