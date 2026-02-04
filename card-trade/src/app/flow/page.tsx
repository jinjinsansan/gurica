import type { Metadata } from "next";
import Link from "next/link";

const steps = [
  { emoji: "📝", title: "査定申込", description: "フォームに商品情報と写真を入力して送信" },
  { emoji: "🔍", title: "査定・ご連絡", description: "専門スタッフが査定し、メールで金額をご提示" },
  { emoji: "📦", title: "承諾・発送", description: "金額にご納得いただけたらカードを発送" },
  { emoji: "💰", title: "お支払い", description: "商品確認後、お振込みにてお支払い" },
];

const methods = [
  { emoji: "📦", title: "宅配買取", detail: "全国対応 / 送料無料キットをご用意" },
  { emoji: "🏪", title: "店頭買取", detail: "※準備中。近日オープン予定です" },
  { emoji: "🚗", title: "出張買取", detail: "※準備中。対応エリアを順次拡大" },
];

const faqs = [
  { question: "査定は無料ですか？", answer: "はい、査定料やキャンセル料は一切いただきません。" },
  {
    question: "傷があるカードも買い取ってもらえますか？",
    answer: "はい。状態に応じて価格をご提示いたしますので、そのままお送りください。",
  },
  {
    question: "デジタルカードの買取はどのように行われますか？",
    answer: "対象ガチャサイトのアカウント情報やウォレット情報を確認の上、譲渡手順をご案内します。",
  },
  { question: "入金までどれくらいかかりますか？", answer: "商品到着・確認後、最短即日〜3営業日以内にお振込みします。" },
  { question: "キャンセルはできますか？", answer: "査定結果通知後にキャンセル可能です。返送時の送料は弊社負担です。" },
];

export const metadata: Metadata = {
  title: "買取の流れ | {{SITE_NAME}}",
  description: "査定申込からご入金までの流れを4ステップでご案内。宅配・店頭・出張買取にも対応しています。",
  openGraph: {
    title: "買取の流れ | {{SITE_NAME}}",
    description: "査定申込からご入金までの流れを4ステップでご案内。宅配・店頭・出張買取にも対応しています。",
  },
};

export default function FlowPage() {
  return (
    <div className="space-y-12 px-4 py-16">
      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Process</p>
        <h1 className="mt-3 text-4xl text-[var(--text-primary)]">買取の流れ</h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          お申し込みからご入金まで、シンプルな4ステップ。リアルカードもデジタルカードも同じフローで対応いたします。
        </p>
      </header>

      <section className="mx-auto max-w-5xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-3xl border border-slate-100 bg-[var(--bg-accent)] p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundImage: "var(--gradient-primary)", color: "white" }}>
                {step.emoji}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">STEP {index + 1}</p>
              <h3 className="mt-2 text-lg text-[var(--text-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl">
        <h2 className="text-3xl text-[var(--text-primary)]">買取方法</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {methods.map((method) => (
            <div key={method.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
              <div className="text-3xl">{method.emoji}</div>
              <h3 className="mt-3 text-xl text-[var(--text-primary)]">{method.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{method.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl">
        <h2 className="text-3xl text-[var(--text-primary)]">よくある質問</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-[var(--text-primary)]">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link href="/assessment" className="cta-primary inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold text-white">
          無料オンライン査定はこちら
        </Link>
      </div>
    </div>
  );
}
