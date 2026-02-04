import type { Metadata } from "next";

import { AssessmentInfo } from "@/components/assessment/AssessmentInfo";
import { AssessmentForm } from "@/components/assessment/AssessmentForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "オンライン査定 | {{SITE_NAME}}",
  description: "写真を送るだけで完結する無料オンライン査定フォームです。カテゴリ選択と画像アップロードに対応しています。",
  openGraph: {
    title: "オンライン査定 | {{SITE_NAME}}",
    description: "写真を送るだけで完結する無料オンライン査定フォームです。",
  },
};

export default async function AssessmentPage() {
  const supabase = await createClient();
  const [{ data: categories }, userResult] = await Promise.all([
    supabase.from("categories").select("id,name,slug").order("display_order", { ascending: true }),
    supabase.auth.getUser(),
  ]);

  let defaultName: string | null = null;
  let defaultEmail: string | null = null;
  let defaultPhone: string | null = null;

  if (userResult.data.user) {
    defaultEmail = userResult.data.user.email ?? null;
    const profile = await supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", userResult.data.user.id)
      .single();
    defaultName = profile.data?.full_name ?? null;
    defaultPhone = profile.data?.phone ?? null;
  }

  const categoryList = (categories ?? []) as { id: string; name: string; slug: string }[];

  return (
    <section className="px-4 py-16">
      <div className="mx-auto mb-10 max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">Assessment</p>
        <h1 className="mt-3 text-3xl text-[var(--text-primary)]">無料オンライン査定</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">写真を添付するだけで査定依頼が完了します。最短即日で回答いたします。</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <AssessmentInfo />
        <AssessmentForm
          categories={categoryList}
          defaultName={defaultName}
          defaultEmail={defaultEmail}
          defaultPhone={defaultPhone}
        />
      </div>
    </section>
  );
}
