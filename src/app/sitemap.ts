import type { MetadataRoute } from "next";
import { getAllArticles, getAllCategories, getAllPredictors } from "@/lib/content";
import { getAllRacecourses } from "@/lib/courses";

const BASE_URL = "https://keiba-times.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const predictors = getAllPredictors();
  const categories = getAllCategories();
  const courses = getAllRacecourses();

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/articles`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/predictors`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/schedule`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/courses`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    ...courses.flatMap((course) => [
      { url: `${BASE_URL}/courses/${course.slug}`, changeFrequency: "monthly" as const, priority: 0.5 },
      ...course.distances.map((d) => ({
        url: `${BASE_URL}/courses/${course.slug}/${d.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      })),
    ]),
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
