import type { Metadata } from "next";

const rows = [
  { label: "販売業者", value: "{{COMPANY_NAME}}" },
  { label: "運営統括責任者", value: "{{REPRESENTATIVE}}" },
  { label: "所在地", value: "{{ADDRESS}}" },
  { label: "電話番号", value: "{{PHONE}}" },
  { label: "メールアドレス", value: "{{EMAIL}}" },
  { label: "販売価格", value: "各商品ページに税込価格を表示" },
  { label: "商品代金以外の必要料金", value: "送料・振込手数料" },
  { label: "送料", value: "5,000円以上: 無料 / 5,000円未満: 全国一律500円" },
  { label: "支払方法", value: "銀行振込" },
  { label: "支払時期", value: "注文確定後5営業日以内" },
  { label: "商品の引渡時期", value: "入金確認後3〜5営業日以内に発送" },
  { label: "返品・交換", value: "到着後7日以内・未開封品に限り可能" },
  { label: "返品送料", value: "お客様負担（初期不良は当社負担）" },
  { label: "古物商許可", value: "{{PUBLIC_SAFETY_COMMISSION}} 第{{KOBUTSU_NUMBER}}号" },
];

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | {{SITE_NAME}}",
  description: "{{COMPANY_NAME}} の特定商取引法に基づく表示です。販売事業者情報、送料、返品規約等を掲載しています。",
  openGraph: {
    title: "特定商取引法に基づく表記 | {{SITE_NAME}}",
    description: "{{COMPANY_NAME}} の特定商取引法に基づく表示です。販売事業者情報、送料、返品規約等を掲載しています。",
  },
};

export default function LegalPage() {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
        <h1 className="text-3xl text-[var(--text-primary)]">特定商取引法に基づく表記</h1>
        <dl className="mt-8 divide-y divide-slate-100">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-4 py-4 md:grid-cols-[200px_auto]">
              <dt className="rounded-xl bg-[var(--bg-accent)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)]">
                {row.label}
              </dt>
              <dd className="text-sm text-[var(--text-secondary)]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
