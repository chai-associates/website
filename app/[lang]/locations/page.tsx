// ═══════════════════════════════════════════════════════════════
// 办事处 /locations
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 城市按钮 + 办事处卡片（跟首页「联系我们」一模一样：lib/blocks.tsx 的 OfficeTabs）
//          ③ 不确定去哪一间？（浅灰色带）
// 不列律师：每位律师的卡片已经写了城市，这一页只回答「去哪里、怎么联系」。
// 城市、办事处资料都在 lib/site.ts；这里只放这一页的文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OfficeTabs } from "@/lib/blocks";
import { common, isLang, pageMeta, structuredData, whatsappLink } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "办事处", en: "Locations" },
  // ① 标题
  heading: { zh: "5 间办事处，\n就近找我们。", en: "Five offices,\nclose to you." },
  lead: { zh: "所有咨询都需要先预约。", en: "All consultations are by appointment." }, // 每个城市几间，城市按钮上已经写了
  // ③ 不确定去哪一间？
  ask: {
    title: { zh: "不确定去哪一间？", en: "Not sure which office to visit?" },
    desc: { zh: "WhatsApp 我们，我们会安排离你最近的办事处和律师。", en: "Message us on WhatsApp and we'll arrange the office and lawyer nearest you." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/locations">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/locations", text.title[lang], text.lead[lang]);
}

export default async function LocationsPage({ params }: PageProps<"/[lang]/locations">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* 给 Google 看的律所与办事处资料（画面上看不到） */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(lang) }} />

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

      {/* ═══ ② 城市按钮 + 办事处（白） ═══ */}
      <section className="section">
        <div className="container">
          <OfficeTabs lang={lang} />
        </div>
      </section>

      {/* ═══ ③ 不确定去哪一间？（浅灰） ═══ */}
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
