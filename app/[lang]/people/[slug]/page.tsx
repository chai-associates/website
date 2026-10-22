// ═══════════════════════════════════════════════════════════════
// 律师个人页 /people/[slug]（所有成员共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 职位 · 地区 → 名字 → 资料列（语言 · 办事处 · 执业年份）→ 安排说明 → 预约按钮（左）+ 照片（右；手机在上）
//             预约按钮 = 这一页唯一的主要行动：跳出全站的咨询表格，讯息已写好「我要预约某某咨询离婚事宜」
//          ② 底线分页 .tabs-line（不需要 JavaScript；没有内容的分页自动隐藏）：
//             概览：简介（标题）→ 段落 → 工作以外 → 用自己的话（引言）
//             资历：资格 · 经历 · 奖项 · 讲座与著作 · 会员资格（每一小组一个小标题）
//          ③ 同一个城市的其他成员（跟首页「我们的团队」一样左右滑）
// 名字、职位、城市、语言、负责的服务在 lib/site.ts（team）；
// 个人介绍等较长的内容写在下面 text.profiles（对应「律师问卷」），没有写的区块会自动隐藏。
// ⚠ 「经历」「奖项」等内容要符合律师公会的宣传规定：不写客户评价、不暗示胜诉、不自夸，
//   奖项只写「名称 · 颁发机构 · 年份」，上线前由律所核准。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonCard } from "@/lib/blocks";
import { ConsultButton } from "@/lib/interactive";
import { cityOf, common, displayName, isLang, initials, pageMeta, roles, team, whatsappLink, type Bi } from "@/lib/site";

type Profile = {
  admitted?: number;                         // 执业年份（只显示在标题区的资料列）
  quote?: Bi;                                // 用自己的话（In your own words）
  about?: Bi[];                              // 关于（每个元素一段）
  qualifications?: { label: Bi; value: Bi }[]; // 资历：执业资格、其他资格（学历也放在其他资格）
  experience?: Bi[];                         // 经历（律所核准后才放）
  awards?: Bi[];                             // 奖项：名称 · 颁发机构 · 年份
  talks?: Bi[];                              // 讲座与著作
  memberships?: Bi[];                        // 会员资格
  outside?: Bi;                              // 工作以外
};

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  // 每位成员的个人内容（key = lib/site.ts 里的 slug）。⚠ 下面是示范版面用的占位文字。
  profiles: {
    "lim-hui-ying": {
      admitted: 2010,
      quote: { zh: "[用自己的话：为什么做家事法、想对正在经历离婚的人说什么（两三句）]", en: "[In your own words: why family law, and what you would say to someone going through a divorce (two or three sentences)]" },
      about: [
        { zh: "[第一段：负责的案件类型、所在办事处]", en: "[Paragraph 1: the matters they handle and their office]" },
        { zh: "[第二段：执业背景与处理案件的方式]", en: "[Paragraph 2: background and how they approach a matter]" },
      ],
      qualifications: [
        { label: { zh: "执业资格", en: "Admitted as" }, value: { zh: "[马来亚高等法院辩护律师兼事务律师（年份）]", en: "[Advocate & Solicitor, High Court of Malaya (year)]" } },
        { label: { zh: "其他资格", en: "Other qualifications" }, value: { zh: "[学位、大学、年份；调解员等认证]", en: "[Degree, university, year; mediator or other accreditation]" } },
      ],
      experience: [
        { zh: "[经历 1，律所核准后填写]", en: "[Experience 1, approved by the firm]" },
        { zh: "[经历 2，律所核准后填写]", en: "[Experience 2, approved by the firm]" },
      ],
      awards: [{ zh: "[奖项名称 · 颁发机构 · 年份]", en: "[Award · Awarding body · Year]" }],
      talks: [
        { zh: "[讲座题目 · 主办单位 · 年份]", en: "[Talk title · Organiser · Year]" },
        { zh: "[文章或著作题目 · 刊物 · 年份]", en: "[Article or publication · Publisher · Year]" },
      ],
      memberships: [{ zh: "[会员资格，例如所属的律师公会委员会]", en: "[Membership, e.g. a Bar committee]" }],
      outside: { zh: "[工作以外的一句话，可不填]", en: "[One line outside the office, optional]" },
    },
  } as Record<string, Profile>,
  pending: { zh: "个人介绍正在准备中。", en: "A full profile is being prepared." },
  // ① 资料列
  languages: { zh: "语言", en: "Languages" },
  admitted: { zh: "执业年份", en: "Admitted" },
  office: { zh: "办事处", en: "Office" },
  admittedYear: { zh: "{year} 年", en: "{year}" },
  note: { zh: "你的咨询会由我们的客服团队安排时间，所有内容都保密。", en: "Your enquiry goes to our client team, who will arrange a time. Everything you share is confidential." },
  // 预约：按钮 → 跳出全站的咨询表格（lib/site.ts 的 inquiry），讯息第一句已写好这位律师的名字
  book: { zh: "现在预约{name}", en: "Book {name} now" },
  bookMessage: { zh: "我要预约{name}咨询离婚事宜。", en: "I'd like to book a consultation with {name} about my divorce matter." },
  // ② 内容
  bio: { zh: "简介", en: "Bio" },
  experience: { zh: "经历", en: "Experience" },
  awards: { zh: "奖项", en: "Awards" },
  talks: { zh: "讲座与著作", en: "Talks & publications" },
  memberships: { zh: "会员资格", en: "Memberships" },
  outside: { zh: "工作以外", en: "Outside the office" },
  qualifications: { zh: "资格", en: "Qualifications" },
  // ② 分页
  overview: { zh: "概览", en: "Overview" },
  credentials: { zh: "资历", en: "Credentials" },
  // ④ 同城成员
  swipe: { zh: "← 左右滑动 →", en: "← Swipe →" },
  alsoIn: { zh: "{city}的其他成员", en: "Also in {city}" },
  allPeople: { zh: "全部成员", en: "All our people" },
};

