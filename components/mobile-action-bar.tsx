"use client";

import { Phone, MessageCircle, FileText } from "lucide-react";
import { COMPANY, callLink, whatsappLink } from "@/lib/catalog-config";
import { EnquiryDialog } from "@/components/enquiry-dialog";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/95 backdrop-blur md:hidden">
      <a
        href={callLink(COMPANY.phonesRaw[0])}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-navy active:bg-muted"
      >
        <Phone className="h-4.5 w-4.5" />
        <span className="text-[11px] font-medium">Call</span>
      </a>
      <a
        href={whatsappLink("General Enquiry")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center gap-0.5 border-x border-border py-2.5 text-[#25D366] active:bg-muted"
      >
        <MessageCircle className="h-4.5 w-4.5" />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </a>
      <EnquiryDialog
        productName="General Enquiry"
        trigger={
          <button className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-brand-orange active:bg-muted">
            <FileText className="h-4.5 w-4.5" />
            <span className="text-[11px] font-medium">Enquiry</span>
          </button>
        }
      />
    </div>
  );
}
