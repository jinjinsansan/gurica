# Phase 0: プロジェクト初期化

## Claude Codeへの指示

以下の仕様に従って、Next.jsプロジェクトを初期化してください。

### やること

1. **Next.js プロジェクト作成**
   ```
   npx create-next-app@latest card-trade --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

2. **必要パッケージのインストール**
   ```
   npm install @supabase/supabase-js @supabase/ssr
   npm install react-hook-form @hookform/resolvers zod
   npm install zustand
   npm install lucide-react
   npm install resend
   npm install react-markdown
   npm install -D supabase
   ```

3. **環境変数ファイルの作成**（`.env.local`）
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=your_resend_api_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **ディレクトリ構造の作成**
   以下のディレクトリを作成:
   ```
   src/
   ├── app/
   │   ├── (public)/          # 公開ページ用レイアウトグループ
   │   ├── admin/             # 管理画面
   │   └── api/               # APIルート
   ├── components/
   │   ├── ui/                # 共通UI
   │   ├── layout/            # レイアウト
   │   ├── home/              # トップページ用
   │   ├── prices/            # 買取価格用
   │   ├── shop/              # ショップ用
   │   ├── assessment/        # 査定用
   │   └── admin/             # 管理画面用
   ├── lib/
   │   ├── supabase/          # Supabaseクライアント
   │   ├── types/             # 型定義
   │   ├── utils/             # ユーティリティ
   │   └── hooks/             # カスタムフック
   └── styles/
   ```

5. **Supabaseクライアントの設定**

   `src/lib/supabase/client.ts`（ブラウザ用）:
   ```typescript
   import { createBrowserClient } from '@supabase/ssr'

   export function createClient() {
     return createBrowserClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     )
   }
   ```

   `src/lib/supabase/server.ts`（サーバー用）:
   ```typescript
   import { createServerClient } from '@supabase/ssr'
   import { cookies } from 'next/headers'

   export async function createClient() {
     const cookieStore = await cookies()
     return createServerClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
       {
         cookies: {
           getAll() { return cookieStore.getAll() },
           setAll(cookiesToSet) {
             try {
               cookiesToSet.forEach(({ name, value, options }) =>
                 cookieStore.set(name, value, options)
               )
             } catch {}
           },
         },
       }
     )
   }
   ```

6. **Tailwind CSS カスタム設定**
   `design/design-system.md` に記載のカラーパレット・フォントをTailwindの設定に反映してください。

   Google Fontsの読み込み（`src/app/layout.tsx`）:
   ```typescript
   import { Dela_Gothic_One, Zen_Kaku_Gothic_New } from 'next/font/google'

   const delaGothic = Dela_Gothic_One({ weight: '400', subsets: ['latin'], variable: '--font-display' })
   const zenKaku = Zen_Kaku_Gothic_New({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-body' })
   ```

   ※ Orbitronも同様にGoogle Fonts経由で読み込み

7. **globals.css の初期設定**
   `design/design-system.md` に記載のCSS変数をすべて定義

8. **型定義の作成** (`src/lib/types/database.ts`)
   `database/schema.sql` に基づいてTypeScript型を定義:
   ```typescript
   export type Category = 'pokemon' | 'yugioh' | 'onepiece' | 'other_tcg' | 'digital'
   export type ProductCondition = 'mint' | 'near_mint' | 'light_play' | 'played'
   export type AssessmentStatus = 'new' | 'in_review' | 'quoted' | 'accepted' | 'completed' | 'cancelled'
   export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
   export type UserRole = 'customer' | 'admin'

   export interface Product { ... }
   export interface BuybackPrice { ... }
   export interface Assessment { ... }
   export interface Order { ... }
   export interface News { ... }
   // schemaに基づいて全テーブルの型を定義
   ```

9. **ユーティリティ関数の作成**
   - `src/lib/utils/formatPrice.ts`: 価格フォーマット（¥12,000）
   - `src/lib/utils/categoryMap.ts`: カテゴリID→表示名のマッピング
   - `src/lib/utils/validation.ts`: zodスキーマ（査定フォーム、お問い合わせ等）

### 参照ドキュメント
- `docs/01-requirements.md` - 全体要件
- `docs/02-sitemap.md` - ディレクトリ構造
- `design/design-system.md` - デザインシステム
- `database/schema.sql` - DB型の元ネタ

### 完了条件
- `npm run dev` でエラーなく起動する
- 全ディレクトリが作成されている
- Supabaseクライアントが設定されている
- Tailwindのカスタムテーマが反映されている
- TypeScript型が定義されている
