# カードトレード公式サイト 開発仕様書パッケージ

## 📋 概要

古物商許可に基づくトレーディングカード＆デジタルカードの買取・販売事業の公式サイト。
ポケモンカード、遊戯王、ワンピース等のTCGに加え、ガチャサイトのデジタルカード（NFT等）を取り扱う。

## 🛠 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 14+ (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| DB / Auth / Storage | Supabase |
| ホスティング | Vercel |
| メール | Resend（お問い合わせ・査定通知） |
| サイト言語 | 日本語のみ |

## 📁 ファイル構成

```
card-trade-spec/
├── README.md                          ← このファイル
├── docs/
│   ├── 01_PROJECT_OVERVIEW.md         ← プロジェクト全体計画書
│   ├── 02_SITEMAP_AND_PAGES.md        ← サイトマップ・全ページ仕様
│   ├── 03_FEATURE_SPEC.md             ← 機能詳細仕様書
│   ├── 04_TECH_ARCHITECTURE.md        ← 技術アーキテクチャ
│   └── 05_LEGAL_REQUIREMENTS.md       ← 古物商・特商法の法的要件
├── database/
│   ├── schema.sql                     ← Supabase用 DDL
│   ├── seed.sql                       ← 初期データ・サンプル
│   └── rls_policies.sql               ← Row Level Security ポリシー
├── design/
│   └── DESIGN_SYSTEM.md               ← デザインシステム定義
└── prompts/
    ├── MASTER_PROMPT.md               ← Claude Code用 マスタープロンプト
    ├── PHASE1_SETUP.md                ← Phase 1: 初期セットアップ
    ├── PHASE2_AUTH_AND_DB.md          ← Phase 2: 認証・DB構築
    ├── PHASE3_PUBLIC_PAGES.md         ← Phase 3: 公開ページ実装
    ├── PHASE4_ASSESSMENT_CONTACT.md   ← Phase 4: 査定・問い合わせ
    ├── PHASE5_EC_SHOP.md              ← Phase 5: ECショップ
    ├── PHASE6_ADMIN.md                ← Phase 6: 管理画面
    └── PHASE7_DEPLOY.md               ← Phase 7: デプロイ・最終調整
```

## 🚀 使い方

1. `prompts/MASTER_PROMPT.md` をClaude Codeに最初に渡す
2. Phase 1〜7 のプロンプトを順番に実行
3. 各フェーズ完了後に動作確認してから次へ進む

## ⚠️ 仮置き項目（後から差し替え）

サイト内で以下のプレースホルダーを使用しています。決定次第、一括置換してください。

- `{{COMPANY_NAME}}` → 法人名
- `{{SITE_NAME}}` → サイト名・サービス名
- `{{DOMAIN}}` → ドメイン名
- `{{ADDRESS}}` → 所在地
- `{{PHONE}}` → 電話番号
- `{{EMAIL}}` → メールアドレス
- `{{REPRESENTATIVE}}` → 代表者名
- `{{KOBUTSU_NUMBER}}` → 古物商許可番号
- `{{PUBLIC_SAFETY_COMMISSION}}` → 許可公安委員会名
