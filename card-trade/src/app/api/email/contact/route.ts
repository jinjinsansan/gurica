import { NextResponse } from "next/server";

import { sendContactAdminEmail, sendContactUserEmail } from "@/lib/email/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const { target = "both", ...payload } = body;

  try {
    if (!payload?.name || !payload?.email || !payload?.inquiryType) {
      return NextResponse.json({ error: "payload が不足しています" }, { status: 400 });
    }

    if (target === "admin" || target === "both") {
      await sendContactAdminEmail(payload);
    }

    if (target === "user" || target === "both") {
      await sendContactUserEmail(payload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 });
  }
}
