// ═══════════════════════════════════════════════════════════════
// 荣誉与认可 /about/recognitions（选单「关于我们 › 荣誉与认可」）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 首屏：照片 + 面包屑 → 两行标题 → 按钮（lib/blocks.tsx 的 PageHero）
//          ② 清单：小标签（荣誉 / 会员资格）→ 名称 → 颁发单位 · 年份（白；清单是空的就显示「内容准备中」）
//          ③ 想先聊聊（浅灰）
// ⚠ 律师公会宣传规定：不自夸、不比较，只写「名称 · 颁发单位 · 年份」。
// ⚠ 中括号 [ ] 里的都是占位，等律所问卷回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskSection, PageHero } from "@/lib/blocks";
import { common, isLang, pageMeta, type Bi } from "@/lib/site";

type Item = { kind: Bi; title: Bi; desc: Bi };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "荣誉与认可", en: "Recognitions" },
  image: "/images/about/recognitions-v3.png" as string | null, // 首屏照片 2400 × 1350
  // 首屏：两行标题 + 按钮（还没决定写什么；不加逗号句号）
  hero: {
    title: { zh: "[两行标题]\n[两行标题]", en: "[Two-line title]\n[Two-line title]" },
    cta: { zh: "[按钮文字]", en: "[Button label]" }, // 往下到清单
  },
  // lead：不显示在页面上，给 Google 的页面说明
  lead: { zh: "[一句话：律所获得的荣誉、认可与会员资格]", en: "[One line: the firm's awards, recognitions and memberships]" },
  list: [
    { kind: { zh: "荣誉", en: "Award" }, title: { zh: "[奖项或认可名称]", en: "[Award or recognition]" }, desc: { zh: "[颁发单位 · 年份]", en: "[Awarding body · Year]" } },
    { kind: { zh: "会员资格", en: "Membership" }, title: { zh: "[机构名称]", en: "[Organisation]" }, desc: { zh: "[合作或会员关系，一句话]", en: "[The partnership or membership, in one line]" } },
  ] as Item[],
  pending: { zh: "内容正在准备中。", en: "Content is being prepared." },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/about/recognitions">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/about/recognitions", text.title[lang], text.lead[lang]);
}

export default async function RecognitionsPage({ params }: PageProps<"/[lang]/about/recognitions">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ ① 首屏（PageHero） ═══ */}
      <PageHero
        image={text.image}
        eyebrow={<ol className="breadcrumb"><li><Link href={`/${lang}`}>{common.home[lang]}</Link></li><li><Link href={`/${lang}/people`}>{common.people[lang]}</Link></li><li aria-current="page">{text.title[lang]}</li></ol>}
        title={text.hero.title[lang]}
      >
        <a className="btn btn-light btn-next" href="#list">{text.hero.cta[lang]}</a>
      </PageHero>

      {/* ═══ ② 清单（白；首屏的按钮到这里） ═══ */}
      <section id="list" className="section">
        <div className="container">
          {text.list.length > 0 ? (
            <div className="card-grid">
              {text.list.map((r) => (
                <article key={r.title.zh} className="feature">
                  <span className="tag">{r.kind[lang]}</span>
                  <h3>{r.title[lang]}</h3>
                  <p>{r.desc[lang]}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="muted">{text.pending[lang]}</p>
          )}
        </div>
      </section>

      {/* ═══ ③ 想先聊聊你的情况？（浅灰） ═══ */}
      <AskSection lang={lang} />
    </>
  );
}
