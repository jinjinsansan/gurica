interface AnnouncementItem {
  id: string;
  title: string;
  publishedAt: string | null;
}

interface AnnouncementsSectionProps {
  announcements: AnnouncementItem[];
}

export function AnnouncementsSection({ announcements }: AnnouncementsSectionProps) {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_45px_rgba(26,29,46,0.08)]">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">News</p>
            <h2 className="text-3xl text-[var(--text-primary)]">お知らせ</h2>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {announcements.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">公開中のお知らせはありません。</p>
          ) : (
            announcements.map((announcement) => (
              <div key={announcement.id} className="flex flex-col gap-2 rounded-2xl bg-[var(--bg-accent)] p-4 text-sm text-[var(--text-secondary)] md:flex-row md:items-center md:justify-between">
                <span className="font-semibold text-[var(--text-primary)]">{announcement.title}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">
                  {announcement.publishedAt ? new Date(announcement.publishedAt).toLocaleDateString("ja-JP", { month: "long", day: "numeric" }) : "準備中"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
