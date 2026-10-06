// ═══════════════════════════════════════════════════════════════
// 隐私政策 /privacy（页脚和 Cookie 提示连到这里）
// ───────────────────────────────────────────────────────────────
// 色带顺序：① 标题（白）  ② 正文：小标题 + 段落（白，接在标题下面）
// ⚠ 中括号 [ ] 里的都是占位，由律所提供内容，上线前请律师审稿。
//   只有「Cookie 与访客统计」那一段是照网站实际做法写的（GA4、同意后才载入、关闭广告个人化）。
// ⚠ 马来西亚 PDPA：隐私声明需要有马来文与英文版本（本网站是中文 / 英文，马来文版本请律所提供后再加）。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsentReset } from "@/lib/interactive";
import { common, gaId, isLang, pageMeta, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "隐私政策", en: "Privacy Policy" },
  lead: { zh: "我们怎么收集、使用和保护你的个人资料。", en: "How we collect, use and protect your personal data." },
  updated: { zh: "最后更新：[日期]", en: "Last updated: [Date]" },
  // 每一段：h2 小标题 + 段落（段落可以有几段）
  sections: [
    {
      h2: { zh: "我们收集哪些资料", en: "What we collect" },
      p: [{ zh: "[由律所提供：例如你的姓名、电话，以及你通过 WhatsApp 或询问表格告诉我们的情况]", en: "[Provided by the firm: e.g. your name, phone number and the details you share with us on WhatsApp or through the enquiry form]" }],
    },
    {
      h2: { zh: "我们怎么使用这些资料", en: "How we use it" },
      p: [{ zh: "[由律所提供：例如回复你的咨询、安排律师、处理你的案件]", en: "[Provided by the firm: e.g. to reply to your enquiry, arrange a lawyer and handle your matter]" }],
    },
    {
      h2: { zh: "Cookie 与访客统计", en: "Cookies and analytics" },
      reset: true, // 这一段最后放「更改 Cookie 设定」按钮
      p: [
        { zh: "本网站使用 Google Analytics 4 统计访问情况，例如看了哪些页面、从哪里来到本网站、使用什么装置。只有你按下「同意」后才会启用；按「不同意」就不会载入。", en: "This site uses Google Analytics 4 to understand how it is used, such as which pages are viewed, how visitors arrive and what devices they use. It is only turned on if you select Accept; if you select Decline, it is not loaded." },
        { zh: "我们已关闭 Google 的广告个人化与 Google 信号功能，统计资料不会用来向你投放广告。", en: "We have turned off Google's ad personalisation and Google signals, so this data is not used to show you ads." },
      ],
    },
    {
      h2: { zh: "资料分享", en: "Sharing your data" },
      p: [{ zh: "[由律所提供：会不会、在什么情况下与第三方分享资料]", en: "[Provided by the firm: whether and when data is shared with third parties]" }],
    },
    {
      h2: { zh: "资料保存多久", en: "How long we keep it" },
      p: [{ zh: "[由律所提供]", en: "[Provided by the firm]" }],
    },
    {
      h2: { zh: "你的权利", en: "Your rights" },
      p: [{ zh: "[由律所提供：例如查阅、更正你的资料，或撤回同意]", en: "[Provided by the firm: e.g. to access or correct your data, or withdraw consent]" }],
    },
    {
      h2: { zh: "联系我们", en: "Contact us" },
      p: [{ zh: "[由律所提供：负责处理个人资料查询的联络人与电邮]", en: "[Provided by the firm: the contact person and email for personal data enquiries]" }],
    },
  ] as { h2: Bi; p: Bi[]; reset?: boolean }[],
  reset: { zh: "更改 Cookie 设定", en: "Change cookie settings" },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/privacy", text.title[lang], text.lead[lang]);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ ① 标题（白） ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li aria-current="page">{text.title[lang]}</li>
          </ol>
          <h1>{text.title[lang]}</h1>
          <p>{text.lead[lang]}</p>
          <p>{text.updated[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 正文（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="prose">
            {text.sections.map((s) => [
              <h2 key={s.h2.en}>{s.h2[lang]}</h2>,
              ...s.p.map((p) => <p key={p.en}>{p[lang]}</p>),
              s.reset && gaId ? <ConsentReset key="reset" label={text.reset[lang]} /> : null,
            ])}
          </div>
        </div>
      </section>
    </>
  );
}
