"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GripVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { AdminMediaUploader, type AdminMediaItem } from "@/components/AdminMediaUploader";
import { slugify } from "@/lib/slugify";

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  kind: string;
  title: string;
  teaser: string;
  imageUrl: string | null;
  sortOrder: number;
  isVisible: boolean;
  _count?: { products: number };
};

const emptyCategory: AdminCategory = {
  id: "",
  name: "",
  slug: "",
  kind: "Товар",
  title: "",
  teaser: "",
  imageUrl: "",
  sortOrder: 0,
  isVisible: true
};

function categoryMedia(category: AdminCategory): AdminMediaItem[] {
  return category.imageUrl
    ? [{ url: category.imageUrl, alt: category.title || category.name, sortOrder: 0 }]
    : [];
}

export function AdminCategories({ categories }: { categories: AdminCategory[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<AdminCategory>(emptyCategory);
  const [media, setMedia] = useState<AdminMediaItem[]>([]);
  const [kindFilter, setKindFilter] = useState("Товар");
  const [dragId, setDragId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const shownCategories = useMemo(
    () =>
      categories
        .filter((category) => category.kind === kindFilter)
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "ru")),
    [categories, kindFilter]
  );

  function startEdit(category: AdminCategory) {
    setEditing(category);
    setMedia(categoryMedia(category));
    setError("");
  }

  function startNew() {
    setEditing({ ...emptyCategory, kind: kindFilter, sortOrder: shownCategories.length });
    setMedia([]);
    setError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const payload = {
      name: editing.name,
      slug: editing.slug,
      kind: editing.kind,
      title: editing.title || editing.name,
      teaser: editing.teaser,
      imageUrl: media[0]?.url ?? "",
      sortOrder: editing.sortOrder,
      isVisible: editing.isVisible
    };

    const response = await fetch(
      editing.id ? `/api/admin/categories/${editing.id}` : "/api/admin/categories",
      {
        method: editing.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    setPending(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error || "Не удалось сохранить раздел.");
      return;
    }

    startNew();
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Удалить раздел? Если внутри есть товары, раздел будет скрыт.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function reorder(targetId: string) {
    if (!dragId || dragId === targetId) return;

    const list = [...shownCategories];
    const fromIndex = list.findIndex((category) => category.id === dragId);
    const toIndex = list.findIndex((category) => category.id === targetId);
    if (fromIndex < 0 || toIndex < 0) return;

    const [item] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item);

    await Promise.all(
      list.map((category, index) =>
        fetch(`/api/admin/categories/${category.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...category, sortOrder: index })
        })
      )
    );

    setDragId(null);
    router.refresh();
  }

  return (
    <div className="admin-grid">
      <section className="panel">
        <div className="admin-panel-title">
          <div>
            <span className="eyebrow">{editing.id ? "Редактирование" : "Новый раздел"}</span>
            <h2>{editing.id ? "Изменить раздел" : "Добавить раздел"}</h2>
          </div>
          {editing.id ? (
            <button className="button secondary" type="button" onClick={startNew}>
              Новый
            </button>
          ) : null}
        </div>

        {error ? <p className="error">{error}</p> : null}

        <form className="form" onSubmit={submit}>
          <label className="field">
            <span>Тип</span>
            <select
              className="select"
              value={editing.kind}
              onChange={(event) => setEditing({ ...editing, kind: event.target.value })}
            >
              <option value="Товар">Товар</option>
              <option value="Услуга">Услуга</option>
            </select>
          </label>

          <label className="field">
            <span>Системное название</span>
            <input
              className="input"
              value={editing.name}
              onChange={(event) => {
                const name = event.target.value;
                setEditing({
                  ...editing,
                  name,
                  title: editing.title || name,
                  slug: slugify(name)
                });
              }}
              required
            />
          </label>

          <label className="field">
            <span>Заголовок на сайте</span>
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
            <span>Slug</span>
            <input
              className="input"
              value={editing.slug}
              onChange={(event) => setEditing({ ...editing, slug: event.target.value })}
              required
            />
          </label>

          <label className="field">
            <span>Описание карточки</span>
            <textarea
              className="textarea"
              value={editing.teaser}
              onChange={(event) => setEditing({ ...editing, teaser: event.target.value })}
            />
          </label>

          <label className="field">
            <span>Порядок</span>
            <input
              className="input"
              type="number"
              min="0"
              value={editing.sortOrder}
              onChange={(event) => setEditing({ ...editing, sortOrder: Number(event.target.value) })}
            />
          </label>

          <label className="qty">
            <input
              type="checkbox"
              checked={editing.isVisible}
              onChange={(event) => setEditing({ ...editing, isVisible: event.target.checked })}
            />
            Показывать раздел
          </label>

          <AdminMediaUploader
            value={media}
            onChange={setMedia}
            folder={`category-${editing.slug || "new"}`}
            label="Картинка раздела"
            multiple={false}
          />

          <button className="button" disabled={pending} type="submit">
            <Plus size={18} />
            {pending ? "Сохранение..." : "Сохранить раздел"}
          </button>
        </form>
      </section>

      <section className="table-wrap">
        <div className="admin-table-toolbar">
          <label className="field">
            <span>Показывать</span>
            <select className="select" value={kindFilter} onChange={(event) => setKindFilter(event.target.value)}>
              <option value="Товар">Оборудование</option>
              <option value="Услуга">Услуги</option>
            </select>
          </label>
          <button className="button secondary" type="button" onClick={startNew}>
            <Plus size={16} />
            Добавить
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Раздел</th>
              <th>Товары</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {shownCategories.map((category) => (
              <tr
                key={category.id}
                draggable
                onDragStart={() => setDragId(category.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => void reorder(category.id)}
              >
                <td>
                  <div className="admin-category-cell">
                    <GripVertical size={18} aria-hidden />
                    {category.imageUrl ? (
                      <Image src={category.imageUrl} alt="" width={52} height={42} />
                    ) : null}
                    <span>
                      <strong>{category.title || category.name}</strong>
                      <p className="muted">{category.name} / {category.slug}</p>
                    </span>
                  </div>
                </td>
                <td>{category._count?.products ?? 0}</td>
                <td>
                  <span className="status-pill">{category.isVisible ? "Видимый" : "Скрыт"}</span>
                </td>
                <td>
                  <div className="row-actions" style={{ marginTop: 0 }}>
                    <button className="icon-button" type="button" aria-label="Редактировать" onClick={() => startEdit(category)}>
                      <Pencil size={18} />
                    </button>
                    <button className="icon-button" type="button" aria-label="Удалить" onClick={() => remove(category.id)}>
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
