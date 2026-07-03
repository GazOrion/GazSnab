"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { SeoPageRow } from "@/lib/site-seo";

type EditableField = "title" | "description";

type Props = {
  initialPages: SeoPageRow[];
  onBack: () => void;
};

const COL_MIN = 120;
const COL_DEFAULT_PATH = 240;
const COL_DEFAULT_TITLE = 280;
const COL_STORAGE_KEY = "admin-seo-col-widths";
const COL_STORAGE_KEY_LEGACY = "admin-seo-path-col-width";

type ColResizePair = "path-title" | "title-description";

function resizeAdjacentColumns(left: number, right: number, delta: number, min: number) {
  let nextLeft = left + delta;
  let nextRight = right - delta;

  if (nextLeft < min) {
    nextRight -= min - nextLeft;
    nextLeft = min;
  }
  if (nextRight < min) {
    nextLeft -= min - nextRight;
    nextRight = min;
  }

  return {
    left: Math.round(nextLeft),
    right: Math.round(nextRight)
  };
}

export function AdminSeo({ initialPages, onBack }: Props) {
  const [pages, setPages] = useState(initialPages);
  const [baseline, setBaseline] = useState(initialPages);
  const [query, setQuery] = useState("");
  const [pathWidth, setPathWidth] = useState(COL_DEFAULT_PATH);
  const [titleWidth, setTitleWidth] = useState(COL_DEFAULT_TITLE);
  const [tableWidth, setTableWidth] = useState(0);
  const [editing, setEditing] = useState<{ path: string; field: EditableField } | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const tableWrapRef = useRef<HTMLDivElement>(null);

  const filteredPages = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return pages;

    return pages.filter(
      (page) =>
        page.label.toLowerCase().includes(needle) ||
        page.path.toLowerCase().includes(needle) ||
        page.title.toLowerCase().includes(needle) ||
        page.description.toLowerCase().includes(needle)
    );
  }, [pages, query]);

  const isDirty = useMemo(
    () => JSON.stringify(pages) !== JSON.stringify(baseline),
    [pages, baseline]
  );

  useEffect(() => {
    const legacyPath = localStorage.getItem(COL_STORAGE_KEY_LEGACY);
    const stored = localStorage.getItem(COL_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { path?: number; title?: number };
        if (Number.isFinite(parsed.path)) setPathWidth(Math.max(COL_MIN, parsed.path as number));
        if (Number.isFinite(parsed.title)) setTitleWidth(Math.max(COL_MIN, parsed.title as number));
        return;
      } catch {
        // ignore broken payload
      }
    }

    const legacyParsed = legacyPath ? Number(legacyPath) : Number.NaN;
    if (Number.isFinite(legacyParsed)) {
      setPathWidth(Math.max(COL_MIN, legacyParsed));
    }
  }, []);

  useEffect(() => {
    const element = tableWrapRef.current;
    if (!element) return;

    const updateWidth = () => setTableWidth(element.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const descriptionWidth = Math.max(COL_MIN, tableWidth - pathWidth - titleWidth);

  const saveColumnWidths = useCallback((path: number, title: number) => {
    localStorage.setItem(COL_STORAGE_KEY, JSON.stringify({ path, title }));
  }, []);

  const startColumnResize = useCallback(
    (pair: ColResizePair) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      const startX = event.clientX;
      const startPath = pathWidth;
      const startTitle = titleWidth;
      const startDescription = Math.max(COL_MIN, tableWidth - pathWidth - titleWidth);

      const onMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;

        if (pair === "path-title") {
          const { left, right } = resizeAdjacentColumns(startPath, startTitle, delta, COL_MIN);
          setPathWidth(left);
          setTitleWidth(right);
          return;
        }

        const { left } = resizeAdjacentColumns(startTitle, startDescription, delta, COL_MIN);
        setTitleWidth(left);
      };

      const onUp = (upEvent: MouseEvent) => {
        const delta = upEvent.clientX - startX;
        let nextPath = startPath;
        let nextTitle = startTitle;

        if (pair === "path-title") {
          ({ left: nextPath, right: nextTitle } = resizeAdjacentColumns(
            startPath,
            startTitle,
            delta,
            COL_MIN
          ));
          setPathWidth(nextPath);
          setTitleWidth(nextTitle);
        } else {
          ({ left: nextTitle } = resizeAdjacentColumns(
            startTitle,
            startDescription,
            delta,
            COL_MIN
          ));
          setTitleWidth(nextTitle);
        }

        saveColumnWidths(nextPath, nextTitle);
        document.body.classList.remove("admin-seo-col-resizing");
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      document.body.classList.add("admin-seo-col-resizing");
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [pathWidth, saveColumnWidths, tableWidth, titleWidth]
  );

  function updateCell(path: string, field: EditableField, value: string) {
    setPages((current) =>
      current.map((page) => (page.path === path ? { ...page, [field]: value } : page))
    );
    setNotice("");
  }

  async function save() {
    setError("");
    setNotice("");
    setPending(true);

    const response = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: pages })
    });

    const data = (await response.json().catch(() => null)) as
      | { pages?: SeoPageRow[]; error?: string }
      | null;

    setPending(false);

    if (!response.ok) {
      setError(data?.error || "Не удалось сохранить метатеги.");
      return;
    }

    if (data?.pages) {
      setPages(data.pages);
      setBaseline(data.pages);
    }
    setNotice("Метатеги сохранены.");
  }

  return (
    <section className="table-wrap admin-seo">
      <div className="admin-panel-title">
        <div>
          <button type="button" className="admin-back-link" onClick={onBack}>
            <ArrowLeft size={16} aria-hidden />
            Назад
          </button>
          <h2>Управление метатегами</h2>
          <p className="muted">
            Title и meta description по страницам ({pages.length}). Редактирование по клику на ячейку;
            сохранение — кнопкой ниже.
          </p>
        </div>
        <button className="button" type="button" onClick={save} disabled={pending || !isDirty}>
          {pending ? "Сохраняем…" : "Сохранить"}
        </button>
      </div>

      <label className="admin-seo-search">
        <span className="sr-only">Поиск по страницам</span>
        <input
          className="admin-seo-search__input"
          type="search"
          value={query}
          placeholder="Поиск по названию, пути или тексту…"
          onChange={(event) => setQuery(event.target.value)}
        />
        {query ? (
          <span className="admin-seo-search__count muted">
            Найдено: {filteredPages.length} из {pages.length}
          </span>
        ) : null}
      </label>

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="admin-saved-notice" role="status">
          {notice}
        </p>
      ) : null}

      <div className="admin-seo-table-wrap" ref={tableWrapRef}>
        <table className="admin-seo-table">
          <colgroup>
            <col style={{ width: pathWidth }} />
            <col style={{ width: titleWidth }} />
            <col style={{ width: descriptionWidth }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="admin-seo-table__head-cell">
                <span>Страница</span>
                <button
                  type="button"
                  className="admin-seo-table__col-resizer"
                  aria-label="Изменить ширину столбца «Страница»"
                  onMouseDown={startColumnResize("path-title")}
                />
              </th>
              <th scope="col" className="admin-seo-table__head-cell">
                <span>Title</span>
                <button
                  type="button"
                  className="admin-seo-table__col-resizer"
                  aria-label="Изменить ширину столбца «Title»"
                  onMouseDown={startColumnResize("title-description")}
                />
              </th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredPages.map((page) => (
              <tr key={page.path}>
                <th scope="row" className="admin-seo-table__path">
                  <span className="admin-seo-table__label" title={page.label}>
                    {page.label}
                  </span>
                  <code title={page.path}>{page.path}</code>
                </th>
                <td
                  className={
                    editing?.path === page.path && editing.field === "title"
                      ? "admin-seo-table__cell is-editing"
                      : "admin-seo-table__cell"
                  }
                  onClick={() => setEditing({ path: page.path, field: "title" })}
                >
                  {editing?.path === page.path && editing.field === "title" ? (
                    <input
                      className="admin-seo-table__input"
                      value={page.title}
                      autoFocus
                      onChange={(event) => updateCell(page.path, "title", event.target.value)}
                      onBlur={() => setEditing(null)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          setEditing(null);
                          return;
                        }
                        if (event.key === "Enter") {
                          event.preventDefault();
                          setEditing(null);
                        }
                      }}
                    />
                  ) : (
                    <span className="admin-seo-table__value admin-seo-table__value--title" title={page.title}>
                      {page.title || "—"}
                    </span>
                  )}
                </td>
                <td
                  className={
                    editing?.path === page.path && editing.field === "description"
                      ? "admin-seo-table__cell is-editing"
                      : "admin-seo-table__cell"
                  }
                  onClick={() => setEditing({ path: page.path, field: "description" })}
                >
                  {editing?.path === page.path && editing.field === "description" ? (
                    <textarea
                      className="admin-seo-table__textarea"
                      value={page.description}
                      rows={3}
                      autoFocus
                      onChange={(event) =>
                        updateCell(page.path, "description", event.target.value)
                      }
                      onBlur={() => setEditing(null)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.preventDefault();
                          setEditing(null);
                        }
                      }}
                    />
                  ) : (
                    <span
                      className="admin-seo-table__value admin-seo-table__value--desc"
                      title={page.description}
                    >
                      {page.description || "—"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
