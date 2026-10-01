// robots.txt：上线前全部挡住；上线后（lib/site.ts 的 launched = true）开放，但不收录样式总览页
import type { MetadataRoute } from "next";
import { launched, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!launched) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/zh/styleguide", "/en/styleguide"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
