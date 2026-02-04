import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "trading-cards",
    title: "トレーディングカード",
    subtitle: "TRADING CARDS",
    description:
      "ポケモン・遊戯王・ワンピース・デジタルカードまで、様々なトレーディングカードを高価買取中。仕分け不要で異なる種類もまとめて送れます。",
    image: "/category-cards.jpg",
    gradient: "from-blue-500/20 to-purple-500/20",
    buttonText: "トレカを売る",
    href: "/assessment",
  },
  {
    id: "digital-cards",
    title: "デジタルカード",
    subtitle: "DIGITAL CARDS",
    description:
      "NFTカードやデジタルコレクションの査定も対応。オンライン完結で安全・迅速にお取引いただけます。",
    image: "/category-digital.jpg",
    gradient: "from-purple-500/20 to-pink-500/20",
    buttonText: "デジタルを売る",
    href: "/assessment",
  },
  {
    id: "gadgets",
    title: "PC・スマホ・カメラ",
    subtitle: "GADGETS",
    description:
      "大きくて重いPCでも宅配買取なら簡単発送。カメラ、スマホなど幅広く高価買取しています。",
    image: "/category-gadgets.jpg",
    gradient: "from-orange-500/20 to-red-500/20",
    buttonText: "ガジェットを売る",
    href: "/assessment",
  },
];

export function CategoryShowcase() {
  return (
    <section className="section-container bg-slate-50">
      <div className="text-center mb-12">
        <p className="section-title">CATEGORY</p>
        <h2 className="section-heading">売りたいカテゴリーを選択</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="card-v2 overflow-hidden group">
            {/* Image Placeholder */}
            <div className={`relative h-56 bg-gradient-to-br ${category.gradient}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-44 mx-auto bg-white/30 backdrop-blur-sm rounded-xl border-2 border-white/50 shadow-xl"></div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {category.subtitle}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{category.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{category.description}</p>
              </div>

              <Link
                href={category.href}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
              >
                {category.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
