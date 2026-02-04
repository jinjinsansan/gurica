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
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="section-title">NEWS</p>
          <h2 className="section-heading">お知らせ</h2>
        </div>

        <div className="space-y-5">
          {announcements.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-xl">現在お知らせはありません</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <Link
                key={announcement.id}
                href={`/news/${announcement.id}`}
                className="bg-white rounded-2xl p-8 flex items-center gap-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 group"
              >
                <div className="flex items-center gap-4 text-gray-500 min-w-fit">
                  <Calendar className="w-6 h-6" />
                  <time className="text-base font-semibold">{formatDate(announcement.publishedAt)}</time>
                </div>
                <h3 className="flex-1 text-slate-900 font-bold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {announcement.title}
                </h3>
                <ArrowRight className="w-6 h-6 text-blue-600 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-3 text-blue-600 font-bold text-lg hover:gap-5 transition-all"
          >
            お知らせ一覧を見る
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
