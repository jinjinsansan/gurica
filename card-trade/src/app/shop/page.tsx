import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ショップ | {{SITE_NAME}}",
  description: "ECショップ機能は現在準備中です。公開までしばらくお待ちください。",
  openGraph: {
    title: "ショップ | {{SITE_NAME}}",
    description: "ECショップ機能は現在準備中です。",
  },
};

export default function ShopComingSoon() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-12 text-center shadow-[0_25px_70px_rgba(26,29,46,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Shop</p>
        <h1 className="mt-4 text-4xl text-[var(--text-primary)]">オンラインショップ準備中</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          商品一覧やカート機能などのショップ機能は現在構築中です。公開時期が決まり次第、お知らせにて告知いたします。
        </p>
      </div>
    </section>
  );
}
