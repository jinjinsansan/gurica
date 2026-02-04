import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | {{SITE_NAME}}",
  description: "お問い合わせフォームは近日公開予定です。メール・電話情報は確定後に掲載します。",
  openGraph: {
    title: "お問い合わせ | {{SITE_NAME}}",
    description: "お問い合わせフォームは近日公開予定です。",
  },
};

export default function ContactPage() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-100 bg-white p-10 text-center shadow-[0_25px_70px_rgba(26,29,46,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Contact</p>
        <h1 className="mt-4 text-4xl text-[var(--text-primary)]">お問い合わせ窓口は準備中です</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          現在、専用フォームとサポート体制を整備しております。準備が整い次第、本ページに連絡先とフォームへのリンクを掲載いたします。
        </p>
      </div>
    </section>
  );
}
