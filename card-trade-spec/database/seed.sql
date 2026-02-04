-- ============================================
-- 初期データ・サンプルデータ
-- ============================================

-- ============================================
-- カテゴリ（必須初期データ）
-- ============================================
INSERT INTO categories (name, slug, display_order, icon, color) VALUES
  ('ポケモンカード', 'pokemon', 1, '⚡', '#FFD700'),
  ('遊戯王', 'yugioh', 2, '🎭', '#7C3AED'),
  ('ワンピースカード', 'onepiece', 3, '🏴‍☠️', '#DC2626'),
  ('デジタルカード', 'digital', 4, '💎', '#059669'),
  ('その他TCG', 'other-tcg', 5, '🃏', '#4A6CF7');

-- ============================================
-- サンプル商品（開発・テスト用）
-- ============================================
INSERT INTO products (category_id, name, slug, series, rarity, condition, price, original_price, description, is_digital, status, badge) VALUES
  -- ポケモンカード
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'リザードンex SAR', 'charizard-ex-sar', '黒炎の支配者', 'SR', 'near_mint', 28000, NULL, 'リザードンex スペシャルアートレア。状態良好。', false, 'active', 'rare'),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'ピカチュウ AR', 'pikachu-ar-sv', 'スカーレット&バイオレット', 'R', 'mint', 3500, NULL, 'ピカチュウ アートレア。未使用美品。', false, 'active', 'new'),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'ミュウツー UR', 'mewtwo-ur', '151', 'UR', 'mint', 45000, 50000, 'ミュウツー ウルトラレア。コレクション放出品。', false, 'active', 'sale'),

  -- 遊戯王
  ((SELECT id FROM categories WHERE slug = 'yugioh'), '灰流うらら 20thシークレット', 'ash-blossom-20th', 'デュエリストパック', 'SR', 'near_mint', 15000, NULL, '灰流うらら 20thシークレットレア。', false, 'active', NULL),
  ((SELECT id FROM categories WHERE slug = 'yugioh'), 'ブラック・マジシャン ホロ', 'dark-magician-holo', '初期', 'UR', 'good', 120000, NULL, 'ブラック・マジシャン 初期ホログラフィック。希少。', false, 'active', 'rare'),

  -- ワンピースカード
  ((SELECT id FROM categories WHERE slug = 'onepiece'), 'ルフィ リーダーパラレル', 'luffy-leader-parallel', 'ロマンスドーン', 'SR', 'mint', 8000, NULL, 'ルフィ リーダーカード パラレルレア。', false, 'active', 'new'),
  ((SELECT id FROM categories WHERE slug = 'onepiece'), 'シャンクス SEC', 'shanks-sec', '頂上決戦', 'UR', 'near_mint', 25000, NULL, 'シャンクス シークレットレア。人気カード。', false, 'active', NULL),

  -- デジタルカード
  ((SELECT id FROM categories WHERE slug = 'digital'), 'レジェンドドラゴン #001', 'legend-dragon-001', 'ドラゴンガチャ', 'UR', 'mint', 12000, NULL, 'ガチャサイト限定レジェンドレアカード。デジタル資産。', true, 'active', 'digital'),
  ((SELECT id FROM categories WHERE slug = 'digital'), 'クリスタルフェニックス #042', 'crystal-phoenix-042', 'ファンタジーコレクション', 'SR', 'mint', 5000, NULL, 'デジタルコレクションカード。限定発行500枚。', true, 'active', 'digital');

-- ============================================
-- サンプル買取価格
-- ============================================
INSERT INTO buy_prices (category_id, card_name, series, rarity, condition_mint, condition_near_mint, condition_good, condition_damaged) VALUES
  -- ポケモンカード
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'リザードンex SAR', '黒炎の支配者', 'SR', 25000, 22000, 18000, 10000),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'ピカチュウex SAR', 'スカーレット&バイオレット', 'SR', 12000, 10000, 8000, 4000),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'ミュウツーex UR', '151', 'UR', 40000, 35000, 28000, 15000),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'リーリエの全力 SR', 'ドリームリーグ', 'SR', 80000, 70000, 55000, 30000),
  ((SELECT id FROM categories WHERE slug = 'pokemon'), 'ナンジャモ SAR', 'クレイバースト', 'SR', 18000, 15000, 12000, 6000),

  -- 遊戯王
  ((SELECT id FROM categories WHERE slug = 'yugioh'), '灰流うらら 20thシークレット', 'デュエリストパック', 'SR', 13000, 11000, 8000, 4000),
  ((SELECT id FROM categories WHERE slug = 'yugioh'), 'ブラック・マジシャン ホロ', '初期', 'UR', 100000, 85000, 60000, 30000),
  ((SELECT id FROM categories WHERE slug = 'yugioh'), '増殖するG 20thシークレット', 'レアリティコレクション', 'SR', 8000, 6500, 5000, 2500),

  -- ワンピースカード
  ((SELECT id FROM categories WHERE slug = 'onepiece'), 'ルフィ リーダーパラレル', 'ロマンスドーン', 'SR', 7000, 6000, 4500, 2000),
  ((SELECT id FROM categories WHERE slug = 'onepiece'), 'シャンクス SEC', '頂上決戦', 'UR', 22000, 19000, 15000, 8000),

  -- デジタルカード
  ((SELECT id FROM categories WHERE slug = 'digital'), 'レジェンドドラゴン #001', 'ドラゴンガチャ', 'UR', 10000, NULL, NULL, NULL),
  ((SELECT id FROM categories WHERE slug = 'digital'), 'クリスタルフェニックス #042', 'ファンタジーコレクション', 'SR', 4000, NULL, NULL, NULL);

-- ============================================
-- サンプルお知らせ
-- ============================================
INSERT INTO announcements (title, content, is_published, published_at) VALUES
  ('サイトオープンのお知らせ', '{{SITE_NAME}}の公式サイトがオープンしました。トレーディングカードの買取・販売を開始します。皆様のご利用をお待ちしております。', true, now()),
  ('買取強化キャンペーン実施中！', 'ポケモンカード・遊戯王カードの買取価格を期間限定で10%アップ中！この機会にぜひご利用ください。', true, now()),
  ('デジタルカード買取開始', 'ガチャサイトで入手したデジタルカードの買取を開始しました。NFT・デジタルコレクションカードも対象です。', true, now());
