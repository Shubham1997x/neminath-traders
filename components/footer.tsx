"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, callLink } from "@/lib/catalog-config";

export function Footer() {

  return (
    <footer
      id="contact"
      className="mt-24 border-t border-border bg-navy pb-36 text-primary-foreground md:pb-0"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center rounded-lg bg-white/95 px-2.5 py-1.5 w-fit">
              <Image
                src="/logo.png"
                alt={COMPANY.name}
                width={246}
                height={192}
                className="h-9 w-auto"
              />
            </div>
            <h2 className="mt-4 font-heading text-xl font-bold tracking-tight text-white">
              {COMPANY.name}
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              A trusted B2B supplier of pump spares, pressure tanks and terminal
              boards — built for reliability, sourced for availability.
            </p>
          </div>

          <div>
            <h3 className="spec-chip text-xs font-semibold uppercase tracking-wider text-white/50">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#products" className="text-white/75 hover:text-brand-orange">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-white/75 hover:text-brand-orange">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>

            <h3 className="spec-chip text-xs font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY.phones.map((phone, i) => (
                <li key={phone}>
                  <a
                    href={callLink(COMPANY.phonesRaw[i])}
                    className="flex items-center gap-2 text-white/75 hover:text-brand-orange"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 text-white/75 hover:text-brand-orange"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. Made with
            {" "}
            <span aria-hidden>❤</span>
            <span className="sr-only">love</span>.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
