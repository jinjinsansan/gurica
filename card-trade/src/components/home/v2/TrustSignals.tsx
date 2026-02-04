"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, DollarSign, Users, Star } from "lucide-react";

const STATS = [
  {
    icon: ClipboardCheck,
    value: 50000,
    suffix: "件+",
    label: "累計査定数",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    value: 1000000000,
    suffix: "円+",
    label: "累計買取実績",
    color: "text-green-600",
    bg: "bg-green-50",
    format: (n: number) => (n / 100000000).toFixed(1) + "億",
  },
  {
    icon: Users,
    value: 15000,
    suffix: "人+",
    label: "ご利用ユーザー",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "",
    label: "ユーザー評価",
    color: "text-orange-600",
    bg: "bg-orange-50",
    decimals: 1,
  },
];

function AnimatedNumber({
  value,
  format,
  decimals = 0,
}: {
  value: number;
  format?: (n: number) => string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);

          timerRef.current = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              if (timerRef.current) clearInterval(timerRef.current);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      observer.disconnect();
    };
  }, [value]);

  return (
    <div ref={ref}>
      {format ? format(count) : count.toLocaleString("ja-JP", { maximumFractionDigits: decimals })}
    </div>
  );
}

export function TrustSignals() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-title">TRUST</p>
          <h2 className="section-heading">安心と実績で選ばれる理由</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4">鑑定士・物流チーム・サポート体制を社内に集約し、高品質な体験を提供しています。</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-[24px] sm:rounded-[28px] border border-gray-200 bg-white p-6 sm:p-8 text-center">
                <div className={`${stat.bg} w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    decimals={stat.decimals}
                  />
                  <span className="text-xl sm:text-2xl">{stat.suffix}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
