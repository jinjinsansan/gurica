const categories = [
  {
    emoji: "⚡",
    title: "ポケモンカード",
    description: "レアカードからプロモまで幅広く対応",
    gradient: "linear-gradient(135deg,#FFE066,#FFB347)",
  },
  {
    emoji: "🎭",
    title: "遊戯王",
    description: "20thシークレットなど高価買取",
    gradient: "linear-gradient(135deg,#A78BFA,#7C3AED)",
  },
  {
    emoji: "🏴‍☠️",
    title: "ワンピースカード",
    description: "パラレル・シークレット強化買取中",
    gradient: "linear-gradient(135deg,#F87171,#DC2626)",
  },
  {
    emoji: "💎",
    title: "デジタルカード",
    description: "ガチャ系・NFTカードも対応",
    gradient: "linear-gradient(135deg,#34D399,#059669)",
  },
];

export function CategoryCards() {
  return (
    <section className="px-4">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_rgba(26,29,46,0.08)] transition hover:-translate-y-1"
          >
            <div className="absolute inset-x-0 top-0 h-1 opacity-0 transition group-hover:opacity-100" style={{ backgroundImage: category.gradient }} />
            <div className="mb-4 text-3xl">{category.emoji}</div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)]">{category.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
