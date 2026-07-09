import fs from "node:fs";
import path from "node:path";
import { CATEGORY_META, categoryMetaForFolder, titleCase } from "./catalog-config";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const SIZE_SUFFIXES = new Set(["CW", "BW", "CWC", "LV", "LX"]);

export type Product = {
  slug: string;
  name: string;
  image: string;
  categorySlug: string;
  categoryName: string;
  categoryFolder: string;
  subcategory: string;
  size?: string;
  description: string;
  applications: string[];
};

export type Category = {
  slug: string;
  folder: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
};

function isPhaseToken(token: string): boolean {
  return /^\d?PH$/.test(token);
}

function isSizeToken(token: string): boolean {
  if (/\d/.test(token)) return true;
  if (/^M-\d/.test(token)) return true;
  return SIZE_SUFFIXES.has(token);
}

function kebab(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function subcategoryForCwBw(name: string): string {
  const lower = name.toLowerCase();
  if (lower.startsWith("cable")) return "Cable Kits";
  if (lower.startsWith("connector")) return "Connectors";
  if (lower.startsWith("cutter")) return "Cutters";
  if (lower.startsWith("delivery")) return "Delivery Casings";
  if (lower.startsWith("impeller")) return "Impellers";
  if (lower.startsWith("mech seal")) return "Mechanical Seals";
  if (lower.startsWith("outlet")) return "Flanges";
  if (lower.startsWith("pump base")) return "Pump Bases";
  if (lower.startsWith("volute")) return "Volutes";
  return "Other Parts";
}

function parseFilename(
  filenameNoExt: string,
  folder: string
): { name: string; size?: string; subcategory: string; applications: string[] } {
  const tokens = filenameNoExt.split("_").filter(Boolean);

  let phase: string | undefined;
  if (tokens.length && isPhaseToken(tokens[tokens.length - 1])) {
    phase = tokens.pop() === "1PH" ? "Single Phase" : "Three Phase";
  }

  const sizeParts: string[] = [];
  while (tokens.length > 1 && isSizeToken(tokens[tokens.length - 1])) {
    sizeParts.unshift(tokens.pop() as string);
  }

  if (tokens.length > 1 && tokens[tokens.length - 1] === "FOR" && sizeParts.length) {
    tokens.pop();
  }

  const name = titleCase(tokens.join(" ").replace(/-/g, " "));
  const size = sizeParts.length ? sizeParts.join(" ") : undefined;

  let subcategory: string;
  let applications: string[];

  if (folder === "CW+BW") {
    subcategory = subcategoryForCwBw(name);
    applications = ["CW & BW series submersible pumps", "OEM replacement & retrofit"];
  } else if (folder === "tanks") {
    subcategory = size ?? "Pressure Tanks";
    applications = ["Domestic & light-commercial water supply", "Pump pressure booster systems"];
  } else if (folder === "terminal") {
    subcategory = phase ?? "Standard";
    applications = ["Motor terminal wiring", "Junction & connection boards"];
  } else {
    subcategory = size ?? "General";
    applications = ["Industrial pump & electrical systems"];
  }

  return { name, size, subcategory, applications };
}

function readImagesRecursively(): { folder: string; file: string }[] {
  if (!fs.existsSync(IMAGES_DIR)) return [];
  const entries: { folder: string; file: string }[] = [];
  for (const folder of fs.readdirSync(IMAGES_DIR)) {
    const folderPath = path.join(IMAGES_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    for (const file of fs.readdirSync(folderPath)) {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXT.has(ext)) continue;
      entries.push({ folder, file });
    }
  }
  return entries;
}

let cachedProducts: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cachedProducts) return cachedProducts;

  const usedSlugs = new Set<string>();
  const products: Product[] = [];

  for (const { folder, file } of readImagesRecursively()) {
    const meta = categoryMetaForFolder(folder);
    const filenameNoExt = path.basename(file, path.extname(file));
    const { name, size, subcategory, applications } = parseFilename(filenameNoExt, folder);

    let slug = kebab(`${meta.slug}-${name}${size ? `-${size}` : ""}`);
    if (usedSlugs.has(slug)) {
      let i = 2;
      while (usedSlugs.has(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }
    usedSlugs.add(slug);

    products.push({
      slug,
      name: size ? `${name} ${size}` : name,
      image: `/images/${folder}/${file}`,
      categorySlug: meta.slug,
      categoryName: meta.name,
      categoryFolder: folder,
      subcategory,
      size,
      description: `${subcategory} for ${meta.name.toLowerCase()}${
        size ? ` — model ${size}` : ""
      }. Genuine-fit quality, ready to ship from Neminath Traders.`,
      applications,
    });
  }

  products.sort((a, b) => a.name.localeCompare(b.name));
  cachedProducts = products;
  return products;
}

export function getAllCategories(): Category[] {
  const products = getAllProducts();
  const byFolder = new Map<string, Product[]>();
  for (const p of products) {
    const list = byFolder.get(p.categoryFolder) ?? [];
    list.push(p);
    byFolder.set(p.categoryFolder, list);
  }

  const categories: Category[] = [];
  for (const [folder, list] of byFolder) {
    const meta = categoryMetaForFolder(folder);
    const subcategories = Array.from(new Set(list.map((p) => p.subcategory))).sort();
    categories.push({
      slug: meta.slug,
      folder,
      name: meta.name,
      description: meta.description,
      image: list[0]?.image ?? "",
      productCount: list.length,
      subcategories,
    });
  }

  const order = Object.keys(CATEGORY_META);
  categories.sort((a, b) => {
    const ai = order.indexOf(a.folder);
    const bi = order.indexOf(b.folder);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return categories;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .slice(0, limit);
}
