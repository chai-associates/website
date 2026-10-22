// ═══════════════════════════════════════════════════════════════
// 多个页面共用的区块（伺服器端组件，不需要 JavaScript）
// ───────────────────────────────────────────────────────────────
// · CoverHead   封面标题区：面包屑 → 满版照片 → 白色标题框（叠在照片下缘）
//               用在：离婚百科文章、关于我们的子页面（理念、荣誉、媒体、公益、活动）
// · OfficeTabs  办事处：城市按钮 + 该城市的办事处卡片
//               用在：首页「联系我们」、办事处页（两边一模一样，改这里就好）
// 样式在 globals.css 的 .bleed / .cover-panel / .tabs / .card
// ═══════════════════════════════════════════════════════════════
import Image from "next/image";
import { cities, common, mapsLink, offices, whatsappLink, type Lang } from "@/lib/site";

// 封面标题区。aside = 标题框右边的资料栏（例如文章的分类、法律依据），没有就不填
export function CoverHead({ crumbs, image, title, lead, aside }: {
  crumbs: React.ReactNode;
  image: string | null;
  title: string;
  lead: string;
  aside?: React.ReactNode;
}) {
  return (
    <section className="page-head">
      <div className="container">
        <ol className="breadcrumb">{crumbs}</ol>
      </div>
      <div className="bleed">
        {image && <Image src={image} alt="" fill preload sizes="100vw" />}
      </div>
      <div className="container">
        <div className="cover-panel">
          <div>
            <h1>{title}</h1>
            <p>{lead}</p>
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

// 办事处：选城市（选中的变黑底），下面只显示该城市的办事处。新增办事处或城市：只改 lib/site.ts
export function OfficeTabs({ lang }: { lang: Lang }) {
  return (
    <div className="tabs">
      {cities.map((c, i) => (
        <div key={c.id} className="tab">
          <input type="radio" name="office-city" id={`city-${c.id}`} defaultChecked={i === 0} />
          <label htmlFor={`city-${c.id}`} className="chip">
            {c.label[lang]} <em>{offices.filter((o) => o.city === c.id).length}</em>
          </label>
          <div className="tab-panel">
            <div className="card-grid">
              {offices.filter((o) => o.city === c.id).map((o) => (
                <div key={o.address} className="card">
                  <h3>{o.name[lang]}</h3>
                  <p>{o.address}</p>
                  <p>{o.phoneDisplay}</p>
                  <div className="btn-row">
                    <a className="btn btn-ghost btn-sm" href={`tel:${o.phone}`}>{common.call[lang]}</a>
                    <a className="btn btn-ghost btn-sm" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.whatsapp[lang]}</a>
                    <a className="btn btn-ghost btn-sm" href={mapsLink(o.address)} target="_blank" rel="noopener">{common.directions[lang]}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
