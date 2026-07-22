"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { useGsapContext } from "@/hooks/use-gsap";
import { whatsappLink } from "@/lib/catalog-config";
import { useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const scopeRef = useRef<HTMLElement | null>(null);
  useGsapContext(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.5 })
      .from(".hero-heading", { opacity: 0, y: 24, duration: 0.7 }, "-=0.3")
      .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".hero-cta-group", { opacity: 0, y: 16, duration: 0.5 }, "-=0.35");

    gsap.to(".hero-bg-image", {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: scopeRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [], scopeRef);

  return (
    <section ref={scopeRef} className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/hero/gears-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-bg-image object-cover object-[70%_45%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:flex lg:h-[520px] lg:items-center lg:px-8 lg:py-0">
        <div className="max-w-xl">
          <span className="hero-eyebrow spec-chip inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
            Neminath Traders · Since Trust Began
          </span>
          <h1 className="hero-heading font-heading mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Pump Spares, Pressure Tanks &amp; Terminal Boards — Delivered Right.
          </h1>
          <p className="hero-sub mt-5 max-w-lg text-base leading-relaxed text-white/70">
            Genuine-fit CW &amp; BW pump components, LV-series pressure tanks and
            terminal boards — in stock, quality-checked, and ready for quick
            enquiry support.
          </p>
          <div className="hero-cta-group mt-8 flex flex-wrap gap-3">
            <Button
              render={<a href="#products" />}
              nativeButton={false}
              size="lg"
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
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
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Enquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
