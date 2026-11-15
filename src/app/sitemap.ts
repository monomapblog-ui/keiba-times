import type { MetadataRoute } from "next";
import { getAllArticles, getAllCategories, getAllPredictors } from "@/lib/content";

const BASE_URL = "https://keiba-times.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const predictors = getAllPredictors();
  const categories = getAllCategories();

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/articles`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/predictors`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/schedule`, changeFrequency: "daily", priority: 0.7 },
    ...articles.map((article) => ({
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...predictors.map((predictor) => ({
      url: `${BASE_URL}/predictors/${predictor.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...categories.map((category) => ({
      url: `${BASE_URL}/category/${encodeURIComponent(category)}`,
      changeFrequency: "daily" as const,
      priority: 0.5,
    })),
  ];
}
