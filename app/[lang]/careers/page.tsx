// ═══════════════════════════════════════════════════════════════
// 加入我们 /careers
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 面包屑 → 满版照片 → 标题框（CoverHead）  ② 为什么选择我们：三段（白）
//          ③ 按职位申请：满版、左右各一半的照片卡片（白）  ④ 按地点申请：城市 → 办事处（浅灰）
// 申请一律用电邮（firm.careersEmail，在 lib/site.ts）；按下去会打开电邮，标题已经写好职位或办事处。
// 办事处清单读 lib/site.ts 的 cities、offices，新增办事处不用改这里。
// ⚠ 中括号 [ ] 里的都是占位，等律所确认后替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverHead, PhotoCard } from "@/lib/blocks";
import { cities, common, firm, isLang, offices, pageMeta, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "加入我们", en: "Careers" },
  description: { zh: "在 Chai & Associates 开展你的法律事业：律师、行政与支援团队，以及实习律师计划。", en: "Build your legal career at Chai & Associates: lawyers, business and support team, and our chambering programme." }, // 给 Google 的说明
  // ① 标题（满版照片 2400 × 1350）
  image: "/images/about/join-us.png" as string | null,
  heading: { zh: "走出属于你的路", en: "Define your future" },
  // ② 为什么选择我们（{email} 会换成可以点的招聘电邮）
  why: {
    title: { zh: "一起，写下新的一页", en: "Make history. Together." },
    paragraphs: [
      { zh: "好的团队，才有好的服务。所以我们很重视年轻律师的成长：给你发挥的空间，有前辈带、有人教，也有机会接触不同的案件。我们做事的原则很简单：讲清楚、讲实际、有时限。对客户是这样，对同事也一样。", en: "We believe good service starts with a good team, so we work to give young lawyers an environment where they can grow. Our team shares the same principles: be clear, be practical and keep to time. We give you the room, guidance and opportunities to develop." },
      { zh: "如果你有冲劲、肯学，希望找一家愿意栽培你、也让你真正上手办案的律所，欢迎来信。请把求职信、详细履历和成绩单电邮至 {email}。", en: "If you are driven and curious, and want a firm that invests in your development while giving you real casework, we would like to meet you. Email your cover letter, a detailed CV and your academic transcripts to {email}." },
      { zh: "[年份] 年实习律师（Chambering）计划将在 [日期] 开始接受申请，收到申请后会陆续安排面试。我们希望你积极主动、对法律有好奇心、成绩不错，最好也参加过模拟法庭或其他课外活动。", en: "Applications for our [Year] chambering programme open on [date] and are reviewed on a rolling basis. We look for candidates who are driven and intellectually curious, with a good academic record and involvement in mooting or other extracurricular activities." },
    ] as Bi[],
  },
  // ③ 按职位申请（照片 1200 × 1500，直的 4:5；人放在中间偏下，左上留给标题。放进 public/images/ 后填路径；没有照片时是灰底）
  roles: {
    title: { zh: "选择你想应征的职位", en: "Apply by Role" },
    list: [
      { title: { zh: "律师", en: "Lawyers" }, desc: { zh: "律师与资深律师", en: "Associates and senior associates" }, image: null },
      { title: { zh: "行政与支援团队", en: "Business & Support Team" }, desc: { zh: "法律助理、行政人员", en: "Legal assistants and administration" }, image: null },
    ] as { title: Bi; desc: Bi; image: string | null }[],
  },
  // ④ 按地点申请
  locations: { title: { zh: "选择你想工作的办事处", en: "Apply by Location" } },
  apply: { zh: "立即应征", en: "Apply Now" },
  subject: { zh: "应征：{x}", en: "Application: {x}" }, // 电邮标题，{x} = 职位或办事处
};

export async function generateMetadata({ params }: PageProps<"/[lang]/careers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/careers", text.title[lang], text.description[lang]);
}

export default async function CareersPage({ params }: PageProps<"/[lang]/careers">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const mailto = (x: string) => `mailto:${firm.careersEmail}?subject=${encodeURIComponent(text.subject[lang].replace("{x}", x))}`;
  const email = <a href={`mailto:${firm.careersEmail}`}>{firm.careersEmail}</a>;

  return (
    <>
      {/* ═══ ① 标题：面包屑 → 满版照片 → 标题框（CoverHead，跟活动与讲座等页一样） ═══ */}
      <CoverHead
        crumbs={<>
          <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
          <li aria-current="page">{text.title[lang]}</li>
        </>}
        image={text.image}
        title={text.heading[lang]}
      />

      {/* ═══ ② 为什么选择我们（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-head"><h2>{text.why.title[lang]}</h2></div>
          <div className="prose">
            {text.why.paragraphs.map((p) => {
              const [before, after] = p[lang].split("{email}");
              return <p key={p.zh}>{before}{after !== undefined && <>{email}{after}</>}</p>;
            })}
          </div>
        </div>
      </section>

      {/* ═══ ③ 按职位申请：满版、左右各一半（手机上下排）（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-head"><h2>{text.roles.title[lang]}</h2></div>
        </div>
        <div className="photo-split">
          {text.roles.list.map((r) => (
            <PhotoCard key={r.title.en} href={mailto(r.title[lang])} image={r.image} title={r.title[lang]} desc={r.desc[lang]} action={text.apply[lang]} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      {/* ═══ ④ 按地点申请：城市 → 办事处（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head"><h2>{text.locations.title[lang]}</h2></div>
          <div className="groups">
            {cities.map((c) => (
              <div key={c.id}>
                <h3>{c.full[lang]}</h3>
                <ul className="link-list">
                  {offices.filter((o) => o.city === c.id).map((o) => (
                    <li key={o.id}>
                      <a href={mailto(o.name[lang])}>
                        <h3>{o.name[lang]}</h3>
                        <p>{o.address}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
