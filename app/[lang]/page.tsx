// ═══════════════════════════════════════════════════════════════
// 首页 Landing page：这一页所有的区块和内容都在这个文件
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 首屏  ② 服务范围  ③ 我们的团队  ④ 联系我们
//   用 Cmd + F 搜「① 首屏」等标题就能跳到该区块。
// 样式规则（跟其他页一样）：
// · 视觉样式只用 globals.css 的积木（hero、points、photo-card、scroll-row、tabs……）
// · 只属于这一页的排版（几栏、比例、位置、高度）直接写在下面的 className
// 律所资料、服务清单、办事处来自 lib/site.ts（全站共用）。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cities, cityOf, common, displayName, firm, initials, isLang, mapsLink, offices, pageMeta, roles, serviceCategories, team, type Lang } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  meta: {
    title: { zh: "离婚与家事法律 | Chai & Associates 律师事务所", en: "Divorce & Family Law in Malaysia | Chai & Associates" },
    description: {
      zh: "专注离婚与家事法律：协议离婚、单方面离婚、抚养权、赡养费与财产分割。吉隆坡 · 新山 · 马六甲。",
      en: "Divorce and family law in Malaysia — joint and single petitions, custody, maintenance and division of assets. Kuala Lumpur · Johor Bahru · Melaka.",
    },
  },

  // ① 首屏
  hero: {
    title: { zh: "专注家事法律，\n陪你走过\n人生转折。", en: "Family law,\nhandled with care." },
    sub: {
      zh: "离婚、抚养权、赡养费与财产分割，我们用清楚易懂的方式陪你处理每一步。",
      en: "Divorce, custody, maintenance and division of assets — explained clearly and handled with you, step by step.",
    },
    cta: { zh: "了解我们的服务", en: "Explore Our Services" },
    jumps: [
      { href: "#people", label: { zh: "认识我们的团队", en: "Meet our people" } },
      { href: "#contact", label: { zh: "联系我们", en: "Find an office" } },
    ],
    image: "/images/hero/hero-bg.jpg",
    imageAlt: { zh: "律师与客户进行咨询", en: "A lawyer in a consultation with a client" },
    // 首屏 3 点：⚠ 占位，照「律所问卷」B5 的答案替换（图示也按内容换：award / receipt / lock，或在下面 Icon 加新的）
    points: [
      { icon: "award", title: { zh: "[B5 第 1 点]", en: "[B5 point 1]" }, desc: { zh: "[一句话说明]", en: "[One-line description]" } },
      { icon: "receipt", title: { zh: "[B5 第 2 点]", en: "[B5 point 2]" }, desc: { zh: "[一句话说明]", en: "[One-line description]" } },
      { icon: "lock", title: { zh: "[B5 第 3 点]", en: "[B5 point 3]" }, desc: { zh: "[一句话说明]", en: "[One-line description]" } },
    ],
  },

  // ② 服务范围（服务清单本身在 lib/site.ts）
  services: {
    tag: { zh: "服务范围", en: "Our services" },
    title: { zh: "我们可以怎么帮你", en: "How we can help" },
  },

  // ③ 我们的团队（成员资料在 lib/site.ts 的 team）
  people: {
    tag: { zh: "我们的团队", en: "Our people" },
    title: { zh: "认识我们的团队", en: "Meet our people" },
    swipe: { zh: "← 左右滑动 →", en: "← Swipe →" },
  },

  // ④ 联系我们（办事处资料在 lib/site.ts）
  contact: {
    tag: { zh: "联系我们", en: "Contact" },
    title: { zh: "5 间办事处，就近找我们", en: "Come and see us — 5 offices" },
  },
};

