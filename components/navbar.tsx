"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { COMPANY, callLink, whatsappLink } from "@/lib/catalog-config";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt={COMPANY.name}
            width={246}
            height={192}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#products"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand-blue"
          >
            Products
          </a>
          <a
            href="/#contact"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand-blue"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<a href={callLink(COMPANY.phonesRaw[0])} />}
            nativeButton={false}
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex border-navy/20 text-navy hover:bg-navy hover:text-primary-foreground"
          >
            <Phone className="h-3.5 w-3.5" />
            Call Now
          </Button>
          <Button
            render={
              <a
                href={whatsappLink("General Enquiry")}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
            size="sm"
            className="bg-[#25D366] text-white hover:bg-[#1fb855]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
