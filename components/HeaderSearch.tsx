"use client";

import clsx from "clsx";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FormEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { CATALOG_ROUTES, PRODUCT_KIND } from "@/lib/catalog";
import { useCatalogSearch } from "@/contexts/CatalogSearchContext";

type Suggestion = {
  title: string;
  slug: string;
  kind: string;
  category: string;
};

type PanelRect = {
  top: number;
  left: number;
  width: number;
};

const CATALOG_PATHS = [CATALOG_ROUTES.equipment, CATALOG_ROUTES.services] as const;

const STORAGE_KEY = "gazsnab-header-search";

export function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const { getHeaderQuery, applyHeaderSearch, clearHeaderSearch } = useCatalogSearch();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  const headerQuery = getHeaderQuery();
  const [value, setValue] = useState(headerQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [panelRect, setPanelRect] = useState<PanelRect | null>(null);
  const [mounted, setMounted] = useState(false);

  const onCatalog = CATALOG_PATHS.includes(pathname as (typeof CATALOG_PATHS)[number]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!onCatalog) return;
    setValue(headerQuery);
  }, [headerQuery, onCatalog]);

  const trimmedValue = value.trim();
  const showDropdown = open && trimmedValue.length >= 2;

  useLayoutEffect(() => {
    if (!showDropdown || !formRef.current) {
      setPanelRect(null);
      return;
    }

    function updateRect() {
      const rect = formRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPanelRect({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width
      });
    }

    let frame = 0;
    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateRect);
    }

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [showDropdown]);

  useEffect(() => {
    if (trimmedValue.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    let cancelled = false;

    const timer = window.setTimeout(() => {
      setLoading(true);
      fetch(`/api/products/suggest?q=${encodeURIComponent(trimmedValue)}`)
        .then(async (response) => {
          if (!response.ok) return [] as Suggestion[];
          return (await response.json()) as Suggestion[];
        })
        .then((data) => {
          if (!cancelled && requestId === requestIdRef.current) {
            setSuggestions(data);
            setActiveIndex(-1);
          }
        })
        .catch(() => {
          if (!cancelled && requestId === requestIdRef.current) {
            setSuggestions([]);
          }
        })
        .finally(() => {
          if (!cancelled && requestId === requestIdRef.current) {
            setLoading(false);
          }
        });
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [trimmedValue]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!showDropdown) return;

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || dropdownRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [showDropdown]);

  function applySearch(query: string) {
    const trimmed = query.trim();
    setOpen(false);

    if (onCatalog) {
      applyHeaderSearch(trimmed);
      return;
    }

    if (trimmed) {
      sessionStorage.setItem(STORAGE_KEY, trimmed);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    router.push(CATALOG_ROUTES.equipment);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch(value);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const item = suggestions[activeIndex];
      setOpen(false);
      router.push(`/products/${item.slug}`);
    }
  }

  const dropdown =
    mounted && showDropdown && panelRect ? (
      <div
        ref={dropdownRef}
        className="header-search-dropdown header-search-dropdown-portal"
        id={listId}
        role="listbox"
        style={{
          top: panelRect.top,
          left: panelRect.left,
          width: panelRect.width
        }}
      >
        {loading ? <p className="header-search-dropdown-empty">Поиск…</p> : null}
        {!loading && suggestions.length === 0 ? (
          <p className="header-search-dropdown-empty">Ничего не найдено</p>
        ) : null}
        {!loading
          ? suggestions.map((item, index) => (
              <Link
                key={item.slug}
                className={clsx(
                  "header-search-suggestion",
                  activeIndex === index && "header-search-suggestion-active"
                )}
                href={`/products/${item.slug}`}
                role="option"
                aria-selected={activeIndex === index}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setOpen(false)}
              >
                <span className="header-search-suggestion-icon" aria-hidden>
                  <Search size={16} />
                </span>
                <span className="header-search-suggestion-body">
                  <span className="header-search-suggestion-title">{item.title}</span>
                  <span className="header-search-suggestion-meta">
                    {item.kind === PRODUCT_KIND.SERVICE ? "Услуга" : "Оборудование"} ·{" "}
                    {item.category}
                  </span>
                </span>
              </Link>
            ))
          : null}
        {!loading && suggestions.length > 0 ? (
          <button
            type="button"
            className="header-search-dropdown-all"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => applySearch(trimmedValue)}
          >
            Показать все результаты по запросу «{trimmedValue}»
          </button>
        ) : null}
      </div>
    ) : null;

  return (
    <div
      ref={wrapRef}
      className={clsx("header-search-wrap", showDropdown && "header-search-wrap-open")}
    >
      <form
        ref={formRef}
        className={clsx("header-search header-search-main", showDropdown && "header-search-open")}
        onSubmit={onSubmit}
        role="search"
      >
        <label className="visually-hidden" htmlFor="header-search-input">
          Поиск
        </label>
        <Search size={20} aria-hidden className="header-search-icon" />
        <input
          ref={inputRef}
          id="header-search-input"
          className="header-search-input"
          type="text"
          inputMode="search"
          enterKeyHint="search"
          placeholder="Поиск"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setOpen(true);
            if (onCatalog) {
              applyHeaderSearch(event.target.value);
            }
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onInputKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listId : undefined}
          aria-autocomplete="list"
        />
        {value ? (
          <button
            type="button"
            className="header-search-clear"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setValue("");
              setSuggestions([]);
              setOpen(false);
              if (onCatalog) {
                clearHeaderSearch();
              } else {
                sessionStorage.removeItem(STORAGE_KEY);
              }
              inputRef.current?.focus();
            }}
            aria-label="Очистить поиск"
          >
            <X size={18} aria-hidden />
          </button>
        ) : null}
        <button className="header-search-submit" type="submit">
          Найти
        </button>
      </form>

      {mounted && dropdown ? createPortal(dropdown, document.body) : null}
    </div>
  );
}
