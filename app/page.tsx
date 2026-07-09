import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CatalogueExplorer } from "@/components/catalogue-explorer";
import { Footer } from "@/components/footer";
import { ProductGridSkeleton } from "@/components/loading-skeleton";
import { getAllCategories, getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<ProductGridSkeleton />}>
          <CatalogueExplorer products={products} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
