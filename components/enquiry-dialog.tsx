"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  requirement: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  customerName: "",
  companyName: "",
  phone: "",
  email: "",
  city: "",
  requirement: "",
  message: "",
};

const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EnquiryDialog({
  productName,
  items,
  trigger,
  open: openProp,
  onOpenChange,
}: {
  productName: string;
  items?: { name: string; qty: number }[];
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = onOpenChange ?? setOpenState;
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.customerName.trim()) next.customerName = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!PHONE_RE.test(form.phone.trim())) next.phone = "Enter a valid phone number";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim()))
      next.email = "Enter a valid email address";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productName, items }),
      });
      if (!res.ok) throw new Error("Request failed");

      toast.success("Enquiry sent successfully", {
        description: "Our team will get back to you shortly.",
      });
      setForm(EMPTY_FORM);
      setErrors({});
      setOpen(false);
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or reach us on WhatsApp.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Send Enquiry</DialogTitle>
          <DialogDescription>
            Share your details and we&apos;ll get back with price &amp; availability.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {items && items.length > 0 ? (
            <div className="grid gap-1.5">
              <Label>Products ({items.length})</Label>
              <ul className="max-h-32 divide-y divide-border overflow-y-auto rounded-md border border-border bg-muted/50 text-sm">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between px-3 py-1.5">
                    <span className="truncate">{item.name}</span>
                    <span className="ml-2 shrink-0 text-xs text-muted-foreground">×{item.qty}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid gap-1.5">
              <Label htmlFor="productName">Product</Label>
              <Input id="productName" value={productName} readOnly className="bg-muted" />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="customerName">Your Name *</Label>
              <Input
                id="customerName"
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                aria-invalid={!!errors.customerName}
              />
              {errors.customerName && (
                <p className="text-xs text-destructive">{errors.customerName}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={(e) => update("companyName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="requirement">Quantity / Requirement</Label>
              <Input
                id="requirement"
                placeholder="e.g. 50 units"
                value={form.requirement}
                onChange={(e) => update("requirement", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={3}
              placeholder="Any additional details..."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Submit Enquiry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
