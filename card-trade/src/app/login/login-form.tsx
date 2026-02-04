"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createClient } from "@/lib/supabase/client";
import {
  loginSchema,
  type LoginValues,
} from "@/lib/utils/validation";

export function LoginForm() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [formError, setFormError] = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    setFormState("submitting");

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setFormError("メールアドレスまたはパスワードが正しくありません");
      setFormState("idle");
      return;
    }

    setFormState("success");
    router.replace("/admin");
    router.refresh();
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] px-4 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(74,108,247,0.35),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.3),transparent_45%)]" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--accent-blue)]">
            Secure Admin Portal
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
            管理者ログイン
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--text-secondary)]">
            管理画面へのアクセスは、事前に登録された管理者アカウントのみ許可されています。二要素認証・アクセス制御を順次導入予定です。
          </p>
        </div>

        <div className="w-full max-w-4xl rounded-[28px] bg-white/90 p-1 shadow-[0_25px_80px_rgba(74,108,247,0.15)] backdrop-blur">
          <div className="grid gap-1 rounded-[24px] bg-[var(--bg-accent)] p-1 md:grid-cols-2">
            <div className="card-surface flex flex-col justify-between rounded-[24px] p-10 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--text-light)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent-green)]" />
                  VERIFIED ADMIN
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  信頼性の高いアクセス制御
                </h2>
                <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-blue)]"></span>
                    Supabase Auth によるメール + パスワード認証
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-purple)]"></span>
                    RLS を使ったデータアクセス制御
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent-orange)]"></span>
                    ログイン後は管理画面へ自動遷移
                  </li>
                </ul>
              </div>
              <div className="mt-10 space-y-2 text-xs uppercase tracking-[0.3em] text-[var(--text-light)]">
                <p>Encrypted over TLS 1.3</p>
                <p>Monitoring All Sessions</p>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="card-surface flex flex-col gap-6 rounded-[24px] p-10 text-left"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)]">
                  メールアドレス
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--accent-blue)]" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="admin@example.com"
                    className="w-full rounded-2xl border-2 border-transparent bg-[var(--bg-primary)] py-4 pl-12 pr-4 text-[var(--text-primary)] shadow-inner focus:border-[var(--accent-blue)] focus:outline-none"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-[var(--accent-red)]">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--text-primary)]">
                  パスワード
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--accent-purple)]" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border-2 border-transparent bg-[var(--bg-primary)] py-4 pl-12 pr-4 text-[var(--text-primary)] shadow-inner focus:border-[var(--accent-purple)] focus:outline-none"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-[var(--accent-red)]">{errors.password.message}</p>
                )}
              </div>

              {formError && (
                <div className="rounded-2xl bg-[var(--bg-accent)] px-4 py-3 text-sm text-[var(--accent-red)]">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="cta-primary flex items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-white disabled:opacity-60"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    認証中...
                  </>
                ) : (
                  <>
                    管理画面に入る
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-[var(--text-light)]">
                ログイン情報が不明な場合は、運営チームまでお問い合わせください。
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
