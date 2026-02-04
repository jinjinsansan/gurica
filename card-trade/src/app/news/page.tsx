import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お知らせ | {{SITE_NAME}}",
  description: "公式からのお知らせ一覧は現在準備中です。公開までお待ちください。",
  openGraph: {
    title: "お知らせ | {{SITE_NAME}}",
    description: "公式からのお知らせ一覧は現在準備中です。",
  },
};

export default function NewsPage() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-10 text-center shadow-[0_25px_70px_rgba(26,29,46,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">News</p>
        <h1 className="mt-4 text-4xl text-[var(--text-primary)]">お知らせページを準備中</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          公式からの最新情報やキャンペーンは、公開準備が整い次第こちらに掲載いたします。続報をお待ちください。
        </p>
      </div>
    </section>
  );
}
