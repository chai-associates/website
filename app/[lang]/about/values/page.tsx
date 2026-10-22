// ═══════════════════════════════════════════════════════════════
// 我们的理念 /about/values（选单「关于我们 › 我们的理念」）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 面包屑 → 满版照片 → 标题框：我们的理念 + 使命（lib/blocks.tsx 的 CoverHead）
//          ② 愿景 → 3 个理念（白）  ③ 想先聊聊（浅灰）
// 内容已由律所确认（2026 年 10 月）。照片还是占位。
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
  vision: { zh: "让每一位客户在做决定之前，都清楚自己的权利、选择和下一步。", en: "That every client understands their rights, options and next step before they decide." },
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
          <div className="prose"><p>{text.vision[lang]}</p></div>
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
