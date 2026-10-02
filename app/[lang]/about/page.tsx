// ═══════════════════════════════════════════════════════════════
// 关于我们 /about（选单「关于我们」的三个子项连到 #firm、#values、#recognitions）
// ───────────────────────────────────────────────────────────────
// 母页。品牌语法 4：段落 = 色带，相邻不同色；一条色带只做一件事。内容依「律所问卷」。
// 色带顺序：① 标题（白）  ② 律所简介：照片 + 文字 + 资料（浅灰）  ③ 我们的理念：使命 → 愿景 → 3 个理念（白）
//   ④ 合作流程（深色）  ⑤ 主管合伙人的话（白）
//   ⑥ 更多关于我们：媒体报道 / 公益活动 / 活动与讲座，照片卡片（浅灰）  ⑦ 荣誉与认可（白；清空就隐藏）
//   ⑧ 认识我们的团队（深色）  ⑨ 想先聊聊（白）
// 「里程碑」已删除（减法：成立年份已在律所资料里）。
// 成立年份、办事处、团队在 lib/site.ts（律师人数由 team 自动算）；这里只放这一页的文字。
// ⚠ 中括号 [ ] 里的都是占位，等律所问卷回来后照题目替换。
// ⚠ 荣誉与认可要符合律师公会的宣传规定（不自夸、不比较，只写「名称 · 颁发单位 · 年份」）；
//   清单清空的那一段会自动隐藏。两段都清空时，记得把选单 layout.tsx 里「荣誉与认可」那一项删掉。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aboutSections, cities, common, displayName, firm, initials, isLang, lawyerCount, offices, pageMeta, roles, team, whatsappLink, type AboutSection, type Bi } from "@/lib/site";

