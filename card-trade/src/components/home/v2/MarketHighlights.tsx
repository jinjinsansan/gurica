"use client";

import { useState } from "react";
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

const formatPrice = (value: number) =>
  `¥${new Intl.NumberFormat("ja-JP").format(Math.max(0, Math.round(value)))}`;

export function MarketHighlights({ newArrivals, trending }: Props) {
  const [activeTab, setActiveTab] = useState<"new" | "trending">("new");

  const products = (activeTab === "new" ? newArrivals : trending).slice(0, 6);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-12">
          <p className="section-title">MARKET DATA</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <div>
              <h2 className="section-heading">リアルタイムで変化する相場を可視化</h2>
              <p className="text-lg text-slate-600 max-w-3xl">
                新着の高額カードや高騰中のランキングを秒単位で更新。取引前に必ずチェックしてください。
              </p>
            </div>
            <button className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm uppercase tracking-[0.4em] text-gray-500">
              MARKET REPORT
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-gray-200 bg-white p-6 md:p-10">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => setActiveTab("new")}
              className={`inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold transition-all ${
                activeTab === "new"
                  ? "bg-blue-600 text-white shadow-xl"
                  : "bg-gray-50 text-slate-600 hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-6 h-6" />
              新着入荷
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold transition-all ${
                activeTab === "trending"
                  ? "bg-orange-500 text-white shadow-xl"
                  : "bg-gray-50 text-slate-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-6 h-6" />
              高騰ランキング
            </button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr]">
            <div className="space-y-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white/90 px-6 py-5 shadow-[0_5px_25px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-blue-600">{`0${index + 1}`.slice(-2)}</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{product.categoryLabel}</p>
                      <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</p>
                    {activeTab === "trending" && product.priceChange && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500">
                        <TrendingUp className="w-4 h-4" />+{product.priceChange}%
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-12 text-slate-500">現在表示できる商品がありません</div>
              )}
            </div>

            <div className="rounded-3xl border border-gray-100 bg-gray-50 p-8 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">DATA INSIGHT</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">カード市況レポート</h3>
                <p className="mt-3 text-sm text-slate-600">
                  アジア主要マーケット・オークションの落札データと連動し、Fair Value を算出しています。
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 border border-gray-100">
                <p className="text-sm text-gray-500">本日の平均変動率</p>
                <p className="text-4xl font-extrabold text-slate-900">+12.4%</p>
                <p className="text-sm text-green-600">前日比 +3.1pt</p>
              </div>
              <div className="space-y-4 text-sm text-slate-600">
                <p>・PSA10の在庫指数 / 日次更新</p>
                <p>・ワンピース最新弾の初速データ</p>
                <p>・NFTカードの売買件数</p>
              </div>
              <a className="text-blue-600 font-semibold" href="/prices">
                すべての価格データを見る →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
