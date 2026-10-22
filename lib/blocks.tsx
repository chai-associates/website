// ═══════════════════════════════════════════════════════════════
// 多个页面共用的区块（伺服器端组件，不需要 JavaScript）
// ───────────────────────────────────────────────────────────────
// · PageHero    首屏（左字右图）：小字 / 面包屑 → 两行标题 → 按钮，全部叠在照片左边（不碰到右边的人）
//               用在：首页、离婚服务、离婚百科、律师团队、荣誉与认可
// · CoverHead   封面标题区：面包屑 → 满版照片 → 白色标题框（叠在照片下缘）
//               用在：离婚百科文章、关于我们的子页面（理念、荣誉、媒体、公益、活动）
// · OfficeTabs  办事处：城市按钮 + 该城市的办事处卡片
//               用在：首页「联系我们」、办事处页（两边一模一样，改这里就好）
// · PersonCard  人卡：照片 + 名字 + 地区 · 职位；电脑鼠标移上去多显示语言、主要领域
//               用在：首页「我们的团队」、律师团队、个人页底部
// · Icon        线条图示（全站一套）：首页重点、☰ 选单「关注我们」的社群（箭头不用图示，由 CSS 加 →）
// · PhotoCard   照片卡片：照片 + 标题（+ 一句说明）+ 右下角按钮；整张可点
//               用在：首页、离婚服务（服务分类）、离婚百科（文章）、文章页底部
// · AskSection  页面结尾「问律师」：标题 + 说明 + 直接咨询律师按钮（可加旁边的链接、下面的清单）
//               用在：服务、服务分类、办事处、离婚百科、文章、关于我们各页
// 样式在 globals.css 的 .bleed / .cover-panel / .tabs / .card / .person-card
// ═══════════════════════════════════════════════════════════════
import Image from "next/image";
import Link from "next/link";
import { ConsultButton, HeaderOverHero } from "@/lib/interactive";
import { cities, cityOf, common, displayName, initials, mapsLink, offices, roles, services, whatsappLink, type Bi, type Lang, type Member } from "@/lib/site";

// 首屏（左字右图）。eyebrow = 小字或面包屑；title = 两行标题（用 \n 换行，不加逗号句号）；children = 按钮、选单或说明
// 全部叠在照片左边的文字框里。照片规格：2400 × 1260（--ratio-hero）；人放在右边 55%，左边 45% 暗、干净（放白字）；
// 最上面 15% 不放重要东西（电脑版页首会盖住）
export function PageHero({ image, alt = "", eyebrow, title, children }: {
  image: string | null;
  alt?: string;
  eyebrow: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero hero-top">
      <HeaderOverHero />
      <div className="hero-photo">{image && <Image src={image} alt={alt} fill preload sizes="100vw" />}</div>
      <div className="hero-body">
        {eyebrow}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

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
                    <ConsultButton className="btn btn-ghost btn-sm" href={whatsappLink(lang)}>{common.whatsapp[lang]}</ConsultButton>
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

// 人卡。sizes = 照片在画面上大约多宽（给 next/image 挑合适的尺寸）
export function PersonCard({ p, lang, sizes }: { p: Member; lang: Lang; sizes: string }) {
  const name = displayName(p, lang);
  const lead = services.find((s) => s.slug === p.lead);
  return (
    <Link href={`/${lang}/people/${p.slug}`} className="person-card">
      <div className="person-photo">
        {p.image ? <Image src={p.image} alt={name} fill sizes={sizes} /> : initials(p.name)}
      </div>
      <div className="person-info">
        <h3>{name}</h3>
        <p>{cityOf(p).label[lang]} · {roles[p.role].label[lang]}</p>
        <div className="person-more">
          <p>{p.languages[lang]}{lead && <><br />{lead.title[lang]}</>}</p>
        </div>
      </div>
    </Link>
  );
}

// 线条图示（全站唯一一套）：大小、线条粗细跟着 tokens（--icon-size 以字为单位，跟着旁边文字的字号走）
const iconPaths = {
  award: <><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  update: <><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></>,
  facebook: <path d="M16 3.5h-2.5A3.5 3.5 0 0 0 10 7v14M7 11h7.5" />,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.25" cy="6.75" r="0.5" fill="currentColor" /></>,
};
export type IconName = keyof typeof iconPaths;
export function Icon({ name }: { name: IconName }) {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

// 照片卡片（3:2，文字放在照片里）。desc 不填 = 只有标题（离婚百科的文章清单）
export function PhotoCard({ href, image, title, desc, action }: { href: string; image?: string | null; title: string; desc?: string; action: string }) {
  return (
    <Link href={href} className="photo-card">
      {image && <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" />}
      <div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
      <span className="btn btn-light btn-sm photo-card-action">{action}</span>
    </Link>
  );
}

// 页面结尾「问律师」。muted：浅灰（预设）或白，看前一条色带是什么颜色（相邻不同色）。
// message：WhatsApp 讯息第一句（文章页带上文章名）；action：按钮旁边的链接；children：按钮下面的东西（例如相关服务清单）
export function AskSection({ lang, title = common.ask.title, desc = common.ask.desc, muted = true, message, action, children }: {
  lang: Lang;
  title?: Bi;
  desc?: Bi;
  muted?: boolean;
  message?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const button = <ConsultButton className="btn btn-cta" href={whatsappLink(lang, message)} intro={message}>{common.askLawyer[lang]}</ConsultButton>;
  return (
    <section className={muted ? "section section-muted" : "section"}>
      <div className="container">
        <div className="section-head">
          <h2>{title[lang]}</h2>
          <p>{desc[lang]}</p>
        </div>
        {action ? <div className="btn-row">{button}{action}</div> : button}
        {children}
      </div>
    </section>
  );
}
