interface BaseTemplateProps {
  title: string;
  body: string;
}

export function renderBaseTemplate({ title, body }: BaseTemplateProps) {
  return `<!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        body { font-family: 'Zen Kaku Gothic New', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f6fb; margin: 0; padding: 24px; color: #1a1d2e; }
        .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e2e8ff; }
        .brand { font-size: 18px; font-weight: 700; letter-spacing: 0.1em; color: #4a6cf7; text-transform: uppercase; }
        h1 { font-size: 20px; margin-bottom: 16px; }
        p { line-height: 1.6; margin: 0 0 12px; }
        .footer { margin-top: 32px; font-size: 12px; color: #7c849f; text-align: center; }
        .divider { margin: 24px 0; border-top: 1px solid #edf2ff; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="brand">{{SITE_NAME}}</div>
        <h1>${title}</h1>
        ${body}
        <div class="divider"></div>
        <div class="footer">
          {{COMPANY_NAME}}<br />
          {{ADDRESS}}
        </div>
      </div>
    </body>
  </html>`;
}
