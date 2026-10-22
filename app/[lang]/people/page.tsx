// ═══════════════════════════════════════════════════════════════
// 律师团队 /people
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 主管合伙人的话 + 按钮「认识我们的团队」（照片满版靠右、引言在左；手机照片在上。跟首页首屏同一个积木 .hero）
// 这一页只做「先认识律所的人」：完整的成员名单在 /people/all（按职位折叠）。
// 成员资料、职位都在 lib/site.ts（team、roles）；这里只放这一页的文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { common, displayName, isLang, pageMeta, roles, team } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  // ① 标题
  heading: { zh: "在人生转折的时候，\n陪在你身边的人。", en: "The people beside you\nthrough a difficult chapter." },
  lead: {
    zh: "我们的家事律师在新山、八打灵再也和马六甲。联系我们之前，先认识会处理你案件的人。",
    en: "Family lawyers in Johor Bahru, Petaling Jaya and Melaka. Get to know who will handle your matter before you get in touch.",
  },
  // ② 主管合伙人的话（照片、名字取自 team 里的 Managing Partner；照片规格：横向 2400 × 1350，人放在右边三分之一、左边留白放字）
  message: {
    quote: { zh: "[主管合伙人想对客户说的话，两三句，由本人确认]", en: "[A short message to clients from the Managing Partner, two or three sentences, confirmed by them]" },
    image: null as string | null, // 放进 public/images/people/ 后填 "/images/people/文件名.png"
    cta: { zh: "认识我们的团队", en: "See All Our People" },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/people">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/people", common.people[lang], text.lead[lang]);
}

export default async function PeoplePage({ params }: PageProps<"/[lang]/people">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const md = team.find((p) => p.role === "managing-partner");

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li aria-current="page">{common.people[lang]}</li>
          </ol>
          <h1>{text.heading[lang]}</h1>
          <p>{text.lead[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 主管合伙人的话 + 认识我们的团队 ═══ */}
      <section className="hero">
        <div className="hero-photo">
          {md && text.message.image && <Image src={text.message.image} alt={displayName(md, lang)} fill sizes="100vw" />}
        </div>
        <div className="container hero-body">
          {md && (
            <figure className="quote">
              <blockquote><p>{text.message.quote[lang]}</p></blockquote>
              <figcaption>— {displayName(md, lang)} · {roles[md.role].label[lang]}</figcaption>
            </figure>
          )}
          <div className="btn-row">
            <Link className="btn btn-ghost btn-next" href={`/${lang}/people/all`}>{text.message.cta[lang]}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
