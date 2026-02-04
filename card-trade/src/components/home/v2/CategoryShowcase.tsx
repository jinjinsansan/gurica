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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="section-title">CATEGORY</p>
          <h2 className="section-heading">売りたいカテゴリーを選択</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-200">
              {/* Image Placeholder */}
              <div className={`relative h-72 bg-gradient-to-br ${category.gradient} group-hover:scale-105 transition-transform duration-500`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-40 h-56 mx-auto bg-white/20 backdrop-blur-md rounded-2xl border-2 border-white/40 shadow-2xl"></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-5">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                    {category.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{category.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed">{category.description}</p>
                </div>

                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:gap-4 transition-all"
                >
                  {category.buttonText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
