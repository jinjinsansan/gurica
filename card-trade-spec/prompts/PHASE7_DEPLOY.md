# Phase 7: デプロイ・最終調整

## このフェーズのゴール
Vercelへのデプロイ、SEO最適化、パフォーマンスチューニング、最終テスト。

## 指示

### 1. Vercel デプロイ設定

**手順**:
1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトをインポート
3. 環境変数を設定:
   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   RESEND_API_KEY
   NEXT_PUBLIC_SITE_URL（本番URL）
   NEXT_PUBLIC_SITE_NAME
   ADMIN_EMAIL
   ```
4. ビルド＆デプロイ

**`next.config.ts` の確認**:
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}
```

### 2. SEO対策

**sitemap.xml** `src/app/sitemap.ts`:
```typescript
export default async function sitemap() {
  // 静的ページ
  const staticPages = [
    { url: '/', changeFrequency: 'weekly', priority: 1 },
    { url: '/prices', changeFrequency: 'daily', priority: 0.8 },
    { url: '/flow', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/assessment', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/shop', changeFrequency: 'daily', priority: 0.9 },
    { url: '/company', changeFrequency: 'monthly', priority: 0.5 },
    { url: '/legal', changeFrequency: 'monthly', priority: 0.3 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  ]

  // 動的ページ（商品詳細）
  const products = await getActiveProducts()
  const productPages = products.map(p => ({
    url: `/shop/${p.slug}`,
    lastModified: p.updated_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...productPages]
}
```

**robots.txt** `src/app/robots.ts`:
```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/mypage/', '/auth/', '/api/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

**JSON-LD構造化データ**（トップページ）:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{SITE_NAME}}",
  "url": "{{DOMAIN}}",
  "description": "トレーディングカード＆デジタルカードの買取・販売"
}
```

**各ページのメタデータ確認**:
- 全ページに title / description / og:image が設定されているか
- 動的ページ（商品詳細）は `generateMetadata` で生成されているか

### 3. パフォーマンス最適化

**画像最適化**:
- すべての画像を `next/image` で表示
- Supabase Storage の画像に適切な width/height
- placeholder='blur' を静的画像に適用
- lazy loading（デフォルト）

**ISR設定**:
- 買取価格一覧: `revalidate: 60`（60秒）
- 商品一覧: `revalidate: 60`
- 商品詳細: `revalidate: 300`（5分）
- 会社概要・特商法: `revalidate: 86400`（24時間）

**バンドルサイズ**:
- 不要な import を削除
- dynamic import で管理画面を分割
  ```typescript
  const AdminModule = dynamic(() => import('./AdminComponent'), { ssr: false })
  ```

### 4. エラーハンドリング

**エラーページ**:

`src/app/not-found.tsx`:
- 404 カスタムページ
- 「お探しのページが見つかりません」
- トップページへのリンク
- デザイン: 浮遊カードのアニメーション付き

`src/app/error.tsx`:
- 500 カスタムエラーページ
- 「エラーが発生しました」
- リトライボタン

`src/app/loading.tsx`:
- グローバルローディング
- スピナー or スケルトン

### 5. セキュリティチェック

- [ ] 環境変数にシークレットキーが含まれていないか（NEXT_PUBLIC_ 以外はサーバーのみ）
- [ ] RLSが全テーブルで有効か
- [ ] 管理画面のアクセス制御が機能するか
- [ ] フォーム入力のサニタイズ
- [ ] CSRF対策（Supabase Auth が自動対応）
- [ ] レート制限の検討（API Routes）

### 6. 最終テスト

**公開ページ**:
- [ ] トップページが正常に表示される
- [ ] 全ナビゲーションリンクが正しく動作する
- [ ] 買取価格の検索・フィルターが動作する
- [ ] 買取の流れページのFAQが動作する
- [ ] 会社概要・特商法ページが正しく表示される

**認証**:
- [ ] 会員登録 → メール確認 → ログインの全フロー
- [ ] パスワードリセットフロー
- [ ] ログアウト

**査定・問い合わせ**:
- [ ] 査定フォームの送信（画像付き）
- [ ] 問い合わせフォームの送信
- [ ] メール通知の受信確認

**ECショップ**:
- [ ] 商品一覧の表示・フィルター
- [ ] 商品詳細の表示
- [ ] カート追加・削除
- [ ] 注文フロー完了
- [ ] 注文後に商品がSOLD OUTになる

**管理画面**:
- [ ] ダッシュボードの統計表示
- [ ] 商品CRUD
- [ ] 買取価格の編集
- [ ] 査定ステータスの更新
- [ ] 注文ステータスの更新
- [ ] 問い合わせステータスの更新

**レスポンシブ**:
- [ ] スマートフォン（375px）での全ページ表示確認
- [ ] タブレット（768px）での全ページ表示確認
- [ ] ヘッダーのモバイルメニュー動作確認

**パフォーマンス**:
- [ ] Lighthouse スコア 90+ （Performance, Accessibility, Best Practices, SEO）
- [ ] Core Web Vitals 確認

### 7. 公開前チェックリスト

- [ ] プレースホルダー（{{SITE_NAME}} 等）の一覧を確認し、オーナーに共有
- [ ] 古物商許可番号の反映欄を確認
- [ ] 特定商取引法の記載内容を確認
- [ ] メール送信元アドレスの設定（Resend ドメイン認証）
- [ ] Google Search Console への登録準備
- [ ] Google Analytics の設置（任意）
- [ ] OGP画像の準備（トップページ用）
- [ ] ファビコンの設定

## 完了条件

- [ ] Vercel で本番デプロイが成功する
- [ ] カスタムドメインの設定（ドメイン取得後）
- [ ] 全ページがエラーなく表示される
- [ ] SEO関連（sitemap, robots, メタデータ）が正しく設定されている
- [ ] Lighthouse スコアが全項目90以上
- [ ] 上記の最終テスト項目がすべて合格
