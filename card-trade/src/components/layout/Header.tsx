"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/prices", label: "買取価格" },
  { href: "/flow", label: "買取の流れ" },
  { href: "/assessment", label: "オンライン査定" },
  { href: "/shop", label: "ショップ" },
  { href: "/company", label: "会社概要" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <p className="text-2xl font-black tracking-tight text-slate-900">買い取りKK</p>
          <span className="text-[0.6rem] uppercase tracking-[0.65em] text-rose-500">kaitori platform</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--accent-primary)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assessment"
            className="cta-primary rounded-full px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(225,29,72,0.25)] transition hover:-translate-y-0.5"
          >
            無料査定はこちら
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-[var(--text-primary)] md:hidden"
          aria-label="メニューを開閉"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[var(--text-primary)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assessment"
              className="cta-primary rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              無料査定はこちら
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
