"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  className,
  variant = "outline",
  size = "sm",
}: {
  product: Product;
  className?: string;
  variant?: "default" | "outline";
  size?: "sm" | "default";
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      categoryName: product.categoryName,
      size: product.size,
    });
    toast.success("Added to cart", { description: product.name });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      onClick={handleClick}
      className={className ?? "flex-1 border-navy/30 text-navy hover:bg-navy/5"}
    >
      {justAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
      {justAdded ? "Added" : "Add to Cart"}
    </Button>
  );
}
