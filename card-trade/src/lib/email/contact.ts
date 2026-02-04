import { resend, DEFAULT_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL } from "./resend";
import {
  renderContactAdminTemplate,
  renderContactUserTemplate,
} from "./templates/contact";

export interface ContactEmailPayload {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

async function ensureResend() {
  if (!resend) {
    throw new Error("Resend クライアントが初期化されていません");
  }
  return resend;
}

export async function sendContactAdminEmail(payload: ContactEmailPayload) {
  const client = await ensureResend();
  await client.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: `【お問い合わせ】${payload.name}様 (${payload.inquiryType})`,
    html: renderContactAdminTemplate(payload),
  });
}

export async function sendContactUserEmail(payload: ContactEmailPayload) {
  const client = await ensureResend();
  await client.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: payload.email,
    subject: "【{{SITE_NAME}}】お問い合わせを受け付けました",
    html: renderContactUserTemplate(payload),
  });
}
