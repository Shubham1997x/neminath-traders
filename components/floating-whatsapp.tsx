"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/catalog-config";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("General Enquiry")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95 md:bottom-6"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
