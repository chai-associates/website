// ═══════════════════════════════════════════════════════════════
// 离婚百科文章 /divorcepedia/[slug]（所有文章共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 百科 = 读文章的感觉（服务页才有侧栏表格）：封面照片 + 一栏正文、不放侧栏。
// 色带顺序：① 面包屑 → 满版照片 → 白色标题框叠在照片下缘（标题 + 一句话重点；右边资料栏：分类 · 法律依据）（白；lib/blocks.tsx 的 CoverHead）
//            法律依据：一条法令一项 → 小字：引用的条文 · 法律最近修订生效日期 · 资料来源（连到总检察署的法律资料库）
//          ② 文章：一栏，行宽固定（白，接在标题下面）
//          ③ 想请律师帮你办？：问律师按钮 → 下面一行一个「查看 X 服务」（浅灰）
//          ④ 同一个分类的其他文章（白）
// 法律声明在页尾（全站共用），这里不再重复。
// 文章内容在 lib/divorcepedia.ts；这里只放这一页的固定文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultButton } from "@/lib/interactive";
import { CoverHead } from "@/lib/blocks";
import { articles, lawsPortal } from "@/lib/divorcepedia";
import { common, isLang, pageMeta, serviceCategories, services, whatsappLink, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  pedia: { zh: "离婚百科", en: "Divorcepedia" },
  // ① 资料栏
  category: { zh: "分类", en: "Category" },
  law: { zh: "法律依据", en: "Legislation" },
  inForce: { zh: "法律最近修订生效", en: "Latest amendment in force" },
  source: { zh: "资料来源", en: "Source" },
  // ③ 读完 → 交给律师 / 去看服务：连结一律用动词开头
  handoff: {
    title: { zh: "想请律师帮你办？", en: "Want a lawyer to handle this?" },
    desc: { zh: "每个案件都不一样。律师会根据你的情况，告诉你可以怎么做。", en: "Every case is different. A lawyer will explain what you can do in your situation." },
  },
  message: { zh: "你好，我看了「{title}」，想咨询我的情况。", en: "Hi, I read \"{title}\" and would like to ask about my situation." }, // 咨询表格的讯息第一句：预先填好文章名称
  viewService: { zh: "查看{service}服务", en: "View {service} service" },
  // ④ 同分类文章
  browse: { zh: "浏览全部百科", en: "Browse All Articles" },
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
  const sep = lang === "zh" ? "：" : ": ";
  // 中文里「第 53 条」「2 年」这类数字和单位之间的空格换成不换行空格，数字不会跟单位拆到两行
  const keep = (t: string) => (lang === "zh" ? t.replace(/ (?=[\d(])|(?<=[\d)]) /g, "\u00a0") : t);

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <CoverHead
        crumbs={<>
          <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
          <li><Link href={`/${lang}/divorcepedia#${a.category}`}>{text.pedia[lang]}</Link></li>
          <li aria-current="page">{a.title[lang]}</li>
        </>}
        image={a.image ?? null}
        title={a.title[lang]}
        lead={a.summary[lang]}
        aside={
          <dl className="facts">
            <div><dt>{text.category[lang]}</dt><dd>{c.title[lang]}</dd></div>
            {a.law && (
              <div>
                <dt>{text.law[lang]}</dt>
                <dd>
                  <ul>
                    {a.law.map((l) => (
                      <li key={l.act.name.en}>
                        {l.act.name[lang]}{l.sections && ` — ${l.sections[lang]}`}
                        <p>{text.inForce[lang]}{sep}{l.act.inForce[lang]}</p>
                        <p>{text.source[lang]}{sep}<a href={lawsPortal} target="_blank" rel="noopener">{l.act.source[lang]}</a></p>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        }
      />

      {/* ═══ ② 文章：一栏（白） ═══ */}
      <section className="section">
        <div className="container">
          <article className="prose">
            {a.body.map((b, i) =>
              "h2" in b ? <h2 key={i}>{keep(b.h2[lang])}</h2>
              : "p" in b ? <p key={i}>{keep(b.p[lang])}</p>
              : <ul key={i}>{b.list.map((li) => <li key={li.en}>{keep(li[lang])}</li>)}</ul>,
            )}
          </article>
        </div>
      </section>

      {/* ═══ ③ 想请律师帮你办？（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{text.handoff.title[lang]}</h2>
            <p>{text.handoff.desc[lang]}</p>
          </div>
          <ConsultButton className="btn btn-cta" href={whatsappLink(lang, fill(text.message))} intro={fill(text.message)}>{common.askLawyer[lang]}</ConsultButton>
          {related.length > 0 && (
            <ul className="link-list">
              {related.map((r) => <li key={r.slug}><Link href={`/${lang}/services/${r.category}/${r.slug}`}>{text.viewService[lang].replace("{service}", r.title[lang])}</Link></li>)}
            </ul>
          )}
        </div>
      </section>

      {/* ═══ ④ 同一个分类的其他文章（白） ═══ */}
      {more.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="list-head">
              <h2>{fill(text.more)}</h2>
              <Link className="text-link" href={`/${lang}/divorcepedia#${a.category}`}>{text.browse[lang]} →</Link>
            </div>
            <div className="card-grid">
              {more.slice(0, 3).map((m) => (
                <Link key={m.slug} href={`/${lang}/divorcepedia/${m.slug}`} className="photo-card reveal">
                  {m.image && <Image src={m.image} alt="" fill sizes="(min-width: 860px) 33vw, 100vw" />}
                  <div>
                    <h3>{m.title[lang]}</h3>
                    <p>{m.summary[lang]}</p>
                  </div>
                  <span className="btn btn-light btn-sm photo-card-action">{common.readArticle[lang]} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
