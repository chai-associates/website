// ═══════════════════════════════════════════════════════════════
// 关于我们的子页面 /about/[section]（媒体报道、公益活动、活动与讲座共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 清单（卡片：小标签「年份 · 来源或地点」→ 标题 → 说明 → 链接）
//          ③ 想先聊聊你的情况？
// 三个页面的名称在 lib/site.ts（aboutSections，选单也读那里）；每一页的内容写在下面 text.sections。
// 清单是空的就显示「内容准备中」。对应「律所问卷」Tab 6–8。
// ⚠ 律师公会宣传规定：只列报道 / 活动的事实（名称、来源、日期、链接），不转贴称赞律所的内容、不写案件结果。
// ⚠ 中括号 [ ] 里的都是占位，等问卷回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aboutSections, common, isLang, pageMeta, whatsappLink, type AboutSection, type Bi } from "@/lib/site";

// 一项：date = 年份或年月；source = 媒体名称、合作单位或地点；href = 外部链接（报道原文、活动页面），没有就不填
type Entry = { date: string; source: Bi; title: Bi; desc?: Bi; href?: string };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  about: { zh: "关于我们", en: "About Us" },
  sections: {
    media: {
      lead: { zh: "[一句话：律所律师接受访问、发表意见的媒体报道]", en: "[One line: interviews and commentary by our lawyers in the media]" },
      link: { zh: "阅读报道", en: "Read the article" },
      list: [
        { date: "[YYYY]", source: { zh: "[媒体名称]", en: "[Publication]" }, title: { zh: "[报道标题]", en: "[Article title]" }, href: "#" },
        { date: "[YYYY]", source: { zh: "[媒体名称]", en: "[Publication]" }, title: { zh: "[报道标题]", en: "[Article title]" }, href: "#" },
      ],
    },
    community: {
      lead: { zh: "[一句话：律所参与的公益活动与义务法律服务]", en: "[One line: the firm's community work and pro bono activities]" },
      link: { zh: "查看详情", en: "View details" },
      list: [
        { date: "[YYYY]", source: { zh: "[合作单位]", en: "[Partner organisation]" }, title: { zh: "[活动名称]", en: "[Activity]" }, desc: { zh: "[一两句说明做了什么]", en: "[One or two lines on what was done]" } },
      ],
    },
    events: {
      lead: { zh: "[一句话：律所举办或受邀主讲的讲座与活动]", en: "[One line: talks and events hosted by or featuring our lawyers]" },
      link: { zh: "查看详情", en: "View details" },
      list: [
        { date: "[YYYY]", source: { zh: "[地点或主办单位]", en: "[Venue or organiser]" }, title: { zh: "[讲座或活动名称]", en: "[Talk or event]" }, desc: { zh: "[一两句说明主题与讲者]", en: "[One or two lines on the topic and speaker]" } },
      ],
    },
  } as Record<AboutSection, { lead: Bi; link: Bi; list: Entry[] }>,
  pending: { zh: "内容正在准备中。", en: "Content is being prepared." },
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Message us on WhatsApp. A lawyer will understand your situation and explain your options." },
  },
};

// 预先生成三个子页面；不在清单里的网址 → 404
export const dynamicParams = false;
export function generateStaticParams() {
  return aboutSections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/about/[section]">): Promise<Metadata> {
  const { lang, section } = await params;
  const s = aboutSections.find((x) => x.slug === section);
  if (!isLang(lang) || !s) return {};
  return pageMeta(lang, `/about/${s.slug}`, s.title[lang], text.sections[s.slug].lead[lang]);
}

export default async function AboutSectionPage({ params }: PageProps<"/[lang]/about/[section]">) {
  const { lang, section } = await params;
  const s = aboutSections.find((x) => x.slug === section);
  if (!isLang(lang) || !s) notFound();
  const content = text.sections[s.slug];

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/about`}>{text.about[lang]}</Link></li>
            <li aria-current="page">{s.title[lang]}</li>
          </ol>
          <h1>{s.title[lang]}</h1>
          <p>{content.lead[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 清单 ═══ */}
      <section className="section">
        <div className="container">
          {content.list.length > 0 ? (
            <div className="card-grid">
              {content.list.map((e, i) => (
                <article key={`${e.title.en}-${i}`} className="card reveal">
                  <span className="tag">{e.date} · {e.source[lang]}</span>
                  <h3>{e.title[lang]}</h3>
                  {e.desc && <p>{e.desc[lang]}</p>}
                  {e.href && <a className="text-link" href={e.href} target="_blank" rel="noopener">{content.link[lang]} →</a>}
                </article>
              ))}
            </div>
          ) : (
            <p className="muted">{text.pending[lang]}</p>
          )}
        </div>
      </section>

      {/* ═══ ③ 想先聊聊你的情况？（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{text.ask.title[lang]}</h2>
            <p>{text.ask.desc[lang]}</p>
          </div>
          <div className="btn-row">
            <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
            <Link className="text-link" href={`/${lang}/about`}>{text.about[lang]} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
