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

const FILE_SCHEMA =
  typeof File === "undefined" ? z.any() : z.instanceof(File);

export const assessmentFormSchema = z.object({
  name: z.string().min(1, "氏名を入力してください").max(50),
  email: z.string().email("正しいメールアドレスを入力してください"),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : undefined)),
  categoryId: z.string().uuid("カテゴリを選択してください"),
  cardDetail: z
    .string()
    .min(1, "商品の詳細を入力してください")
    .max(2000, "2000文字以内で入力してください"),
  condition: z.enum(conditionOptions),
  notes: z
    .string()
    .max(1000, "備考は1000文字以内で入力してください")
    .optional(),
  images: z
    .array(FILE_SCHEMA)
    .max(5, "画像は最大5枚までアップロードできます")
    .optional(),
});

type AssessmentSchemaInfer = z.infer<typeof assessmentFormSchema>;

export type AssessmentFormValues = Omit<AssessmentSchemaInfer, "phone"> & {
  phone?: string;
};

export const contactFormSchema = z.object({
  name: z.string().min(1, "氏名を入力してください").max(50),
  email: z.string().email("正しいメールアドレスを入力してください"),
  inquiryType: z.enum(inquiryTypeOptions),
  message: z.string().min(10, "内容を入力してください").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

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
