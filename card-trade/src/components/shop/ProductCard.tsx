import Link from "next/link";

import { formatPrice } from "@/lib/utils/formatPrice";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  rarity?: string | null;
  badge?: string | null;
  categoryLabel?: string;
  series?: string | null;
}

export function ProductCard({ id, name, slug, price, rarity, badge, categoryLabel, series }: ProductCardProps) {
  return (
    <Link
      key={id}
      href={`/shop/${slug}`}
      className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_20px_40px_rgba(26,29,46,0.08)] transition hover:-translate-y-1"
    >
      <div className="relative mb-4 flex h-40 items-center justify-center rounded-2xl bg-[var(--bg-accent)]">
        <span className="text-4xl" aria-hidden>
          🃏
        </span>
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {badge.toUpperCase()}
          </span>
        ) : null}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--text-light)]">
        {categoryLabel ?? "トレカ"}
      </p>
      <h3 className="mt-2 text-lg text-[var(--text-primary)]">{name}</h3>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">{series}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-tech text-2xl text-[var(--text-primary)]">{formatPrice(price)}</span>
        {rarity ? (
          <span className="rounded-full bg-[var(--bg-accent)] px-3 py-1 text-xs font-semibold text-[var(--accent-purple)]">
            {rarity}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
