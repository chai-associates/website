// ═══════════════════════════════════════════════════════════════
// 服务页 /services/[category]/[slug]（所有服务共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 你需要知道的（只写到重点）+ 相关文章（左）+ ③ 询问表格（右侧栏）
//          ④ 不是你的情况？  ⑤ 相关服务
// 服务名称、分类在 lib/site.ts；每项服务的内容写在下面 text.content。
// 相关文章读 lib/divorcepedia.ts（文章的 services 有这项服务就会出现）；没有相关文章，那一段自动隐藏。
// 还没写内容的服务会显示「内容准备中」。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/divorcepedia";
import { InquiryForm } from "@/lib/interactive";
import { cities, common, isLang, serviceCategories, services, whatsappLink, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  // ② 每项服务的内容：intro = 一句话说明；points = 重点（3–5 点就好，深入的交给律师）
  // ⚠ 以下内容整理自律所文件，上线前需律师审稿
  content: {
    "joint-petition": {
      intro: { zh: "双方都同意离婚，也同意所有离婚条件时，可以申请协议离婚。", en: "When you both agree to divorce and on all the terms, you can file a joint petition." },
      points: [
        { zh: "结婚满 2 年后才能申请。", en: "You must have been married for at least 2 years." },
        { zh: "双方要同意所有条件：配偶赡养费、孩子的抚养权与探视、子女抚养费、财产分配。", en: "You must agree on all terms: spousal maintenance, custody and access, child maintenance and division of assets." },
        { zh: "不需要先经过婚姻辅导。", en: "Marriage counselling is not required." },
        { zh: "一般需要：结婚证书、双方身份证、孩子报生纸、资产相关文件。", en: "You'll usually need: marriage certificate, both ICs, children's birth certificates and asset documents." },
      ],
    },
    "single-petition": {
      intro: { zh: "对方不同意离婚时，可以向法庭单方面申请离婚，不需要对方同意。", en: "If your spouse won't agree, you can petition the court on your own. Their consent is not needed." },
      points: [
        { zh: "要证明婚姻已无法挽回，理由包括：外遇、不合理的行为、被遗弃满 2 年，或分居满 2 年。", en: "You must show the marriage has broken down: adultery, unreasonable behaviour, desertion for 2 years, or separation for 2 years." },
        { zh: "申请前，一般要先到国民登记局（JPN）接受婚姻辅导。", en: "You will usually need to attend counselling at the National Registration Department (JPN) first." },
        { zh: "某些情况可以申请豁免辅导，例如对方下落不明或长期在国外。", en: "Counselling can be waived in some cases, such as when your spouse can't be found or lives abroad." },
      ],
    },
    "responding": {
      intro: { zh: "收到对方的离婚申请后，你只有 21 天可以回应。", en: "Once you've been served a divorce petition, you have 21 days to respond." },
      points: [
        { zh: "你需要提交答辩书（Answer to Petition），写明你不同意的事项。", en: "You file an Answer to Petition setting out what you dispute." },
        { zh: "如果你也想提出离婚，可以同时提出反申请（Cross Petition）。", en: "If you also want a divorce on your own grounds, you can file a Cross Petition." },
        { zh: "不要错过期限。越早找律师，你的选择越多。", en: "Don't miss the deadline. The earlier you get advice, the more options you have." },
      ],
    },
    "custody": {
      intro: { zh: "法庭决定孩子的抚养权时，最看重的是孩子的福祉。", en: "When deciding custody, the court's first concern is the welfare of the child." },
      points: [
        { zh: "法庭会考虑孩子的年龄、孩子的意愿，以及父母双方的情况。", en: "The court looks at the child's age, their wishes, and each parent's circumstances." },
        { zh: "一般上，7 岁或以下的孩子较常交由母亲照顾。", en: "Children aged 7 and under are more often placed with their mother." },
        { zh: "法庭倾向让孩子留在熟悉的生活环境。", en: "Courts generally prefer to keep children in a familiar environment." },
      ],
    },
  } as Record<string, { intro: Bi; points: Bi[] }>,
  reads: { zh: "相关文章", en: "Related reading" },
  allReads: { zh: "离婚百科", en: "Divorcepedia" },
  pending: { zh: "这项服务的详细说明正在准备中。你可以先用下面的表格，把情况发给律师。", en: "Details for this service are being prepared. In the meantime, send your situation to a lawyer using the form below." },
  know: { zh: "你需要知道的", en: "What you need to know" },

  // ③ 询问表格
  form: {
    title: { zh: "把你的情况发给律师", en: "Tell a lawyer about your situation" },
    desc: { zh: "回答几个问题，按下按钮后会打开 WhatsApp，讯息已经帮你写好，由你自己决定是否发送。", en: "Answer a few questions. The button opens WhatsApp with your message ready, and you decide whether to send it." },
    intro: { zh: "你好，我想咨询「{service}」。", en: "Hi, I'd like to ask about {service}." },
    placeholder: { zh: "请选择", en: "Choose one" },
    submit: { zh: "发送我的资料到 WhatsApp 咨询", en: "Send My Details via WhatsApp" },
    questions: [
      { label: { zh: "我是", en: "I am" }, options: [{ zh: "丈夫", en: "The husband" }, { zh: "妻子", en: "The wife" }, { zh: "代家人咨询", en: "Asking for a family member" }] },
      { label: { zh: "对方是否同意离婚", en: "Does your spouse agree to divorce" }, options: [{ zh: "同意", en: "Yes" }, { zh: "不同意", en: "No" }, { zh: "还没谈", en: "Not discussed yet" }, { zh: "我是收到申请的一方", en: "I've received a petition" }] },
      { label: { zh: "是否有孩子", en: "Do you have children" }, options: [{ zh: "有", en: "Yes" }, { zh: "没有", en: "No" }] },
      { label: { zh: "所在地区", en: "Where are you based" }, options: [...cities.map((c) => c.label), { zh: "其他", en: "Other" }] },
    ] as { label: Bi; options: Bi[] }[],
  },

  // ⑤ 相关服务
  related: { zh: "相关服务", en: "Related services" },
};

