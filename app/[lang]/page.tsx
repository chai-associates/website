// ═══════════════════════════════════════════════════════════════
// 首页 Landing page：这一页所有的区块和内容都在这个文件
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 首屏  ② 服务范围  ③ 我们的团队  ④ 联系我们
//   用 Cmd + F 搜「① 首屏」等标题就能跳到该区块。
// 样式规则：
// · 颜色 / 字号 / 间距 只用 tokens（例如 text-ink-muted、text-lead、gap-4、md:gap-12）
//   字号是流体的，会跟着荧幕大小自动缩放，不需要另外写手机版 / 电脑版字号
// · 共用积木（按钮、卡片、照片卡片、滑动列）来自 globals.css
// · 只属于这一页的调整（几栏、比例、位置）直接写在下面的 className
// 律所资料、服务清单、办事处来自 lib/site.ts（全站共用）。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cities, firm, initials, isLang, mapsLink, offices, roles, serviceCategories, team, whatsappLink, type Lang } from "@/lib/site";

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
    cta: { zh: "预约咨询", en: "Get in Touch" },
    jumps: [
      { href: "#services", label: { zh: "查看服务范围", en: "Our services" } },
      { href: "#people", label: { zh: "认识我们的团队", en: "Meet our people" } },
      { href: "#contact", label: { zh: "联系我们", en: "Find an office" } },
    ],
    image: "/images/hero/hero-bg.jpg",
    imageAlt: { zh: "律师与客户进行咨询", en: "A lawyer in a consultation with a client" },
    points: [
      { icon: "award", title: { zh: "多年经验", en: "Experienced" }, desc: { zh: "专注离婚与家事案件，熟悉每一个程序。", en: "Focused on divorce and family matters." } },
      { icon: "receipt", title: { zh: "收费透明", en: "Clear fees" }, desc: { zh: "开始之前先说明费用，清楚明白。", en: "Costs explained before we begin." } },
      { icon: "lock", title: { zh: "隐私保密", en: "Confidential" }, desc: { zh: "所有咨询内容都严格保密。", en: "Every conversation stays private." } },
    ],
  },

  // ② 服务范围（服务清单本身在 lib/site.ts）
  services: {
    tag: { zh: "服务范围", en: "Our services" },
    title: { zh: "我们可以怎么帮你", en: "How we can help" },
    more: { zh: "了解", en: "Learn more" },
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
    call: { zh: "致电", en: "Call" },
    directions: { zh: "导航", en: "Directions" },
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
  return {
    title: { absolute: text.meta.title[l] },
    description: text.meta.description[l],
    alternates: { languages: { zh: "/zh", en: "/en" } },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "zh";
  const { hero, people, contact } = text;

  return (
    <>
      {/* ═════════ ① 首屏 ═════════
          占满第一个画面（扣掉页首），底部让出浮动 WhatsApp 按钮的位置。
          左文字 : 右照片 = 1.618 : 1（黄金比例），手机和电脑都左右并排。 */}
      <section className="flex min-h-[calc(100svh-var(--header-h))] py-6">
        <div className="container flex flex-col gap-8">
          <div className="grid flex-1 grid-cols-[1.618fr_1fr] gap-3 md:gap-12">
            <div className="flex min-w-0 flex-col justify-center">
              <h1>{hero.title[lang]}</h1>
              <p className="muted mt-3 text-lead">{hero.sub[lang]}</p>
              <div className="mt-6">
                <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">
                  {hero.cta[lang]} <Icon name="arrow" size={18} />
                </a>
              </div>
              <nav className="mt-3 flex flex-col items-start md:flex-row md:gap-6" aria-label={lang === "zh" ? "快速跳转" : "Jump to"}>
                {hero.jumps.map((j) => (
                  <a key={j.href} className="text-link text-small" href={j.href}>{j.label[lang]} <Icon name="arrow" size={16} /></a>
                ))}
              </nav>
            </div>

            <div className="photo-frame min-w-0">
              {/* objectPosition：照片焦点，保证手机窄框里律师在画面内 */}
              <Image src={hero.image} alt={hero.imageAlt[lang]} fill preload sizes="40vw" style={{ objectPosition: "30% 25%" }} />
            </div>
          </div>

          <ul className="grid grid-cols-3 gap-4 border-y border-line py-5 md:gap-16">
            {hero.points.map((p) => (
              <li key={p.icon} className="min-w-0">
                <p className="flex flex-col gap-1 text-body font-semibold md:flex-row md:items-center md:gap-2"><Icon name={p.icon} /> {p.title[lang]}</p>
                <p className="muted mt-2 text-caption">{p.desc[lang]}</p>
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
              <Link key={c.slug} href={`/${lang}/services/${c.slug}`} className="photo-card aspect-[3/2]">
                {c.image && <Image src={c.image} alt="" fill sizes="(min-width: 860px) 33vw, 100vw" />}
                <div>
                  <h3>{c.title[lang]}</h3>
                  <p className="mt-1 text-small">{c.short[lang]}</p>
                </div>
                <span className="btn btn-light btn-sm photo-card-action">{text.services.more[lang]} <Icon name="arrow" size={16} /></span>
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
              <article key={p.slug} className="person-card">
                <div className="person-photo">
                  {p.image ? <Image src={p.image} alt={p.name[lang]} fill sizes="(min-width: 860px) 33vw, 80vw" /> : initials(p.name)}
                </div>
                <h3>{p.name[lang]}</h3>
                <strong>{roles[p.role].label[lang]}</strong>
                <p>{cities.find((c) => c.id === p.city)?.label[lang]} · {p.languages[lang]}</p>
              </article>
            ))}
          </div>
          <p className="muted mt-3 text-caption md:hidden">{people.swipe[lang]}</p>
        </div>
      </section>

      {/* ═════════ ④ 联系我们 ═════════
          城市按钮：选中的变黑底，只显示该城市的办事处。新增办事处或城市：只改 lib/site.ts。 */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-head">
            <p className="tag">{contact.tag[lang]}</p>
            <h2>{contact.title[lang]}</h2>
            <p className="muted mt-2 text-lead">{firm.hours[lang]}</p>
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
                        <p className="font-semibold">{o.name[lang]}</p>
                        <p className="muted mt-1 text-small">{o.address}</p>
                        <p className="mt-1 text-small">{o.phoneDisplay}</p>
                        <div className="mt-4 flex gap-2">
                          <a className="btn btn-ghost btn-sm flex-1" href={`tel:${o.phone}`}>{contact.call[lang]}</a>
                          <a className="btn btn-ghost btn-sm flex-1" href={mapsLink(o.address)} target="_blank" rel="noopener">{contact.directions[lang]}</a>
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
