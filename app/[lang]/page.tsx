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
import { Icon, OfficeTabs, PersonCard, PhotoCard, type IconName } from "@/lib/blocks";
import { HeaderOverHero } from "@/lib/interactive";
import { cities, common, isLang, pageMeta, roles, serviceCategories, structuredData, team, type Bi, type Lang } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  meta: {
    title: { zh: "离婚与家事法律 | Chai & Associates 律师事务所", en: "Divorce & Family Law in Malaysia | Chai & Associates" },
    description: {
      zh: "专注离婚与家事法律：协议离婚、单方面离婚、抚养权、赡养费与财产分割。新山 · 雪兰莪 · 马六甲。",
      en: "Divorce and family law in Malaysia — joint and single petitions, custody, maintenance and division of assets. Johor Bahru · Selangor · Melaka.",
    },
  },

  // ① 首屏
  hero: {
    title: { zh: "专注家事法律，\n陪你走过人生转折", en: "Family law,\nhandled with care." },
    sub: {
      zh: "离婚、抚养权、赡养费与财产分割，我们用清楚易懂的方式陪你处理每一步。",
      en: "Divorce, custody, maintenance and division of assets — explained clearly and handled with you, step by step.",
    },
    cta: { zh: "了解我们的服务", en: "Explore Our Services" },
    image: "/images/hero/hero-bg-v6.png",
    imageAlt: { zh: "律师与客户进行咨询", en: "A lawyer in a consultation with a client" },
    // 首屏下方的重点（图示可选 award / chat / lock / update，或在 lib/blocks.tsx 的 Icon 加新的）。不写收费：每个案件不同，由律师在咨询时说明
    points: [
      // 任何尺寸都一排 4 个：英文只用一个字（320 宽每格约 70px）
      { icon: "award", title: { zh: "多年经验", en: "Experience" } },
      { icon: "chat", title: { zh: "在线咨询", en: "Online" } },
      { icon: "lock", title: { zh: "隐私保密", en: "Privacy" } },
      { icon: "update", title: { zh: "主动跟进", en: "Updates" } }, // 律所的承诺：进度有变会主动告诉客户（见我们的理念「有时限」）
    ] as { icon: IconName; title: Bi }[],
  },

  // ② 服务范围（服务清单本身在 lib/site.ts）
  services: {
    title: { zh: "服务范围", en: "Our Services" },
  },

  // ③ 我们的团队（成员资料在 lib/site.ts 的 team）
  people: {
    title: { zh: "我们的团队", en: "Our People" },
    swipe: { zh: "← 左右滑动 →", en: "← Swipe →" },
  },

  // ④ 联系我们（办事处资料在 lib/site.ts）
  contact: {
    title: { zh: "联系我们", en: "Contact Us" },
  },
};

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
      {/* 给 Google 看的律所与办事处资料（画面上看不到） */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(lang) }} />

      {/* ═════════ ① 首屏 ═════════
          电脑：照片满版、靠右对齐（缩放时右边的人不会被切掉），小标签 → 标题 → 说明 → 按钮放左边；
          手机：照片在上，文字在下。下面接重点。照片换成律所真实照片时，只改上面 text.hero.image。 */}
      <section className="hero hero-top">
        <HeaderOverHero />
        <div className="hero-photo">
          <Image src={hero.image} alt={hero.imageAlt[lang]} fill preload sizes="100vw" />
        </div>
        <div className="container hero-body">
          <p className="tag">{cities.map((c) => (lang === "zh" ? c.label : c.full)[lang]).join(" · ")}</p>
          <h1>{hero.title[lang]}</h1>
          <p>{hero.sub[lang]}</p>
          <div className="btn-row">
            <Link className="btn btn-outline" href={`/${lang}/services`}>
              {hero.cta[lang]} <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <div className="container hero-intro">
        <ul className="points">
          {hero.points.map((p) => <li key={p.icon}><Icon name={p.icon} /> {p.title[lang]}</li>)}
        </ul>
      </div>

      {/* ═════════ ② 服务范围 ═════════
          每张卡片连到该服务自己的页面（/zh/服务代号），服务清单在 lib/site.ts。 */}
      <section id="services" className="section">
        <div className="container">
          <div className="section-head">
            <h2>{text.services.title[lang]}</h2>
          </div>
          {/* 5 个服务分类（内容在 lib/site.ts）· 卡片比例固定 3:2 */}
          <div className="card-grid">
            {serviceCategories.map((c) => (
              <PhotoCard key={c.slug} href={`/${lang}/services/${c.slug}`} image={c.image} title={c.title[lang]} desc={c.short[lang]} action={common.viewService[lang]} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════ ③ 我们的团队 ═════════
          手机左右滑，电脑 3 栏（滑动列积木的默认栏数）。 */}
      <section id="people" className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{people.title[lang]}</h2>
          </div>
          <div className="scroll-row">
            {team.filter((p) => roles[p.role].group !== "support").map((p) => (
              <PersonCard key={p.slug} p={p} lang={lang} sizes="(min-width: 768px) 33vw, 80vw" />
            ))}
          </div>
          <p className="scroll-hint">{people.swipe[lang]}</p>
        </div>
      </section>

      {/* ═════════ ④ 联系我们 ═════════
          城市按钮 + 办事处卡片：跟办事处页共用 lib/blocks.tsx 的 OfficeTabs。新增办事处或城市：只改 lib/site.ts。 */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-head"><h2>{contact.title[lang]}</h2></div>

          <OfficeTabs lang={lang} />
        </div>
      </section>
    </>
  );
}
