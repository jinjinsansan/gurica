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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      {format ? format(count) : count.toLocaleString("ja-JP", { maximumFractionDigits: decimals })}
    </div>
  );
}

export function TrustSignals() {
  return (
    <section className="section-container bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center mb-12">
        <p className="section-title">TRUST</p>
        <h2 className="section-heading">安心の実績</h2>
        <p className="section-description">多くのお客様にご利用いただいています</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card-v2 p-6 text-center">
              <div className={`${stat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                <AnimatedNumber
                  value={stat.value}
                  format={stat.format}
                  decimals={stat.decimals}
                />
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
