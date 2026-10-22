// ═══════════════════════════════════════════════════════════════
// 关于我们 /about = 选单「关于我们 › 律所简介」（选单的其他子项都是独立页面：理念、荣誉、媒体、公益、活动）
// ───────────────────────────────────────────────────────────────
// 品牌语法 4：段落 = 色带，相邻不同色；一条色带只做一件事。内容依「律所问卷」。
// 色带顺序：① 标题（白）  ② 律所简介：照片 + 文字 + 资料（浅灰）  ③ 合作流程（深色）  ④ 想先聊聊（白）
// 读到一半不把人带去别页：选单里有的页面（团队、理念、荣誉……）这里都不放连结。主管合伙人的话在律师团队页。
// 成立年份、办事处、团队在 lib/site.ts（律师人数由 team 自动算）；这里只放这一页的文字。
// ⚠ 中括号 [ ] 里的都是占位，等律所问卷回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultButton } from "@/lib/interactive";
import { cities, common, firm, isLang, lawyerCount, offices, pageMeta, whatsappLink, type Bi } from "@/lib/site";

type Item = { title: Bi; desc: Bi };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "关于我们", en: "About Us" },
  // ① 标题
  heading: { zh: "坦诚相待，\n重视每一段关系。", en: "Open, approachable,\nbuilt on relationships." },
  lead: {
    zh: "我们对客户坦诚，对同事也一样：你的案件进展如何、有什么风险，我们都会直接告诉你。团队里的每一位成员，我们也持续培养，让他们能把你的案件处理好。",
    en: "We are open and honest with our clients and with each other, so you will hear plainly how your matter is going and what the risks are. We also keep developing everyone on our team, so they are well equipped to handle your matter.",
  },
  // ② 律所简介 + 律所资料
  firm: {
    title: { zh: "律所简介", en: "Our Firm" },
    image: "/images/about/our-firm.png" as string | null, // 团队合照（1800 × 1200，3:2）
    paragraphs: [
      { zh: "Chai & Associates 成立于 2017 年，现由 Chai Mei Ching 律师主持，专注处理非穆斯林的离婚与家事案件。", en: "Chai & Associates was founded in 2017 and is led today by Chai Mei Ching. The firm acts in divorce and family matters for non-Muslims." },
      { zh: "家事案件牵涉孩子、财产和往后的生活。我们会先把你的处境和可以走的路讲清楚，说明每一步要做什么、大概需要多久，再按你的决定往下办。", en: "Family matters touch your children, your finances and what comes next. We start by explaining where you stand and what your options are, set out what each step involves and roughly how long it will take, and then act on your instructions." },
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
  // ③ 合作流程（编号自动产生）
  process: {
    title: { zh: "合作流程", en: "How We Work With You" },
    desc: { zh: "从第一次联系到案件完成，你会经过这几步。", en: "From your first message to the close of your matter." },
    list: [
      { title: { zh: "[第 1 步，例如：WhatsApp 联系我们]", en: "[Step 1, e.g. message us on WhatsApp]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 2 步，例如：初次咨询]", en: "[Step 2, e.g. first consultation]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 3 步，例如：委托律师]", en: "[Step 3, e.g. engaging a lawyer]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
      { title: { zh: "[第 4 步，例如：办理案件]", en: "[Step 4, e.g. handling your matter]" }, desc: { zh: "[一句话说明这一步会发生什么]", en: "[One line on what happens at this step]" } },
    ] as Item[],
  },
  // ④ 直接咨询
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
          <div className="photo-frame">{text.firm.image && <Image src={text.firm.image} alt={firm.name} fill sizes="(min-width: 768px) 50vw, 100vw" />}</div>
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

      {/* ═══ ③ 合作流程（深色） ═══ */}
      <section id="process" className="section section-dark">
        <div className="container">
          <div className="section-head">
            <h2>{text.process.title[lang]}</h2>
            <p>{text.process.desc[lang]}</p>
          </div>
          <ol className="steps">
            {text.process.list.map((s, i) => (
              <li key={s.title.zh}>
                <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title[lang]}</h3>
                <p>{s.desc[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ ④ 想先聊聊你的情况？（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{text.ask.title[lang]}</h2>
            <p>{text.ask.desc[lang]}</p>
          </div>
          <ConsultButton className="btn btn-cta" href={whatsappLink(lang)}>{common.askLawyer[lang]}</ConsultButton>
        </div>
      </section>
    </>
  );
}
