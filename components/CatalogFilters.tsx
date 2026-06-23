"use client";

import { Filter, RotateCcw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState, useTransition } from "react";

const KIND_OPTIONS = [
  { value: "", label: "Все типы" },
  { value: "Товар", label: "Товары" },
  { value: "Услуга", label: "Услуги" }
] as const;

type CatalogFiltersProps = {
  categories: string[];
};

export function CatalogFilters({ categories }: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const kind = searchParams.get("kind") ?? "";
  const category = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";

  const [draftQ, setDraftQ] = useState(q);

  useEffect(() => {
    setDraftQ(q);
  }, [q]);

  const navigate = useCallback(
    (next: URLSearchParams) => {
      const s = next.toString();
      startTransition(() => {
        router.replace(s ? `/?${s}` : "/", { scroll: false });
      });
    },
    [router]
  );

  const merge = useCallback(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  function setKind(value: string) {
    const p = merge();
    if (!value) p.delete("kind");
    else p.set("kind", value);
    navigate(p);
  }

  function setCategory(value: string) {
    const p = merge();
    if (!value) p.delete("category");
    else p.set("category", value);
    navigate(p);
  }

  function setQuery(value: string) {
    const p = merge();
    if (!value.trim()) p.delete("q");
    else p.set("q", value.trim());
    navigate(p);
  }

  function clearAll() {
    setDraftQ("");
    startTransition(() => router.replace("/", { scroll: false }));
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(draftQ);
  }

  return (
    <div className="catalog-toolbar" aria-label="Фильтры каталога">
      <div className="catalog-toolbar-row">
        <div className="catalog-toolbar-meta">
          <Filter size={16} aria-hidden />
          <span>Фильтр</span>
        </div>

        <div className="filter-chip-group" role="group" aria-label="Тип позиции">
          {KIND_OPTIONS.map(({ value, label }) => {
            const active = kind === value;
            return (
              <button
                key={value || "_all"}
                type="button"
                className={`filter-chip ${active ? "active" : ""}`}
                onClick={() => setKind(value)}
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>

        <label className="filter-select-wrap">
          <span className="visually-hidden">Категория</span>
          <select
            className="filter-select"
            aria-label="Категория"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <form className="filter-search-form" onSubmit={onSearchSubmit}>
          <label className="visually-hidden" htmlFor="catalog-search">
            Поиск
          </label>
          <div className="filter-search-inner">
            <Search size={16} aria-hidden className="filter-search-icon" />
            <input
              id="catalog-search"
              className="filter-search-input"
              type="search"
              name="q"
              placeholder="Поиск"
              value={draftQ}
              onChange={(event) => setDraftQ(event.target.value)}
              autoComplete="off"
            />
          </div>
          <button className="button secondary filter-find" type="submit">
            Найти
          </button>
        </form>

        <button
          type="button"
          className="filter-reset icon-button-soft"
          onClick={clearAll}
          aria-label="Сбросить фильтры"
          title="Сбросить фильтры"
        >
          <RotateCcw size={16} />
          <span className="filter-reset-label">Сброс</span>
        </button>
      </div>
    </div>
  );
}
