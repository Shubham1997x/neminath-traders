export const COMPANY = {
  name: "Neminath Traders",
  tagline: "Pump Spares, Pressure Tanks & Terminal Boards",
  phones: ["+91 9999-288-972", "+91 9999-154-329"],
  phonesRaw: ["+919999288972", "+919999154329"],
  email: "neminathtraders20@gmail.com",
  whatsappNumber: "919999288972",
} as const;

export type CategoryMeta = {
  slug: string;
  folder: string;
  name: string;
  description: string;
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  "CW+BW": {
    slug: "cw-bw-pump-spares",
    folder: "CW+BW",
    name: "CW & BW Pump Spares",
    description:
      "Impellers, cutters, delivery casings, mechanical seals and cable kits for CW and BW series pumps.",
  },
  tanks: {
    slug: "pressure-tanks",
    folder: "tanks",
    name: "Pressure Tanks",
    description:
      "LV-series pressure tanks in multiple capacities for stable water supply systems.",
  },
  terminal: {
    slug: "terminal-boards",
    folder: "terminal",
    name: "Terminal Boards",
    description:
      "Single and three phase terminal boards for reliable motor wiring connections.",
  },
};

export function categoryMetaForFolder(folder: string): CategoryMeta {
  return (
    CATEGORY_META[folder] ?? {
      slug: folder.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      folder,
      name: titleCase(folder.replace(/[+_-]/g, " ")),
      description: `${titleCase(folder.replace(/[+_-]/g, " "))} products from Neminath Traders.`,
    }
  );
}

export function titleCase(input: string): string {
  return input
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function whatsappLink(productName: string, phone = COMPANY.whatsappNumber) {
  const message = `Hello Neminath Traders,\n\nI am interested in:\n\nProduct: ${productName}\n\nPlease share price and availability.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function callLink(phoneRaw: string) {
  return `tel:${phoneRaw}`;
}
