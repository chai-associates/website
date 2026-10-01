// ═══════════════════════════════════════════════════════════════
// 关于我们 /about（选单「关于我们」的三个子项连到 #firm、#values、#recognitions）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 律所简介（左）+ 律所资料（右侧栏）  ③ 我们的理念
//          ④ 荣誉与认可  ⑤ 我们的团队（前 4 位）  ⑥ 直接咨询
// 办事处、团队资料在 lib/site.ts；这里只放这一页的文字。
// ⚠ 中括号 [ ] 里的都是占位，等律所提供。
// ⚠ 荣誉与认可要符合律师公会的宣传规定（不自夸、不比较）；没有的话把 recognitions 清空，整段会自动隐藏，
//   并记得把选单 layout.tsx 里「荣誉与认可」那一项删掉。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityOf, common, displayName, firm, initials, isLang, offices, roles, team, whatsappLink, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "关于我们", en: "About Us" },
  // ① 标题
  heading: { zh: "专注家事法律的\n律师事务所。", en: "A law firm focused\non family matters." },
  lead: {
    zh: "Chai & Associates 专注处理非穆斯林的离婚与家事案件，在新山、八打灵再也和马六甲设有 5 间办事处。",
    en: "Chai & Associates acts in divorce and family matters for non-Muslims, with five offices across Johor Bahru, Petaling Jaya and Melaka.",
  },
  // ② 律所简介
  firm: {
    title: { zh: "律所简介", en: "Our Firm" },
    paragraphs: [
      { zh: "[第一段：律所成立年份、创办人，以及为什么专注家事法律]", en: "[Paragraph 1: when and by whom the firm was founded, and why it focuses on family law]" },
      { zh: "[第二段：律所处理案件的方式，以及想给客户的感受]", en: "[Paragraph 2: how the firm handles matters and what clients can expect]" },
    ] as Bi[],
  },
  facts: {
    title: { zh: "律所资料", en: "At a glance" },
    offices: { zh: "办事处", en: "Offices" },
    officesValue: { zh: "{n} 间", en: "{n}" },
    cities: { zh: "城市", en: "Cities" },
    practice: { zh: "业务", en: "Practice" },
    practiceValue: { zh: "离婚与家事（非穆斯林）", en: "Divorce & family law (non-Muslim)" },
    hours: { zh: "营业时间", en: "Hours" },
    team: { zh: "认识我们的团队", en: "Meet Our People" },
  },
  // ③ 我们的理念
  values: {
    title: { zh: "我们的理念", en: "Our Values" },
    list: [
      { title: { zh: "[理念 1]", en: "[Value 1]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[理念 2]", en: "[Value 2]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[理念 3]", en: "[Value 3]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
    ] as { title: Bi; desc: Bi }[],
  },
  // ④ 荣誉与认可（清空 list 就会整段隐藏）
  recognitions: {
    title: { zh: "荣誉与认可", en: "Recognitions" },
    list: [
      { title: { zh: "[奖项或认可名称]", en: "[Award or recognition]" }, desc: { zh: "[颁发单位、年份]", en: "[Awarded by, year]" } },
    ] as { title: Bi; desc: Bi }[],
  },
  // ⑤ 我们的团队
  team: { zh: "我们的团队", en: "Our People" },
  allPeople: { zh: "全部成员", en: "All our people" },
  // ⑥ 直接咨询
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Message us on WhatsApp. A lawyer will understand your situation and explain your options." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: text.title[lang], description: text.lead[lang] };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const preview = team.filter((p) => roles[p.role].group !== "support").slice(0, 4);

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

      {/* ═══ ② 律所简介 + 律所资料 ═══ */}
      <section id="firm" className="section section-muted">
        <div className="container with-aside">
          <div>
            <div className="list-head"><h2>{text.firm.title[lang]}</h2></div>
            <div className="prose">{text.firm.paragraphs.map((p) => <p key={p.zh}>{p[lang]}</p>)}</div>
          </div>
          <aside>
            <h3>{text.facts.title[lang]}</h3>
            <dl className="facts">
              <div><dt>{text.facts.offices[lang]}</dt><dd>{text.facts.officesValue[lang].replace("{n}", String(offices.length))}</dd></div>
              <div><dt>{text.facts.cities[lang]}</dt><dd>{cities.map((c) => c.full[lang]).join(" · ")}</dd></div>
              <div><dt>{text.facts.practice[lang]}</dt><dd>{text.facts.practiceValue[lang]}</dd></div>
              <div><dt>{text.facts.hours[lang]}</dt><dd>{firm.hours[lang]}</dd></div>
            </dl>
            <Link className="btn btn-ghost" href={`/${lang}/people`}>{text.facts.team[lang]}</Link>
          </aside>
        </div>
      </section>

      {/* ═══ ③ 我们的理念 + ④ 荣誉与认可 ═══ */}
      <section className="section">
        <div className="container stack">
          <div id="values">
            <div className="list-head"><h2>{text.values.title[lang]}</h2></div>
            <ol className="rule-list">
              {text.values.list.map((v) => <li key={v.title.zh}><h3>{v.title[lang]}</h3><p>{v.desc[lang]}</p></li>)}
            </ol>
          </div>
          {text.recognitions.list.length > 0 && (
            <div id="recognitions">
              <div className="list-head"><h2>{text.recognitions.title[lang]}</h2></div>
              <ul className="rule-list">
                {text.recognitions.list.map((r) => <li key={r.title.zh}><h3>{r.title[lang]}</h3><p>{r.desc[lang]}</p></li>)}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ═══ ⑤ 我们的团队（前 4 位） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="list-head">
            <h2>{text.team[lang]}</h2>
            <Link className="text-link" href={`/${lang}/people`}>{text.allPeople[lang]} →</Link>
          </div>
          <div className="person-grid">
            {preview.map((p) => (
              <Link key={p.slug} href={`/${lang}/people/${p.slug}`} className="person-card reveal">
                <div className="person-photo">
                  {p.image ? <Image src={p.image} alt={displayName(p, lang)} fill sizes="(min-width: 860px) 25vw, 50vw" /> : initials(p.name)}
                </div>
                <h3>{displayName(p, lang)}</h3>
                <strong>{roles[p.role].label[lang]}</strong>
                <p>{cityOf(p).full[lang]} · {p.languages[lang]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ⑥ 直接咨询 ═══ */}
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
