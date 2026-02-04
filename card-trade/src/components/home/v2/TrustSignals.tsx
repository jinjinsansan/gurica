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
    <section className="py-24 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="section-title">TRUST</p>
          <h2 className="section-heading">安心の実績</h2>
          <p className="text-xl text-gray-600 mt-4">多くのお客様にご利用いただいています</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-50 rounded-3xl p-10 text-center hover:bg-gray-100 transition-colors duration-300">
                <div className={`${stat.bg} w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className={`w-12 h-12 ${stat.color}`} />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
                  <AnimatedNumber
                    value={stat.value}
                    format={stat.format}
                    decimals={stat.decimals}
                  />
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <p className="text-base font-semibold text-slate-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
