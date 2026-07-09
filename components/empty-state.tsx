import { PackageSearch } from "lucide-react";

export function EmptyState({
  title = "No products found",
  description = "Try a different search term or clear the filters.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <PackageSearch className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-heading mt-4 text-base font-bold text-navy">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
