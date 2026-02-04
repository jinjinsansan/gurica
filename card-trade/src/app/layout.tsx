import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  Dela_Gothic_One,
  Orbitron,
  Zen_Kaku_Gothic_New,
} from "next/font/google";

import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const displayFont = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

const techFont = Orbitron({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-tech",
});

const fallbackSiteUrl = "http://localhost:3000";

const metadataBase = (() => {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

  try {
    return new URL(candidate);
  } catch {
    return new URL(fallbackSiteUrl);
  }
})();

const siteUrl = metadataBase.toString();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "{{SITE_NAME}}｜トレーディングカード買取・販売",
    template: "%s｜{{SITE_NAME}}",
  },
  description:
    "ポケモンカード・遊戯王・ワンピース・デジタルカードまで高価買取と販売を行う公式サイト。オンライン査定・EC・管理画面を備えた安心体制を整備しています。",
  openGraph: {
    title: "{{SITE_NAME}}",
    description:
      "リアルもデジタルも、あなたの大切なカードを高価買取・販売。",
    url: siteUrl,
    siteName: "{{SITE_NAME}}",
    locale: "ja_JP",
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${techFont.variable} min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
