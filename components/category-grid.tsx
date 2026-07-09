"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/products";

export function CategoryGrid({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div id="categories" className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "spec-chip shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
          selected === null
            ? "border-navy bg-navy text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:border-brand-blue/40 hover:text-brand-blue"
        )}
      >
        All
      </button>
      {categories.map((cat) => {
        const isActive = selected === cat.slug;
        return (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onSelect(isActive ? null : cat.slug)}
            className={cn(
              "spec-chip shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
              isActive
                ? "border-navy bg-navy text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-brand-blue/40 hover:text-brand-blue"
            )}
          >
            {cat.name}
            <span className={cn("ml-1.5 opacity-70", isActive && "opacity-90")}>
              ({cat.productCount})
            </span>
          </button>
        );
      })}
    </div>
  );
}
