export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg-primary)] px-6 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--accent-blue)]">
          Phase 1
        </p>
        <h1 className="text-balance text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
          {"{{SITE_NAME}}"} の開発環境を初期化しました
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">
          Next.js 14 / Supabase / Tailwind CSS をベースに、計画書に沿った段階的な実装を進めます。
          今後は公開ページ、オンライン査定、EC、管理画面の順で機能を拡張していきます。
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          <span className="pill">Next.js App Router</span>
          <span className="pill">Supabase Auth / DB</span>
          <span className="pill">Tailwind + カスタムデザインシステム</span>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[var(--gradient-primary)] opacity-30 blur-3xl" />
    </main>
  );
}
