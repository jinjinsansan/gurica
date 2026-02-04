import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "オンライン査定 | {{SITE_NAME}}",
  description: "オンライン査定フォームは近日公開予定です。準備が整い次第お知らせいたします。",
  openGraph: {
    title: "オンライン査定 | {{SITE_NAME}}",
    description: "オンライン査定フォームは近日公開予定です。",
  },
};

export default function AssessmentComingSoon() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-100 bg-white p-10 text-center shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Coming Soon</p>
        <h1 className="mt-4 text-4xl text-[var(--text-primary)]">オンライン査定フォームを準備中です</h1>
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          ただいまオンライン査定フォームの公開準備を進めています。正式リリースまでは、お問い合わせフォームまたは買取の流れページをご利用ください。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/contact" className="cta-primary rounded-full px-6 py-3 text-sm font-semibold text-white">
            お問い合わせへ
          </Link>
          <Link
            href="/prices"
            className="rounded-full border border-[var(--accent-blue)] px-6 py-3 text-sm font-semibold text-[var(--accent-blue)]"
          >
            最新の買取価格を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
