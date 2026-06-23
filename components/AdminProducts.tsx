"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slugify";
import { AdminMediaUploader, type AdminMediaItem } from "@/components/AdminMediaUploader";

export type AdminCategoryOption = {
  id: string;
  name: string;
  title: string;
  kind: string;
  isVisible: boolean;
  sortOrder: number;
};

type SpecRow = {
  key: string;
  value: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  kind: string;
  category: string;
  categoryId: string | null;
  description: string;
  details: string;
  specs: Record<string, string>;
  leadTime: string;
  price: number;
  unit: string;
  imageUrl: string | null;
  gallery: string[];
  media: AdminMediaItem[];
  inStock: boolean;
  featured: boolean;
};

function createEmptyProduct(kind: "Товар" | "Услуга" = "Товар"): Product {
  return {
    id: "",
    title: "",
    slug: "",
    kind,
    category: "",
    categoryId: null,
    description: "",
    details: "",
    specs: {},
    leadTime: "от 5 рабочих дней",
    price: 0,
    unit: "шт.",
    imageUrl: "",
    gallery: [],
    media: [],
    inStock: true,
    featured: false
  };
}

function specsToRows(specs: Record<string, string>): SpecRow[] {
  const rows = Object.entries(specs).map(([key, value]) => ({ key, value }));
  return rows.length ? rows : [{ key: "", value: "" }];
}

function rowsToSpecs(rows: SpecRow[]) {
  return Object.fromEntries(
    rows
      .map((row) => [row.key.trim(), row.value.trim()])
      .filter(([key, value]) => key && value)
  );
}

