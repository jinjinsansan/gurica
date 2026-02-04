"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const HERO_SLIDES = [
  { alt: "トレーディングカード買取", gradient: "from-blue-400 to-purple-500" },
  { alt: "デジタルカード査定", gradient: "from-purple-400 to-pink-500" },
  { alt: "高価買取実施中", gradient: "from-pink-400 to-orange-500" },
];

const HERO_FEATURES = [
  "24時間オンライン査定",
  "全国どこでも宅配買取",
  "最短翌日振込",
  "高額カードも安心補償",
];

const HERO_METRICS = [
  { label: "年間査定件数", value: "38,200", suffix: "+" },
  { label: "平均レビュー", value: "4.9", suffix: "/5" },
  { label: "最短入金", value: "24", suffix: "h" },
];

export function HeroSectionV2() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative bg-white">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blue-50/70 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center py-16 sm:py-20 lg:py-28">
          {/* Left: Text Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-500">
                CARD TRADING PLATFORM
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight text-slate-900">
                カードの価値を
                <br />
                <span className="text-blue-600">最高のタイミングで</span>
                <br />
                取引できる場所
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                ポケモン・遊戯王・ワンピース・デジタルカードまで網羅。
                <br />
                価格データとプロ鑑定で、売買の判断をサポートします。
              </p>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {HERO_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-base sm:text-lg text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  {feature}
                </div>
              ))}
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
            <p className="text-sm sm:text-base text-gray-500">査定→発送→入金までオンラインで完結。法人・個人どちらも対応。</p>
          </div>

          {/* Right: Carousel */}
          <div className="relative w-full max-w-xl mx-auto lg:ml-auto">
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-blue-100 via-white to-purple-100 blur-3xl opacity-70" aria-hidden />
            <div className="overflow-hidden rounded-[28px] sm:rounded-[32px] shadow-2xl border border-gray-200 relative" ref={emblaRef}>
              <div className="flex">
                {HERO_SLIDES.map((slide, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className={`relative aspect-[5/4] bg-gradient-to-br ${slide.gradient}`}>
                      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
                        <div className="space-y-4 sm:space-y-6 text-white">
                          <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-white/70">REALTIME DATA</p>
                          <p className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-lg">
                            市場データと連動した<br />
                            査定アルゴリズム
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {["ポケカ", "デジタル"].map((label) => (
                            <div key={label} className="bg-white/15 backdrop-blur border border-white/30 rounded-2xl p-3 sm:p-4 text-white">
                              <p className="text-xs sm:text-sm opacity-80">{label}</p>
                              <p className="text-lg sm:text-2xl font-bold">高額買取中</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="hidden sm:flex">
              <button
                onClick={scrollPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-xl transition-all hover:scale-110"
                aria-label="前へ"
              >
                <ChevronLeft className="w-7 h-7 text-gray-700" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-4 rounded-full shadow-xl transition-all hover:scale-110"
                aria-label="次へ"
              >
                <ChevronRight className="w-7 h-7 text-gray-700" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 rounded-full transition-all ${
                    index === selectedIndex ? "bg-blue-600 w-12" : "bg-gray-300 w-3"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`スライド ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 pt-10 pb-12">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="flex items-center justify-between rounded-2xl bg-gray-50 px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-500">{metric.label}</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                  {metric.value}
                  <span className="text-2xl text-blue-600">{metric.suffix}</span>
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-white shadow-inner border border-gray-100 flex items-center justify-center text-blue-600 text-xs sm:text-base font-bold">
                Gurica
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
