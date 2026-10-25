import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${siteConfig.shortName}`,
      description,
      url: path,
      siteName: siteConfig.shortName,
      locale: "en_GH",
      type: "website",
    },
  };
}
