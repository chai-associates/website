// ═══════════════════════════════════════════════════════════════
// 律师个人页 /people/[slug]（所有成员共用这一个模板）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 照片 + 名字 + 资料列 + 预约按钮
//          ② 用自己的话（引言）
//          ③ 关于 · 可以帮你的事（主要领域排第一、变黑）· 经历 · 奖项 · 讲座与著作 · 会员资格 · 工作以外（左）
//            + 资历与预约（右侧栏）
//          ④ 同一个城市的其他成员
// 名字、职位、城市、语言、负责的服务在 lib/site.ts（team）；
// 个人介绍等较长的内容写在下面 text.profiles（对应「律师问卷」），没有写的区块会自动隐藏。
// ⚠ 「经历」「奖项」等内容要符合律师公会的宣传规定：不写客户评价、不暗示胜诉、不自夸，
//   奖项只写「名称 · 颁发机构 · 年份」，上线前由律所核准。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cityOf, common, displayName, initials, isLang, pageMeta, roles, services, team, whatsappLink, type Bi } from "@/lib/site";

type Profile = {
  admitted?: number;                         // 执业年份（只显示在标题区的资料列）
  tagline?: Bi;                              // 一句话介绍
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
      tagline: { zh: "[一句话介绍，由律师本人确认]", en: "[One-line introduction, confirmed by the lawyer]" },
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
  book: { zh: "预约{name}的咨询", en: "Book a consultation with {name}" },
  bookMessage: { zh: "你好，我想预约{name}律师的咨询。", en: "Hi, I'd like to book a consultation with {name}." },
  note: { zh: "你的咨询会由我们的客服团队安排时间，所有内容都保密。", en: "Your enquiry goes to our client team, who will arrange a time. Everything you share is confidential." },
  // ② 内容
  about: { zh: "关于{name}", en: "About {name}" },
  help: { zh: "可以帮你的事", en: "How {name} can help" },
  experience: { zh: "经历", en: "Experience" },
  awards: { zh: "奖项", en: "Awards" },
  talks: { zh: "讲座与著作", en: "Talks & publications" },
  memberships: { zh: "会员资格", en: "Memberships" },
  outside: { zh: "工作以外", en: "Outside the office" },
  qualifications: { zh: "资历", en: "Qualifications" },
  ready: { zh: "准备好聊聊了吗？", en: "Ready to talk it through?" },
  // ④ 同城成员
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
  return pageMeta(lang, `/people/${p.slug}`, displayName(p, lang), text.profiles[p.slug]?.tagline?.[lang] ?? roles[p.role].label[lang]);
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
  const bookHref = whatsappLink(lang, fill(text.bookMessage));
  // 主要领域排第一（data-lead 会让它变黑）
  const helps = services.filter((s) => p.services.includes(s.slug)).sort((a, b) => Number(b.slug === p.lead) - Number(a.slug === p.lead));
  const others = team.filter((x) => cityOf(x).id === cityOf(p).id && x.slug !== p.slug).slice(0, 4);

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
            <div className="person-photo">
              {p.image ? <Image src={p.image} alt={name} fill preload sizes="(min-width: 860px) 40vw, 100vw" /> : initials(p.name)}
            </div>
            <div>
              <p className="tag">{role} · {city}</p>
              <h1>{name}</h1>
              {profile.tagline && <p>{profile.tagline[lang]}</p>}
              <dl className="facts">
                <div><dt>{text.languages[lang]}</dt><dd>{p.languages[lang]}</dd></div>
                {profile.admitted && <div><dt>{text.admitted[lang]}</dt><dd>{profile.admitted}</dd></div>}
                <div><dt>{text.office[lang]}</dt><dd>{city}</dd></div>
              </dl>
              <div className="btn-row">
                <a className="btn btn-cta" href={bookHref} target="_blank" rel="noopener">{fill(text.book)}</a>
              </div>
              <p>{text.note[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ② 用自己的话 ═══ */}
      {profile.quote && (
        <section className="section">
          <div className="container">
            <figure className="quote reveal">
              <blockquote><p>{profile.quote[lang]}</p></blockquote>
              <figcaption>— {name}</figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* ═══ ③ 内容（左）+ 资历与预约（右侧栏） ═══ */}
      <section className="section section-muted">
        <div className="container with-aside">
          <div className="stack">
            <div>
              <div className="list-head"><h2>{fill(text.about)}</h2></div>
              {profile.about ? (
                <div className="prose">{profile.about.map((para) => <p key={para.zh}>{para[lang]}</p>)}</div>
              ) : (
                <p className="muted">{text.pending[lang]}</p>
              )}
            </div>
            {helps.length > 0 && (
              <div>
                <div className="list-head"><h2>{fill(text.help)}</h2></div>
                <div className="btn-row">
                  {helps.map((s) => <Link key={s.slug} className="chip" data-lead={s.slug === p.lead || undefined} href={`/${lang}/services/${s.category}/${s.slug}`}>{s.title[lang]} →</Link>)}
                </div>
              </div>
            )}
            {profile.experience && (
              <div>
                <div className="list-head"><h2>{text.experience[lang]}</h2></div>
                <ul className="rule-list">{profile.experience.map((e) => <li key={e.zh}>{e[lang]}</li>)}</ul>
              </div>
            )}
            {profile.awards && (
              <div>
                <div className="list-head"><h2>{text.awards[lang]}</h2></div>
                <ul className="rule-list">{profile.awards.map((a) => <li key={a.zh}>{a[lang]}</li>)}</ul>
              </div>
            )}
            {profile.talks && (
              <div>
                <div className="list-head"><h2>{text.talks[lang]}</h2></div>
                <ul className="rule-list">{profile.talks.map((t) => <li key={t.zh}>{t[lang]}</li>)}</ul>
              </div>
            )}
            {profile.memberships && (
              <div>
                <div className="list-head"><h2>{text.memberships[lang]}</h2></div>
                <ul className="rule-list">{profile.memberships.map((m) => <li key={m.zh}>{m[lang]}</li>)}</ul>
              </div>
            )}
            {profile.outside && (
              <dl className="facts">
                <div><dt>{text.outside[lang]}</dt><dd>{profile.outside[lang]}</dd></div>
              </dl>
            )}
          </div>
          <aside>
            {profile.qualifications && (
              <div>
                <h3>{text.qualifications[lang]}</h3>
                <dl className="facts">
                  {profile.qualifications.map((q) => <div key={q.label.en}><dt>{q.label[lang]}</dt><dd>{q.value[lang]}</dd></div>)}
                </dl>
              </div>
            )}
            <div>
              <h3>{text.ready[lang]}</h3>
              <p>{text.note[lang]}</p>
            </div>
            <a className="btn btn-cta" href={bookHref} target="_blank" rel="noopener">{fill(text.book)}</a>
          </aside>
        </div>
      </section>

      {/* ═══ ④ 同一个城市的其他成员 ═══ */}
      {others.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="list-head">
              <h2>{fill(text.alsoIn)}</h2>
              <Link className="text-link" href={`/${lang}/people`}>{text.allPeople[lang]} →</Link>
            </div>
            <div className="person-grid">
              {others.map((o) => (
                <Link key={o.slug} href={`/${lang}/people/${o.slug}`} className="person-card reveal">
                  <div className="person-photo">
                    {o.image ? <Image src={o.image} alt={displayName(o, lang)} fill sizes="(min-width: 860px) 25vw, 50vw" /> : initials(o.name)}
                  </div>
                  <h3>{displayName(o, lang)}</h3>
                  <strong>{roles[o.role].label[lang]}</strong>
                  <p>{city} · {o.languages[lang]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
