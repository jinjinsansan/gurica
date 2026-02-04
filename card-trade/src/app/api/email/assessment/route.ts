import { NextResponse } from "next/server";

import {
  sendAssessmentAdminEmail,
  sendAssessmentUserEmail,
} from "@/lib/email/assessment";

export async function POST(request: Request) {
  const body = await request.json();
  const { target = "both", ...payload } = body;

  try {
    if (!payload?.name || !payload?.email || !payload?.categoryName) {
      return NextResponse.json({ error: "payload が不足しています" }, { status: 400 });
    }

    if (target === "admin" || target === "both") {
      await sendAssessmentAdminEmail(payload);
    }

    if (target === "user" || target === "both") {
      await sendAssessmentUserEmail(payload);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send assessment email", error);
    return NextResponse.json({ error: "メール送信に失敗しました" }, { status: 500 });
  }
}
