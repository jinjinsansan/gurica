"use client";

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

export function MarketHighlights({}: Props) {

  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-10 sm:mb-12">
          <p className="section-title">MARKET DATA</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
            <div>
              <h2 className="section-heading">リアルタイムで変化する相場を可視化</h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
                現在データ基盤を刷新中のため、ランキングとマーケットレポートの公開準備を進めています。
              </p>
            </div>
            <span className="inline-flex items-center gap-3 rounded-full border border-dashed border-rose-200 bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-[0.6rem] sm:text-sm uppercase tracking-[0.4em] text-rose-500 self-start">
              COMING SOON
            </span>
          </div>
        </div>
        <div className="rounded-[28px] sm:rounded-[32px] border border-gray-200 bg-white p-5 sm:p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-rose-600 via-rose-500 to-amber-400 p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(225,29,72,0.35)]">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
                <Sparkles className="w-5 h-5" />
                新着入荷ランキング
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-black">公開準備中</h3>
              <p className="mt-3 text-sm sm:text-base text-white/90">
                カード種別ごとのリアルタイム指標を整備しています。正式リリースまで少々お待ちください。
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
                <div className="rounded-2xl border border-white/30 bg-white/15 p-4">
                  <p className="text-white/70 text-xs">表示項目</p>
                  <p className="text-lg font-bold">PSA指数</p>
                </div>
                <div className="rounded-2xl border border-white/30 bg-white/15 p-4">
                  <p className="text-white/70 text-xs">更新頻度</p>
                  <p className="text-lg font-bold">60秒</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-dashed border-rose-200 bg-rose-50 p-6 sm:p-8 text-rose-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
                  <TrendingUp className="w-5 h-5" />
                  高騰ランキング
                </div>
                <h3 className="mt-4 text-2xl sm:text-3xl font-black">データ整備中</h3>
                <p className="mt-3 text-sm sm:text-base text-rose-800">
                  主要マーケットとのデータ連携テストを実施中です。ローンチ時には過去推移も含めて提供予定です。
                </p>
              </div>
              <div className="rounded-2xl bg-white p-4 mt-6 text-sm text-slate-600">
                <p className="font-semibold text-rose-500">ステータス</p>
                <p>公開目安: 2026年春 / β版への先行招待はニュースで告知します。</p>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">MARKET REPORT</p>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">レポートは現在準備中です</h3>
            <p className="mt-3 text-base text-slate-600">
              公開時にメールでのお知らせを希望される方はニュースレターへご登録ください。
            </p>
            <a
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-600"
              href="/news"
            >
              最新情報をチェック →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
