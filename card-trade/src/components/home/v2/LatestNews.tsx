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
    <section className="section-container bg-white">
      <div className="text-center mb-12">
        <p className="section-title">NEWS</p>
        <h2 className="section-heading">お知らせ</h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p>現在お知らせはありません</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <Link
              key={announcement.id}
              href={`/news/${announcement.id}`}
              className="card-v2 p-6 flex items-center gap-4 hover:border-blue-300"
            >
              <div className="flex items-center gap-3 text-slate-500 min-w-fit">
                <Calendar className="w-5 h-5" />
                <time className="text-sm font-medium">{formatDate(announcement.publishedAt)}</time>
              </div>
              <h3 className="flex-1 text-slate-900 font-medium line-clamp-1">
                {announcement.title}
              </h3>
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
            </Link>
          ))
        )}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
        >
          お知らせ一覧を見る
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
