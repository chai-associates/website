import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import People from "@/components/sections/People";
import Offices from "@/components/sections/Offices";
import { hasLocale } from "@/lib/i18n";

// 首页：4 个 section，顺序在这里调整
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <People lang={lang} />
      <Offices lang={lang} />
    </>
  );
}
