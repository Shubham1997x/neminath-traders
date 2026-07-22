import { NextResponse } from "next/server";

type EnquiryPayload = {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  city?: string;
  requirement?: string;
  message?: string;
  productName: string;
  items?: { name: string; qty: number }[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<EnquiryPayload>;

  if (!body.customerName?.trim() || !body.phone?.trim() || !body.productName?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  // TODO: wire up email / CRM / database integration here.
  console.log("[enquiry]", {
    ...body,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
