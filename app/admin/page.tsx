import Link from "next/link";
import { AdminLogout } from "@/components/AdminLogout";
import { AdminProducts } from "@/components/AdminProducts";
import { HeaderBrand } from "@/components/HeaderBrand";
import { LoginForm } from "@/components/LoginForm";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { listSeoPagesForAdmin } from "@/lib/site-seo";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await getAdminSession();

  if (!isAdmin) {
    return <LoginForm />;
  }

  const [products, categories, seoPages] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { media: { orderBy: { sortOrder: "asc" } } }
    }),
    prisma.catalogCategory.findMany({
      orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
      include: { _count: { select: { products: true } } }
    }),
    listSeoPagesForAdmin()
  ]);

  const serializedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    slug: product.slug,
    kind: product.kind,
    category: product.category,
    categoryId: product.categoryId,
    description: product.description,
    details: product.details,
    leadTime: product.leadTime,
    specs:
      product.specs && typeof product.specs === "object" && !Array.isArray(product.specs)
        ? (product.specs as Record<string, string>)
        : {},
    price: Number(product.price),
    unit: product.unit,
    imageUrl: product.imageUrl,
    gallery: product.gallery,
    inStock: product.inStock,
    featured: product.featured,
    media: product.media.map((item) => ({
      id: item.id,
      url: item.url,
      alt: item.alt,
      sortOrder: item.sortOrder
    }))
  }));

  const serializedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    kind: category.kind,
    title: category.title,
    teaser: category.teaser,
    imageUrl: category.imageUrl,
    sortOrder: category.sortOrder,
    isVisible: category.isVisible,
    _count: category._count
  }));

  return (
    <main className="admin-page">
      <header className="header admin-header">
        <div className="admin-shell admin-header-inner">
          <HeaderBrand />
          <div className="row-actions" style={{ marginTop: 0 }}>
            <Link className="button secondary" href="/">
              На сайт
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="admin-shell admin-main">
        <div className="section-title">
          <div>
            <h1 className="admin-page-title">Панель управления</h1>
            <p>Пошаговое редактирование товаров и услуг каталога.</p>
          </div>
        </div>

        <AdminProducts products={serializedProducts} categories={serializedCategories} seoPages={seoPages} />
      </div>
    </main>
  );
}
