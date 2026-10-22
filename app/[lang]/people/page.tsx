// ═══════════════════════════════════════════════════════════════
// 律师团队 /people（原本的「关于我们 › 律所简介」并进来了：介绍律所 = 介绍律所的人）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 首屏：团队合照 + 面包屑 + 标题（lib/blocks.tsx 的 PageHero），说明在照片下面
//          ② 律所简介：左边标题 + 三段、右边古铜超大数字（10+ 年经验 · 5 间办事处）（浅灰）
//          ③ 主管合伙人的话 + 按钮「认识我们的团队」（照片满版靠右、引言在左；手机照片在上。跟首页首屏同一个积木 .hero）
// 完整的成员名单在 /people/all（按职位折叠）。成员资料、职位、年经验、办事处在 lib/site.ts；这里只放这一页的文字。
// ⚠ 中括号 [ ] 里的都是占位，等律所问卷回来后照题目替换。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/lib/blocks";
import { common, displayName, firm, isLang, offices, pageMeta, roles, team, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  // ① 首屏：团队合照 + 标题（现在这张 2400 × 1350 的人站满整张，标题会压到人 → 新图请出 2400 × 1260，左边 45% 留白）
  image: "/images/about/our-firm-v2.png" as string | null,
  heading: { zh: "坦诚相待，\n重视每一段关系。", en: "Open, approachable,\nbuilt on relationships." },
  lead: {
    zh: "我们力求进取、亲切、重视关系，和同事之间、和客户之间，都坦诚相待。我们鼓励每一位成员做自己，也把握每个机会发掘和培养他们的潜力，让律所和客户都受益。",
    en: "We aim to be progressive, approachable and relationship-driven, and to keep our relationships open and honest, with each other and with our clients. We encourage our people to be themselves, and we take every opportunity to develop their potential, for the firm and for our clients.",
  },
  // ② 律所简介 + 数字（数字本身在 lib/site.ts：firm.experience、办事处数量自动算）
  firm: {
    title: { zh: "律所简介", en: "Our Firm" },
    // 第 2、3 段参考 Hogan Lovells 的语气改写（律师公会规定：不自夸、不比较）
    paragraphs: [
      { zh: "Chai & Associates 成立于 2017 年，现由 Chai Mei Ching 律师主持，专注处理非穆斯林的离婚与家事案件。", en: "Chai & Associates was founded in 2017 and is led today by Chai Mei Ching. The firm acts in divorce and family matters for non-Muslims." },
      { zh: "家庭面对变化的时候，你需要的不只是一个法律答案。", en: "When your family is going through change, you need more than a legal answer." },
      { zh: "我们和你一起把复杂的事情理清楚，告诉你还有哪些可以考虑的选择，让你每一步都走得安心。无论是抚养权、赡养费还是财产分配，我们都会用实际的判断，协助你做出对你和家人最重要的决定。", en: "We work through it with you: we make the complicated parts clear, show you the options you may not have considered, and help you take each step with confidence. Whether it is custody, maintenance or the division of assets, we bring practical judgment to the decisions that matter most to you and your family." },
    ] as Bi[],
    experience: { zh: "年经验", en: "Years of Experience" },
    offices: { zh: "间办事处", en: "Offices" },
  },
  // ③ 主管合伙人的话（照片、名字取自 team 里的 Managing Partner）
  //    照片规格：横向 2400 × 1350（16:9）；人放在右边三分之一，左边一半留白放字；脸在画面中间高度，上下各 15% 不放重要东西（电脑版会裁上下、平板会从左边裁）
  message: {
    quote: { zh: "[主管合伙人想对客户说的话，两三句，由本人确认]", en: "[A short message to clients from the Managing Partner, two or three sentences, confirmed by them]" },
    image: null as string | null, // 放进 public/images/people/ 后填 "/images/people/文件名.png"
    cta: { zh: "认识我们的团队", en: "See All Our People" },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/people">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/people", common.people[lang], text.lead[lang]);
}

export default async function PeoplePage({ params }: PageProps<"/[lang]/people">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const md = team.find((p) => p.role === "managing-partner");

  return (
    <>
      {/* ═══ ① 首屏（PageHero） ═══ */}
      <PageHero
        image={text.image}
        alt={firm.name}
        eyebrow={<ol className="breadcrumb"><li><Link href={`/${lang}`}>{common.home[lang]}</Link></li><li aria-current="page">{common.people[lang]}</li></ol>}
        title={text.heading[lang]}
        lead={text.lead[lang]}
      />

      {/* ═══ ② 律所简介：左边文字、右边古铜超大数字（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container intro">
          <div>
            <div className="section-head"><h2>{text.firm.title[lang]}</h2></div>
            <div className="prose">{text.firm.paragraphs.map((p) => <p key={p.zh}>{p[lang]}</p>)}</div>
          </div>
          <ul className="figures">
            <li><span className="big-num">{firm.experience}</span><span>{text.firm.experience[lang]}</span></li>
            <li><span className="big-num">{offices.length}</span><span>{text.firm.offices[lang]}</span></li>
          </ul>
        </div>
      </section>

      {/* ═══ ③ 主管合伙人的话 + 认识我们的团队 ═══ */}
      <section className="hero">
        <div className="hero-photo">
          {md && text.message.image && <Image src={text.message.image} alt={displayName(md, lang)} fill sizes="100vw" />}
        </div>
        <div className="container hero-body">
          {md && (
            <figure className="quote">
              <blockquote><p>{text.message.quote[lang]}</p></blockquote>
              <figcaption>— {displayName(md, lang)} · {roles[md.role].label[lang]}</figcaption>
            </figure>
          )}
          <div className="btn-row">
            <Link className="btn btn-ghost btn-next" href={`/${lang}/people/all`}>{text.message.cta[lang]}</Link>
          </div>
        </div>
      </section>

    </>
  );
}
