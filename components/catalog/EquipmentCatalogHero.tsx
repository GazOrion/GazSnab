import { CatalogHubHero } from "@/components/catalog/CatalogHubHero";

type Props = {
  bannerSrc: string;
  mobileBannerSrc?: string | null;
};

export function EquipmentCatalogHero({ bannerSrc, mobileBannerSrc }: Props) {
  return (
    <CatalogHubHero
      bannerSrc={bannerSrc}
      mobileBannerSrc={mobileBannerSrc}
      title="Каталог оборудования"
      lead="Широкий ассортимент оборудования для газовых систем и производственных задач"
      titleId="equipment-catalog-title"
      breadcrumbCurrent="Каталог"
    />
  );
}
