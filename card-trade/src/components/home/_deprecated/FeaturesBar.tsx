const stats = [
  { label: "買取実績", value: "10,000+ 件" },
  { label: "取扱カテゴリ", value: "5,000+ 種類" },
  { label: "満足度", value: "98%" },
  { label: "最短査定", value: "即日" },
];

export function FeaturesBar() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-[var(--gradient-primary)] p-8 text-white shadow-[0_25px_70px_rgba(74,108,247,0.25)]">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">{stat.label}</p>
              <p className="font-tech mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
