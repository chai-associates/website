// ═══════════════════════════════════════════════════════════════
// 全部成员 /people/all（律师团队页的「认识我们的团队」带到这里）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 3 组成员（合伙人与顾问律师 / 律师 / 法律支援团队）：全部折叠，点开才看到人
// 人卡排列：手机 1 栏、平板 2 栏、电脑 3 栏（.person-grid）
// 不放办事处筛选：每个人的卡片已经写了地区；访客先选「找哪一类人」，不用一次看完所有人。
// 成员资料、职位、分组都在 lib/site.ts（team、roles、teamGroups）；这里只放这一页的文字。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PersonCard } from "@/lib/blocks";
import { common, isLang, pageMeta, roles, team, teamGroups } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "全部成员", en: "All Our People" },
  // ① 标题
  heading: { zh: "认识我们的团队", en: "Meet our people" },
  lead: { zh: "按职位分组，点开就看到每一位成员。", en: "Grouped by role. Open a group to see who's in it." },
  // ② 每一组的人数
  count: { zh: "{n} 位", en: "{n} people" },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/people/all">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/people/all", text.title[lang], text.lead[lang]);
}

export default async function AllPeoplePage({ params }: PageProps<"/[lang]/people/all">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ ① 标题 ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li><Link href={`/${lang}/people`}>{common.people[lang]}</Link></li>
            <li aria-current="page">{text.title[lang]}</li>
          </ol>
          <h1>{text.heading[lang]}</h1>
          <p>{text.lead[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 成员：每一组折叠 ═══ */}
      <section className="section">
        <div className="container">
          {teamGroups.map((g) => {
            const people = team.filter((p) => roles[p.role].group === g.id);
            if (people.length === 0) return null;
            return (
              <details key={g.id} className="fold">
                <summary>
                  <h2>{g.title[lang]}</h2>
                  <span>{text.count[lang].replace("{n}", String(people.length))}</span>
                </summary>
                <div className="person-grid">
                  {people.map((p) => <PersonCard key={p.slug} p={p} lang={lang} sizes="(min-width: 860px) 33vw, (min-width: 600px) 50vw, 100vw" />)}
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </>
  );
}
