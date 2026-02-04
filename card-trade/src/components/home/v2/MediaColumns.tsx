import Link from "next/link";

type Announcement = {
  id: string;
  title: string;
  publishedAt: string | null;
};

type Props = {
  announcements: Announcement[];
};

const COLUMN_POSTS = [
  {
    id: "column-1",
    title: "高額カードを安全に発送するためのチェックリスト",
    category: "COLUMN",
    readTime: "5 min",
  },
  {
    id: "column-2",
    title: "NFTカードの真贋判定と評価のポイント",
    category: "INSIGHT",
    readTime: "7 min",
  },
  {
    id: "column-3",
    title: "法人での大量買取をスムーズに行うには",
    category: "BUSINESS",
    readTime: "6 min",
  },
];

const MEDIA_BADGES = ["Forbes JAPAN", "日経クロストレンド", "HUFFPOST", "NewsPicks"];

const formatDate = (input: string | null) => {
  if (!input) return "近日公開";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(input));
};

export function MediaColumns({ announcements }: Props) {
  const mediaItems = announcements.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-10 sm:mb-14">
          <p className="section-title">MEDIA / COLUMN</p>
          <h2 className="section-heading">市場レポートとメディア掲載情報</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl">
            買い取りKKの取り組みは多数のメディアで紹介されています。相場解説や発送ノウハウなどのコラムも毎週更新中。
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] sm:rounded-[32px] border border-gray-200 bg-gray-50 p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">MEDIA</p>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">最新の掲載実績</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {MEDIA_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[0.6rem] sm:text-xs font-semibold tracking-[0.2em] text-gray-500"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              {mediaItems.length === 0 && <p className="text-sm text-slate-500">現在掲載情報を準備中です</p>}
              {mediaItems.map((announcement) => (
                <Link
                  key={announcement.id}
                  href={`/news/${announcement.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl bg-white px-5 py-4 border border-gray-100 hover:border-rose-200 transition"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">MEDIA</p>
                    <p className="text-base sm:text-lg font-semibold text-slate-900">{announcement.title}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500">{formatDate(announcement.publishedAt)}</span>
                </Link>
              ))}
            </div>
            <Link href="/news" className="text-rose-600 font-semibold">
              メディア掲載一覧を見る →
            </Link>
          </div>

          <div className="rounded-[28px] sm:rounded-[32px] border border-gray-200 bg-white p-6 sm:p-8 flex flex-col gap-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">COLUMN</p>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">査定ノウハウ & 市況解説</h3>
            </div>
            <div className="space-y-4">
              {COLUMN_POSTS.map((post) => (
                <div key={post.id} className="border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-rose-200 transition">
                  <div className="flex flex-wrap items-center gap-2 text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-gray-500">
                    <span>{post.category}</span>
                    <span className="h-0.5 w-6 bg-gray-300" />
                    <span>{post.readTime}</span>
                  </div>
                  <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-slate-900">{post.title}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">メディア掲載やコラムの寄稿依頼はこちらからご相談ください。</p>
            <Link href="/contact" className="self-start rounded-full border border-gray-200 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-rose-600">
              取材・寄稿のご相談 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