// 预先生成每位成员的页面；不在清单里的网址 → 404
export const dynamicParams = false;
export function generateStaticParams() {
  return team.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/people/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = team.find((x) => x.slug === slug);
  if (!isLang(lang) || !p) return {};
  return pageMeta(lang, `/people/${p.slug}`, displayName(p, lang), `${roles[p.role].label[lang]} · ${cityOf(p).full[lang]}`);
}

export default async function PersonPage({ params }: PageProps<"/[lang]/people/[slug]">) {
  const { lang, slug } = await params;
  const p = team.find((x) => x.slug === slug);
  if (!isLang(lang) || !p) notFound();
  const profile = text.profiles[p.slug] ?? {};
  const name = displayName(p, lang);
  const city = cityOf(p).full[lang];
  const role = roles[p.role].label[lang];
  const fill = (t: Bi) => t[lang].replace("{name}", name).replace("{city}", city);
  const hasCredentials = [profile.qualifications, profile.experience, profile.awards, profile.talks, profile.memberships].some((x) => x && x.length > 0);
  // 资历与经历的小组（没有资料的小组自动隐藏）
  const lists = [
    { key: "experience", title: text.experience, items: profile.experience },
    { key: "awards", title: text.awards, items: profile.awards },
    { key: "talks", title: text.talks, items: profile.talks },
    { key: "memberships", title: text.memberships, items: profile.memberships },
  ].filter((g) => g.items && g.items.length > 0);
  const others = team.filter((x) => cityOf(x).id === cityOf(p).id && x.slug !== p.slug);

  return (
    <>
      {/* ═══ ① 照片 + 名字 + 资料列 + 预约 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/people`}>{common.people[lang]}</Link></li>
            <li aria-current="page">{name}</li>
          </ol>
          <div className="profile-head">
            <div>
              <p className="tag">{role} · {city}</p>
              <h1>{name}</h1>
              <dl className="facts">
                <div><dt>{text.languages[lang]}</dt><dd>{p.languages[lang]}</dd></div>
                <div><dt>{text.office[lang]}</dt><dd>{city}</dd></div>
                {profile.admitted && <div><dt>{text.admitted[lang]}</dt><dd>{text.admittedYear[lang].replace("{year}", String(profile.admitted))}</dd></div>}
              </dl>
              <p>{text.note[lang]}</p>
              <div className="btn-row">
                <ConsultButton className="btn btn-cta" href={whatsappLink(lang, fill(text.bookMessage))} intro={fill(text.bookMessage)}>{fill(text.book)}</ConsultButton>
              </div>
            </div>
            <div className="person-photo">
              {p.image ? <Image src={p.image} alt={name} fill preload sizes="(min-width: 860px) 40vw, 100vw" /> : initials(p.name)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ② 分页：概览 · 资历（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="tabs tabs-line">
            <div className="tab">
              <input type="radio" name="profile-tab" id="profile-overview" defaultChecked />
              <label htmlFor="profile-overview">{text.overview[lang]}</label>
              <div className="tab-panel">
                <div className="stack">
                  <div id="bio">
                    <div className="list-head"><h2>{text.bio[lang]}</h2></div>
                    <div className="prose">
                      {profile.about ? (
                        <>
                          {profile.about.map((para) => <p key={para.zh}>{para[lang]}</p>)}
                          {profile.outside && <p className="muted">{text.outside[lang]}{lang === "zh" ? "：" : ": "}{profile.outside[lang]}</p>}
                        </>
                      ) : (
                        <p className="muted">{text.pending[lang]}</p>
                      )}
                    </div>
                  </div>
                  {profile.quote && (
                    <figure className="quote">
                      <blockquote><p>{profile.quote[lang]}</p></blockquote>
                      <figcaption>— {name}</figcaption>
                    </figure>
                  )}
                </div>
              </div>
            </div>
            {hasCredentials && (
              <div className="tab">
                <input type="radio" name="profile-tab" id="profile-credentials" />
                <label htmlFor="profile-credentials">{text.credentials[lang]}</label>
                <div className="tab-panel">
                  <div className="groups">
                    {profile.qualifications && (
                      <div>
                        <h3>{text.qualifications[lang]}</h3>
                        <dl className="facts">
                          {profile.qualifications.map((q) => <div key={q.label.en}><dt>{q.label[lang]}</dt><dd>{q.value[lang]}</dd></div>)}
                        </dl>
                      </div>
                    )}
                    {lists.map((g) => (
                      <div key={g.key}>
                        <h3>{g.title[lang]}</h3>
                        <ul className="rule-list">{g.items!.map((i) => <li key={i.zh}>{i[lang]}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ ③ 同一个城市的其他成员（白；左右滑） ═══ */}
      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="list-head">
              <h2>{fill(text.alsoIn)}</h2>
              <Link className="text-link" href={`/${lang}/people/all`}>{text.allPeople[lang]} →</Link>
            </div>
            <div className="scroll-row">
              {others.map((o) => <PersonCard key={o.slug} p={o} lang={lang} sizes="(min-width: 860px) 33vw, 80vw" />)}
            </div>
            <p className="scroll-hint">{text.swipe[lang]}</p>
          </div>
        </section>
      )}
    </>
  );
}
