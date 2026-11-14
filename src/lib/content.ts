import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content", "articles");
const predictorsDir = path.join(process.cwd(), "content", "predictors");

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  predictorSlug?: string;
  track?: string;
  race?: string;
  content: string;
};

export type Predictor = {
  slug: string;
  name: string;
  bio: string;
  specialty: string;
  twitter?: string;
  content: string;
};

function readMdxDir<T extends Record<string, unknown>>(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, content, ...(data as T) };
    });
}

export function getAllArticles(): Article[] {
  const articles = readMdxDir<Omit<Article, "slug" | "content">>(articlesDir) as Article[];
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByPredictor(predictorSlug: string): Article[] {
  return getAllArticles().filter((a) => a.predictorSlug === predictorSlug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getAllCategories(): string[] {
  const categories = getAllArticles().map((a) => a.category);
  return Array.from(new Set(categories));
}

export function getAllPredictors(): Predictor[] {
  return readMdxDir<Omit<Predictor, "slug" | "content">>(predictorsDir) as Predictor[];
}

export function getPredictorBySlug(slug: string): Predictor | undefined {
  return getAllPredictors().find((p) => p.slug === slug);
}
