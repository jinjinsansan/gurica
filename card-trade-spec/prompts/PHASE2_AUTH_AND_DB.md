# Phase 1: データベース・認証セットアップ

## Claude Codeへの指示

Supabaseのデータベースと認証機能をセットアップしてください。

### やること

1. **Supabaseプロジェクトの初期化**
   ```
   npx supabase init
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

2. **データベーステーブルの作成**
   `database/schema.sql` の内容をSupabaseのSQL Editorで実行してください。
   全テーブル・トリガー・インデックスを作成します。

3. **RLSポリシーの設定**
   `database/rls-policies.sql` の内容を実行してください。
   各テーブルのアクセス制御を設定します。

4. **Supabase Storageバケットの作成**
   Supabaseダッシュボードで以下のバケットを作成:

   **products バケット**
   - Public: ON（商品画像は誰でも閲覧可能）
   - Allowed MIME types: image/jpeg, image/png, image/webp
   - Max file size: 5MB

   **assessments バケット**
   - Public: OFF（査定画像は管理者のみ）
   - Allowed MIME types: image/jpeg, image/png, image/webp
   - Max file size: 10MB

5. **初期データの投入**
   `database/seed.sql` を実行してサンプルデータを投入。

6. **認証ミドルウェアの作成**

   `src/middleware.ts`:
   ```typescript
   import { createServerClient } from '@supabase/ssr'
   import { NextResponse, type NextRequest } from 'next/server'

   export async function middleware(request: NextRequest) {
     let supabaseResponse = NextResponse.next({ request })

     const supabase = createServerClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
       {
         cookies: {
           getAll() { return request.cookies.getAll() },
           setAll(cookiesToSet) {
             cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
             supabaseResponse = NextResponse.next({ request })
             cookiesToSet.forEach(({ name, value, options }) =>
               supabaseResponse.cookies.set(name, value, options)
             )
           },
         },
       }
     )

     const { data: { user } } = await supabase.auth.getUser()

     // /admin ルートの保護
     if (request.nextUrl.pathname.startsWith('/admin')) {
       if (!user) {
         return NextResponse.redirect(new URL('/login', request.url))
       }
       // adminロールチェック
       const { data: profile } = await supabase
         .from('profiles')
         .select('role')
         .eq('id', user.id)
         .single()
       
       if (profile?.role !== 'admin') {
         return NextResponse.redirect(new URL('/', request.url))
       }
     }

     return supabaseResponse
   }

   export const config = {
     matcher: ['/admin/:path*', '/login'],
   }
   ```

7. **ログインページの作成** (`src/app/login/page.tsx`)
   - メール + パスワードのログインフォーム
   - Supabase Auth `signInWithPassword` を使用
   - ログイン成功時 → `/admin` にリダイレクト
   - エラーハンドリング（無効な認証情報等）
   - デザイン: `design/design-system.md` に準拠

8. **認証フックの作成** (`src/lib/hooks/useAuth.ts`)
   ```typescript
   // ログイン状態の管理
   // ログアウト関数
   // ユーザー情報の取得
   ```

9. **管理者ユーザーの作成手順をREADMEに記載**
   - Supabaseダッシュボードからユーザー作成
   - profilesテーブルのroleをadminに変更
   - またはseed SQLで管理者を作成

### 参照ドキュメント
- `database/schema.sql` - テーブル定義
- `database/rls-policies.sql` - RLSポリシー
- `database/seed.sql` - 初期データ
- `docs/04-admin-specs.md` - 認証仕様

### 完了条件
- 全テーブルがSupabaseに作成されている
- RLSポリシーが有効になっている
- Storageバケットが作成されている
- サンプルデータが投入されている
- ログインページが動作する
- /admin にアクセスすると認証チェックが働く
- 管理者でログインすると /admin にアクセスできる
