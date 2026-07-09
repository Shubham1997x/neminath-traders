import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { whatsappLink } from "@/lib/catalog-config";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Neminath Traders`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const specs: { label: string; value: string }[] = [
    { label: "Category", value: product.categoryName },
    { label: "Type", value: product.subcategory },
    ...(product.size ? [{ label: "Size / Model", value: product.size }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.categoryName,
    image: product.image,
    brand: { "@type": "Organization", name: "Neminath Traders" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: product.categoryName, href: `/?category=${product.categorySlug}#products` },
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_360px]">
            <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-10">
              <div className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted/40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-contain p-10 transition-transform duration-500 group-hover:scale-125"
                  priority
                />
              </div>

              <div className="mt-8 lg:mt-0">
                <Badge variant="secondary" className="rounded-md bg-navy/5 text-navy">
                  {product.categoryName}
                </Badge>
                <h1 className="font-heading mt-3 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  {product.name}
                </h1>
                {product.size && (
                  <span className="spec-chip mt-2 inline-block rounded-md border border-brand-blue/25 bg-brand-blue/5 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                    Model / Size: {product.size}
                  </span>
                )}
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-6 rounded-xl border border-border bg-card p-5">
                  <h2 className="font-heading text-sm font-bold text-navy">Specifications</h2>
                  <dl className="mt-3 divide-y divide-border">
                    {specs.map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 py-2 text-sm">
                        <dt className="text-muted-foreground">{s.label}</dt>
                        <dd className="spec-chip font-medium text-foreground">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6">
                  <h2 className="font-heading text-sm font-bold text-navy">Applications</h2>
                  <ul className="mt-3 space-y-2">
                    {product.applications.map((app) => (
                      <li key={app} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="font-heading text-base font-bold text-navy">Interested in this product?</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Send an enquiry or message us directly on WhatsApp for price and availability.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <EnquiryDialog
                  productName={product.name}
                  trigger={
                    <Button className="w-full bg-navy hover:bg-navy/90">
                      <Send className="h-4 w-4" />
                      Send Enquiry
                    </Button>
                  }
                />
                <Button
                  render={
                    <a href={whatsappLink(product.name)} target="_blank" rel="noopener noreferrer" />
                  }
                  nativeButton={false}
                  variant="outline"
                  className="w-full border-[#25D366]/40 text-[#128C4A] hover:bg-[#25D366]/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Enquiry
                </Button>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-xl font-bold text-navy">Related Products</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}

          <p className="mt-10">
            <Link href="/" className="text-sm text-brand-blue hover:underline">
              ← Back to catalogue
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
