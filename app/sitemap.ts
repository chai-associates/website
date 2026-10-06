// sitemap.xml：全站所有页面（中英文各一个网址，互相标明对应）
// 新增页面、服务、律师、文章时会自动加进来，不用手动改这里（新增「一整种页面」时才要加一行）。
import type { MetadataRoute } from "next";
import { articles } from "@/lib/divorcepedia";
import { aboutSections, locales, serviceCategories, services, siteUrl, team } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/services", "/divorcepedia", "/about", "/people", "/locations", "/careers", "/privacy",
    ...serviceCategories.map((c) => `/services/${c.slug}`),
    ...services.map((s) => `/services/${s.category}/${s.slug}`),
    ...articles.map((a) => `/divorcepedia/${a.slug}`),
    ...aboutSections.map((s) => `/about/${s.slug}`),
    ...team.map((p) => `/people/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: { languages: { "zh-Hans": `${siteUrl}/zh${path}`, en: `${siteUrl}/en${path}` } },
    })),
  );
}
