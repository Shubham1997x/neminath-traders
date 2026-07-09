import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { COMPANY } from "@/lib/catalog-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: `${COMPANY.name} — Pump Spares, Pressure Tanks & Terminal Boards`,
  description:
    "Neminath Traders is a trusted B2B supplier of CW & BW pump spares, pressure tanks and terminal boards. Browse the catalogue and send an enquiry today.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${COMPANY.name} — Pump Spares, Pressure Tanks & Terminal Boards`,
    description:
      "Trusted B2B supplier of CW & BW pump spares, pressure tanks and terminal boards.",
    type: "website",
    locale: "en_IN",
    siteName: COMPANY.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <FloatingWhatsApp />
        <MobileActionBar />
        <Toaster />
      </body>
    </html>
  );
}
