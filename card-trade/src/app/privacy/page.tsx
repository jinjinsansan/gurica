import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | {{SITE_NAME}}",
  description: "プライバシーポリシーは現在策定中です。公開まで今しばらくお待ちください。",
  openGraph: {
    title: "プライバシーポリシー | {{SITE_NAME}}",
    description: "プライバシーポリシーは現在策定中です。",
  },
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-10 shadow-[0_25px_70px_rgba(26,29,46,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Policy</p>
        <h1 className="mt-4 text-4xl text-[var(--text-primary)]">プライバシーポリシー策定中</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          個人情報の取扱方針を現在整備しています。正式なプライバシーポリシーを公開し次第、こちらのページに反映いたします。
        </p>
      </div>
    </section>
  );
}