function productMedia(product: Product): AdminMediaItem[] {
  if (product.media.length) {
    return product.media.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  const urls = [...new Set([product.imageUrl, ...product.gallery].filter(Boolean) as string[])];
  return urls.map((url, index) => ({
    url,
    alt: product.title,
    sortOrder: index
  }));
}

function buildPayload(product: Product, rows: SpecRow[], media: AdminMediaItem[]) {
  return {
    title: product.title,
    slug: product.slug,
    kind: product.kind,
    categoryId: product.categoryId ?? "",
    category: product.category,
    description: product.description,
    details: product.details,
    specs: rowsToSpecs(rows),
    leadTime: product.leadTime,
    price: product.price,
    unit: product.unit,
    imageUrl: media[0]?.url ?? "",
    gallery: media.map((item) => item.url),
    media,
    inStock: product.inStock,
    featured: product.featured
  };
}

function getCategoryLabel(
  product: Product,
  categories: AdminCategoryOption[]
) {
  const category = categories.find((item) => item.id === product.categoryId);
  return category?.title || category?.name || product.category;
}

export function AdminProducts({
  products,
  categories
}: {
  products: Product[];
  categories: AdminCategoryOption[];
}) {
  const router = useRouter();
  const [selectedKind, setSelectedKind] = useState<"Товар" | "Услуга" | null>(null);
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [editing, setEditing] = useState<Product>(createEmptyProduct("Товар"));
  const [specRows, setSpecRows] = useState<SpecRow[]>(specsToRows({}));
  const [media, setMedia] = useState<AdminMediaItem[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [togglingVisibilityId, setTogglingVisibilityId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState("");
  const listScrollYRef = useRef(0);
  const shouldRestoreListScrollRef = useRef(false);

  const visibleCategories = useMemo(
    () =>
      categories
        .filter((category) => category.isVisible)
        .sort((a, b) => a.kind.localeCompare(b.kind, "ru") || a.sortOrder - b.sortOrder),
    [categories]
  );
  const selectedCategories = useMemo(
    () => visibleCategories.filter((category) => category.kind === selectedKind),
    [visibleCategories, selectedKind]
  );

  const filteredProducts = useMemo(() => {
    if (!selectedKind) return [];
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      if (product.kind !== selectedKind) return false;
      const categoryLabel = getCategoryLabel(product, categories).toLowerCase();
      const matchesQuery =
        !search ||
        product.title.toLowerCase().includes(search) ||
        product.slug.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        categoryLabel.includes(search);
      const matchesCategory = categoryFilter === "all" || product.categoryId === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter, selectedKind, categories]);

  useEffect(() => {
    if (mode !== "list" || !shouldRestoreListScrollRef.current) return;
    shouldRestoreListScrollRef.current = false;
    const scrollY = listScrollYRef.current;
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: "auto" });
    });
  }, [mode, filteredProducts.length]);

  function rememberListScroll() {
    listScrollYRef.current = window.scrollY;
  }

  function pickKind(kind: "Товар" | "Услуга") {
    setSelectedKind(kind);
    setMode("list");
    setQuery("");
    setCategoryFilter("all");
    setError("");
  }

  function startEdit(product: Product) {
    rememberListScroll();
    setSelectedKind(product.kind as "Товар" | "Услуга");
    setEditing(product);
    setSpecRows(specsToRows(product.specs));
    setMedia(productMedia(product));
    setError("");
    setSavedNotice("");
    setMode("edit");
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  function startNew(kind: "Товар" | "Услуга") {
    rememberListScroll();
    setEditing(createEmptyProduct(kind));
    setSpecRows(specsToRows({}));
    setMedia([]);
    setError("");
    setSavedNotice("");
    setMode("edit");
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  }

  function backToList() {
    shouldRestoreListScrollRef.current = true;
    setMode("list");
    setError("");
    setSavedNotice("");
  }

  function updateCategory(categoryId: string) {
    const category = visibleCategories.find((item) => item.id === categoryId);
    setEditing({
      ...editing,
      categoryId: category?.id ?? null,
      category: category?.name ?? "",
      kind: category?.kind ?? editing.kind
    });
  }

  function updateSpec(index: number, patch: Partial<SpecRow>) {
    setSpecRows((current) =>
      current.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row))
    );
  }

  function removeSpec(index: number) {
    setSpecRows((current) => {
      const next = current.filter((_, rowIndex) => rowIndex !== index);
      return next.length ? next : [{ key: "", value: "" }];
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const payload = {
      ...buildPayload(editing, specRows, media),
      kind: selectedKind ?? editing.kind
    };

    const url = editing.id ? `/api/admin/products/${editing.id}` : "/api/admin/products";
    const response = await fetch(url, {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json().catch(() => null)) as { id?: string; error?: string } | null;

    setPending(false);
    if (!response.ok) {
      setError(data?.error || "Не удалось сохранить товар.");
      return;
    }

    const payloadProduct = buildPayload(editing, specRows, media);
    const savedProduct: Product = {
      ...editing,
      ...payloadProduct,
      id: editing.id || data?.id || "",
      kind: selectedKind ?? editing.kind,
      imageUrl: payloadProduct.imageUrl || null,
      gallery: payloadProduct.gallery,
      media: payloadProduct.media.map((item, index) => ({
        ...item,
        alt: item.alt || payloadProduct.title,
        sortOrder: item.sortOrder ?? index
      }))
    };

    setEditing(savedProduct);
    setSavedNotice("Изменения сохранены.");
    router.refresh();
  }

  async function toggleVisibility(product: Product) {
    const nextInStock = !product.inStock;
    setTogglingVisibilityId(product.id);
    const payload = buildPayload(
      {
        ...product,
        inStock: nextInStock,
        featured: nextInStock ? product.featured : false
      },
      specsToRows(product.specs),
      productMedia(product)
    );
    await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setTogglingVisibilityId(null);
    router.refresh();
  }

  async function removeProduct(product: Product) {
    const confirmed = window.confirm(
      `Удалить «${product.title}»?\n\nЕсли позиция есть в заказах, она будет только скрыта из каталога.`
    );
    if (!confirmed) return;

    setDeletingId(product.id);
    const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    const data = (await response.json().catch(() => null)) as { hidden?: boolean; error?: string } | null;
    setDeletingId(null);

    if (!response.ok) {
      window.alert(data?.error || "Не удалось удалить позицию.");
      return;
    }

    if (data?.hidden) {
      window.alert("Позиция есть в заказах — она скрыта из каталога, но не удалена из базы.");
    }

    router.refresh();
  }

  if (!selectedKind) {
    return (
      <section className="table-wrap admin-step-chooser">
        <div className="admin-panel-title">
          <div>
            <h2>Что хотите добавить или отредактировать?</h2>
          </div>
        </div>
        <div className="admin-step-buttons">
          <button className="button admin-step-button" type="button" onClick={() => pickKind("Товар")}>
            <strong>Товары</strong>
            <span>Список товаров, редактирование и скрытие из каталога.</span>
          </button>
          <button className="button admin-step-button" type="button" onClick={() => pickKind("Услуга")}>
            <strong>Услуги</strong>
            <span>Список услуг, редактирование и скрытие из каталога.</span>
          </button>
        </div>
      </section>
    );
  }

  if (mode === "list") {
    const itemAccusative = selectedKind === "Услуга" ? "услугу" : "товар";
    const itemNominative = selectedKind === "Услуга" ? "Услуга" : "Товар";
    const editTooltip = `Редактировать ${itemAccusative}`;
    const hideTooltip = `Скрыть ${itemAccusative}`;
    const hiddenTooltip = `${itemNominative} скрыт${selectedKind === "Услуга" ? "а" : ""}`;
    const deleteTooltip = `Удалить ${itemAccusative}`;

    return (
      <section className="table-wrap admin-products-table">
        <div className="admin-table-toolbar">
          <label className="field admin-search-field">
            <span>Поиск</span>
            <div className="admin-search-input">
              <Search size={16} aria-hidden />
              <input
                className="input"
                value={query}
                placeholder="Поиск"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </label>
          <label className="field">
            <span>Раздел</span>
            <select
              className="select"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="all">Все разделы</option>
              {selectedCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title || category.name}
                </option>
              ))}
            </select>
          </label>
          <div className="row-actions" style={{ marginTop: 0 }}>
            <button className="button secondary" type="button" onClick={() => setSelectedKind(null)}>
              Назад
            </button>
            <button className="button" type="button" onClick={() => startNew(selectedKind)}>
              <Plus size={16} />
              Добавить {selectedKind === "Товар" ? "товар" : "услугу"}
            </button>
          </div>
        </div>

        <table className="table">
          <colgroup>
            <col className="admin-col-product" />
            <col className="admin-col-category" />
            <col className="admin-col-price" />
            <col className="admin-col-status" />
            <col className="admin-col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>{selectedKind}</th>
              <th>Раздел</th>
              <th>Цена</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.title}</strong>
                    <p className="muted">{product.slug}</p>
                  </td>
                  <td>{getCategoryLabel(product, categories)}</td>
                  <td>{product.price > 0 ? formatPrice(product.price) : "По запросу"}</td>
                  <td>
                    <span className="status-pill">{product.inStock ? "В каталоге" : "Скрыт"}</span>
                  </td>
                  <td>
                    <div className="row-actions" style={{ marginTop: 0 }}>
                      <button
                        className="icon-button"
                        type="button"
                        aria-label={editTooltip}
                        title={editTooltip}
                        onClick={() => startEdit(product)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className={
                          product.inStock
                            ? "icon-button"
                            : "icon-button admin-visibility-toggle admin-visibility-toggle-hidden"
                        }
                        type="button"
                        aria-label={product.inStock ? hideTooltip : hiddenTooltip}
                        title={product.inStock ? hideTooltip : hiddenTooltip}
                        aria-pressed={!product.inStock}
                        disabled={togglingVisibilityId === product.id || deletingId === product.id}
                        onClick={() => toggleVisibility(product)}
                      >
                        {product.inStock ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        className="icon-button admin-delete-button"
                        type="button"
                        aria-label={deleteTooltip}
                        title={deleteTooltip}
                        disabled={deletingId === product.id || togglingVisibilityId === product.id}
                        onClick={() => removeProduct(product)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <p className="muted">Ничего не найдено. Сбросьте поиск или фильтр раздела.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }

  return (
    <section className="panel admin-editor-full">
        <div className="admin-panel-title">
          <div>
            <span className="eyebrow">{editing.id ? "Редактирование" : "Новая запись"}</span>
            <h2>{editing.id ? "Изменить" : "Добавить"} {selectedKind.toLowerCase()}</h2>
          </div>
          <button className="button secondary" type="button" onClick={backToList}>
            <ArrowLeft size={16} />
            К списку
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {savedNotice ? <p className="muted">{savedNotice}</p> : null}

        <form className="form admin-product-form" onSubmit={submit}>
          <div className="admin-form-section">
            <h3>Основное</h3>
            <div className="admin-form-grid">
              <label className="field">
                <span>Название</span>
                <input
                  className="input"
                  value={editing.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setEditing({
                      ...editing,
                      title,
                      slug: slugify(title)
                    });
                  }}
                  required
                />
              </label>

              <label className="field">
                <span>Slug латиницей</span>
                <input
                  className="input"
                  value={editing.slug}
                  onChange={(event) => setEditing({ ...editing, slug: event.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Раздел</span>
                <select
                  className="select"
                  value={editing.categoryId ?? ""}
                  onChange={(event) => updateCategory(event.target.value)}
                  required
                >
                  <option value="">Выберите раздел</option>
                  {visibleCategories
                    .filter((category) => category.kind === selectedKind)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title || category.name}
                      </option>
                    ))}
                </select>
              </label>

              <label className="field">
                <span>Цена (0 = по запросу)</span>
                <input
                  className="input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={editing.price}
                  onChange={(event) => setEditing({ ...editing, price: Number(event.target.value) })}
                  required
                />
              </label>

              <label className="field">
                <span>Единица</span>
                <input
                  className="input"
                  value={editing.unit}
                  onChange={(event) => setEditing({ ...editing, unit: event.target.value })}
                  required
                />
              </label>
            </div>

            <div className="admin-checks">
              <label className="qty">
                <input
                  type="checkbox"
                  checked={editing.inStock}
                  onChange={(event) => setEditing({ ...editing, inStock: event.target.checked })}
                />
                Показывать в каталоге
              </label>
              <label className="qty">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(event) => setEditing({ ...editing, featured: event.target.checked })}
                />
                Поднять в начало каталога
              </label>
            </div>
          </div>

          <div className="admin-form-section">
            <h3>Описание</h3>
            <label className="field">
              <span>Краткое описание</span>
              <textarea
                className="textarea"
                value={editing.description}
                onChange={(event) => setEditing({ ...editing, description: event.target.value })}
                required
              />
            </label>
            <label className="field">
              <span>Подробное описание</span>
              <textarea
                className="textarea admin-details-textarea"
                value={editing.details}
                onChange={(event) => setEditing({ ...editing, details: event.target.value })}
              />
            </label>
            <label className="field">
              <span>Срок исполнения</span>
              <input
                className="input"
                value={editing.leadTime}
                onChange={(event) => setEditing({ ...editing, leadTime: event.target.value })}
                required
              />
            </label>
          </div>

          <div className="admin-form-section">
            <div className="admin-section-head">
              <h3>Характеристики</h3>
              <button
                className="button secondary"
                type="button"
                onClick={() => setSpecRows((current) => [...current, { key: "", value: "" }])}
              >
                <Plus size={16} />
                Добавить
              </button>
            </div>
            <div className="admin-spec-list">
              {specRows.map((row, index) => (
                <div className="admin-spec-row" key={index}>
                  <input
                    className="input"
                    placeholder="Название"
                    value={row.key}
                    onChange={(event) => updateSpec(index, { key: event.target.value })}
                  />
                  <input
                    className="input"
                    placeholder="Значение"
                    value={row.value}
                    onChange={(event) => updateSpec(index, { value: event.target.value })}
                  />
                  <button
                    className="icon-button"
                    type="button"
                    aria-label="Удалить характеристику"
                    onClick={() => removeSpec(index)}
                  >
                    <Trash2 size={16} aria-hidden />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-form-section">
            <AdminMediaUploader
              value={media}
              onChange={setMedia}
              folder={editing.slug || "new-product"}
              label="Фото товара"
            />
          </div>

          <div className="row-actions">
            <button className="button" disabled={pending} type="submit">
              <Plus size={18} />
              {pending ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </section>
  );
}
