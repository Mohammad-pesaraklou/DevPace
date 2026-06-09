import { MetadataRoute } from "next";

export default async function SiteMap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: "" }];
}
