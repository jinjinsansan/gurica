import Link from "next/link";

const steps = [
  { title: "査定申込", description: "フォームにカード情報と写真を送信" },
  { title: "査定結果", description: "専門スタッフが丁寧に評価" },
  { title: "発送", description: "金額に納得後、送料無料キットで発送" },
  { title: "ご入金", description: "到着後すぐにお振込み" },
];

export function FlowPreview() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">How it works</p>
            <h2 className="mt-3 text-3xl text-[var(--text-primary)]">4ステップで完結</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              査定依頼から入金まで、最短1日で完了。スピーディで安心な買取プロセスです。
            </p>
          </div>
          <Link href="/flow" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue)]">
            詳しく見る →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-slate-100 bg-[var(--bg-accent)] p-6">
              <span className="text-sm font-semibold text-[var(--accent-blue)]">STEP {index + 1}</span>
              <h3 className="mt-3 text-xl text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
