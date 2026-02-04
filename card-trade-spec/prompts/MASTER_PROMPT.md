# MASTER PROMPT — カードトレード公式サイト

あなたは古物商許可に基づくトレーディングカード＆デジタルカード買取・販売の公式サイトを開発するエキスパート開発者です。

## プロジェクト概要

トレカ（ポケモン、遊戯王、ワンピース等）とガチャサイト系デジタルカード（NFT等）の買取・販売を行う法人の公式サイトを、Next.js + Supabase + Vercel で構築します。

## 技術スタック（厳守）

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** でスタイリング
- **Supabase** (Auth, Database, Storage)
- **Vercel** にデプロイ
- **Resend** でメール送信
- **zustand** でカート状態管理
- **zod** でバリデーション
- **lucide-react** でアイコン
- 言語: **日本語のみ**

## 重要な設計原則

1. **App Router** を使用。`src/app/` 配下にルーティング
2. Server Components をデフォルトとし、インタラクティブな部分のみ `'use client'`
3. Supabase SSR パッケージ (`@supabase/ssr`) でサーバーサイドセッション管理
4. RLS（Row Level Security）で全テーブルのアクセス制御
5. 全ページのメタデータ（SEO）を設定
6. レスポンシブ対応（モバイルファースト）
7. 価格は全て**税込表示**

## 参照すべきドキュメント

| ファイル | 内容 |
|---------|------|
| `docs/01_PROJECT_OVERVIEW.md` | プロジェクト全体計画 |
| `docs/02_SITEMAP_AND_PAGES.md` | サイトマップ・全ページ仕様 |
| `docs/03_FEATURE_SPEC.md` | 機能詳細仕様 |
| `docs/04_TECH_ARCHITECTURE.md` | ディレクトリ構成・技術構成 |
| `docs/05_LEGAL_REQUIREMENTS.md` | 古物商・特商法の法的要件 |
| `database/schema.sql` | DBスキーマ |
| `database/rls_policies.sql` | RLSポリシー |
| `database/seed.sql` | 初期データ |
| `design/DESIGN_SYSTEM.md` | デザインシステム定義 |

## プレースホルダー（後から一括置換）

- `{{SITE_NAME}}` → サイト名
- `{{COMPANY_NAME}}` → 法人名
- `{{DOMAIN}}` → ドメイン
- `{{REPRESENTATIVE}}` → 代表者名
- `{{ADDRESS}}` → 所在地
- `{{PHONE}}` → 電話番号
- `{{EMAIL}}` → メールアドレス
- `{{KOBUTSU_NUMBER}}` → 古物商許可番号
- `{{PUBLIC_SAFETY_COMMISSION}}` → 許可公安委員会名

## デザイン方針

- **テーマ**: ゲーム・ホビー感のあるデザイン × ライト系ベース
- **フォント**: Dela Gothic One（見出し）、Orbitron（数字）、Zen Kaku Gothic New（本文）
- **カラー**: ブルー＆パープルのグラデーションをメインアクセントに、白ベース
- **アニメーション**: カードの浮遊、ホバーの浮き上がり、fadeInUp
- 詳細は `design/DESIGN_SYSTEM.md` を参照

## 開発の進め方

以下のPhaseプロンプトを順番に実行してください。各フェーズの完了条件を全て満たしてから次のPhaseへ進んでください。

| Phase | ファイル | 内容 | 目安 |
|-------|---------|------|------|
| 1 | `PHASE1_SETUP.md` | プロジェクト初期セットアップ | 1日 |
| 2 | `PHASE2_AUTH_AND_DB.md` | 認証・DB構築 | 1-2日 |
| 3 | `PHASE3_PUBLIC_PAGES.md` | 公開ページ実装 | 2-3日 |
| 4 | `PHASE4_ASSESSMENT_CONTACT.md` | 査定・問い合わせ | 1-2日 |
| 5 | `PHASE5_EC_SHOP.md` | ECショップ | 2-3日 |
| 6 | `PHASE6_ADMIN.md` | 管理画面 | 2-3日 |
| 7 | `PHASE7_DEPLOY.md` | デプロイ・最終調整 | 1日 |

## 品質基準

- TypeScript strict モード、any 禁止
- コンポーネントは適切に分割（1ファイル200行以内目安）
- エラーハンドリングを必ず実装（try-catch、エラー表示）
- ローディング状態を必ず実装
- アクセシビリティ対応（aria属性、キーボード操作）
- コメントは日本語で記載
