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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-title">MARKET</p>
          <h2 className="section-heading">注目商品</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-16">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${
              activeTab === "new"
                ? "bg-blue-600 text-white shadow-xl scale-105"
                : "bg-white text-slate-600 hover:bg-slate-50 shadow-md border border-gray-200"
            }`}
          >
            <Sparkles className="w-6 h-6" />
            新着商品
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${
              activeTab === "trending"
                ? "bg-orange-600 text-white shadow-xl scale-105"
                : "bg-white text-slate-600 hover:bg-slate-50 shadow-md border border-gray-200"
            }`}
          >
            <TrendingUp className="w-6 h-6" />
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
      </div>
    </section>
  );
}
