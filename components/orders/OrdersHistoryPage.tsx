"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { PublicOrder } from "@/lib/serialize-order";
import { getStoredTrackNumbers, rememberTrackNumber } from "@/lib/order-history";
import { OrderDetailModal } from "./OrderDetailModal";
import { OrderHistoryCard } from "./OrderHistoryCard";

export function OrdersHistoryPage() {
  const [orders, setOrders] = useState<PublicOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PublicOrder | null>(null);

  const loadStored = useCallback(async () => {
    const tracks = getStoredTrackNumbers();
    if (!tracks.length) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const response = await fetch("/api/orders/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tracks })
    });

    if (!response.ok) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const data = (await response.json()) as { orders: PublicOrder[] };
    setOrders(data.orders ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStored();
  }, [loadStored]);

  async function searchByTrack(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchError("");
    const query = search.trim();
    if (!query) {
      setSearchError("Введите трек-номер.");
      return;
    }

    setSearching(true);
    const response = await fetch(`/api/orders/track?code=${encodeURIComponent(query)}`);
    setSearching(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setSearchError(payload?.error || "Заказ не найден.");
      return;
    }

    const data = (await response.json()) as { order: PublicOrder };
    rememberTrackNumber(data.order.trackNumber);
    setOrders((current) => {
      const rest = current.filter((order) => order.trackNumber !== data.order.trackNumber);
      return [data.order, ...rest];
    });
    setSelectedOrder(data.order);
    setSearch("");
  }

  return (
    <>
      <section className="section orders-history-page">
        <section className="container">
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <span aria-hidden>/</span>
            <span>История заказов</span>
          </nav>
          <h1 className="cart-page-title">История заказов</h1>

          <form className="order-track-search" onSubmit={searchByTrack}>
            <label className="order-track-search-field">
              <span className="sr-only">Трек-номер</span>
              <Search size={18} aria-hidden className="order-track-search-icon" />
              <input
                className="input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Например, GS-AB12CD34"
                disabled={searching}
              />
            </label>
            <button className="button" type="submit" disabled={searching}>
              {searching ? "Ищем…" : "Найти заказ"}
            </button>
          </form>
          {searchError ? <p className="error">{searchError}</p> : null}

          {loading ? (
            <p className="muted order-history-loading">Загружаем историю…</p>
          ) : !orders.length ? (
            <article className="cart-card order-history-empty">
              <h2>Заказов пока нет</h2>
              <p className="muted">
                Оформите заявку в корзине или найдите заказ по трек-номеру в поле выше.
              </p>
              <Link className="button" href="/cart">
                Перейти в корзину
              </Link>
            </article>
          ) : (
            <ul className="order-history-list">
              {orders.map((order) => (
                <OrderHistoryCard key={order.trackNumber} order={order} onOpen={setSelectedOrder} />
              ))}
            </ul>
          )}
        </section>
      </section>

      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}
