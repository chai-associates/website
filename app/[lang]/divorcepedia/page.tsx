// ═══════════════════════════════════════════════════════════════
// 离婚百科 /divorcepedia（文章列表）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 每个服务分类一组：横线标题（右边连到该分类的服务）+ 文章卡片
//          ③ 想先聊聊你的情况？
// 文章资料在 lib/divorcepedia.ts；分类跟服务一样读 lib/site.ts。没有文章的分类自动隐藏。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/divorcepedia";
import { common, isLang, pageMeta, serviceCategories, whatsappLink } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "离婚百科", en: "Divorcepedia" },
  // ① 标题
  heading: { zh: "离婚前后，\n你会想知道的事。", en: "What you'll want to know,\nbefore and after divorce." },
  lead: { zh: "用简单的话，解释马来西亚非穆斯林离婚的常见问题。", en: "Plain answers to common questions about non-Muslim divorce in Malaysia." },
  // ② 分类
  services: { zh: "相关服务", en: "Related services" },
  // ③ 想先聊聊你的情况？
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "每个案件都不一样。WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Every case is different. Message us on WhatsApp and a lawyer will explain your options." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/divorcepedia">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/divorcepedia", text.title[lang], text.lead[lang]);
}

export default async function DivorcepediaPage({ params }: PageProps<"/[lang]/divorcepedia">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const groups = serviceCategories
    .map((c) => ({ ...c, list: articles.filter((a) => a.category === c.slug) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li aria-current="page">{text.title[lang]}</li>
          </ol>
          <h1>{text.heading[lang]}</h1>
          <p>{text.lead[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 每个分类一组 ═══ */}
      <section className="section">
        <div className="container stack">
          {groups.map((g) => (
            <div key={g.slug} id={g.slug}>
              <div className="list-head">
                <h2>{g.title[lang]}</h2>
                <Link className="text-link" href={`/${lang}/services/${g.slug}`}>{text.services[lang]} →</Link>
              </div>
              <div className="card-grid">
                {g.list.map((a) => (
                  <Link key={a.slug} href={`/${lang}/divorcepedia/${a.slug}`} className="card card-link reveal">
                    <h3>{a.title[lang]}</h3>
                    <p>{a.summary[lang]}</p>
                    <span className="text-link">{common.readMore[lang]} →</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ③ 想先聊聊你的情况？ ═══ */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{text.ask.title[lang]}</h2>
              <p>{text.ask.desc[lang]}</p>
            </div>
            <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
          </div>
        </div>
      </section>
    </>
  );
}
