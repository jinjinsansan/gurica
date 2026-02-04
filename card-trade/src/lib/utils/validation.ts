import { z } from "zod";

import type {
  AssessmentStatus,
  CategorySlug,
  ContactStatus,
  InquiryType,
  OrderStatus,
  ProductCondition,
} from "@/lib/types/database";

export const categoryOptions = [
  "pokemon",
  "yugioh",
  "onepiece",
  "other_tcg",
  "digital",
] as const satisfies Readonly<CategorySlug[]>;

export const conditionOptions = [
  "mint",
  "near_mint",
  "good",
  "damaged",
] as const satisfies Readonly<ProductCondition[]>;

export const inquiryTypeOptions = [
  "buy",
  "sell",
  "other",
] as const satisfies Readonly<InquiryType[]>;

export const orderStatusOptions = [
  "pending",
  "confirmed",
  "paid",
  "preparing",
  "shipped",
  "completed",
  "cancelled",
] as const satisfies Readonly<OrderStatus[]>;

export const contactStatusOptions = [
  "unread",
  "in_progress",
  "resolved",
] as const satisfies Readonly<ContactStatus[]>;

export const assessmentStatusOptions = [
  "pending",
  "reviewing",
  "quoted",
  "accepted",
  "completed",
  "cancelled",
] as const satisfies Readonly<AssessmentStatus[]>;

const MAX_IMAGES = 5;
const fileSchema =
  typeof File === "undefined" ? z.any() : z.instanceof(File);

export const assessmentSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  category: z.enum(categoryOptions),
  cardName: z.string().min(1, "カード名を入力してください"),
  rarity: z.string().optional(),
  condition: z.enum(conditionOptions),
  quantity: z
    .coerce.number()
    .int()
    .min(1, "枚数は1枚以上で入力してください"),
  notes: z.string().max(1000, "備考は1000文字以内で入力してください").optional(),
  images: z
    .array(fileSchema)
    .max(MAX_IMAGES, `画像は最大${MAX_IMAGES}枚までアップロードできます`)
    .optional(),
});

export type AssessmentFormValues = z.infer<typeof assessmentSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  subject: z.string().min(1, "件名を入力してください"),
  inquiryType: z.enum(inquiryTypeOptions),
  message: z.string().min(20, "20文字以上で入力してください"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const orderSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z
    .string()
    .trim()
    .min(10, "電話番号を正しく入力してください")
    .max(13, "電話番号を正しく入力してください"),
  postalCode: z
    .string()
    .regex(/^[0-9]{3}-?[0-9]{4}$/, "郵便番号は123-4567の形式で入力してください"),
  address: z.string().min(5, "住所を入力してください"),
  paymentMethod: z.literal("bank_transfer"),
  notes: z.string().max(500).optional(),
  termsAgreed: z.boolean().refine((value) => value, {
    message: "利用規約への同意が必要です",
  }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export const adminStatusUpdateSchema = z.object({
  orderStatus: z.enum(orderStatusOptions),
  contactStatus: z.enum(contactStatusOptions).optional(),
  assessmentStatus: z.enum(assessmentStatusOptions).optional(),
});

export type AdminStatusUpdateValues = z.infer<typeof adminStatusUpdateSchema>;

export const loginSchema = z.object({
  email: z.string().email("メールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
});

export type LoginValues = z.infer<typeof loginSchema>;
