const merits = [
  "査定料・送料無料",
  "最短即日回答",
  "デジタルカードも対応",
  "高価買取実績多数",
];

export function AssessmentInfo() {
  return (
    <div className="rounded-[32px] bg-[var(--gradient-primary)] p-8 text-white shadow-[0_25px_60px_rgba(74,108,247,0.35)]">
      <p className="text-xs uppercase tracking-[0.35em] text-white/70">Assessment</p>
      <h2 className="mt-4 text-4xl font-semibold">無料オンライン査定</h2>
      <p className="mt-4 text-sm text-white/85">
        写真を送るだけで簡単査定。専門スタッフが丁寧にお見積もりいたします。
      </p>
      <ul className="mt-8 space-y-4">
        {merits.map((merit) => (
          <li key={merit} className="flex items-center gap-3 text-sm">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">✓</span>
            {merit}
          </li>
        ))}
      </ul>
    </div>
  );
}
