// ═══════════════════════════════════════════════════════════════
// 办事处 /locations
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题（营业时间）  ② 每个城市一组：横线标题（右边连到律师）+ 办事处卡片
//          ③ 不确定去哪一间？
// 城市、办事处、团队资料都在 lib/site.ts；这里只放这一页的文字。
// 办事处只有几间，所以全部列出、按城市分组，不做筛选。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, cityOf, common, firm, isLang, mapsLink, offices, team, whatsappLink } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "办事处", en: "Locations" },
  // ① 标题
  heading: { zh: "5 间办事处，\n就近找我们。", en: "Five offices,\nclose to you." },
  lead: { zh: "新山 3 间、八打灵再也 1 间、马六甲 1 间。所有咨询都需要先预约。", en: "Three in Johor Bahru, one in Petaling Jaya and one in Melaka. All consultations are by appointment." },
  // ② 城市
  count: { zh: "{n} 间办事处", en: "{n} offices" },
  countOne: { zh: "1 间办事处", en: "1 office" },
  lawyers: { zh: "认识{city}的律师", en: "Meet our {city} lawyers" },
  // ③ 不确定去哪一间？
  ask: {
    title: { zh: "不确定去哪一间？", en: "Not sure which office to visit?" },
    desc: { zh: "WhatsApp 我们，我们会安排离你最近的办事处和律师。", en: "Message us on WhatsApp and we'll arrange the office and lawyer nearest you." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/locations">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: text.title[lang], description: text.lead[lang] };
}

export default async function LocationsPage({ params }: PageProps<"/[lang]/locations">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

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
          <p>{firm.hours[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 每个城市一组 ═══ */}
      <section className="section">
        <div className="container stack">
          {cities.map((c) => {
            const list = offices.filter((o) => o.city === c.id);
            const hasTeam = team.some((p) => cityOf(p).id === c.id);
            return (
              <div key={c.id}>
                <div className="list-head">
                  <h2>{c.full[lang]}</h2>
                  {hasTeam ? (
                    <Link className="text-link" href={`/${lang}/people`}>{text.lawyers[lang].replace("{city}", c.full[lang])} →</Link>
                  ) : (
                    <span>{list.length === 1 ? text.countOne[lang] : text.count[lang].replace("{n}", String(list.length))}</span>
                  )}
                </div>
                <div className="card-grid">
                  {list.map((o) => (
                    <div key={o.address} className="card reveal">
                      <h3>{o.name[lang]}</h3>
                      <p>{o.address}</p>
                      <p>{o.phoneDisplay}</p>
                      <div className="btn-row">
                        <a className="btn btn-ghost btn-sm" href={`tel:${o.phone}`}>{common.call[lang]}</a>
                        <a className="btn btn-ghost btn-sm" href={mapsLink(o.address)} target="_blank" rel="noopener">{common.directions[lang]}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ ③ 不确定去哪一间？ ═══ */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{text.ask.title[lang]}</h2>
              <p>{text.ask.desc[lang]}</p>
            </div>
            <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
          </div>
        </div>
      </section>
    </>
  );
}
