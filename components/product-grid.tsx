"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/product-card";
import { EmptyState } from "@/components/empty-state";
import { ensureGsapRegistered, prefersReducedMotion } from "@/hooks/use-gsap";
import type { Product } from "@/lib/products";

export function ProductGrid({ products, query }: { products: Product[]; query?: string }) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion() || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [products]);

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      id="products"
      ref={gridRef}
      className="grid scroll-mt-32 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} query={query} />
      ))}
    </div>
  );
}
