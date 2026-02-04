import Link from "next/link";
import {
  ClipboardCheck,
  ShoppingCart,
  TrendingUp,
  ArrowRightLeft,
  Building2,
  Newspaper,
  User,
  HelpCircle,
} from "lucide-react";

const SERVICES = [
  {
    icon: ClipboardCheck,
    label: "オンライン査定",
    description: "スマホで撮影して送るだけ。AI補正で見やすく査定チームへ共有。",
    href: "/assessment",
    gradient: "from-rose-50 via-white to-amber-50",
    border: "border-rose-100",
    accent: "text-rose-600",
    iconBg: "bg-white/70",
  },
  {
    icon: ShoppingCart,
    label: "ショップ",
    description: "鑑定済みカードをオンラインで販売。ポケカからデジタルまで網羅。",
    href: "/shop",
    gradient: "from-fuchsia-50 via-white to-rose-50",
    border: "border-fuchsia-100",
    accent: "text-fuchsia-600",
    iconBg: "bg-white/70",
  },
  {
    icon: TrendingUp,
    label: "買取価格",
    description: "リアルタイムの市場データを基に相場を公開。上昇率もチェック可能。",
    href: "/prices",
    gradient: "from-amber-50 via-white to-rose-50",
    border: "border-amber-100",
    accent: "text-amber-600",
    iconBg: "bg-white/70",
  },
  {
    icon: ArrowRightLeft,
    label: "買取の流れ",
    description: "宅配・店頭・法人出張の3パターン。梱包キットも無料で提供。",
    href: "/flow",
    gradient: "from-purple-50 via-white to-pink-50",
    border: "border-purple-100",
    accent: "text-purple-500",
    iconBg: "bg-white/70",
  },
  {
    icon: Building2,
    label: "会社概要",
    description: "グリカ株式会社の企業情報、沿革、メンバー紹介はこちら。",
    href: "/company",
    gradient: "from-rose-50 via-white to-amber-100",
    border: "border-rose-100",
    accent: "text-rose-500",
    iconBg: "bg-white/70",
  },
  {
    icon: Newspaper,
    label: "お知らせ",
    description: "最新のキャンペーン・メディア掲載・営業時間の更新情報を配信。",
    href: "/news",
    gradient: "from-red-50 via-white to-rose-50",
    border: "border-red-100",
    accent: "text-rose-600",
    iconBg: "bg-white/70",
  },
  {
    icon: User,
    label: "マイページ",
    description: "査定履歴や入金状況、本人確認情報をまとめて管理できます。",
    href: "/mypage/assessments",
    gradient: "from-amber-50 via-white to-pink-50",
    border: "border-amber-100",
    accent: "text-rose-500",
    iconBg: "bg-white/70",
  },
  {
    icon: HelpCircle,
    label: "よくある質問",
    description: "梱包方法や入金スケジュールなど、よくある質問を掲載。",
    href: "/contact",
    gradient: "from-pink-50 via-white to-rose-50",
    border: "border-pink-100",
    accent: "text-pink-500",
    iconBg: "bg-white/70",
  },
];

export function ServiceGrid() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 mb-12 sm:mb-16">
          <p className="section-title text-left">SERVICE MENU</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="section-heading">取引に必要な機能をワンストップで</h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
                査定・買取・販売・サポートまで、カードのライフサイクルを支える機能を提供します。
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-rose-600 font-semibold text-base sm:text-lg self-start lg:self-auto"
            >
              サービス資料を請求する
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className={`group relative overflow-hidden rounded-3xl border ${service.border} bg-gradient-to-br ${service.gradient} p-5 sm:p-6 text-left shadow-[0_15px_30px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_45px_rgba(15,23,42,0.12)]`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" aria-hidden />
                <div className="relative flex items-center gap-4 mb-4 sm:mb-6">
                  <div
                    className={`${service.iconBg} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center backdrop-blur`}
                  >
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${service.accent}`} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.3em] text-slate-500">SERVICE</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{service.label}</h3>
                  </div>
                </div>
                <p className="relative text-sm sm:text-base text-slate-700">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
