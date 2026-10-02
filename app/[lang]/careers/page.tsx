// ═══════════════════════════════════════════════════════════════
// 加入我们 /careers
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 福利  ③ 实习（左）+ 实习资料与申请（右侧栏）  ④ 投递履历
// 招聘电邮在 lib/site.ts（firm.careersEmail）；这里只放这一页的文字。
// 实习招收方式改 text.internship.mode 就好：
//   "year-round" 全年招收 · "intake" 分梯次（显示下面的 intakes）· "none" 不收（整段隐藏）
// ⚠ 中括号 [ ] 里的都是占位，等「律所问卷」回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { common, firm, isLang, pageMeta, type Bi } from "@/lib/site";

type Item = { title: Bi; desc: Bi };

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "加入我们", en: "Join Us" },
  // ① 标题
  heading: { zh: "和我们一起，\n陪客户走过人生转折。", en: "Help people through\none of life's hardest moments." },
  lead: { zh: "[一两句话：律所在找什么样的人，以及在这里工作是什么感觉]", en: "[One or two sentences: who the firm is looking for, and what it's like to work here]" },
  // ② 福利
  benefits: {
    title: { zh: "福利", en: "Benefits" },
    list: [
      { title: { zh: "[福利 1]", en: "[Benefit 1]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[福利 2]", en: "[Benefit 2]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
      { title: { zh: "[福利 3]", en: "[Benefit 3]" }, desc: { zh: "[一句话说明，由律所提供]", en: "[One-line description, provided by the firm]" } },
    ] as Item[],
  },
  // ③ 实习
  internship: {
    mode: "intake" as "year-round" | "intake" | "none",
    title: { zh: "实习", en: "Internships" },
    paragraphs: [
      { zh: "[实习生会做什么、跟着谁学习]", en: "[What interns do and who they learn from]" },
    ] as Bi[],
    requirementsTitle: { zh: "申请条件", en: "Who can apply" },
    requirements: [
      { zh: "[条件 1，例如：法律系在读学生]", en: "[Requirement 1, e.g. current law students]" },
      { zh: "[条件 2，例如：语言能力]", en: "[Requirement 2, e.g. languages]" },
    ] as Bi[],
    // 侧栏
    facts: { zh: "实习资料", en: "At a glance" },
    intakeLabel: { zh: "招收方式", en: "Intake" },
    yearRound: { zh: "全年招收", en: "Open all year" },
    intakeValue: { zh: "分梯次招收", en: "By intake" },
    intakes: [
      { label: { zh: "[梯次 1]", en: "[Intake 1]" }, value: { zh: "[月份 – 月份]", en: "[Month – Month]" } },
      { label: { zh: "[梯次 2]", en: "[Intake 2]" }, value: { zh: "[月份 – 月份]", en: "[Month – Month]" } },
    ] as { label: Bi; value: Bi }[],
    apply: { zh: "申请实习", en: "Apply for an Internship" },
    applySubject: { zh: "实习申请", en: "Internship application" },
  },
  // ④ 投递履历
  cv: {
    title: { zh: "想加入我们？", en: "Interested in joining us?" },
    desc: { zh: "把你的履历电邮给我们，写明你想应征的职位。", en: "Email us your CV and tell us which role you're interested in." },
    send: { zh: "电邮你的履历", en: "Email Your CV" },
    subject: { zh: "应征职位", en: "Job application" },
  },
};

const mailto = (subject: string) => `mailto:${firm.careersEmail}?subject=${encodeURIComponent(subject)}`;

export async function generateMetadata({ params }: PageProps<"/[lang]/careers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/careers", text.title[lang], text.lead[lang]);
}

export default async function CareersPage({ params }: PageProps<"/[lang]/careers">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const intern = text.internship;

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

      {/* ═══ ② 福利 ═══ */}
      <section id="benefits" className="section section-muted">
        <div className="container">
          <div className="list-head"><h2>{text.benefits.title[lang]}</h2></div>
          <div className="card-grid">
            {text.benefits.list.map((b) => (
              <div key={b.title.zh} className="card reveal">
                <h3>{b.title[lang]}</h3>
                <p>{b.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ③ 实习（不收的话整段隐藏） ═══ */}
      {intern.mode !== "none" && (
        <section id="internship" className="section">
          <div className="container with-aside">
            <div className="stack">
              <div>
                <div className="list-head"><h2>{intern.title[lang]}</h2></div>
                <div className="prose">{intern.paragraphs.map((p) => <p key={p.zh}>{p[lang]}</p>)}</div>
              </div>
              <div>
                <div className="list-head"><h3>{intern.requirementsTitle[lang]}</h3></div>
                <ul className="rule-list">{intern.requirements.map((r) => <li key={r.zh}>{r[lang]}</li>)}</ul>
              </div>
            </div>
            <aside>
              <div>
                <h3>{intern.facts[lang]}</h3>
                <dl className="facts">
                  <div><dt>{intern.intakeLabel[lang]}</dt><dd>{(intern.mode === "year-round" ? intern.yearRound : intern.intakeValue)[lang]}</dd></div>
                  {intern.mode === "intake" && intern.intakes.map((i) => <div key={i.label.en}><dt>{i.label[lang]}</dt><dd>{i.value[lang]}</dd></div>)}
                </dl>
              </div>
              <a className="btn btn-cta" href={mailto(intern.applySubject[lang])}>{intern.apply[lang]}</a>
            </aside>
          </div>
        </section>
      )}

      {/* ═══ ④ 投递履历（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{text.cv.title[lang]}</h2>
            <p>{text.cv.desc[lang]} {firm.careersEmail}</p>
          </div>
          <a className="btn btn-cta" href={mailto(text.cv.subject[lang])}>{text.cv.send[lang]}</a>
        </div>
      </section>
    </>
  );
}
