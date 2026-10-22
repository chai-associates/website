// ═══════════════════════════════════════════════════════════════
// 律师团队 /people
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 主管合伙人的话（照片满版靠右、引言在左；手机照片在上。跟首页首屏同一个积木 .hero；不放按钮）
//          ③ 3 组成员（合伙人与顾问律师 / 律师 / 法律支援团队）：全部折叠，点开才看到人  ④ 不确定该找谁？
// 不放办事处筛选：每个人的卡片已经写了城市；访客先选「找哪一类人」，不用一次看完所有人。
// 成员资料、职位、分组都在 lib/site.ts（team、roles、teamGroups）；这里只放这一页的文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cityOf, common, displayName, initials, isLang, pageMeta, roles, team, teamGroups, whatsappLink } from "@/lib/site";

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
  // ② 主管合伙人的话（照片、名字取自 team 里的 Managing Partner；照片规格：横向 2400 × 1350，人放在右边三分之一）
  message: {
    quote: { zh: "[主管合伙人想对客户说的话，两三句，由本人确认]", en: "[A short message to clients from the Managing Partner, two or three sentences, confirmed by them]" },
    image: null as string | null, // 放进 public/images/people/ 后填 "/images/people/文件名.png"
  },
  // ③ 每一组的人数
  count: { zh: "{n} 位", en: "{n} people" },
  // ④ 不确定该找谁？
  ask: {
    title: { zh: "不确定该找哪位律师？", en: "Not sure who to speak to?" },
    desc: { zh: "告诉我们你的情况，我们会安排离你最近、最合适的律师。所有咨询内容都保密。", en: "Tell us a little about your situation and we'll match you with the right lawyer at the office nearest you. Every enquiry is confidential." },
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

      {/* ═══ ② 主管合伙人的话 ═══ */}
      {md && (
        <section className="hero">
          <div className="hero-photo">
            {text.message.image && <Image src={text.message.image} alt={displayName(md, lang)} fill sizes="100vw" />}
          </div>
          <div className="container hero-body">
            <figure className="quote">
              <blockquote><p>{text.message.quote[lang]}</p></blockquote>
              <figcaption>— {displayName(md, lang)} · {roles[md.role].label[lang]}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ═══ ③ 成员：每一组折叠 ═══ */}
      <section className="section">
        <div className="container">
          {teamGroups.map((g) => {
            const people = team.filter((p) => roles[p.role].group === g.id);
            if (people.length === 0) return null;
            return (
              <details key={g.id} className="fold">
                <summary>
                  <h2>{g.title[lang]}</h2>
                  <span>{text.count[lang].replace("{n}", String(people.length))}</span>
                </summary>
                <div className="person-grid">
                  {people.map((p) => (
                    <Link key={p.slug} href={`/${lang}/people/${p.slug}`} className="person-card">
                      <div className="person-photo">
                        {p.image ? <Image src={p.image} alt={displayName(p, lang)} fill sizes="(min-width: 860px) 16vw, 50vw" /> : initials(p.name)}
                      </div>
                      <h3>{displayName(p, lang)}</h3>
                      <strong>{roles[p.role].label[lang]}</strong>
                      <p>{cityOf(p).full[lang]} · {p.languages[lang]}</p>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* ═══ ④ 不确定该找谁？（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{text.ask.title[lang]}</h2>
            <p>{text.ask.desc[lang]}</p>
          </div>
          <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
        </div>
      </section>
    </>
  );
}
