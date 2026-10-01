// ═══════════════════════════════════════════════════════════════
// 离婚百科文章 /divorcepedia/[slug]（所有文章共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题（一句话重点）
//          ② 文章 + 相关服务 + 法律声明（左）+ 问律师（右侧栏；手机排在下面）
//          ③ 同一个分类的其他文章
// 文章内容在 lib/divorcepedia.ts；这里只放这一页的固定文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/divorcepedia";
import { common, disclaimer, isLang, pageMeta, serviceCategories, services, whatsappLink, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  pedia: { zh: "离婚百科", en: "Divorcepedia" },
  services: { zh: "相关服务", en: "Related services" },
  // ② 侧栏
  ask: {
    title: { zh: "你的情况不一样？", en: "Is your situation different?" },
    desc: { zh: "文章只是一般说明。WhatsApp 我们，律师会根据你的情况告诉你可以怎么做。", en: "This article is general information. Message us on WhatsApp and a lawyer will advise on your situation." },
    message: { zh: "你好，我看了「{title}」，想咨询我的情况。", en: "Hi, I read \"{title}\" and would like to ask about my situation." },
  },
  // ③ 同分类文章
  more: { zh: "更多关于{category}", en: "More on {category}" },
};

// 预先生成所有文章；不在清单里的网址 → 404
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/divorcepedia/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!isLang(lang) || !a) return {};
  return pageMeta(lang, `/divorcepedia/${a.slug}`, a.title[lang], a.summary[lang]);
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/divorcepedia/[slug]">) {
  const { lang, slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!isLang(lang) || !a) notFound();
  const c = serviceCategories.find((x) => x.slug === a.category)!;
  const related = services.filter((s) => a.services.includes(s.slug));
  const more = articles.filter((x) => x.category === a.category && x.slug !== a.slug);
  const fill = (t: Bi) => t[lang].replace("{title}", a.title[lang]).replace("{category}", c.title[lang]);

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/divorcepedia`}>{text.pedia[lang]}</Link></li>
            <li aria-current="page">{a.title[lang]}</li>
          </ol>
          <h1>{a.title[lang]}</h1>
          <p>{a.summary[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 文章（左）+ 问律师（右侧栏） ═══ */}
      <section className="section">
        <div className="container with-aside">
          <div className="stack">
            <article className="prose">
              {a.body.map((b, i) =>
                "h2" in b ? <h2 key={i}>{b.h2[lang]}</h2>
                : "p" in b ? <p key={i}>{b.p[lang]}</p>
                : <ul key={i}>{b.list.map((li) => <li key={li.en}>{li[lang]}</li>)}</ul>,
              )}
            </article>
            {related.length > 0 && (
              <div>
                <div className="list-head"><h2>{text.services[lang]}</h2></div>
                <div className="btn-row">
                  {related.map((s) => <Link key={s.slug} className="chip" href={`/${lang}/services/${s.category}/${s.slug}`}>{s.title[lang]} →</Link>)}
                </div>
              </div>
            )}
            <p className="muted">{disclaimer[lang]}</p>
          </div>
          <aside>
            <div>
              <h3>{text.ask.title[lang]}</h3>
              <p>{text.ask.desc[lang]}</p>
            </div>
            <a className="btn btn-cta" href={whatsappLink(lang, fill(text.ask.message))} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
          </aside>
        </div>
      </section>

      {/* ═══ ③ 同一个分类的其他文章 ═══ */}
      {more.length > 0 && (
        <section className="section section-muted">
          <div className="container">
            <div className="list-head">
              <h2>{fill(text.more)}</h2>
              <Link className="text-link" href={`/${lang}/divorcepedia`}>{text.pedia[lang]} →</Link>
            </div>
            <div className="card-grid">
              {more.slice(0, 3).map((m) => (
                <Link key={m.slug} href={`/${lang}/divorcepedia/${m.slug}`} className="card card-link reveal">
                  <h3>{m.title[lang]}</h3>
                  <p>{m.summary[lang]}</p>
                  <span className="text-link">{common.readMore[lang]} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
