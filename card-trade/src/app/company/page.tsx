import type { Metadata } from "next";

const companyInfo = [
  { label: "法人名", value: "{{COMPANY_NAME}}", note: "（確定後に記載）" },
  { label: "代表者", value: "{{REPRESENTATIVE}}", note: "（確定後に記載）" },
  { label: "所在地", value: "{{ADDRESS}}", note: "（確定後に記載）" },
  { label: "電話番号", value: "{{PHONE}}", note: "（確定後に記載）" },
  { label: "メール", value: "{{EMAIL}}", note: "（確定後に記載）" },
  { label: "設立", value: "{{FOUNDING_YEAR}}", note: "（確定後に記載）" },
  { label: "事業内容", value: "トレーディングカード・デジタルカードの買取・販売" },
];

const licenseInfo = [
  { label: "許可番号", value: "第{{KOBUTSU_NUMBER}}号", note: "（許可取得後に記載）" },
  { label: "許可公安委員会", value: "{{PUBLIC_SAFETY_COMMISSION}}" },
  { label: "届出区分", value: "法人" },
  { label: "取扱品目", value: "トレーディングカード・デジタルカード" },
];

export const metadata: Metadata = {
  title: "会社概要 | {{SITE_NAME}}",
  description: "{{COMPANY_NAME}} の法人情報・古物商許可情報を掲載しています。",
  openGraph: {
    title: "会社概要 | {{SITE_NAME}}",
    description: "{{COMPANY_NAME}} の法人情報・古物商許可情報を掲載しています。",
  },
};

export default function CompanyPage() {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
          <h1 className="text-3xl text-[var(--text-primary)]">会社概要</h1>
          <dl className="mt-6 space-y-4">
            {companyInfo.map((info) => (
              <div key={info.label} className="grid gap-3 rounded-2xl bg-[var(--bg-accent)] p-4 md:grid-cols-[160px_auto]">
                <dt className="text-sm font-semibold text-[var(--text-primary)]">{info.label}</dt>
                <dd className="text-sm text-[var(--text-secondary)]">
                  {info.value} {info.note ? <span className="italic text-[var(--text-light)]">{info.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex-1 rounded-[32px] border border-amber-200 bg-white p-8 shadow-[0_20px_45px_rgba(245,158,11,0.15)]">
          <h2 className="text-2xl text-[var(--text-primary)]">🛡️ 古物商許可情報</h2>
          <dl className="mt-6 space-y-4">
            {licenseInfo.map((info) => (
              <div key={info.label} className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                <dt className="text-xs uppercase tracking-[0.35em] text-amber-600">{info.label}</dt>
                <dd className="mt-2 text-base text-[var(--text-primary)]">
                  {info.value} {info.note ? <span className="text-sm text-amber-500">{info.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