// 预先生成所有服务页；不在清单里的网址 → 404
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ category: s.category, slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[category]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!isLang(lang) || !s) return {};
  return { title: s.title[lang], description: (text.content[s.slug]?.intro ?? s.short)[lang] };
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[category]/[slug]">) {
  const { lang, category, slug } = await params;
  const s = services.find((x) => x.slug === slug && x.category === category);
  const c = serviceCategories.find((x) => x.slug === category);
  if (!isLang(lang) || !s || !c) notFound();
  const content = text.content[s.slug];
  const reads = articles.filter((a) => a.services.includes(s.slug));
  const related = services.filter((x) => x.category === s.category && x.slug !== s.slug).slice(0, 3);

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/services`}>{common.services[lang]}</Link></li>
            <li><Link href={`/${lang}/services/${c.slug}`}>{c.title[lang]}</Link></li>
            <li aria-current="page">{s.title[lang]}</li>
          </ol>
          <h1>{s.title[lang]}</h1>
          <p>{(content?.intro ?? s.short)[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 你需要知道的（左）+ ③ 询问表格（右侧栏；手机排在下面） ═══ */}
      <section className="section">
        <div className="container with-aside">
          <div className="stack">
            <div>
              <div className="list-head"><h2>{text.know[lang]}</h2></div>
              {content ? (
                <ul className="rule-list">
                  {content.points.map((p) => <li key={p.zh}>{p[lang]}</li>)}
                </ul>
              ) : (
                <p className="muted">{text.pending[lang]}</p>
              )}
            </div>
            {reads.length > 0 && (
              <div>
                <div className="list-head">
                  <h2>{text.reads[lang]}</h2>
                  <Link className="text-link" href={`/${lang}/divorcepedia`}>{text.allReads[lang]} →</Link>
                </div>
                <ul className="rule-list">
                  {reads.map((a) => <li key={a.slug}><Link className="text-link" href={`/${lang}/divorcepedia/${a.slug}`}>{a.title[lang]} →</Link></li>)}
                </ul>
              </div>
            )}
          </div>
          <aside>
            <div>
              <h3>{text.form.title[lang]}</h3>
              <p>{text.form.desc[lang]}</p>
            </div>
            <InquiryForm
              lang={lang}
              intro={text.form.intro[lang].replace("{service}", s.title[lang])}
              placeholder={text.form.placeholder[lang]}
              submit={text.form.submit[lang]}
              questions={text.form.questions.map((q) => ({ label: q.label[lang], options: q.options.map((o) => o[lang]) }))}
            />
          </aside>
        </div>
      </section>

      {/* ═══ ④ 不是你的情况？ ═══ */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{common.notYours.title[lang]}</h2>
              <p>{common.notYours.desc[lang]}</p>
            </div>
            <div className="btn-row">
              <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
              <Link className="text-link" href={`/${lang}/services`}>{common.viewAll[lang]} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ⑤ 相关服务 ═══ */}
      {related.length > 0 && (
        <section className="section section-muted">
          <div className="container">
            <div className="list-head">
              <h2>{text.related[lang]}</h2>
              <Link className="text-link" href={`/${lang}/services/${c.slug}`}>{c.title[lang]} →</Link>
            </div>
            <div className="card-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/${lang}/services/${r.category}/${r.slug}`} className="card card-link reveal">
                  <h3>{r.title[lang]}</h3>
                  <p>{r.short[lang]}</p>
                  <span className="text-link">{common.readMore[lang]} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
