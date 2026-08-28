import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((route) => ({
    url: `${site.url}${route.path}`,
    changeFrequency: route.priority >= 0.8 ? "monthly" : "yearly",
    priority: route.priority,
  }));
}