// 线条图标（只有这一页用）
function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    award: <><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" /></>,
    receipt: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {paths[name]}
    </svg>
  );
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const l: Lang = isLang(lang) ? lang : "zh";
  // 首页标题不加「| Chai & Associates」后缀（absolute）
  return { ...pageMeta(l, "", text.meta.title[l], text.meta.description[l]), title: { absolute: text.meta.title[l] } };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "zh";
  const { hero, people, contact } = text;

  return (
    <>
      {/* ═════════ ① 首屏 ═════════
          占满第一个画面（扣掉页首）。左文字 : 右照片 = 1.618 : 1（黄金比例），手机和电脑都左右并排。
          照片用人像 4:5（photo-frame-portrait），窄栏里也看得清楚。 */}
      <section className="hero flex min-h-[calc(100svh-var(--header-h))] py-6">
        <div className="container flex flex-col justify-center gap-8">
          <div className="grid grid-cols-[1.618fr_1fr] items-center gap-3 md:gap-12">
            <div className="min-w-0">
              <h1>{hero.title[lang]}</h1>
              <p>{hero.sub[lang]}</p>
              <div className="btn-row">
                <Link className="btn btn-outline" href={`/${lang}/services`}>
                  {hero.cta[lang]} <Icon name="arrow" size={18} />
                </Link>
              </div>
              <nav className="btn-row" aria-label={lang === "zh" ? "快速跳转" : "Jump to"}>
                {hero.jumps.map((j) => (
                  <a key={j.href} className="text-link" href={j.href}>{j.label[lang]} <Icon name="arrow" size={16} /></a>
                ))}
              </nav>
            </div>

            <div className="photo-frame photo-frame-portrait min-w-0">
              {/* objectPosition：照片焦点，保证窄框里律师在画面内 */}
              <Image src={hero.image} alt={hero.imageAlt[lang]} fill preload sizes="40vw" style={{ objectPosition: "30% 25%" }} />
            </div>
          </div>

          <ul className="points">
            {hero.points.map((p) => (
              <li key={p.icon} className="min-w-0">
                <strong><Icon name={p.icon} /> {p.title[lang]}</strong>
                <p>{p.desc[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ ② 服务范围 ═════════
          每张卡片连到该服务自己的页面（/zh/服务代号），服务清单在 lib/site.ts。 */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <p className="tag">{text.services.tag[lang]}</p>
            <h2>{text.services.title[lang]}</h2>
          </div>
          {/* 5 个服务分类（内容在 lib/site.ts）· 卡片比例固定 3:2 */}
          <div className="card-grid">
            {serviceCategories.map((c) => (
              <Link key={c.slug} href={`/${lang}/services/${c.slug}`} className="photo-card">
                {c.image && <Image src={c.image} alt="" fill sizes="(min-width: 860px) 33vw, 100vw" />}
                <div>
                  <h3>{c.title[lang]}</h3>
                  <p>{c.short[lang]}</p>
                </div>
                <span className="btn btn-light btn-sm photo-card-action">{common.readMore[lang]} <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ ③ 我们的团队 ═════════
          手机左右滑，电脑 3 栏（要改栏数：把 [--cols:3] 的数字改掉）。 */}
      <section id="people" className="section section-muted">
        <div className="container">
          <div className="section-head">
            <p className="tag">{people.tag[lang]}</p>
            <h2>{people.title[lang]}</h2>
          </div>
          <div className="scroll-row [--cols:3]">
            {team.filter((p) => roles[p.role].group !== "support").map((p) => (
              <Link key={p.slug} href={`/${lang}/people/${p.slug}`} className="person-card">
                <div className="person-photo">
                  {p.image ? <Image src={p.image} alt={displayName(p, lang)} fill sizes="(min-width: 860px) 33vw, 80vw" /> : initials(p.name)}
                </div>
                <h3>{displayName(p, lang)}</h3>
                <strong>{roles[p.role].label[lang]}</strong>
                <p>{cityOf(p).full[lang]} · {p.languages[lang]}</p>
              </Link>
            ))}
          </div>
          <p className="scroll-hint">{people.swipe[lang]}</p>
        </div>
      </section>

      {/* ═════════ ④ 联系我们 ═════════
          城市按钮：选中的变黑底，只显示该城市的办事处。新增办事处或城市：只改 lib/site.ts。 */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-head">
            <p className="tag">{contact.tag[lang]}</p>
            <h2>{contact.title[lang]}</h2>
            <p>{firm.hours[lang]}</p>
          </div>

          {/* 选城市：选中的变黑底，下面只显示该城市的办事处（不需要 JavaScript） */}
          <div className="tabs" style={{ "--tabs": cities.length } as React.CSSProperties}>
            {cities.map((c, i) => (
              <div key={c.id} className="tab">
                <input type="radio" name="office-city" id={`city-${c.id}`} defaultChecked={i === 0} />
                <label htmlFor={`city-${c.id}`} className="chip">
                  {c.label[lang]} <em>{offices.filter((o) => o.city === c.id).length}</em>
                </label>
                <div className="tab-panel">
                  <div className="card-grid">
                    {offices.filter((o) => o.city === c.id).map((o) => (
                      <div key={o.address} className="card">
                        <h3>{o.name[lang]}</h3>
                        <p>{o.address}</p>
                        <p>{o.phoneDisplay}</p>
                        <div className="btn-row">
                          <a className="btn btn-ghost btn-sm" href={`tel:${o.phone}`}>{common.call[lang]}</a>
                          <a className="btn btn-ghost btn-sm" href={mapsLink(o.address)} target="_blank" rel="noopener">{common.directions[lang]}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
