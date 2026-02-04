import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturesBar } from "@/components/home/FeaturesBar";
import { FlowPreview } from "@/components/home/FlowPreview";
import { NewArrivals } from "@/components/home/NewArrivals";
import { AnnouncementsSection } from "@/components/home/AnnouncementsSection";
import { createClient } from "@/lib/supabase/server";

type DbProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  rarity: string | null;
  badge: string | null;
  series: string | null;
  category_id: string;
};

type DbAnnouncement = {
  id: string;
  title: string;
  published_at: string | null;
};

type DbCategory = {
  id: string;
  name: string;
};

export const revalidate = 600;

export default async function HomePage() {
  const supabase = await createClient();
  const [{ data: productData }, { data: announcementData }, { data: categoriesData }] =
    await Promise.all([
      supabase
        .from("products")
        .select("id,name,slug,price,rarity,badge,series,category_id")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("announcements")
        .select("id,title,published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3),
      supabase.from("categories").select("id,name"),
    ]);

  const categoryEntries: [string, string][] =
    (categoriesData as DbCategory[] | null)?.map((c) => [c.id, c.name]) ?? [];
  const categoryMap = new Map<string, string>(categoryEntries);

  const products = (productData as DbProduct[] | null)?.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    rarity: product.rarity,
    badge: product.badge,
    series: product.series,
    categoryLabel: categoryMap.get(product.category_id) ?? "カード",
  })) ?? [];

  const announcements = (announcementData as DbAnnouncement[] | null)?.map((announcement) => ({
    id: announcement.id,
    title: announcement.title,
    publishedAt: announcement.published_at,
  })) ?? [];

  return (
    <>
      <HeroSection />
      <CategoryCards />
      <FeaturesBar />
      <FlowPreview />
      <NewArrivals products={products} />
      <AnnouncementsSection announcements={announcements} />
    </>
  );
}
