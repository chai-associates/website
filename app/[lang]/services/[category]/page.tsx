// ═══════════════════════════════════════════════════════════════
// 分类页 /services/[category]（5 个分类共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 色带顺序：① 标题（白）  ② 这一类的服务卡片（白，接在标题下面；不另加标题）  ③ 不是你的情况？（浅灰）
// 分类名称、服务清单在 lib/site.ts；每个分类的介绍写在下面 text.intro。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { common, isLang, pageMeta, serviceCategories, services, whatsappLink, type Bi, type ServiceCategory } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  // ① 每个分类的介绍（一两句，让用户确认「对，这是我的情况」）
  intro: {
    "divorce": {
      zh: "无论是双方同意，还是对方不同意、已经提出申请，我们陪你走完离婚程序的每一步。",
      en: "Whether you both agree, your spouse won't, or they've already filed, we'll guide you through each step of the divorce.",
    },
    "children": {
      zh: "孩子跟谁住、多久见一次、生活费怎么算，法庭最看重的是孩子的福祉。",
      en: "Where the children live, how often they see each parent and how their needs are met. The court's focus is always their welfare.",
    },
    "finances": {
      zh: "房子、存款、公积金和赡养费怎么分，取决于双方的贡献和婚姻的情况。",
      en: "How your home, savings, EPF and maintenance are dealt with depends on each party's contribution and the marriage itself.",
    },
    "after-divorce": {
      zh: "离婚令下来之后，对方不遵守、情况改变，或需要更新婚姻状况，都可以处理。",
      en: "When an order isn't followed, circumstances change, or your marital status needs updating after divorce.",
    },
    "separation": {
      zh: "还没准备离婚，或需要先保护自己和孩子的安全。",
      en: "When you're not ready to divorce yet, or need to keep yourself and your children safe first.",
    },
  } satisfies Record<ServiceCategory, Bi>,
};

// 预先生成 5 个分类页；不在清单里的网址 → 404
export const dynamicParams = false;
export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  const c = serviceCategories.find((x) => x.slug === category);
  if (!isLang(lang) || !c) return {};
  return pageMeta(lang, `/services/${c.slug}`, c.title[lang], text.intro[c.slug][lang]);
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/services/[category]">) {
  const { lang, category } = await params;
  const c = serviceCategories.find((x) => x.slug === category);
  if (!isLang(lang) || !c) notFound();
  const list = services.filter((s) => s.category === c.slug);

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/services`}>{common.services[lang]}</Link></li>
            <li aria-current="page">{c.title[lang]}</li>
          </ol>
          <h1>{c.title[lang]}</h1>
          <p>{text.intro[c.slug][lang]}</p>
        </div>
      </section>

      {/* ═══ ② 这一类的服务（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {list.map((s) => (
              <Link key={s.slug} href={`/${lang}/services/${c.slug}/${s.slug}`} className="card card-link reveal">
                <h3>{s.title[lang]}</h3>
                <p>{s.short[lang]}</p>
                <span className="text-link">{common.readMore[lang]} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ③ 不是你的情况？（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{common.notYours.title[lang]}</h2>
            <p>{common.notYours.desc[lang]}</p>
          </div>
          <div className="btn-row">
            <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
            <Link className="text-link" href={`/${lang}/services`}>{common.viewAll[lang]} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
