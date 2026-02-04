import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/formatPrice";

const STATUS_LABELS: Record<string, string> = {
  pending: "受付済み",
  reviewing: "査定中",
  quoted: "お見積り済み",
  accepted: "承諾済み",
  completed: "完了",
  cancelled: "キャンセル",
};

const STATUS_CLASSES: Record<string, string> = {
  pending: "bg-slate-100 text-slate-600",
  reviewing: "bg-blue-100 text-blue-700",
  quoted: "bg-emerald-100 text-emerald-700",
  accepted: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-rose-100 text-rose-700",
};

interface AssessmentRow {
  id: string;
  created_at: string;
  status: string;
  quoted_price: number | null;
  card_detail: string;
  condition: string;
  categories: { name: string } | null;
}

export const metadata: Metadata = {
  title: "査定履歴 | {{SITE_NAME}}",
};

export default async function MyAssessmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("assessments")
    .select("id, created_at, status, quoted_price, card_detail, condition, categories(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const assessments = (data as AssessmentRow[] | null) ?? [];

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl text-[var(--text-primary)]">査定履歴</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">これまでにご依頼いただいた査定のステータスを確認できます。</p>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
          {assessments.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-[var(--text-secondary)]">査定履歴はありません。</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {assessments.map((assessment) => (
                <li key={assessment.id} className="px-6 py-5">
                  <details>
                    <summary className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {new Date(assessment.created_at).toLocaleDateString("ja-JP")}
                        </p>
                        <p className="text-base font-semibold text-[var(--text-primary)]">
                          {assessment.categories?.name ?? "カテゴリ未設定"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[assessment.status] ?? "bg-slate-100"}`}>
                          {STATUS_LABELS[assessment.status] ?? assessment.status}
                        </span>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {assessment.quoted_price ? formatPrice(assessment.quoted_price) : "査定中"}
                        </span>
                      </div>
                    </summary>
                    <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                      <p>
                        <strong>状態:</strong> {assessment.condition}
                      </p>
                      <p className="whitespace-pre-line">
                        <strong>カード詳細:</strong>
                        <br />
                        {assessment.card_detail}
                      </p>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
