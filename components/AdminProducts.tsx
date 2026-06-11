"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";

type Product = {
  id: string;
  title: string;
  slug: string;
  kind: string;
  category: string;
  description: string;
  details: string;
  specs: Record<string, string>;
  leadTime: string;
  price: number;
  unit: string;
  imageUrl: string | null;
  gallery: string[];
  inStock: boolean;
  featured: boolean;
};

const emptyProduct: Product = {
  id: "",
  title: "",
  slug: "",
  kind: "Товар",
  category: "",
  description: "",
  details: "",
  specs: {},
  leadTime: "от 5 рабочих дней",
  price: 0,
  unit: "шт.",
  imageUrl: "",
  gallery: [],
  inStock: true,
  featured: false
};

function specsToText(specs: Record<string, string>) {
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

function textToSpecs(value: FormDataEntryValue | null) {
  const text = String(value || "");
  return Object.fromEntries(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim()];
      })
      .filter(([key, value]) => key && value)
  );
}

export function AdminProducts({ products }: { products: Product[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Product>(emptyProduct);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      kind: formData.get("kind"),
      category: formData.get("category"),
      description: formData.get("description"),
      details: formData.get("details"),
      specs: textToSpecs(formData.get("specs")),
      leadTime: formData.get("leadTime"),
      price: formData.get("price"),
      unit: formData.get("unit"),
      imageUrl: formData.get("imageUrl"),
      gallery: String(formData.get("gallery") || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      inStock: formData.get("inStock") === "on",
      featured: formData.get("featured") === "on"
    };

    const url = editing.id ? `/api/admin/products/${editing.id}` : "/api/admin/products";
    const response = await fetch(url, {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setPending(false);
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Не удалось сохранить товар.");
      return;
    }

    setEditing(emptyProduct);
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Удалить товар? Если он есть в заказах, удаление может быть запрещено.")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="admin-grid">
      <section className="panel">
        <span className="eyebrow">{editing.id ? "Редактирование" : "Новый товар"}</span>
        <h2>{editing.id ? "Изменить товар" : "Добавить товар"}</h2>
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={submit}>
          <label className="field">
            <span>Название</span>
            <input className="input" name="title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
          </label>
          <label className="field">
            <span>Тип</span>
            <select className="select" name="kind" value={editing.kind} onChange={(e) => setEditing({ ...editing, kind: e.target.value })}>
              <option value="Товар">Товар</option>
              <option value="Услуга">Услуга</option>
            </select>
          </label>
          <label className="field">
            <span>Slug латиницей</span>
            <input className="input" name="slug" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} required />
          </label>
          <label className="field">
            <span>Категория</span>
            <input className="input" name="category" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} required />
          </label>
          <label className="field">
            <span>Описание</span>
            <textarea className="textarea" name="description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} required />
          </label>
          <label className="field">
            <span>Подробное описание</span>
            <textarea className="textarea" name="details" value={editing.details} onChange={(e) => setEditing({ ...editing, details: e.target.value })} />
          </label>
          <label className="field">
            <span>Характеристики, по одной строке: Название: значение</span>
            <textarea className="textarea" name="specs" value={specsToText(editing.specs)} onChange={(e) => setEditing({ ...editing, specs: textToSpecs(e.target.value) })} />
          </label>
          <label className="field">
            <span>Срок исполнения</span>
            <input className="input" name="leadTime" value={editing.leadTime} onChange={(e) => setEditing({ ...editing, leadTime: e.target.value })} required />
          </label>
          <label className="field">
            <span>Цена</span>
            <input className="input" name="price" type="number" min="1" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} required />
          </label>
          <label className="field">
            <span>Единица</span>
            <input className="input" name="unit" value={editing.unit} onChange={(e) => setEditing({ ...editing, unit: e.target.value })} required />
          </label>
          <label className="field">
            <span>URL изображения</span>
            <input className="input" name="imageUrl" value={editing.imageUrl || ""} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} />
          </label>
          <label className="field">
            <span>Галерея, URL по одному в строке</span>
            <textarea className="textarea" name="gallery" value={editing.gallery.join("\n")} onChange={(e) => setEditing({ ...editing, gallery: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })} />
          </label>
          <label className="qty">
            <input name="inStock" type="checkbox" checked={editing.inStock} onChange={(e) => setEditing({ ...editing, inStock: e.target.checked })} />
            В наличии
          </label>
          <label className="qty">
            <input name="featured" type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
            В начало каталога
          </label>
          <div className="row-actions">
            <button className="button" disabled={pending} type="submit">
              <Plus size={18} />
              {pending ? "Сохранение..." : "Сохранить"}
            </button>
            {editing.id && (
              <button className="button secondary" type="button" onClick={() => setEditing(emptyProduct)}>
                Новый товар
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Товар</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <strong>{product.title}</strong>
                  <p className="muted">{product.slug}</p>
                </td>
                <td>
                  {product.category}
                  <p className="muted">{product.kind}</p>
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <span className="status-pill">{product.inStock ? "В наличии" : "Скрыт"}</span>
                </td>
                <td>
                  <div className="row-actions" style={{ marginTop: 0 }}>
                    <button className="icon-button" type="button" aria-label="Редактировать" onClick={() => setEditing(product)}>
                      <Pencil size={18} />
                    </button>
                    <button className="icon-button" type="button" aria-label="Удалить" onClick={() => remove(product.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
