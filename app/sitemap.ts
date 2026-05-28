import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/serviceAreas";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://virenzalawn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-05-25");

  const pages = [
    "",
    "/privacy",
    "/terms",
    "/cookie-preferences",
    "/accessibility",
    "/security",
    ...serviceAreas.map((area) => `/service-areas/${area.slug}`),
  ];

  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated,
    changeFrequency: path === "" || path.startsWith("/service-areas") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/service-areas") ? 0.75 : 0.5,
  }));
}
