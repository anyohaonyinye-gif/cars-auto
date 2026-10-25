import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { vehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/inventory",
    "/about",
    "/brands",
    "/services",
    "/services/vehicle-selection",
    "/services/trade-in",
    "/services/logistics",
    "/services/after-sales",
    "/modifications",
    "/contact",
    ...vehicles.map((vehicle) => `/inventory/${vehicle.slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified: new Date("2026-10-25"),
    changeFrequency: path.startsWith("/inventory/") ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/inventory" ? 0.9 : 0.7,
  }));
}
