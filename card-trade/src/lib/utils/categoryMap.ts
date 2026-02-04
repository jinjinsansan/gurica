import type {
  CategoryDisplayMeta,
  CategorySlug,
} from "@/lib/types/database";

export const CATEGORY_MAP: Record<CategorySlug, CategoryDisplayMeta> = {
  pokemon: {
    label: "ポケモンカード",
    description: "メインカテゴリ。大会環境からコレクター品まで対応",
    gradient: ["#FFE066", "#FFB347"],
    emoji: "⚡",
  },
  yugioh: {
    label: "遊戯王OCG",
    description: "初期レリーフから最新弾まで高価買取",
    gradient: ["#A78BFA", "#7C3AED"],
    emoji: "🌀",
  },
  onepiece: {
    label: "ワンピースカード",
    description: "人気リーダーや限定プロモを強化買取",
    gradient: ["#F87171", "#DC2626"],
    emoji: "🏴‍☠️",
  },
  other_tcg: {
    label: "その他TCG",
    description: "ドラゴンボール、ヴァイス等幅広く対応",
    gradient: ["#4A6CF7", "#8B5CF6"],
    emoji: "✨",
  },
  digital: {
    label: "デジタルカード",
    description: "NFTやガチャサイト発行カードも査定",
    gradient: ["#34D399", "#059669"],
    emoji: "💎",
  },
};

export const CATEGORY_ORDER: CategorySlug[] = [
  "pokemon",
  "yugioh",
  "onepiece",
  "other_tcg",
  "digital",
];

export function getCategoryMeta(slug: CategorySlug) {
  return CATEGORY_MAP[slug];
}

export function resolveCategorySlug(input?: string | null): CategorySlug {
  if (!input) {
    return "pokemon";
  }

  const normalized = input.toLowerCase() as CategorySlug;
  return CATEGORY_MAP[normalized] ? normalized : "pokemon";
}
