import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "管理者ログイン",
  description:
    "{{SITE_NAME}} の管理画面にアクセスするためのログインページ。認証済みの管理者のみ入場できます。",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return <LoginForm />;
}
