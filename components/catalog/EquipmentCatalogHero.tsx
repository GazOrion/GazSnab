import { CatalogHubHero } from "@/components/catalog/CatalogHubHero";

type Props = {
  bannerSrc: string;
};

export function EquipmentCatalogHero({ bannerSrc }: Props) {
  return (
    <CatalogHubHero
      bannerSrc={bannerSrc}
      title="Каталог оборудования"
      lead="Широкий ассортимент оборудования для газовых систем и производственных задач"
      titleId="equipment-catalog-title"
      breadcrumbCurrent="Каталог"
    />
  );
}
