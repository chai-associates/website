// ═══════════════════════════════════════════════════════════════
// 我们的理念 /about/values（选单「关于我们 › 我们的理念」）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 面包屑 → 满版照片 → 标题框：我们的理念 + 使命（lib/blocks.tsx 的 CoverHead）
//          ② 愿景与做法（4 段）→ 3 个理念（白）  ③ 想先聊聊（浅灰）
// 使命、3 个理念已由律所确认（2026 年 10 月）；② 的 4 段是参考旧网站改写的草稿，待确认。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsultButton } from "@/lib/interactive";
import { CoverHead } from "@/lib/blocks";
import { common, isLang, pageMeta, whatsappLink, type Bi } from "@/lib/site";

type Item = { title: Bi; desc: Bi };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  about: { zh: "关于我们", en: "About Us" },
  title: { zh: "我们的理念", en: "Our Values" },
  image: "/images/about/firm.png" as string | null, // 满版照片（建议 2400 × 1350；现在这张 1536 × 1024，电脑版会被放大、裁掉上下）
  mission: { zh: "用清楚、实际的方式，和你一起处理离婚与家事问题。", en: "To work through divorce and family matters with you, clearly and practically." },
  // ② 愿景与做法（参考旧网站改写；律师公会规定：不自夸、不比较）
  paragraphs: [
    { zh: "我们的愿景，是让每一位客户在做决定之前，都清楚自己的权利、选择和下一步；也希望以及时、实际的建议，成为客户在家事问题上可以信赖的律所。", en: "Our vision is that every client understands their rights, options and next step before they decide, and that we are a firm clients can rely on for timely, practical advice in family matters." },
    { zh: "我们从你的处境出发。离婚与家事案件关系到孩子、财务和往后的生活，所以在给建议之前，我们会先花时间了解，对你来说什么最重要。", en: "We start with your circumstances. Divorce and family matters affect your children, your finances and your future, so we take the time to understand what matters most to you before we advise." },
    { zh: "需要处理的事情，我们会及时回应。我们在新山、八打灵再也和马六甲设有办事处，彼此配合，无论你在哪里，案件都能继续推进。", en: "When something needs attention, we respond promptly. Our offices in Johor Bahru, Petaling Jaya and Melaka work together, so your matter keeps moving wherever you are." },
    { zh: "我们会在案件的需要和所花的费用之间，找一个合理的平衡。能和解的，我们会直说；不能和解的，我们也会直说，并告诉你接下来会面对什么。", en: "We look for a sensible balance between what a matter needs and what it costs. If a dispute can be settled, we will say so. If it cannot, we will say that too, and explain what lies ahead." },
  ] as Bi[],
  list: [
    { title: { zh: "讲清楚", en: "Plain terms" }, desc: { zh: "用你听得懂的话说明法律和程序，不绕弯。", en: "We explain the law and the process in plain terms." } },
    { title: { zh: "讲实际", en: "Practical" }, desc: { zh: "建议按你的实际情况来：哪些值得争取、哪些可以放下，都直接告诉你。", en: "Advice based on your actual circumstances: we tell you directly what is worth pursuing and what may not be." } },
    // ⚠ 这一条是对客户的承诺，律所已确认做得到
    { title: { zh: "有时限", en: "Clear timelines" }, desc: { zh: "每个阶段要做什么、预计什么时候完成，事先说明；进度有变，会主动告诉你。", en: "We set out what each stage involves and when it should be done, and tell you promptly if that changes." } },
  ] as Item[],
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Message us on WhatsApp. A lawyer will understand your situation and explain your options." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about/values">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/about/values", text.title[lang], text.mission[lang]);
}

export default async function ValuesPage({ params }: PageProps<"/[lang]/about/values">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <CoverHead
        crumbs={<>
          <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
          <li><Link href={`/${lang}/about`}>{text.about[lang]}</Link></li>
          <li aria-current="page">{text.title[lang]}</li>
        </>}
        image={text.image}
        title={text.title[lang]}
        lead={text.mission[lang]}
      />

      {/* ═══ ② 愿景 → 3 个理念（白） ═══ */}
      <section className="section">
        <div className="container stack">
          <div className="prose">{text.paragraphs.map((p) => <p key={p.zh}>{p[lang]}</p>)}</div>
          <div className="card-grid">
            {text.list.map((v) => (
              <article key={v.title.zh} className="feature">
                <h3>{v.title[lang]}</h3>
                <p>{v.desc[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ③ 想先聊聊你的情况？（浅灰） ═══ */}
      <section className="section section-muted">
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
