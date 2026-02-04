import { renderBaseTemplate } from "./baseTemplate";

interface ContactTemplateProps {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export function renderContactAdminTemplate(props: ContactTemplateProps) {
  const body = `
    <p>新しいお問い合わせが届きました。</p>
    <p><strong>氏名:</strong> ${props.name}<br/>
    <strong>メール:</strong> ${props.email}<br/>
    <strong>種別:</strong> ${props.inquiryType}</p>
    <p><strong>内容:</strong><br/>${props.message.replace(/\n/g, "<br/>")}</p>
  `;

  return renderBaseTemplate({ title: "新着お問い合わせ", body });
}

export function renderContactUserTemplate(props: ContactTemplateProps) {
  const body = `
    <p>${props.name} 様</p>
    <p>お問い合わせありがとうございます。以下の内容で受け付けました。</p>
    <p><strong>種別:</strong> ${props.inquiryType}</p>
    <p><strong>内容:</strong><br/>${props.message.replace(/\n/g, "<br/>")}</p>
    <p>担当者より2営業日以内にご返信いたしますので、今しばらくお待ちください。</p>
  `;

  return renderBaseTemplate({ title: "お問い合わせ受付のご案内", body });
}
