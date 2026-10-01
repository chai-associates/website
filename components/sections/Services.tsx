import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { copy } from "@/content/copy";
import { services } from "@/content/services";
import { t, type Locale } from "@/lib/i18n";

export default function Services({ lang }: { lang: Locale }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="sec-head">
          <p className="tag">{t(copy.services.tag, lang)}</p>
          <h2>{t(copy.services.title, lang)}</h2>
        </div>
        <div className="svc-grid">
          {services.map((s) => (
            <Link key={s.slug} href={`/${lang}/services/${s.slug}`} className="svc-card">
              {s.image ? (
                <Image src={s.image} alt="" fill sizes="(min-width: 860px) 33vw, 100vw" className="svc-img" />
              ) : (
                <div className="svc-placeholder" />
              )}
              <div className="svc-body">
                <div>
                  <h3>{t(s.title, lang)}</h3>
                  <p>{t(s.short, lang)}</p>
                </div>
                <span className="svc-more">{t(copy.services.more, lang)} <Icon name="arrow" size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
