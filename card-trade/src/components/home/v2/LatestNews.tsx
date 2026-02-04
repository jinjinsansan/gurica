import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  publishedAt: string | null;
};

type Props = {
  announcements: Announcement[];
};

export function LatestNews({ announcements }: Props) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <section className="py-20 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-10 sm:mb-14">
          <p className="section-title">NEWS</p>
          <h2 className="section-heading">最新のお知らせ</h2>
          <p className="text-base sm:text-lg text-slate-600">営業時間やキャンペーン、メディア掲載情報などを随時更新しています。</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12 sm:py-16 text-slate-500">
              <p>現在お知らせはありません</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <Link
                key={announcement.id}
                href={`/news/${announcement.id}`}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 rounded-2xl border border-gray-100 bg-gray-50 px-5 sm:px-6 py-5 hover:border-rose-200 hover:bg-white transition"
              >
                <div className="flex items-center gap-3 text-gray-500 min-w-fit">
                  <Calendar className="w-5 h-5" />
                  <time className="text-xs sm:text-sm font-semibold">{formatDate(announcement.publishedAt)}</time>
                </div>
                <h3 className="flex-1 text-slate-900 font-semibold text-base sm:text-lg line-clamp-2 sm:line-clamp-1">{announcement.title}</h3>
                <ArrowRight className="w-5 h-5 text-rose-600" />
              </Link>
            ))
          )}
        </div>

        <div className="mt-8 text-right">
          <Link href="/news" className="text-rose-600 font-semibold text-sm sm:text-base">
            すべてのお知らせを見る →
          </Link>
        </div>
      </div>
    </section>
  );
}
