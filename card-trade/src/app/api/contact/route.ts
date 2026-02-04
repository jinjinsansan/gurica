import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { sendContactAdminEmail, sendContactUserEmail } from "@/lib/email/contact";
import { contactFormSchema } from "@/lib/utils/validation";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = contactFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const adminClient = createAdminClient();

    const { data, error } = await adminClient
      .from("contacts")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email,
        inquiry_type: parsed.data.inquiryType,
        message: parsed.data.message,
      })
      .select("id")
      .single();

    if (error || !data) {
      throw error ?? new Error("お問い合わせの保存に失敗しました");
    }

    const typeLabelMap: Record<string, string> = {
      buy: "買取について",
      sell: "販売について",
      other: "その他",
    };

    await Promise.all([
      sendContactAdminEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        inquiryType: typeLabelMap[parsed.data.inquiryType],
        message: parsed.data.message,
      }),
      sendContactUserEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        inquiryType: typeLabelMap[parsed.data.inquiryType],
        message: parsed.data.message,
      }),
    ]);

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ error: "お問い合わせの送信に失敗しました" }, { status: 500 });
  }
}
