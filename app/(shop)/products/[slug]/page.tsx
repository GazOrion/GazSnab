import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, PackageCheck, Ruler } from "lucide-react";
import { CartQuantityControl } from "@/components/CartQuantityControl";
import { ProductDetailTabs, type ProductDetailSectionId } from "@/components/ProductDetailTabs";
import { ProductGallery } from "@/components/ProductGallery";
import { SiteHeader } from "@/components/SiteHeader";
import { getBoughtTogetherProducts } from "@/lib/bought-together";
import { getProductBackCatalogHref } from "@/lib/catalog";
import { ProductShortSpecs } from "@/components/ProductShortSpecs";
import { getProductRichContent } from "@/lib/product-content";
import { getProductPriceLabel } from "@/lib/product-price-label";
import { ThreeSpeedPumpDesignation } from "@/components/catalog/ThreeSpeedPumpDesignation";
import { BALL_VALVE_CATEGORY, getOrderedShortSpecs } from "@/lib/product-short-specs";
import { PUMP_SPEC_SUBCATEGORY, PUMP_THREE_SPEED_SUBCATEGORY } from "@/lib/pumps-catalog";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function descriptionListItems(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product || !product.inStock) {
    notFound();
  }

  const relatedProducts = await getBoughtTogetherProducts({
    productId: product.id,
    slug: product.slug,
    kind: product.kind,
    category: product.category,
    specs: (product.specs || {}) as Record<string, string>
  });

  const price = Number(product.price);
  const gallery = product.gallery.length ? product.gallery : [product.imageUrl].filter(Boolean);
  const images = gallery.length ? gallery : ["/placeholder-product.jpg"];
  const specsRecord = (product.specs || {}) as Record<string, string>;
  const specs = Object.entries(specsRecord);
  const shortSpecs =
    product.category === BALL_VALVE_CATEGORY ? getOrderedShortSpecs(specsRecord) : [];
  const richContent = getProductRichContent(product.slug);
  const descriptionItems = descriptionListItems(product.description);
  const priceLabel = getProductPriceLabel({
    slug: product.slug,
    price,
    kind: product.kind,
    category: product.category
  });
  const backCatalogHref = getProductBackCatalogHref({
    kind: product.kind,
    category: product.category,
    specs: specsRecord
  });
  const detailSections: ProductDetailSectionId[] | undefined =
    slug === "elementy-pitaniya" ? ["bought-together"] : undefined;
  const showSpecsButton = slug !== "elementy-pitaniya";
  const isThreeSpeedPump =
    specsRecord[PUMP_SPEC_SUBCATEGORY] === PUMP_THREE_SPEED_SUBCATEGORY;
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="container product-detail">
        <Link className="back-link" href={backCatalogHref}>
          <ArrowLeft size={18} />
          Назад в каталог
        </Link>

        <div className="product-detail-layout">
          <div className="product-detail-hero">
            <ProductGallery images={images as string[]} title={product.title} />

            <aside className="detail-summary detail-summary--product">
            <h1>{product.title}</h1>
            {shortSpecs.length ? (
              <ProductShortSpecs specs={shortSpecs} />
            ) : descriptionItems.length > 1 ? (
              <ul className="lead product-detail-summary-list">
                {descriptionItems.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="lead">{product.description}</p>
            )}

            <div className="detail-metrics">
              <div>
                <PackageCheck size={22} />
                <span>Цена</span>
                <strong>{priceLabel}</strong>
              </div>
              <div>
                <Ruler size={22} />
                <span>Единица</span>
                <strong>{product.unit}</strong>
              </div>
              <div>
                <Clock size={22} />
                <span>Срок</span>
                <strong>{product.leadTime}</strong>
              </div>
            </div>

            <div className="row-actions">
              <CartQuantityControl
                variant="accent"
                product={{
                  id: product.id,
                  title: product.title,
                  price,
                  unit: product.unit,
                  slug: product.slug,
                  imageUrl: product.imageUrl
                }}
              />
              {showSpecsButton ? (
                <a className="button secondary" href="#specs">
                  Характеристики
                </a>
              ) : null}
            </div>
            </aside>
          </div>

          <ProductDetailTabs
            description={product.description}
            details={product.details}
            specs={specs}
            relatedProducts={relatedProducts}
            richContent={richContent}
            sections={detailSections}
            beforeBoughtTogether={isThreeSpeedPump ? <ThreeSpeedPumpDesignation /> : undefined}
          />
        </div>
      </section>
    </main>
  );
}
