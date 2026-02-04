"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { TrendingUp, Sparkles } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  rarity: string | null;
  badge: string | null;
  series: string | null;
  categoryLabel: string;
  priceChange?: number;
};

type Props = {
  newArrivals: Product[];
  trending: Product[];
};

export function MarketHighlights({ newArrivals, trending }: Props) {
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");

  const products = activeTab === "new" ? newArrivals : trending;

  return (
    <section className="section-container bg-white">
      <div className="text-center mb-8">
        <p className="section-title">MARKET</p>
        <h2 className="section-heading">注目商品</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("new")}
          className={`px-6 py-3 rounded-full font-semibold transition flex items-center gap-2 ${
            activeTab === "new"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          新着商品
        </button>
        <button
          onClick={() => setActiveTab("trending")}
          className={`px-6 py-3 rounded-full font-semibold transition flex items-center gap-2 ${
            activeTab === "trending"
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          高騰ランキング
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="relative">
            <ProductCard
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              rarity={product.rarity}
              badge={product.badge}
              series={product.series}
              categoryLabel={product.categoryLabel}
            />
            {activeTab === "trending" && product.priceChange && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{product.priceChange}%
              </div>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>現在表示できる商品がありません</p>
        </div>
      )}
    </section>
  );
}
