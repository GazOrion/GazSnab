"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { SeoPageRow } from "@/lib/site-seo";

type EditableField = "title" | "description";

type Props = {
  initialPages: SeoPageRow[];
  onBack: () => void;
};

type SeoModalState =
  | { kind: "confirm"; path: string; field: EditableField }
  | { kind: "success" }
  | { kind: "error"; message: string };

const COL_MIN = 120;
const COL_DEFAULT_PATH = 240;
const COL_DEFAULT_TITLE = 280;
const COL_STORAGE_KEY = "admin-seo-col-widths";
const COL_STORAGE_KEY_LEGACY = "admin-seo-path-col-width";

type ColResizePair = "path-title" | "title-description";

function autosizeTextarea(node: HTMLTextAreaElement | null) {
  if (!node) return;
  node.style.height = "0px";
  node.style.height = `${node.scrollHeight}px`;
}

function fieldLabel(field: EditableField) {
  return field === "title" ? "Title" : "Description";
}

function SeoEditableCell({
  pagePath,
  field,
  value,
  editing,
  layoutKey,
  isEditingBlocked,
  onStartEdit,
  onChange,
  onLeaveEdit
}: {
  pagePath: string;
  field: EditableField;
  value: string;
  editing: { path: string; field: EditableField } | null;
  layoutKey: string;
  isEditingBlocked: () => boolean;
  onStartEdit: () => void;
  onChange: (value: string) => void;
  onLeaveEdit: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = editing?.path === pagePath && editing.field === field;

  useLayoutEffect(() => {
    autosizeTextarea(textareaRef.current);
  }, [value, isEditing, layoutKey]);

  useEffect(() => {
    const node = textareaRef.current;
    if (!node) return;

    const observer = new ResizeObserver(() => {
      autosizeTextarea(node);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [layoutKey]);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <td
      className={isEditing ? "admin-seo-table__cell is-editing" : "admin-seo-table__cell"}
      onClick={() => {
        if (isEditingBlocked() || isEditing) return;
        onStartEdit();
      }}
    >
      <textarea
        ref={textareaRef}
        className={`admin-seo-table__textarea admin-seo-table__textarea--${field}`}
        value={value}
        readOnly={!isEditing}
        rows={1}
        spellCheck={false}
        placeholder="—"
        aria-label={field === "title" ? "Title" : "Description"}
        onChange={(event) => onChange(event.target.value)}
        onFocus={(event) => {
          if (isEditingBlocked()) {
            event.currentTarget.blur();
            return;
          }
          if (!isEditing) onStartEdit();
        }}
        onBlur={() => {
          if (!isEditing) return;
          onLeaveEdit();
        }}
        onInput={(event) => autosizeTextarea(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.blur();
            return;
          }

          if (field === "title" && event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
      />
    </td>
  );
}

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
  const [modal, setModal] = useState<SeoModalState | null>(null);
  const [pending, setPending] = useState(false);
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const modalBlockRef = useRef(false);

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

  function isEditingBlocked() {
    return modalBlockRef.current || modal?.kind === "confirm" || pending;
  }

  function closeModal() {
    modalBlockRef.current = false;
    setModal(null);
  }

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
  }

  function getBaselineValue(path: string, field: EditableField) {
    return baseline.find((page) => page.path === path)?.[field] ?? "";
  }

  function discardFieldChange(path: string, field: EditableField) {
    const original = getBaselineValue(path, field);
    setPages((current) =>
      current.map((page) => (page.path === path ? { ...page, [field]: original } : page))
    );
  }

  function blurActiveTextarea() {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (
        active instanceof HTMLTextAreaElement &&
        active.classList.contains("admin-seo-table__textarea")
      ) {
        active.blur();
      }
    });
  }

  function handleStartEdit(path: string, field: EditableField) {
    if (isEditingBlocked()) return;
    setEditing({ path, field });
  }

  function handleLeaveEdit(path: string, field: EditableField) {
    if (editing?.path !== path || editing.field !== field) return;

    const currentValue = pages.find((page) => page.path === path)?.[field] ?? "";
    const savedValue = getBaselineValue(path, field);
    const changed = currentValue !== savedValue;

    setEditing(null);

    if (!changed) return;

    modalBlockRef.current = true;
    setModal({ kind: "confirm", path, field });
    blurActiveTextarea();
  }

  async function saveChanges() {
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
      setModal({
        kind: "error",
        message: data?.error || "Не удалось сохранить метатеги."
      });
      return false;
    }

    if (data?.pages) {
      setPages(data.pages);
      setBaseline(data.pages);
    } else {
      setBaseline(pages);
    }

    return true;
  }

  async function confirmSave() {
    const saved = await saveChanges();
    if (saved) {
      setModal({ kind: "success" });
    }
  }

  function cancelSave(path: string, field: EditableField) {
    discardFieldChange(path, field);
    closeModal();
  }

  const confirmPage =
    modal?.kind === "confirm"
      ? pages.find((page) => page.path === modal.path)
      : undefined;

  const columnLayoutKey = `${pathWidth}-${titleWidth}-${tableWidth}`;

  return (
    <>
      <section className="table-wrap admin-seo">
        <div className="admin-panel-title">
          <div>
            <button type="button" className="admin-back-link" onClick={onBack}>
              <ArrowLeft size={16} aria-hidden />
              Назад
            </button>
            <h2>Управление метатегами</h2>
            <p className="muted">
              Title и meta description по страницам ({pages.length}). Редактирование по клику на
              ячейку; при выходе из поля изменения сохраняются через подтверждение.
            </p>
          </div>
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
                    <a
                      href={page.path}
                      className="admin-seo-table__page-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Открыть страницу: ${page.path}`}
                    >
                      <span className="admin-seo-table__label" title={page.label}>
                        {page.label}
                      </span>
                      <code title={page.path}>{page.path}</code>
                    </a>
                  </th>
                  <SeoEditableCell
                    pagePath={page.path}
                    field="title"
                    value={page.title}
                    editing={editing}
                    layoutKey={columnLayoutKey}
                    isEditingBlocked={isEditingBlocked}
                    onStartEdit={() => handleStartEdit(page.path, "title")}
                    onChange={(value) => updateCell(page.path, "title", value)}
                    onLeaveEdit={() => handleLeaveEdit(page.path, "title")}
                  />
                  <SeoEditableCell
                    pagePath={page.path}
                    field="description"
                    value={page.description}
                    editing={editing}
                    layoutKey={columnLayoutKey}
                    isEditingBlocked={isEditingBlocked}
                    onStartEdit={() => handleStartEdit(page.path, "description")}
                    onChange={(value) => updateCell(page.path, "description", value)}
                    onLeaveEdit={() => handleLeaveEdit(page.path, "description")}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {modal ? (
        <div
          className={`admin-seo-modal${modal ? " admin-seo-modal--open" : ""}`}
          role="presentation"
        >
          <div className="admin-seo-modal__backdrop" aria-hidden />
          <div
            className="admin-seo-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-seo-modal-title"
          >
            {modal.kind === "confirm" ? (
              <>
                <h3 id="admin-seo-modal-title" className="admin-seo-modal__title">
                  Сохранить изменения?
                </h3>
                <p className="admin-seo-modal__text">
                  {confirmPage
                    ? `Поле «${fieldLabel(modal.field)}» для «${confirmPage.label}» было изменено.`
                    : `Поле «${fieldLabel(modal.field)}» было изменено.`}
                </p>
                <div className="admin-seo-modal__actions">
                  <button
                    type="button"
                    className="button secondary"
                    disabled={pending}
                    onClick={() => cancelSave(modal.path, modal.field)}
                  >
                    Не сохранять
                  </button>
                  <button
                    type="button"
                    className="button"
                    disabled={pending}
                    onClick={confirmSave}
                  >
                    {pending ? "Сохраняем…" : "Сохранить"}
                  </button>
                </div>
              </>
            ) : null}

            {modal.kind === "success" ? (
              <>
                <h3 id="admin-seo-modal-title" className="admin-seo-modal__title">
                  Сохранено
                </h3>
                <p className="admin-seo-modal__text">Изменения метатегов успешно сохранены.</p>
                <div className="admin-seo-modal__actions admin-seo-modal__actions--single">
                  <button
                    type="button"
                    className="button"
                    onClick={closeModal}
                  >
                    ОК
                  </button>
                </div>
              </>
            ) : null}

            {modal.kind === "error" ? (
              <>
                <h3 id="admin-seo-modal-title" className="admin-seo-modal__title">
                  Ошибка
                </h3>
                <p className="admin-seo-modal__text">{modal.message}</p>
                <div className="admin-seo-modal__actions admin-seo-modal__actions--single">
                  <button type="button" className="button" onClick={closeModal}>
                    ОК
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
