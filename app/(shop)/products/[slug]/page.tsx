import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ProductDetailOrderBar } from "@/components/ProductDetailOrderBar";
import { ProductDetailTabs, type ProductDetailSectionId } from "@/components/ProductDetailTabs";
import { ProductGallery } from "@/components/ProductGallery";
import { ShopPageShell } from "@/components/ShopPageShell";
import { getBoughtTogetherProducts } from "@/lib/bought-together";
import { getProductBackCatalogHref } from "@/lib/catalog";
import { ProductShortSpecs } from "@/components/ProductShortSpecs";
import { getProductRichContent } from "@/lib/product-content";
import { splitProductDescriptionBlocks } from "@/lib/product-description-split";
import { getProductDetailCardPriceLabel, getProductPriceLabel } from "@/lib/product-price-label";
import { getProductListingTitle } from "@/lib/product-listing-title";
import { PumpDesignation } from "@/components/catalog/PumpDesignation";
import { BALL_VALVE_CATEGORY, getOrderedShortSpecs } from "@/lib/product-short-specs";
import {
  getPumpDesignationAlt,
  getPumpDesignationImage,
  isCompactPumpDesignation,
  getPumpModelFromSpecs
} from "@/lib/pumps-catalog";
import { versionedPublicSrc } from "@/lib/versioned-media.server";
import { getProductSlugRedirect } from "@/lib/product-slug-redirects";
import { buildProductPageMetadata } from "@/lib/site-seo";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const redirectSlug = getProductSlugRedirect(slug);
  if (redirectSlug) {
    return buildProductPageMetadata(redirectSlug);
  }

  const product = await prisma.product.findUnique({
    where: { slug },
    select: { inStock: true }
  });

  if (!product?.inStock) {
    return { title: "Страница не найдена" };
  }

  return buildProductPageMetadata(slug);
}

function descriptionListItems(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildProductGalleryImages(imageUrl: string | null, gallery: string[]) {
  const seen = new Set<string>();
  const images: string[] = [];

  const push = (url: string | null | undefined) => {
    const value = url?.trim();
    if (!value) return;
    const versioned = versionedPublicSrc(value);
    if (seen.has(versioned)) return;
    seen.add(versioned);
    images.push(versioned);
  };

  push(imageUrl);
  for (const url of gallery) push(url);

  return images.length ? images : ["/placeholder-product.jpg"];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const redirectSlug = getProductSlugRedirect(slug);
  if (redirectSlug) {
    redirect(`/products/${redirectSlug}`);
  }

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
  const images = buildProductGalleryImages(product.imageUrl, product.gallery);
  const specsRecord = (product.specs || {}) as Record<string, string>;
  const specs = Object.entries(specsRecord);
  const shortSpecs =
    product.category === BALL_VALVE_CATEGORY ? getOrderedShortSpecs(specsRecord) : [];
  const richContent = getProductRichContent(product.slug);
  const hasRichSpecsContent = Boolean(
    (richContent?.specs?.length ?? 0) > 0 ||
      (richContent?.specsFooter?.length ?? 0) > 0 ||
      (richContent?.comparisonTable?.rows?.length ?? 0) > 0 ||
      richContent?.dimensions ||
      richContent?.dimensionsSection ||
      (richContent?.description?.length &&
        splitProductDescriptionBlocks(richContent.description).specsBlocks.length > 0)
  );
  const showSpecsPanel = hasRichSpecsContent || (!richContent && specs.length > 0);
  const descriptionItems = descriptionListItems(product.description);
  const priceLabel = getProductDetailCardPriceLabel(
    getProductPriceLabel({
      slug: product.slug,
      price,
      kind: product.kind,
      category: product.category,
      specs: specsRecord
    })
  );
  const backCatalogHref = getProductBackCatalogHref({
    kind: product.kind,
    category: product.category,
    specs: specsRecord
  });
  const detailSections: ProductDetailSectionId[] | undefined =
    slug === "elementy-pitaniya"
      ? ["bought-together"]
      : showSpecsPanel
        ? undefined
        : ["description", "bought-together"];
  const pumpModel = getPumpModelFromSpecs(specsRecord);
  const pumpDesignationImage = pumpModel ? getPumpDesignationImage(pumpModel) : null;
  const listingTitle = getProductListingTitle(product.title, specsRecord);
  return (
    <ShopPageShell className="site-shell">
      <section className="container product-detail">
        <Link className="back-link" href={backCatalogHref}>
          <ArrowLeft size={18} />
          Назад в каталог
        </Link>

        <div className="product-detail-layout">
          <div className="product-detail-hero">
            <ProductGallery images={images as string[]} title={product.title} />

            <aside className="detail-summary detail-summary--product">
              <h1>{listingTitle}</h1>
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

              <ProductDetailOrderBar
                kind={product.kind}
                priceLabel={priceLabel}
                unit={product.unit}
                leadTime={product.leadTime}
                product={{
                  id: product.id,
                  title: product.title,
                  price,
                  unit: product.unit,
                  slug: product.slug,
                  imageUrl: product.imageUrl
                }}
              />
            </aside>
          </div>

          <ProductDetailTabs
            description={product.description}
            details={product.details}
            specs={specs}
            relatedProducts={relatedProducts}
            richContent={richContent}
            sections={detailSections}
            beforeBoughtTogether={
              pumpModel && pumpDesignationImage ? (
                <PumpDesignation
                  image={pumpDesignationImage}
                  alt={getPumpDesignationAlt(pumpModel)}
                  compact={isCompactPumpDesignation(pumpModel)}
                />
              ) : undefined
            }
          />
        </div>
      </section>
    </ShopPageShell>
  );
}
