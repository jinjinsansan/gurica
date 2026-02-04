import { renderBaseTemplate } from "./baseTemplate";

interface AssessmentTemplateProps {
  requestNumber: string;
  name: string;
  email: string;
  phone?: string | null;
  categoryName: string;
  condition: string;
  cardDetail: string;
  notes?: string | null;
  imageCount: number;
  etaText?: string;
}

export function renderAssessmentAdminTemplate(props: AssessmentTemplateProps) {
  const body = `
    <p>新しいオンライン査定リクエストを受信しました。</p>
    <p><strong>受付番号:</strong> ${props.requestNumber}</p>
    <p><strong>氏名:</strong> ${props.name}<br/>
    <strong>メール:</strong> ${props.email}<br/>
    <strong>電話:</strong> ${props.phone ?? "記載なし"}</p>
    <p><strong>カテゴリ:</strong> ${props.categoryName}<br/>
    <strong>状態:</strong> ${props.condition}<br/>
    <strong>画像枚数:</strong> ${props.imageCount}枚</p>
    <p><strong>カード詳細:</strong><br/>${props.cardDetail.replace(/\n/g, "<br/>")}</p>
    ${props.notes ? `<p><strong>備考:</strong><br/>${props.notes.replace(/\n/g, "<br/>")}</p>` : ""}
    <p><a href="{{SITE_URL}}/admin/assessments" style="color:#4a6cf7;">管理画面で確認する</a></p>
  `;

  return renderBaseTemplate({ title: "新着査定リクエスト", body });
}

export function renderAssessmentUserTemplate(props: AssessmentTemplateProps) {
  const eta = props.etaText ?? "2営業日以内";
  const body = `
    <p>${props.name} 様</p>
    <p>このたびはオンライン査定をご依頼いただきありがとうございます。以下の内容で受付いたしました。</p>
    <p><strong>受付番号:</strong> ${props.requestNumber}<br/>
    <strong>カテゴリ:</strong> ${props.categoryName}<br/>
    <strong>状態:</strong> ${props.condition}</p>
    <p><strong>カード詳細:</strong><br/>${props.cardDetail.replace(/\n/g, "<br/>")}</p>
    <p>担当スタッフが内容を確認し、${eta}を目安にメールでご連絡いたします。</p>
    <p>ご不明点がございましたら、本メールにご返信ください。</p>
  `;

  return renderBaseTemplate({ title: "査定リクエスト受付のご案内", body });
}
