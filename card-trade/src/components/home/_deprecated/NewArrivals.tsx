import Link from "next/link";

import { ProductCard, type ProductCardProps } from "@/components/shop/ProductCard";

interface NewArrivalsProps {
  products: ProductCardProps[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-light)]">New arrivals</p>
            <h2 className="text-3xl text-[var(--text-primary)]">新着商品</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-[var(--accent-blue)]">
            もっと見る →
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            新着商品を準備中です。
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
