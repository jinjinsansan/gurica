import { Buffer } from "node:buffer";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendAssessmentAdminEmail,
  sendAssessmentUserEmail,
} from "@/lib/email/assessment";
import { assessmentFormSchema } from "@/lib/utils/validation";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabaseの環境変数が不足しています");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawFiles = formData.getAll("images");

  const payload = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() || undefined,
    categoryId: formData.get("categoryId")?.toString() ?? "",
    cardDetail: formData.get("cardDetail")?.toString() ?? "",
    condition: formData.get("condition")?.toString() ?? "",
    notes: formData.get("notes")?.toString() || undefined,
  };

  const parsed = assessmentFormSchema.omit({ images: true }).safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  const files = rawFiles.filter((file): file is File => file instanceof File && file.size > 0);

  if (files.length > 5) {
    return NextResponse.json({ error: "画像は最大5枚までアップロードできます" }, { status: 400 });
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "対応形式は jpg/png/webp のみです" }, { status: 400 });
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "各画像は5MB以下でアップロードしてください" }, { status: 400 });
    }
  }

  try {
    const cookieStore = await cookies();
    const supabaseUserClient = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    });

    const {
      data: { user },
    } = await supabaseUserClient.auth.getUser();

    const adminClient = createAdminClient();

    const { data: category } = await adminClient
      .from("categories")
      .select("id,name")
      .eq("id", parsed.data.categoryId)
      .single();

    const { data: assessment, error } = await adminClient
      .from("assessments")
      .insert({
        user_id: user?.id ?? null,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        category_id: parsed.data.categoryId,
        card_detail: parsed.data.cardDetail,
        condition: parsed.data.condition,
        notes: parsed.data.notes,
      })
      .select("id, created_at")
      .single();

    if (error || !assessment) {
      throw error ?? new Error("査定レコードの作成に失敗しました");
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `${assessment.id}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const upload = await adminClient.storage
        .from("assessments")
        .upload(filePath, buffer, { contentType: file.type, upsert: true });

      if (upload.error) {
        console.error("Failed to upload image", upload.error);
        continue;
      }

      const publicUrl = adminClient.storage.from("assessments").getPublicUrl(filePath).data.publicUrl;
      imageUrls.push(publicUrl);

      await adminClient.from("assessment_images").insert({
        assessment_id: assessment.id,
        url: publicUrl,
      });
    }

    const requestNumber = `AST-${assessment.id.slice(0, 8).toUpperCase()}`;
    const categoryName = category?.name ?? "査定";

    await Promise.all([
      sendAssessmentAdminEmail({
        requestNumber,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        categoryName,
        condition: parsed.data.condition,
        cardDetail: parsed.data.cardDetail,
        notes: parsed.data.notes,
        imageCount: imageUrls.length,
      }),
      sendAssessmentUserEmail({
        requestNumber,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        categoryName,
        condition: parsed.data.condition,
        cardDetail: parsed.data.cardDetail,
        notes: parsed.data.notes,
        imageCount: imageUrls.length,
      }),
    ]);

    return NextResponse.json({ success: true, requestNumber });
  } catch (error) {
    console.error("Assessment submission failed", error);
    return NextResponse.json({ error: "査定リクエストの送信に失敗しました" }, { status: 500 });
  }
}
