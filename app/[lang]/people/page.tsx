// ═══════════════════════════════════════════════════════════════
// 律师团队 /people
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 办事处筛选 + 3 组成员（合伙人与顾问律师 / 律师 / 法律支援团队）
//          ③ 不确定该找谁？
// 成员资料、职位、分组都在 lib/site.ts（team、roles、teamGroups）；这里只放这一页的文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeamFilter } from "@/lib/interactive";
import { cities, cityOf, common, displayName, initials, isLang, pageMeta, roles, team, teamGroups, whatsappLink } from "@/lib/site";

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
  // ② 筛选
  filter: { zh: "办事处", en: "Office" },
  all: { zh: "全部", en: "All offices" },
  count: { zh: "{n} 位", en: "{n} people" },
  // ③ 不确定该找谁？
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

      {/* ═══ ② 办事处筛选 + 成员 ═══ */}
      <section className="section">
        <div className="container">
          <TeamFilter
            label={text.filter[lang]}
            allLabel={text.all[lang]}
            countLabel={text.count[lang]}
            cities={cities.map((c) => ({ id: c.id, label: c.label[lang] }))}
            groups={teamGroups.map((g) => ({
              title: g.title[lang],
              people: team.filter((p) => roles[p.role].group === g.id).map((p) => ({
                key: p.slug,
                href: `/${lang}/people/${p.slug}`,
                city: cityOf(p).id,
                image: p.image,
                initials: initials(p.name),
                name: displayName(p, lang),
                role: roles[p.role].label[lang],
                meta: `${cityOf(p).full[lang]} · ${p.languages[lang]}`,
              })),
            }))}
          />
        </div>
      </section>

      {/* ═══ ③ 不确定该找谁？（浅灰） ═══ */}
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
