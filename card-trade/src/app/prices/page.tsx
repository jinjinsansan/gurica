import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { PriceExplorer } from "@/components/prices/PriceExplorer";

type DbPrice = {
  id: string;
  category_id: string;
  card_name: string;
  series: string | null;
  rarity: string | null;
  condition_mint: number | null;
  condition_near_mint: number | null;
  condition_good: number | null;
  condition_damaged: number | null;
  updated_at: string;
};

type DbCategory = {
  id: string;
  slug: string;
  name: string;
};

export const metadata: Metadata = {
  title: "買取価格一覧 | {{SITE_NAME}}",
  description: "ポケモン・遊戯王・ワンピース・デジタルカードの買取価格をカテゴリ別に確認できます。",
  openGraph: {
    title: "買取価格一覧 | {{SITE_NAME}}",
    description: "ポケモン・遊戯王・ワンピース・デジタルカードの買取価格をカテゴリ別に確認できます。",
  },
};

export const revalidate = 900;

export default async function PricesPage() {
  const supabase = await createClient();
  const [{ data: prices }, { data: categories }] = await Promise.all([
    supabase
      .from("buy_prices")
      .select(
        "id,category_id,card_name,series,rarity,condition_mint,condition_near_mint,condition_good,condition_damaged,updated_at"
      )
      .eq("is_active", true)
      .order("card_name"),
    supabase.from("categories").select("id,slug,name"),
  ]);

  const categoryMap = new Map(
    ((categories as DbCategory[] | null) ?? []).map((category) => [category.id, category.slug])
  );

  const formatted = ((prices as DbPrice[] | null) ?? []).map((price) => ({
    id: price.id,
    cardName: price.card_name,
    series: price.series,
    rarity: price.rarity,
    conditionMint: price.condition_mint,
    conditionNearMint: price.condition_near_mint,
    conditionGood: price.condition_good,
    conditionDamaged: price.condition_damaged,
    updatedAt: price.updated_at,
    categorySlug: normalizeSlug(categoryMap.get(price.category_id) ?? "other_tcg"),
  }));

  return (
    <div className="px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Prices</p>
        <h1 className="text-4xl text-[var(--text-primary)]">買取価格一覧</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          最新の買取価格をカテゴリ・検索で絞り込みできます。価格は日々変動するため、最終金額はオンライン査定をご利用ください。
        </p>
      </div>
      <PriceExplorer prices={formatted} />
      <p className="mx-auto mt-8 max-w-4xl text-center text-xs text-[var(--text-light)]">
        ※価格は日々変動します。正確な金額はオンライン査定をご利用ください。
      </p>
    </div>
  );
}

function normalizeSlug(slug: string) {
  return slug.replace(/-/g, "_");
}
