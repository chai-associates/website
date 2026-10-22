// ═══════════════════════════════════════════════════════════════
// 我们的理念 /about/values（选单「关于我们 › 我们的理念」）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 面包屑 → 满版照片 → 标题框：我们的理念 + 使命（lib/blocks.tsx 的 CoverHead）
//          ② 愿景 → 3 个理念（白）  ③ 想先聊聊（浅灰）
// ⚠ 中括号 [ ] 里的都是占位，等律所问卷回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverHead } from "@/lib/blocks";
import { common, isLang, pageMeta, whatsappLink, type Bi } from "@/lib/site";

type Item = { title: Bi; desc: Bi };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  about: { zh: "关于我们", en: "About Us" },
  title: { zh: "我们的理念", en: "Our Values" },
  image: null as string | null, // 满版照片：放进 public/images/about/ 后填 "/images/about/values.png"（2400 × 1350）
  mission: { zh: "[律所的使命，一句话，由律所提供]", en: "[The firm's mission in one sentence, provided by the firm]" },
  vision: { zh: "[律所的愿景，一两句，由律所提供]", en: "[The firm's vision in one or two sentences, provided by the firm]" },
  list: [
    { title: { zh: "[理念 1]", en: "[Value 1]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
    { title: { zh: "[理念 2]", en: "[Value 2]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
    { title: { zh: "[理念 3]", en: "[Value 3]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
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
              <article key={v.title.zh} className="feature reveal">
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
          <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
        </div>
      </section>
    </>
  );
}
