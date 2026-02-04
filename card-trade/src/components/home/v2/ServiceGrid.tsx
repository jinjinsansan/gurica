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
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: ShoppingCart,
    label: "ショップ",
    description: "鑑定済みカードをオンラインで販売。ポケカからデジタルまで網羅。",
    href: "/shop",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    label: "買取価格",
    description: "リアルタイムの市場データを基に相場を公開。上昇率もチェック可能。",
    href: "/prices",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: ArrowRightLeft,
    label: "買取の流れ",
    description: "宅配・店頭・法人出張の3パターン。梱包キットも無料で提供。",
    href: "/flow",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Building2,
    label: "会社概要",
    description: "グリカ株式会社の企業情報、沿革、メンバー紹介はこちら。",
    href: "/company",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    icon: Newspaper,
    label: "お知らせ",
    description: "最新のキャンペーン・メディア掲載・営業時間の更新情報を配信。",
    href: "/news",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: User,
    label: "マイページ",
    description: "査定履歴や入金状況、本人確認情報をまとめて管理できます。",
    href: "/mypage/assessments",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: HelpCircle,
    label: "よくある質問",
    description: "梱包方法や入金スケジュールなど、よくある質問を掲載。",
    href: "/contact",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
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
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-base sm:text-lg self-start lg:self-auto"
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
                className="group rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 text-left hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <div
                    className={`${service.bg} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${service.color}`} />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.3em] text-gray-500">SERVICE</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{service.label}</h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-600">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
