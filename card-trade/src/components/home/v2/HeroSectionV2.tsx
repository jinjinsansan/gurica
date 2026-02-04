"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  { alt: "トレーディングカード買取", gradient: "from-blue-400 to-purple-500" },
  { alt: "デジタルカード査定", gradient: "from-purple-400 to-pink-500" },
  { alt: "高価買取実施中", gradient: "from-pink-400 to-orange-500" },
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
    <section className="relative min-h-[85vh] bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-32">
          {/* Left: Text Content */}
          <div className="space-y-10 z-10">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                カードもデジタルも
                <br />
                <span className="text-blue-600">購入から売却まで</span>
                <br />
                手間なく完結
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                ポケモン・遊戯王・ワンピース・デジタルカードまで高価買取。
                <br />
                オンライン査定なら24時間受付、最短翌日入金。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment" className="btn-primary px-10 py-5 text-xl rounded-xl font-bold shadow-xl hover:shadow-2xl">
                無料査定を申し込む
              </Link>
              <Link href="/prices" className="btn-secondary px-10 py-5 text-xl rounded-xl font-semibold">
                買取価格を見る
              </Link>
            </div>
          </div>

          {/* Right: Carousel */}
          <div className="relative lg:ml-auto">
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200" ref={emblaRef}>
              <div className="flex">
                {HERO_SLIDES.map((slide, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className={`relative aspect-[5/4] bg-gradient-to-br ${slide.gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center">
                          <div className="w-56 h-80 mx-auto bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 shadow-2xl flex items-center justify-center">
                            <span className="text-white text-2xl font-bold drop-shadow-lg">{slide.alt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
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
      </div>
    </section>
  );
}
