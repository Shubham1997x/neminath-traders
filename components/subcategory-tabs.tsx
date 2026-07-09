"use client";

import { cn } from "@/lib/utils";

export function SubcategoryTabs({
  subcategories,
  selected,
  onSelect,
}: {
  subcategories: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  if (subcategories.length <= 1) return null;

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
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
      {subcategories.map((sub) => (
        <button
          key={sub}
          type="button"
          onClick={() => onSelect(sub)}
          className={cn(
            "spec-chip shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors",
            selected === sub
              ? "border-navy bg-navy text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-brand-blue/40 hover:text-brand-blue"
          )}
        >
          {sub}
        </button>
      ))}
    </div>
  );
}
