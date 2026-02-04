"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMAGES = [
  { src: "/hero-cards-1.jpg", alt: "トレーディングカード買取" },
  { src: "/hero-cards-2.jpg", alt: "デジタルカード査定" },
  { src: "/hero-cards-3.jpg", alt: "高価買取実施中" },
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
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left: Text Content */}
          <div className="space-y-6 z-10">
            <p className="section-title">CARD TRADING PLATFORM</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              カードもデジタルも
              <br />
              <span className="text-blue-600">購入から売却まで</span>
              <br />
              手間なく完結
            </h1>
            <p className="section-description">
              ポケモン・遊戯王・ワンピース・デジタルカードまで高価買取。
              <br />
              オンライン査定なら24時間受付、最短翌日入金。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/assessment" className="btn-primary px-8 py-4 text-lg rounded-full">
                無料査定を申し込む →
              </Link>
              <Link href="/prices" className="btn-secondary px-8 py-4 text-lg rounded-full">
                買取価格を見る
              </Link>
              <Link href="/shop" className="btn-tertiary px-8 py-4 text-lg rounded-full">
                ショップを見る
              </Link>
            </div>
          </div>

          {/* Right: Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
              <div className="flex">
                {HERO_IMAGES.map((image, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-48 h-64 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 shadow-xl flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">{image.alt}</span>
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              aria-label="前へ"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
              aria-label="次へ"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {HERO_IMAGES.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition ${
                    index === selectedIndex ? "bg-white w-8" : "bg-white/50"
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
