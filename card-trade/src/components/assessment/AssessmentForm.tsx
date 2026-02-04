"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { assessmentFormSchema, type AssessmentFormValues } from "@/lib/utils/validation";
import { FileUpload } from "@/components/ui/FileUpload";

interface AssessmentFormProps {
  categories: { id: string; name: string; slug: string }[];
  defaultName?: string | null;
  defaultEmail?: string | null;
  defaultPhone?: string | null;
}

const CONDITION_LABELS: Record<string, string> = {
  mint: "未開封 (mint)",
  near_mint: "美品 (near mint)",
  good: "良品 (good)",
  damaged: "傷あり (damaged)",
};

export function AssessmentForm({ categories, defaultName, defaultEmail, defaultPhone }: AssessmentFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      name: defaultName ?? "",
      email: defaultEmail ?? "",
      phone: defaultPhone ?? "",
      categoryId: "",
      cardDetail: "",
      condition: "mint",
      notes: "",
      images: [],
    },
  });

  const validateFiles = (nextFiles: File[], current: File[]) => {
    if (nextFiles.length > 5) {
      setFileError("画像は最大5枚までアップロードできます");
      return current;
    }

    for (const file of nextFiles) {
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setFileError("対応形式は jpg / png / webp のみです");
        return current;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("各画像は5MB以下でアップロードしてください");
        return current;
      }
    }

    setFileError(null);
    return nextFiles;
  };

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (values.phone) formData.append("phone", values.phone);
      formData.append("categoryId", values.categoryId);
      formData.append("cardDetail", values.cardDetail);
      formData.append("condition", values.condition);
      if (values.notes) formData.append("notes", values.notes);

      files.forEach((file) => formData.append("images", file));

      const response = await fetch("/api/assessment", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "送信に失敗しました");
      }

      const data = await response.json();
      setStatus({ type: "success", message: `査定リクエストを受け付けました（受付番号: ${data.requestNumber}）。メールをご確認ください。` });
      setFiles([]);
      reset({
        name: defaultName ?? "",
        email: defaultEmail ?? "",
        phone: defaultPhone ?? "",
        categoryId: "",
        cardDetail: "",
        condition: "mint",
        notes: "",
        images: [],
      });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "送信に失敗しました" });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)]">氏名 *</label>
          <input
            type="text"
            {...register("name")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
          />
          {errors.name ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)]">メールアドレス *</label>
          <input
            type="email"
            {...register("email")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
          />
          {errors.email ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)]">電話番号</label>
          <input
            type="tel"
            {...register("phone")}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
          />
          {errors.phone ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className="text-sm font-semibold text-[var(--text-primary)]">カテゴリ *</label>
          <select
            {...register("categoryId")}
            disabled={categories.length === 0}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm disabled:opacity-60"
          >
            <option value="" disabled>
              カテゴリを選択してください
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {categories.length === 0 ? (
            <p className="mt-1 text-xs text-[var(--accent-red)]">カテゴリ情報が設定されていません。管理者にお問い合わせください。</p>
          ) : null}
          {errors.categoryId ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.categoryId.message}</p> : null}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">カード詳細 *</label>
        <textarea
          rows={4}
          placeholder="カード名、型番、枚数などをご記入ください"
          {...register("cardDetail")}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
        />
        {errors.cardDetail ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.cardDetail.message}</p> : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">状態 *</label>
        <select
          {...register("condition")}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
        >
          {Object.entries(CONDITION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.condition ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.condition.message}</p> : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">画像（任意）</label>
        <FileUpload
          files={files}
          onChange={(next) => setFiles((current) => validateFiles(next, current))}
          error={fileError}
          uploading={isSubmitting}
          maxFiles={5}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">備考</label>
        <textarea
          rows={3}
          {...register("notes")}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
        />
        {errors.notes ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.notes.message}</p> : null}
      </div>

      {status ? (
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            status.type === "success" ? "bg-green-50 text-green-800" : "bg-rose-50 text-rose-700"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-primary flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            送信中...
          </>
        ) : (
          "査定を依頼する"
        )}
      </button>
    </form>
  );
}
