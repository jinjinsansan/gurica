import { resend, DEFAULT_FROM_EMAIL, ADMIN_NOTIFICATION_EMAIL } from "./resend";
import {
  renderAssessmentAdminTemplate,
  renderAssessmentUserTemplate,
} from "./templates/assessment";

export interface AssessmentEmailPayload {
  requestNumber: string;
  name: string;
  email: string;
  phone?: string | null;
  categoryName: string;
  condition: string;
  cardDetail: string;
  notes?: string | null;
  imageCount: number;
}

async function ensureResend() {
  if (!resend) {
    throw new Error("Resend クライアントが初期化されていません");
  }
  return resend;
}

export async function sendAssessmentAdminEmail(payload: AssessmentEmailPayload) {
  const client = await ensureResend();
  await client.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: `【新着査定】${payload.categoryName} - ${payload.name}様`,
    html: renderAssessmentAdminTemplate(payload),
  });
}

export async function sendAssessmentUserEmail(payload: AssessmentEmailPayload) {
  const client = await ensureResend();
  await client.emails.send({
    from: DEFAULT_FROM_EMAIL,
    to: payload.email,
    subject: "【{{SITE_NAME}}】査定リクエストを受け付けました",
    html: renderAssessmentUserTemplate({ ...payload, etaText: "2営業日以内" }),
  });
}
