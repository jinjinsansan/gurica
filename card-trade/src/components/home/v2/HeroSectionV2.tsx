"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Package, ShieldCheck, Zap } from "lucide-react";

const HERO_FEATURES = [
  {
    title: "24時間査定",
    description: "スマホで撮影して送信",
    icon: ShieldCheck,
  },
  {
    title: "宅配買取キット",
    description: "全国送料無料・翌日発送",
    icon: Package,
  },
  {
    title: "最短24h入金",
    description: "AI査定+人のダブルチェック",
    icon: Clock3,
  },
  {
    title: "最高額保証",
    description: "主要マーケット価格と連動",
    icon: Zap,
  },
];

export function HeroSectionV2() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 -top-16 h-72 bg-gradient-to-b from-rose-50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -right-32 top-0 w-72 h-72 bg-gradient-to-br from-rose-200/60 to-orange-100/60 blur-3xl" aria-hidden />
      <div className="absolute -left-32 bottom-0 w-80 h-80 bg-gradient-to-tr from-pink-100/50 to-amber-50/60 blur-3xl" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start lg:items-stretch py-16 sm:py-20 lg:py-28">
          <div className="space-y-8 lg:pr-10">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-500">
                CARD TRADING PLATFORM
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight text-slate-900">
                カードの価値を
                <br />
                <span className="text-rose-600">最高のタイミングで</span>
                <br />
                取引できる場所
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                ポケモン・遊戯王・ワンピース・デジタルカードまで網羅。
                <br />
                価格データとプロ鑑定で、売買の判断をサポートします。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/assessment"
                className="btn-primary px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl font-bold shadow-xl hover:shadow-2xl text-center"
              >
                無料査定を申し込む
              </Link>
              <Link
                href="/prices"
                className="btn-secondary px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-2xl font-semibold text-center"
              >
                最新の買取価格を見る
              </Link>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {HERO_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                        <Icon className="w-4 h-4" />
                      </span>
                      <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                    </div>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-sm sm:text-base text-gray-500">
              査定→発送→入金までオンラインで完結。梱包材・補償もすべて当社が手配します。
            </p>
          </div>

          <div className="w-full mt-8 sm:mt-10 lg:mt-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[40px] border border-white/40 shadow-[0_45px_120px_rgba(225,29,72,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-rose-100/40" aria-hidden />
              <Image
                src="/images/home/hero-trading-cards-alt.jpg"
                alt="高額カードの査定イメージ"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm font-semibold text-slate-900 gap-3 shadow-lg">
                <div>
                  <p className="text-xs text-gray-500">取扱いカテゴリ</p>
                  <p>ポケカ / 遊戯王 / ONE PIECE</p>
                </div>
                <span className="text-rose-600">査定中</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
