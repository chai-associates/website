import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { hasLocale, locales, t } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

// 服务详情页（第 2 步会补上完整内容）
export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <section className="section">
      <div className="container">
        <Link href={`/${lang}#services`} className="text-link">‹ {lang === "zh" ? "所有服务" : "All services"}</Link>
        <h1 style={{ marginTop: 12 }}>{t(service.title, lang)}</h1>
        <p className="hero-sub">{t(service.short, lang)}</p>
        <p className="placeholder-note">{lang === "zh" ? "详细内容准备中。" : "Full guide coming soon."}</p>
        <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">
          {lang === "zh" ? "WhatsApp 预约咨询" : "Book via WhatsApp"}
        </a>
      </div>
    </section>
  );
}
