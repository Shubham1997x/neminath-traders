"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Send, ShoppingCart, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useCart } from "@/lib/cart-context";
import { whatsappCartLink } from "@/lib/catalog-config";

export function CartDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, itemCount, removeItem, updateQty, clearCart } = useCart();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const enquiryItems = items.map((i) => ({ name: i.name, qty: i.qty }));
  const productSummary = enquiryItems.map((i) => `${i.name} (x${i.qty})`).join(", ");

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <ShoppingCart className="h-4.5 w-4.5" />
              Your Cart {itemCount > 0 && `(${itemCount})`}
            </DialogTitle>
            <DialogDescription>
              {items.length > 0
                ? "Review your selected products and send one enquiry for all of them."
                : "No products added yet. Browse the catalogue and tap “Add to Cart”."}
            </DialogDescription>
          </DialogHeader>

          {items.length > 0 && (
            <div className="grid max-h-[50vh] gap-3 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center gap-3 rounded-lg border border-border p-2.5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted/50">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.categoryName}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      onClick={() => updateQty(item.slug, item.qty - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center text-sm font-medium">{item.qty}</span>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      onClick={() => updateQty(item.slug, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.slug)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="border-navy/30 text-navy hover:bg-navy/5"
                  onClick={() => {
                    onOpenChange(false);
                    setEnquiryOpen(true);
                  }}
                >
                  <Send className="h-4 w-4" />
                  Send Enquiry for Cart
                </Button>
                <Button
                  render={
                    <a
                      href={whatsappCartLink(enquiryItems)}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                  type="button"
                  className="bg-[#25D366] text-white hover:bg-[#1fb855]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <EnquiryDialog
        productName={productSummary}
        items={enquiryItems}
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
      />
    </>
  );
}
