"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/search-bar";
import { CategoryGrid } from "@/components/category-grid";
import { SubcategoryTabs } from "@/components/subcategory-tabs";
import { ProductGrid } from "@/components/product-grid";
import type { Category, Product } from "@/lib/products";

export function CatalogueExplorer({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [subcategory, setSubcategory] = useState<string | null>(null);

  function handleCategorySelect(slug: string | null) {
    setCategory(slug);
    setSubcategory(null);
  }

  const activeCategory = categories.find((c) => c.slug === category) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.categorySlug !== category) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.size ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, query, category, subcategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />

      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy">Shop by Category</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a category to narrow down the catalogue.
            </p>
          </div>
        </div>
        <CategoryGrid categories={categories} selected={category} onSelect={handleCategorySelect} />
      </div>

      {activeCategory && (
        <div className="mt-6">
          <SubcategoryTabs
            subcategories={activeCategory.subcategories}
            selected={subcategory}
            onSelect={setSubcategory}
          />
        </div>
      )}

      <div className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-bold text-navy">
            {activeCategory ? activeCategory.name : "All Products"}
          </h2>
          <span className="spec-chip text-xs text-muted-foreground">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
        <ProductGrid products={filtered} query={query} />
      </div>
    </div>
  );
}
