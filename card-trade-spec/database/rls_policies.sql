-- ============================================
-- Row Level Security (RLS) ポリシー
-- ============================================

-- 全テーブルでRLSを有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyback_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ヘルパー関数: 管理者チェック
-- ============================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- profiles
-- ============================================
-- 自分のプロフィールのみ閲覧可能
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 自分のプロフィールのみ更新可能
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 管理者は全プロフィール閲覧可能
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- ============================================
-- categories
-- ============================================
-- 誰でも閲覧可能（公開データ）
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- 管理者のみ変更可能
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (is_admin());

-- ============================================
-- products
-- ============================================
-- 公開済み商品は誰でも閲覧可能
CREATE POLICY "Published products are viewable by everyone"
  ON products FOR SELECT
  USING (is_published = TRUE AND deleted_at IS NULL);

-- 管理者は全商品閲覧・操作可能
CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  USING (is_admin());

-- ============================================
-- buyback_prices
-- ============================================
-- 公開済み価格は誰でも閲覧可能
CREATE POLICY "Published prices are viewable by everyone"
  ON buyback_prices FOR SELECT
  USING (is_published = TRUE);

-- 管理者は全価格操作可能
CREATE POLICY "Admins can manage all prices"
  ON buyback_prices FOR ALL
  USING (is_admin());

-- ============================================
-- assessments
-- ============================================
-- 匿名ユーザーでも査定依頼を作成可能（フォーム送信）
CREATE POLICY "Anyone can create assessments"
  ON assessments FOR INSERT
  WITH CHECK (true);

-- 管理者は全査定閲覧・操作可能
CREATE POLICY "Admins can manage all assessments"
  ON assessments FOR ALL
  USING (is_admin());

-- ============================================
-- orders
-- ============================================
-- 匿名ユーザーでも注文作成可能
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- 管理者は全注文閲覧・操作可能
CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  USING (is_admin());

-- ============================================
-- news
-- ============================================
-- 公開済みニュースは誰でも閲覧可能
CREATE POLICY "Published news are viewable by everyone"
  ON news FOR SELECT
  USING (is_published = TRUE AND published_at <= NOW());

-- 管理者は全ニュース操作可能
CREATE POLICY "Admins can manage all news"
  ON news FOR ALL
  USING (is_admin());

-- ============================================
-- contact_messages
-- ============================================
-- 誰でもお問い合わせ作成可能
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- 管理者のみ閲覧・操作可能
CREATE POLICY "Admins can manage contact messages"
  ON contact_messages FOR ALL
  USING (is_admin());

-- ============================================
-- Supabase Storage バケット設定
-- ============================================
-- 以下はSupabaseダッシュボードまたはAPI経由で設定:
--
-- バケット1: products
--   - 公開バケット（商品画像は誰でも閲覧可能）
--   - アップロードは管理者のみ
--   - 許可ファイルタイプ: image/jpeg, image/png, image/webp
--   - 最大サイズ: 5MB
--
-- バケット2: assessments
--   - 非公開バケット
--   - アップロードは誰でも可能（査定フォーム用）
--   - 閲覧は管理者のみ
--   - 許可ファイルタイプ: image/jpeg, image/png, image/webp
--   - 最大サイズ: 10MB
