"use client";

import { useEffect, useMemo, useState } from "react";

import { formatPrice } from "@/lib/utils/formatPrice";

const TABS = [
  { label: "すべて", value: "all" },
  { label: "ポケモン", value: "pokemon" },
  { label: "遊戯王", value: "yugioh" },
  { label: "ワンピース", value: "onepiece" },
  { label: "デジタル", value: "digital" },
  { label: "その他", value: "other_tcg" },
];

const CATEGORY_LABEL: Record<string, string> = {
  pokemon: "ポケモン",
  yugioh: "遊戯王",
  onepiece: "ワンピース",
  digital: "デジタル",
  other_tcg: "その他",
};

interface PriceRecord {
  id: string;
  cardName: string;
  series: string | null;
  rarity: string | null;
  conditionMint: number | null;
  conditionNearMint: number | null;
  conditionGood: number | null;
  conditionDamaged: number | null;
  updatedAt: string;
  categorySlug: string;
}

interface PriceExplorerProps {
  prices: PriceRecord[];
}

const ITEMS_PER_PAGE = 20;

export function PriceExplorer({ prices }: PriceExplorerProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(searchInput.trim().toLowerCase()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filtered = useMemo(() => {
    return prices.filter((price) => {
      const matchesTab = activeTab === "all" ? true : price.categorySlug === activeTab;
      const matchesQuery = query
        ? price.cardName.toLowerCase().includes(query) || (price.series ?? "").toLowerCase().includes(query)
        : true;
      return matchesTab && matchesQuery;
    });
  }, [prices, activeTab, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.value
                ? "border-transparent bg-[var(--accent-blue)] text-white"
                : "border-slate-200 text-[var(--text-secondary)]"
            }`}
            onClick={() => {
              setActiveTab(tab.value);
              setPage(1);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2">
          <span className="text-sm text-[var(--text-light)]">🔍</span>
          <input
            type="text"
            placeholder="カード名やシリーズで検索"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setPage(1);
            }}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] focus:outline-none"
          />
        </div>
      </div>

      <div className="table-shell overflow-hidden">
        <div className="hidden bg-[var(--bg-accent)] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid md:grid-cols-7">
          <span>カード名</span>
          <span>シリーズ</span>
          <span>レアリティ</span>
          <span>美品</span>
          <span>良品</span>
          <span>傷あり</span>
          <span>更新日</span>
        </div>
        <div className="divide-y divide-slate-100">
          {paginated.length === 0 ? (
            <p className="px-6 py-6 text-sm text-[var(--text-secondary)]">該当するカードは見つかりませんでした。</p>
          ) : (
            paginated.map((price) => (
              <PriceRow key={price.id} price={price} />
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-secondary)]">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-40"
        >
          前へ
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page === totalPages}
          className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-40"
        >
          次へ
        </button>
      </div>
    </div>
  );
}

function PriceRow({ price }: { price: PriceRecord }) {
  const rarityClass = getRarityClass(price.rarity);
  return (
    <div className="grid gap-3 px-6 py-4 text-sm text-[var(--text-secondary)] md:grid-cols-7">
      <div>
        <p className="font-semibold text-[var(--text-primary)]">{price.cardName}</p>
        <p className="text-xs text-[var(--text-light)]">{CATEGORY_LABEL[price.categorySlug] ?? price.categorySlug}</p>
      </div>
      <p>{price.series ?? "-"}</p>
      <div>
        {price.rarity ? (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rarityClass}`}>{price.rarity}</span>
        ) : (
          "-"
        )}
      </div>
      <p className="font-tech text-base text-[var(--text-primary)]">{renderPrice(price.conditionMint)}</p>
      <p className="font-tech text-base text-[var(--text-primary)]">{renderPrice(price.conditionGood)}</p>
      <p className="font-tech text-base text-[var(--text-primary)]">{renderPrice(price.conditionDamaged)}</p>
      <p className="text-xs text-[var(--text-light)]">{new Date(price.updatedAt).toLocaleDateString("ja-JP")}</p>
    </div>
  );
}

function renderPrice(value: number | null) {
  if (value === null || value === undefined) {
    return "-";
  }
  return formatPrice(value);
}

function getRarityClass(rarity: string | null) {
  switch (rarity) {
    case "UR":
      return "bg-[#FFF3CD] text-[#856404]";
    case "SR":
      return "bg-[#E8DAEF] text-[#6C3483]";
    case "R":
      return "bg-[#D5F5E3] text-[#1E8449]";
    case "C":
      return "bg-[#EBF5FB] text-[#2471A3]";
    default:
      return "bg-[var(--bg-accent)] text-[var(--text-secondary)]";
  }
}
