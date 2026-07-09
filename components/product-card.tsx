"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import { highlightMatch } from "@/components/search-bar";
import type { Product } from "@/lib/products";
import { whatsappLink } from "@/lib/catalog-config";

export function ProductCard({ product, query }: { product: Product; query?: string }) {
  return (
    <div className="product-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/5">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square bg-muted/50"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
        {product.size && (
          <span className="spec-chip absolute right-2.5 top-2.5 rounded-md border border-brand-blue/20 bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-brand-blue">
            {product.size}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Badge
          variant="secondary"
          className="w-fit rounded-md bg-navy/5 text-[11px] font-medium text-navy"
        >
          {product.categoryName}
        </Badge>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading text-sm font-bold leading-snug text-foreground hover:text-brand-blue">
            {highlightMatch(product.name, query ?? "")}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex gap-2 pt-3">
          <EnquiryDialog
            productName={product.name}
            trigger={
              <Button size="sm" className="flex-1 bg-navy hover:bg-navy/90">
                <Send className="h-3.5 w-3.5" />
                Send Enquiry
              </Button>
            }
          />
          <Button
            render={
              <a
                href={whatsappLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              />
            }
            nativeButton={false}
            size="sm"
            variant="outline"
            className="flex-1 border-[#25D366]/40 text-[#128C4A] hover:bg-[#25D366]/10"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
