import Link from "next/link";
import { AdminLogout } from "@/components/AdminLogout";
import { AdminOrders } from "@/components/AdminOrders";
import { AdminProducts } from "@/components/AdminProducts";
import { LoginForm } from "@/components/LoginForm";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await getAdminSession();

  if (!isAdmin) {
    return <LoginForm />;
  }

  const [products, orders] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
      take: 50
    })
  ]);

  const serializedProducts = products.map((product) => ({
    ...product,
    specs:
      product.specs && typeof product.specs === "object" && !Array.isArray(product.specs)
        ? (product.specs as Record<string, string>)
        : {},
    price: Number(product.price)
  }));

  const serializedOrders = orders.map((order) => ({
    ...order,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price)
    }))
  }));

  return (
    <main className="admin-page">
      <header className="header">
        <div className="container header-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">ГС</span>
            <span>ГазСнаб</span>
          </Link>
          <div className="row-actions" style={{ marginTop: 0 }}>
            <Link className="button secondary" href="/">
              На сайт
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <div className="admin-main">
        <div className="section-title">
          <div>
            <span className="eyebrow">Администрирование</span>
            <h1>Панель управления</h1>
            <p>Товары каталога и последние заявки покупателей.</p>
          </div>
        </div>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-title">
            <h2>Товары</h2>
          </div>
          <AdminProducts products={serializedProducts} />
        </section>

        <section className="section">
          <div className="section-title">
            <h2>Заказы</h2>
          </div>
          <AdminOrders orders={serializedOrders} />
        </section>
      </div>
    </main>
  );
}
