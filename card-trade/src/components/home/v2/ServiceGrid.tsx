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
    description: "24時間受付",
    href: "/assessment",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: ShoppingCart,
    label: "ショップ",
    description: "カード通販",
    href: "/shop",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: TrendingUp,
    label: "買取価格",
    description: "相場をチェック",
    href: "/prices",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: ArrowRightLeft,
    label: "買取の流れ",
    description: "4ステップ",
    href: "/flow",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Building2,
    label: "会社概要",
    description: "運営情報",
    href: "/company",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    icon: Newspaper,
    label: "お知らせ",
    description: "最新情報",
    href: "/news",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: User,
    label: "マイページ",
    description: "査定履歴",
    href: "/mypage/assessments",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: HelpCircle,
    label: "よくある質問",
    description: "FAQ",
    href: "/contact",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export function ServiceGrid() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="section-title">SERVICE</p>
          <h2 className="section-heading">サービス一覧</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className={`${service.bg} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-10 h-10 ${service.color}`} />
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-900">{service.label}</h3>
                <p className="text-base text-slate-600">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