type Item = { title: Bi; desc: Bi };

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
  // ② 律所简介 + 律所资料
  firm: {
    title: { zh: "律所简介", en: "Our Firm" },
    paragraphs: [
      { zh: "[第一段：律所成立年份、创办人，以及为什么专注家事法律]", en: "[Paragraph 1: when and by whom the firm was founded, and why it focuses on family law]" },
      { zh: "[第二段：律所处理案件的方式，以及想给客户的感受]", en: "[Paragraph 2: how the firm handles matters and what clients can expect]" },
    ] as Bi[],
  },
  facts: {
    founded: { zh: "成立", en: "Est." },
    size: { zh: "规模", en: "Size" },
    sizeValue: { zh: "{n} 位律师 · {m} 间办事处", en: "{n} lawyers · {m} offices" },
    cities: { zh: "城市", en: "Cities" },
    practice: { zh: "业务", en: "Practice" },
    practiceValue: { zh: "离婚与家事（非穆斯林）", en: "Divorce & family law (non-Muslim)" },
  },
  // ③ 我们的理念：标题 → 使命（副标题）→ 愿景（说明），下面 3 个理念
  values: {
    title: { zh: "我们的理念", en: "Our Values" },
    mission: { zh: "[律所的使命，一句话，由律所提供]", en: "[The firm's mission in one sentence, provided by the firm]" },
    vision: { zh: "[律所的愿景，一两句，由律所提供]", en: "[The firm's vision in one or two sentences, provided by the firm]" },
    list: [
      { title: { zh: "[理念 1]", en: "[Value 1]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[理念 2]", en: "[Value 2]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[理念 3]", en: "[Value 3]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
    ] as Item[],
  },
  // ④ 合作流程（编号自动产生）
  process: {
    title: { zh: "合作流程", en: "How We Work With You" },
    desc: { zh: "从第一次联系到案件完成，你会经过这几步。", en: "From your first message to the close of your matter." },
    list: [
      { title: { zh: "[第 1 步，例如：WhatsApp 联系我们]", en: "[Step 1, e.g. message us on WhatsApp]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 2 步，例如：初次咨询]", en: "[Step 2, e.g. first consultation]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 3 步，例如：报价与委托]", en: "[Step 3, e.g. fees and engagement]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 4 步，例如：办理案件]", en: "[Step 4, e.g. handling your matter]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
    ] as Item[],
  },
  // ⑤ 主管合伙人的话（照片、名字取自 team 里的 Managing Partner）
  message: {
    title: { zh: "主管合伙人的话", en: "A Word From Our Managing Partner" },
    quote: { zh: "[主管合伙人想对客户说的话，两三句，由本人确认]", en: "[A short message to clients from the Managing Partner, two or three sentences, confirmed by them]" },
    profile: { zh: "阅读个人介绍", en: "Read profile" },
  },
  // ⑥ 更多关于我们（三个子页面的一句话介绍；名称在 lib/site.ts 的 aboutSections）
  more: {
    title: { zh: "更多关于我们", en: "More about us" },
    desc: {
      media: { zh: "[一句话：律师接受访问、发表意见的媒体报道]", en: "[One line: our lawyers in the media]" },
      community: { zh: "[一句话：律所参与的公益活动]", en: "[One line: our community work]" },
      events: { zh: "[一句话：律所举办或受邀主讲的讲座]", en: "[One line: talks and events]" },
    } as Record<AboutSection, Bi>,
  },
  // ⑦ 荣誉与认可（含合作伙伴与会员资格；kind = 小标签。清空 list 就会整段隐藏）
  recognitions: {
    title: { zh: "荣誉与认可", en: "Recognitions" },
    list: [
      { kind: { zh: "荣誉", en: "Award" }, title: { zh: "[奖项或认可名称]", en: "[Award or recognition]" }, desc: { zh: "[颁发单位 · 年份]", en: "[Awarding body · Year]" } },
      { kind: { zh: "会员资格", en: "Membership" }, title: { zh: "[机构名称]", en: "[Organisation]" }, desc: { zh: "[合作或会员关系，一句话]", en: "[The partnership or membership, in one line]" } },
    ] as (Item & { kind: Bi })[],
  },
  // ⑧ 认识我们的团队
  team: {
    title: { zh: "我们的团队", en: "Our People" },
    desc: { zh: "{n} 位律师，分布在 {m} 间办事处。", en: "{n} lawyers across {m} offices." },
    cta: { zh: "认识我们的团队", en: "Meet Our People" },
  },
  // ⑨ 直接咨询
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Message us on WhatsApp. A lawyer will understand your situation and explain your options." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/about", text.title[lang], text.lead[lang]);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const md = team.find((p) => p.role === "managing-partner");
  const count = (t: Bi) => t[lang].replace("{n}", String(lawyerCount)).replace("{m}", String(offices.length));

  return (
    <>
      {/* ═══ ① 标题（白） ═══ */}
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

      {/* ═══ ② 律所简介：照片 + 文字 + 资料（浅灰） ═══ */}
      <section id="firm" className="section section-muted">
        <div className="container split">
          <div className="photo-frame">{/* 律所照片：放进 public/images/ 后加 <Image fill /> */}</div>
          <div>
            <div className="section-head"><h2>{text.firm.title[lang]}</h2></div>
            <div className="prose">{text.firm.paragraphs.map((p) => <p key={p.zh}>{p[lang]}</p>)}</div>
            <dl className="facts">
              <div><dt>{text.facts.founded[lang]}</dt><dd>{firm.founded}</dd></div>
              <div><dt>{text.facts.size[lang]}</dt><dd>{count(text.facts.sizeValue)}</dd></div>
              <div><dt>{text.facts.cities[lang]}</dt><dd>{cities.map((c) => c.full[lang]).join(" · ")}</dd></div>
              <div><dt>{text.facts.practice[lang]}</dt><dd>{text.facts.practiceValue[lang]}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* ═══ ③ 我们的理念：使命 → 愿景 → 3 个理念（白） ═══ */}
      <section id="values" className="section">
        <div className="container">
          <div className="section-head">
            <h2>{text.values.title[lang]}</h2>
            <p>{text.values.mission[lang]}</p>
            <p>{text.values.vision[lang]}</p>
          </div>
          <div className="card-grid">
            {text.values.list.map((v) => (
              <article key={v.title.zh} className="feature reveal">
                <h3>{v.title[lang]}</h3>
                <p>{v.desc[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ④ 合作流程（深色） ═══ */}
      <section id="process" className="section section-dark">
        <div className="container">
          <div className="section-head">
            <h2>{text.process.title[lang]}</h2>
            <p>{text.process.desc[lang]}</p>
          </div>
          <ol className="steps">
            {text.process.list.map((s, i) => (
              <li key={s.title.zh} className="reveal">
                <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title[lang]}</h3>
                <p>{s.desc[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ ⑤ 主管合伙人的话（白） ═══ */}
      {md && (
        <section className="section">
          <div className="container profile-head">
            <div className="person-photo">
              {md.image ? <Image src={md.image} alt={displayName(md, lang)} fill sizes="(min-width: 860px) 40vw, 100vw" /> : initials(md.name)}
            </div>
            <div>
              <div className="section-head"><h2>{text.message.title[lang]}</h2></div>
              <figure className="quote">
                <blockquote><p>{text.message.quote[lang]}</p></blockquote>
                <figcaption>— {displayName(md, lang)} · {roles[md.role].label[lang]}</figcaption>
              </figure>
              <Link className="text-link" href={`/${lang}/people/${md.slug}`}>{text.message.profile[lang]} →</Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ ⑥ 更多关于我们：三个子页面（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head"><h2>{text.more.title[lang]}</h2></div>
          <div className="card-grid">
            {aboutSections.map((a) => (
              <Link key={a.slug} href={`/${lang}/about/${a.slug}`} className="photo-card reveal">
                {/* 照片之后加：<Image src=… alt="" fill /> */}
                <div>
                  <h3>{a.title[lang]}</h3>
                  <p>{text.more.desc[a.slug][lang]}</p>
                </div>
                <span className="btn btn-light btn-sm photo-card-action">{common.readMore[lang]} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ⑦ 荣誉与认可（白；没有资料就整段隐藏，团队深色带直接接在浅灰后面） ═══ */}
      {text.recognitions.list.length > 0 && (
        <section id="recognitions" className="section">
          <div className="container">
            <div className="section-head"><h2>{text.recognitions.title[lang]}</h2></div>
            <div className="card-grid">
              {text.recognitions.list.map((r) => (
                <article key={r.title.zh} className="feature reveal">
                  <span className="tag">{r.kind[lang]}</span>
                  <h3>{r.title[lang]}</h3>
                  <p>{r.desc[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ⑧ 认识我们的团队（深色） ═══ */}
      <section id="team" className="section section-dark">
        <div className="container">
          <div className="section-head">
            <h2>{text.team.title[lang]}</h2>
            <p>{count(text.team.desc)}</p>
          </div>
          <Link className="btn btn-light" href={`/${lang}/people`}>{text.team.cta[lang]} →</Link>
        </div>
      </section>

      {/* ═══ ⑨ 想先聊聊你的情况？（白） ═══ */}
      <section className="section">
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
