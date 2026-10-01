import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/ui";
import { hasLocale, locales } from "@/lib/i18n";

import { garamond, jakarta, notoSC } from "@/lib/fonts";

// 预先生成 /zh 和 /en 两个版本
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const zh = lang === "zh";
  return {
    title: zh ? "Chai & Associates 律师事务所 | 离婚与家事法律" : "Chai & Associates | Divorce & Family Law in Malaysia",
    description: zh
      ? "专注离婚与家事法律：协议离婚、单方面离婚、抚养权、赡养费与财产分割。吉隆坡 · 新山 · 马六甲。"
      : "Divorce and family law in Malaysia — joint and single petitions, custody, maintenance and division of assets. Kuala Lumpur · Johor Bahru · Melaka.",
    alternates: { languages: { zh: "/zh", en: "/en" } },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"} className={`${notoSC.variable} ${jakarta.variable} ${garamond.variable}`}>
      <body className={`lang-${lang}`}>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        <WhatsAppFab lang={lang} />
      </body>
    </html>
  );
}
