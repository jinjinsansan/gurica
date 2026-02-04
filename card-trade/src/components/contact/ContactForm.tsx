"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { contactFormSchema, type ContactFormValues } from "@/lib/utils/validation";

interface ContactFormProps {
  defaultName?: string | null;
  defaultEmail?: string | null;
}

const inquiryOptions = [
  { value: "buy", label: "買取について" },
  { value: "sell", label: "販売について" },
  { value: "other", label: "その他" },
];

export function ContactForm({ defaultName, defaultEmail }: ContactFormProps) {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: defaultName ?? "",
      email: defaultEmail ?? "",
      inquiryType: "buy",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "送信に失敗しました");
      }

      setStatus({ type: "success", message: "お問い合わせを受け付けました。2営業日以内にご連絡いたします。" });
      reset({
        name: defaultName ?? "",
        email: defaultEmail ?? "",
        inquiryType: "buy",
        message: "",
      });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "送信に失敗しました" });
    } finally {
      setSubmitting(false);
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
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">お問い合わせ種別 *</label>
        <select
          {...register("inquiryType")}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
        >
          {inquiryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.inquiryType ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.inquiryType.message}</p> : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-[var(--text-primary)]">内容 *</label>
        <textarea
          rows={5}
          {...register("message")}
          className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-[var(--bg-accent)] px-4 py-3 text-sm"
        />
        {errors.message ? <p className="mt-1 text-xs text-[var(--accent-red)]">{errors.message.message}</p> : null}
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
        disabled={submitting}
        className="cta-primary flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            送信中...
          </>
        ) : (
          "送信する"
        )}
      </button>
    </form>
  );
}
