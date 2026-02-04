# デザインシステム定義

## コンセプト

**「ゲーム・ホビー感 × ライト＆クリーン」**

トレカショップのワクワク感を持ちつつ、信頼感のある明るいデザイン。
カードゲームの世界観を随所に散りばめながら、情報は見やすく整理する。

---

## カラーパレット

### ベースカラー
```
--bg-primary: #FAFBFF      （メイン背景：わずかにブルーがかった白）
--bg-card: #FFFFFF          （カード背景：純白）
--bg-accent: #F0F4FF        （アクセント背景：薄いブルー）
--text-primary: #1A1D2E     （メインテキスト：ダークネイビー）
--text-secondary: #5A5F7A   （サブテキスト）
--text-light: #8A8FA8       （補助テキスト）
```

### アクセントカラー
```
--accent-blue: #4A6CF7      （メインアクセント）
--accent-purple: #8B5CF6    （セカンダリ）
--accent-orange: #F59E0B    （ウォーム系）
--accent-green: #10B981     （成功・デジタル）
--accent-red: #EF4444       （エラー・セール）
--accent-pink: #EC4899      （ポイント）
```

### カテゴリカラー
```
ポケモンカード: #FFE066 → #FFB347 （ゴールドグラデーション）
遊戯王:        #A78BFA → #7C3AED （パープルグラデーション）
ワンピース:    #F87171 → #DC2626 （レッドグラデーション）
デジタル:      #34D399 → #059669 （グリーングラデーション）
```

### グラデーション
```
--gradient-primary: linear-gradient(135deg, #4A6CF7, #8B5CF6)
--gradient-warm: linear-gradient(135deg, #F59E0B, #EF4444)
--gradient-cool: linear-gradient(135deg, #10B981, #4A6CF7)
```

---

## タイポグラフィ

### フォントファミリー

| 用途 | フォント | Google Fonts |
|------|---------|-------------|
| ディスプレイ（見出し） | Dela Gothic One | `family=Dela+Gothic+One` |
| テック系数字・ラベル | Orbitron | `family=Orbitron:wght@500;700;900` |
| 本文 | Zen Kaku Gothic New | `family=Zen+Kaku+Gothic+New:wght@400;500;700` |

### サイズスケール（Tailwind設定）

| レベル | サイズ | 用途 |
|-------|-------|------|
| hero | clamp(32px, 6vw, 64px) | ヒーローキャッチコピー |
| h1 | clamp(24px, 4vw, 40px) | セクションタイトル |
| h2 | 24px | サブセクション |
| h3 | 18px | カードタイトル |
| h4 | 16px | 小見出し |
| body | 15px | 本文 |
| small | 13px | 補助テキスト |
| xs | 11px | バッジ・ラベル |

---

## コンポーネントスタイル

### ボタン

**Primary**: グラデーション背景（blue→purple）、白文字、丸角50px、ホバーで浮き上がり
**Secondary**: 白背景、ブルー枠線、ホバーで枠線濃く
**Warm**: オレンジ→赤グラデーション、白文字

```
border-radius: 50px（ピル型）
padding: 14px 32px
font-weight: 700
transition: all 0.3s
hover: translateY(-2px) + box-shadow強化
```

### カード

```
background: white
border-radius: 20px
box-shadow: 0 2px 8px rgba(74, 108, 247, 0.08)
border: 1px solid rgba(74, 108, 247, 0.06)
hover: translateY(-6px) + shadow強化
transition: all 0.4s
```

### バッジ（レアリティ）

| レアリティ | 背景色 | 文字色 |
|-----------|--------|--------|
| UR | #FFF3CD | #856404 |
| SR | #E8DAEF | #6C3483 |
| R | #D5F5E3 | #1E8449 |
| C | #EBF5FB | #2471A3 |

### 商品バッジ

| タイプ | 背景色 |
|--------|--------|
| NEW | accent-blue |
| SALE | accent-red |
| RARE | accent-purple |
| DIGITAL | accent-green |

### フォーム入力

```
padding: 14px 18px
border: 2px solid rgba(74, 108, 247, 0.1)
border-radius: 8px
focus: border-color accent-blue + box-shadow glow
background: bg-primary
```

---

## アニメーション

### ページロード
- セクション: fadeInUp（下から上にフェードイン）
- ディレイ: 0.1s刻みでスタガー

### ホバー
- カード: translateY(-6px) + shadow強化
- ボタン: translateY(-2px)
- ナビリンク: 背景色変化

### 装飾
- ヒーロー: 浮遊カードアニメーション（ゆったり上下）
- 背景: 放射状グラデーションの微動

### トランジション
- 基本: `transition: all 0.3s ease`
- カード: `transition: all 0.4s ease`

---

## レスポンシブ

### ブレークポイント（Tailwind標準）

| 名前 | サイズ | グリッド列数 |
|------|--------|------------|
| sm | 640px | 1列 |
| md | 768px | 2列 |
| lg | 1024px | 3列 |
| xl | 1280px | 4列 |

### モバイル対応

- ナビゲーション: ハンバーガーメニュー（md以下）
- 商品グリッド: 2列（sm）→ 3列（md）→ 4列（lg）
- フォーム: 1カラム（md以下）
- テーブル: 横スクロール or カード表示切替

---

## アイコン

**Lucide React** を使用

主な使用アイコン:
- Search, ShoppingCart, User, Menu, X
- ArrowRight, ArrowUp, ExternalLink
- Camera, Upload, Image
- Star, Heart, Shield
- Mail, Phone, MapPin
- Package, Truck, CreditCard
- BarChart3, Users, FileText, Settings

---

## 装飾的要素

### ヒーローセクション
- 背景: 3色のグラデーション（青、暖色、緑）が混ざる柔らかい背景
- フローティングカード: 6枚のカード型要素が浮遊（各カテゴリカラー、opacity 0.15）
- 放射状グラデーション: 大きな円が緩やかに動く

### セクション背景
- 交互に `bg-primary` と `bg-accent` を使用
- 微細なドットパターンやクロスパターン（SVGバックグラウンド、opacity 0.05）

### フッター
- ダークネイビー背景（text-primary色）
- 白文字（opacity制御で階層感）
