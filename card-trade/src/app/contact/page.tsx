import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { createClient } from "@/lib/supabase/server";

const contactMethods = [
  { icon: "📧", title: "メール", detail: "{{EMAIL}}", note: "24時間受付" },
  { icon: "📞", title: "電話", detail: "{{PHONE}}", note: "平日 10:00〜18:00" },
  { icon: "💬", title: "LINE", detail: "準備中", note: "近日公開予定" },
];

export const metadata: Metadata = {
  title: "お問い合わせ | {{SITE_NAME}}",
  description: "メール・電話・LINEでの連絡先とお問い合わせフォームを掲載しています。",
  openGraph: {
    title: "お問い合わせ | {{SITE_NAME}}",
    description: "メール・電話・LINEでの連絡先とお問い合わせフォームを掲載しています。",
  },
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const defaultEmail = data.user?.email ?? null;
  const profile = data.user
    ? await supabase.from("profiles").select("full_name").eq("id", data.user.id).single()
    : null;
  const defaultName = profile?.data?.full_name ?? null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Contact</p>
        <h1 className="mt-3 text-3xl text-[var(--text-primary)]">お問い合わせ</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">メール・電話・LINEのいずれか、またはフォームよりご連絡ください。</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {contactMethods.map((method) => (
            <div key={method.title} className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_15px_35px_rgba(26,29,46,0.08)]">
              <div className="text-3xl">{method.icon}</div>
              <h2 className="mt-3 text-2xl text-[var(--text-primary)]">{method.title}</h2>
              <p className="text-lg font-semibold text-[var(--text-primary)]">{method.detail}</p>
              <p className="text-sm text-[var(--text-secondary)]">{method.note}</p>
            </div>
          ))}
        </div>
        <ContactForm defaultName={defaultName} defaultEmail={defaultEmail} />
      </div>
    </section>
  );
}
