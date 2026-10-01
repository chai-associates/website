import Image from "next/image";
import { Icon } from "@/components/ui";
import { copy } from "@/content/copy";
import { t, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

// 首屏：占满第一个画面。左文字＋预约按钮＋快速跳转链接、右照片（不重叠），三个优点在底部。
// 照片分两层：照片框（background）＋ 人物去背图（cutout，可超出框外，不挡点击）。
// 图片路径在 content/copy.ts → hero.media 设定。
export default function Hero({ lang }: { lang: Locale }) {
  const h = copy.hero;
  const alt = t(h.imageAlt, lang);

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-grid">
          <div className="hero-text">
            <h1>{t(h.title, lang)}</h1>
            <p className="hero-sub">{t(h.sub, lang)}</p>
            <div className="hero-actions">
              <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">
                {t(h.cta, lang)} <Icon name="arrow" size={18} />
              </a>
            </div>
            <nav className="hero-jumps" aria-label={lang === "zh" ? "快速跳转" : "Jump to"}>
              {h.jumps.map((j) => (
                <a key={j.href} className="text-link" href={j.href}>{t(j.label, lang)} <Icon name="arrow" size={16} /></a>
              ))}
            </nav>
          </div>

          <div className="hero-media">
            <div className="hero-card">
              <Image
                src={h.media.background}
                alt={h.media.cutout ? "" : alt}
                fill
                preload
                sizes="(min-width: 860px) 40vw, 40vw"
                className="hero-img"
                style={{ objectPosition: h.media.focus }}
              />
            </div>
            {h.media.cutout && (
              <div className="hero-cutout">
                <Image src={h.media.cutout} alt={alt} fill sizes="(min-width: 860px) 48vw, 48vw" className="hero-cutout-img" />
              </div>
            )}
          </div>
        </div>

        <ul className="hero-points">
          {h.points.map((p) => (
            <li key={p.icon}>
              <p className="point-title"><Icon name={p.icon} /> {t(p.title, lang)}</p>
              <p className="point-desc">{t(p.desc, lang)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
