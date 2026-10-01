import Image from "next/image";
import { copy } from "@/content/copy";
import { lawyers } from "@/content/lawyers";
import { t, type Locale } from "@/lib/i18n";

export default function People({ lang }: { lang: Locale }) {
  return (
    <section id="people" className="section section-muted">
      <div className="container">
        <div className="sec-head">
          <p className="tag">{t(copy.people.tag, lang)}</p>
          <h2>{t(copy.people.title, lang)}</h2>
        </div>
        <div className="people">
          {lawyers.map((p, i) => (
            <article key={i} className="person">
              <div className="person-photo">
                {p.image ? (
                  <Image src={p.image} alt={t(p.name, lang)} fill sizes="(min-width: 860px) 33vw, 80vw" className="person-img" />
                ) : (
                  <span className="person-ph">{lang === "zh" ? "照片" : "Photo"}</span>
                )}
              </div>
              <div className="person-text">
                <h3>{t(p.name, lang)}</h3>
                <p className="person-role">{t(p.role, lang)}</p>
                <p className="person-meta">
                  {p.since ? `${t(copy.people.since, lang)} ${p.since} · ` : ""}{t(p.languages, lang)}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="swipe-hint">{t(copy.people.swipe, lang)}</p>
      </div>
    </section>
  );
}
