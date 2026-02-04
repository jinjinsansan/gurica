import Link from "next/link";

const serviceLinks = [
  { href: "/prices", label: "買取価格" },
  { href: "/flow", label: "買取の流れ" },
  { href: "/assessment", label: "オンライン査定" },
];

const companyLinks = [
  { href: "/company", label: "会社概要" },
  { href: "/legal", label: "特定商取引法" },
  { href: "/privacy", label: "プライバシーポリシー" },
];

const supportLinks = [
  { href: "/contact", label: "お問い合わせ" },
  { href: "/news", label: "お知らせ" },
  { href: "/shop", label: "ショップ" },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0f1427] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
            About
          </p>
          <p className="text-sm text-white/80">
            {"{{SITE_NAME}}"} はポケモンカード・遊戯王・ワンピース等に加え、デジタルカードまで幅広く取り扱う公式買取・販売サービスです。
          </p>
          <p className="text-xs text-white/60">
            デジタルカードの取引は古物営業法の対象外です。
          </p>
        </div>

        <FooterColumn title="サービス" links={serviceLinks} />
        <FooterColumn title="会社情報" links={companyLinks} />
        <FooterColumn title="サポート" links={supportLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {"{{COMPANY_NAME}}"} / {"{{SITE_NAME}}"}. All rights reserved.
          </p>
          <p>
            古物商許可 {"{{PUBLIC_SAFETY_COMMISSION}}"} 第{"{{KOBUTSU_NUMBER}}"}号 {"{{COMPANY_NAME}}"}
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: { href: string; label: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
        {title}
      </p>
      <ul className="mt-4 space-y-3 text-sm text-white/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
