import { KRAN_SHAROVOY_LD_PRIDE_DU20_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-du20";
import { KRAN_SHAROVOY_LD_PRIDE_47_32_DU25_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-47-32-du25";
import { KRAN_SHAROVOY_LD_PRIDE_47_40_DU25_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-47-40-du25";
import { KRAN_SHAROVOY_LD_PRIDE_47_50_DU25_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-47-50-du25";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU15_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du15";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU20_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du20";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU25_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du25";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU32_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du32";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU40_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du40";
import { KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU50_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-vv-r-gas-du50";
import { KRAN_SHAROVOY_LD_PRIDE_DU25_CONTENT } from "@/lib/product-content/kran-sharovoy-ld-pride-du25";
import { KRANY_SHAROVYE_LD_PRIDE_CONTENT } from "@/lib/product-content/krany-sharovye-ld-pride";
import { SMT_KOMPLEKS_CONTENT, type ProductRichContent } from "@/lib/product-content/smt-kompleks";
import { SMT_KOMPLEKS_G40_CONTENT } from "@/lib/product-content/smt-kompleks-g40";
import { SMT_KOMPLEKS_G65_G100_CONTENT } from "@/lib/product-content/smt-kompleks-g65-g100";
import { SMT_KOMPLEKS_K_CONTENT } from "@/lib/product-content/smt-kompleks-k";
import { SMT_SMART_CONTENT } from "@/lib/product-content/smt-smart";
import { SMT_SMART_K_CONTENT } from "@/lib/product-content/smt-smart-k";
import { SMT_SMART_DKZ_CONTENT } from "@/lib/product-content/smt-smart-dkz";
import { SMT_SMART_110_CONTENT } from "@/lib/product-content/smt-smart-110";
import { SBIG_CONTENT } from "@/lib/product-content/sbig";
import { BPEK_02_CK_CONTENT } from "@/lib/product-content/bpek-02-ck";
import { BPEK_02_CK_ULTRA_CONTENT } from "@/lib/product-content/bpek-02-ck-ultra";
import { BPEK_03_CK_CONTENT } from "@/lib/product-content/bpek-03-ck";
import { BPEK_04_CK_EX_CONTENT } from "@/lib/product-content/bpek-04-ck-ex";
import { BPEK_05_CK_CONTENT } from "@/lib/product-content/bpek-05-ck";
import { GAZSET_STANDART_CONTENT } from "@/lib/product-content/gazset-standart";
import { IN_Z61_CONTENT } from "@/lib/product-content/in-z61";
import { IN_Z61_25M_CONTENT } from "@/lib/product-content/in-z61-25m";
import { IN_S10_08M_CONTENT, IN_S10_25M_CONTENT } from "@/lib/product-content/in-s10";
import { GSM_EXTERNAL_ANTENNA_3M_CONTENT } from "@/lib/product-content/gsm-external-antenna-3m";
import { KAO_USB_CONTENT } from "@/lib/product-content/kao-usb";
import { MONTAZHNOE_PRISOEDINITELNOE_OBORUDOVANIE_CONTENT } from "@/lib/product-content/montazhnoe-prisoedinitelnoe-oborudovanie";
import { SHKAF_ZASHCHITNYY_SHG_CONTENT } from "@/lib/product-content/shkaf-zashchitnyy-shg";
import { RGR_R_CONTENT_BY_SLUG } from "@/lib/product-content/rgr-r";
import { RVG_CONTENT_BY_SLUG } from "@/lib/product-content/rvg";
import { RGT_T_CONTENT_BY_SLUG } from "@/lib/product-content/rgt-t";
import { RASKO_VK_CONTENT_BY_SLUG } from "@/lib/product-content/rasko-vk";
import { TAUGAZ_VKR_CONTENT_BY_SLUG } from "@/lib/product-content/taugaz-vkr";

const RICH_CONTENT_BY_SLUG: Record<string, ProductRichContent> = {
  "smt-kompleks": SMT_KOMPLEKS_CONTENT,
  "smt-kompleks-k": SMT_KOMPLEKS_K_CONTENT,
  "smt-kompleks-g40": SMT_KOMPLEKS_G40_CONTENT,
  "smt-kompleks-g65-g100": SMT_KOMPLEKS_G65_G100_CONTENT,
  "smt-smart": SMT_SMART_CONTENT,
  "smt-smart-k": SMT_SMART_K_CONTENT,
  "smt-smart-dkz": SMT_SMART_DKZ_CONTENT,
  "sbig": SBIG_CONTENT,
  "bpek-02-ck": BPEK_02_CK_CONTENT,
  "bpek-02-ck-ultra": BPEK_02_CK_ULTRA_CONTENT,
  "bpek-03-ck": BPEK_03_CK_CONTENT,
  "bpek-04-ck-ex": BPEK_04_CK_EX_CONTENT,
  "bpek-05-ck": BPEK_05_CK_CONTENT,
  "gazset-standart": GAZSET_STANDART_CONTENT,
  "in-z61-065m": IN_Z61_CONTENT,
  "in-z61-25m": IN_Z61_25M_CONTENT,
  "in-s10-08m": IN_S10_08M_CONTENT,
  "in-s10-25m": IN_S10_25M_CONTENT,
  "gsm-external-antenna-3m": GSM_EXTERNAL_ANTENNA_3M_CONTENT,
  "kao-usb": KAO_USB_CONTENT,
  "montazhnoe-prisoedinitelnoe-oborudovanie": MONTAZHNOE_PRISOEDINITELNOE_OBORUDOVANIE_CONTENT,
  "shkaf-zashchitnyy-shg": SHKAF_ZASHCHITNYY_SHG_CONTENT,
  "smt-smart-110": SMT_SMART_110_CONTENT,
  "krany-sharovye-ld-pride": KRANY_SHAROVYE_LD_PRIDE_CONTENT,
  "kran-sharovoy-ld-pride-du20": KRAN_SHAROVOY_LD_PRIDE_DU20_CONTENT,
  "kran-sharovoy-ld-pride-du25": KRAN_SHAROVOY_LD_PRIDE_DU25_CONTENT,
  "kran-sharovoy-ld-pride-47-32-du25": KRAN_SHAROVOY_LD_PRIDE_47_32_DU25_CONTENT,
  "kran-sharovoy-ld-pride-47-40-du25": KRAN_SHAROVOY_LD_PRIDE_47_40_DU25_CONTENT,
  "kran-sharovoy-ld-pride-47-50-du25": KRAN_SHAROVOY_LD_PRIDE_47_50_DU25_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du15": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU15_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du20": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU20_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du25": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU25_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du32": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU32_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du40": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU40_CONTENT,
  "kran-sharovoy-ld-pride-vv-r-gas-du50": KRAN_SHAROVOY_LD_PRIDE_VV_R_GAS_DU50_CONTENT,
  ...TAUGAZ_VKR_CONTENT_BY_SLUG,
  ...RASKO_VK_CONTENT_BY_SLUG,
  ...RGR_R_CONTENT_BY_SLUG,
  ...RVG_CONTENT_BY_SLUG,
  ...RGT_T_CONTENT_BY_SLUG
};

export function getProductRichContent(slug: string): ProductRichContent | null {
  return RICH_CONTENT_BY_SLUG[slug] ?? null;
}

export type {
  ProductComparisonTable,
  ProductComparisonTableRow,
  ProductDataTable,
  ProductDescriptionBlock,
  ProductPartsCatalogRow,
  ProductDimensionsContent,
  ProductDimensionsSection,
  ProductRichContent,
  ProductSpecRow
} from "@/lib/product-content/smt-kompleks";
