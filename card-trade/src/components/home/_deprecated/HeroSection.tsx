import Link from "next/link";

export function HeroSection() {
  const floatingCards = [
    { position: { top: "10%", left: "10%" }, gradient: "linear-gradient(140deg,#FFE066,#FFB347)" },
    { position: { top: "5%", right: "15%" }, gradient: "linear-gradient(140deg,#A78BFA,#7C3AED)" },
    { position: { top: "40%", left: "5%" }, gradient: "linear-gradient(140deg,#34D399,#059669)" },
    { position: { bottom: "15%", right: "12%" }, gradient: "linear-gradient(140deg,#F59E0B,#EF4444)" },
    { position: { bottom: "5%", left: "20%" }, gradient: "linear-gradient(140deg,#4A6CF7,#8B5CF6)" },
    { position: { top: "35%", right: "35%" }, gradient: "linear-gradient(140deg,#EC4899,#8B5CF6)" },
  ];

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(74,108,247,0.35),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.25),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.2),transparent_50%)]" />

      {floatingCards.map((card, index) => (
        <div
          key={index}
          className="hero-floating-card"
          style={{ ...card.position, backgroundImage: card.gradient }}
        />
      ))}

      <div className="mx-auto flex max-w-6xl flex-col gap-12 text-center md:flex-row md:items-center md:text-left">
        <div className="flex-1 space-y-8">
          <span className="badge-primary">✦ トレカ＆デジタルカード専門</span>
          <h1 className="fade-in-up text-4xl leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            あなたのカードに、<span className="gradient-text">最高の価値</span>を。
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            ポケモンカード・遊戯王・ワンピースからデジタルカードまで。リアルもデジタルも、高価買取・販売。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/assessment" className="cta-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white">
              無料オンライン査定
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-[var(--accent-blue)] px-8 py-4 text-base font-semibold text-[var(--accent-blue)]"
            >
              ショップを見る
            </Link>
          </div>
        </div>

        <div className="flex-1 rounded-[32px] border border-white/30 bg-white/80 p-8 shadow-[0_25px_70px_rgba(74,108,247,0.18)] backdrop-blur">
          <div className="grid grid-cols-2 gap-6 text-left text-sm text-[var(--text-secondary)]">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Featured</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">リアル&デジタル査定</p>
              <p className="mt-1 text-sm">写真/スクショだけで事前査定OK</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Coverage</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">全国対応</p>
              <p className="mt-1 text-sm">送料・キット無料（条件あり）</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Digital</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">NFT/ガチャ</p>
              <p className="mt-1 text-sm">デジタルカードも査定対象</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Support</p>
              <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">専門バイヤー</p>
              <p className="mt-1 text-sm">1枚ずつ丁寧に価値を算定</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
