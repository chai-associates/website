// ═══════════════════════════════════════════════════════════════
// 样式总览 /styleguide（不公开：不在选单，也不让 Google 收录）
// ───────────────────────────────────────────────────────────────
// 全站所有积木摆在同一页，用来确认品牌一致。
// 新增积木时，也要在这里加一个示范；这一页只「使用」积木，不定义任何样式。
// /zh/styleguide 和 /en/styleguide 对照看：英文版的大标题是 Garamond。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/site";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// ─────────────────────────────────────────────
// 示范用的文字
// ─────────────────────────────────────────────
const text = {
  rules: [
    "圆角 12px（卡片、照片）· 栏位 8px",
    "按钮一律胶囊形",
    "英文大标题（h1、h2）用 Garamond 衬线；中文标题、h3 以下用无衬线",
    "灰色区块 = 换话题；细横线标题 = 一组清单的开头",
    "小标签：大写、拉开字距、古铜色",
    "照片比例：人像 4:5，场景 3:2",
    "古铜只用在主要按钮和小标签",
    "动态要轻；手机设定「减少动态」时全部关闭",
  ],
  colors: [
    ["bg-ink", "ink 主要文字"], ["bg-ink-muted", "ink-muted 次要文字"], ["bg-line", "line 线"],
    ["bg-subtle", "subtle 浅灰区块"], ["bg-accent", "accent 古铜"], ["bg-inverse", "inverse 深色底"],
  ],
  sizes: [
    ["text-display", "display · h1"], ["text-title", "title · h2"], ["text-subtitle", "subtitle · h3"],
    ["text-lead", "lead · 标题下的说明"], ["text-body", "body · 正文"], ["text-small", "small · 次要说明"], ["text-caption", "caption · 标签、备注"],
  ],
  people: [
    { initials: "LH", name: { zh: "林慧盈", en: "Lim Hui Ying" }, role: { zh: "主管合伙人", en: "Managing Partner" }, meta: { zh: "新山 · English · 华语", en: "Johor Bahru · English · 华语" } },
    { initials: "TK", name: { zh: "陈国伟", en: "Tan Kok Wai" }, role: { zh: "合伙人", en: "Partner" }, meta: { zh: "八打灵再也 · English · 华语", en: "Petaling Jaya · English · 华语" } },
    { initials: "NP", name: { zh: "黄佩珊", en: "Ng Pei Shan" }, role: { zh: "合伙人", en: "Partner" }, meta: { zh: "马六甲 · English · BM", en: "Melaka · English · BM" } },
  ],
};

export default async function StyleguidePage({ params }: PageProps<"/[lang]/styleguide">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ 页面标题区 page-head ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>首页</Link></li>
            <li aria-current="page">样式总览</li>
          </ol>
          <h1>{lang === "en" ? "The people beside you." : "陪你走过人生转折。"}</h1>
          <p>page-head：面包屑 → 大标题 → 说明（lead）</p>
          <p>第二段说明会自动变小字</p>
        </div>
      </section>

      {/* ═══ 品牌语法 8 条 ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="list-head"><h2>品牌语法</h2><span>8 条 · 已锁定</span></div>
          <ol className="rule-list">
            {text.rules.map((r, i) => <li key={r}><span className="tag">{String(i + 1).padStart(2, "0")}</span> {r}</li>)}
          </ol>
        </div>
      </section>

      {/* ═══ 颜色、字号 ═══ */}
      <section className="section">
        <div className="container stack">
          <div>
            <div className="list-head"><h2>颜色</h2><span>tokens.css</span></div>
            <div className="card-grid">
              {text.colors.map(([cls, label]) => (
                <div key={cls}><div className={`${cls} h-16 rounded-md border border-line`} /><p className="mt-2 text-small">{label}</p></div>
              ))}
            </div>
          </div>
          <div>
            <div className="list-head"><h2>字号</h2><span>流体 · 320 → 1440px</span></div>
            <ul className="rule-list">
              {text.sizes.map(([cls, label]) => <li key={cls} className={cls}>{label}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ 区块标题、按钮 ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <p className="tag">{lang === "en" ? "Our services" : "服务范围"}</p>
            <h2>section-head：小标签 → 标题 → 说明</h2>
            <p>区块开头用这个；一组清单的开头用下面的 list-head。</p>
          </div>
          <div className="list-head"><h3>按钮</h3><span>全部胶囊形 · 文字一律用动词</span></div>
          <div className="btn-row">
            <a className="btn btn-cta" href="#">立即咨询（btn-cta · 主要）</a>
            <a className="btn btn-outline" href="#">了解我们的服务（btn-outline）</a>
            <a className="btn btn-ghost" href="#">查看全部服务（btn-ghost · 次要）</a>
            <a className="btn btn-ghost btn-sm" href="#">小按钮（btn-sm）</a>
            <a className="text-link" href="#">文字链接（text-link）→</a>
          </div>
        </div>
      </section>

      {/* ═══ 卡片 ═══ */}
      <section className="section">
        <div className="container stack">
          <div>
            <div className="list-head"><h2>服务卡片</h2><a className="text-link" href="#">查看全部 →</a></div>
            <div className="card-grid">
              {["协议离婚", "单方面离婚", "收到离婚申请"].map((t) => (
                <a key={t} href="#" className="card card-link reveal">
                  <h3>{t}</h3>
                  <p>card card-link：标题 → 说明 → 阅读详情</p>
                  <span className="text-link">阅读详情 →</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="list-head"><h2>照片卡片</h2><span>场景 3:2</span></div>
            <div className="card-grid">
              {["办理离婚", "孩子"].map((t) => (
                <a key={t} href="#" className="photo-card aspect-[3/2] reveal">
                  <div><h3>{t}</h3><p className="mt-1 text-small">photo-card：左上标题、右下按钮</p></div>
                  <span className="btn btn-light btn-sm photo-card-action">阅读详情 →</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="list-head"><h2>人物卡片</h2><span>人像 4:5</span></div>
            <div className="card-grid">
              {text.people.map((p) => (
                <article key={p.initials} className="person-card reveal">
                  <div className="person-photo">{p.initials}</div>
                  <h3>{p.name[lang]}</h3>
                  <strong>{p.role[lang]}</strong>
                  <p>{p.meta[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 资料列、横线清单、左右两栏 ═══ */}
      <section className="section section-muted">
        <div className="container with-aside">
          <div className="stack">
            <div>
              <div className="list-head"><h2>资料列</h2><span>facts</span></div>
              <dl className="facts">
                <div><dt>{lang === "en" ? "Languages" : "语言"}</dt><dd>English · 华语 · 粤语</dd></div>
                <div><dt>{lang === "en" ? "Admitted" : "执业年份"}</dt><dd>2014</dd></div>
                <div><dt>{lang === "en" ? "Office" : "办事处"}</dt><dd>{lang === "en" ? "Johor Bahru" : "新山"}</dd></div>
              </dl>
            </div>
            <div>
              <div className="list-head"><h2>横线清单</h2><span>rule-list</span></div>
              <ul className="rule-list">
                <li>结婚满 2 年后才能申请。</li>
                <li>双方要同意所有条件。</li>
                <li>不需要先经过婚姻辅导。</li>
              </ul>
            </div>
          </div>
          <aside>
            <div>
              <h3>侧栏（with-aside）</h3>
              <p>侧栏本身就是卡片。电脑版在右边并跟着滑动；手机版排在正文下面。</p>
            </div>
            <label className="field">
              栏位（field + select）
              <select className="select" defaultValue=""><option value="" disabled>请选择</option><option>丈夫</option><option>妻子</option></select>
            </label>
            <a className="btn btn-cta w-full" href="#">发送我的资料到 WhatsApp 咨询</a>
          </aside>
        </div>
      </section>

      {/* ═══ 个人页标题区、正文段落 ═══ */}
      <section className="section">
        <div className="container stack">
          <div>
            <div className="list-head"><h2>个人页标题区</h2><span>profile-head</span></div>
            <div className="profile-head">
              <div className="person-photo">LH</div>
              <div>
                <p className="tag">{lang === "en" ? "Partner · Johor Bahru" : "合伙人 · 新山"}</p>
                <h1>{lang === "en" ? "Lim Hui Ying" : "林慧盈"}</h1>
                <p>小标签 → 名字 → 一句话介绍 → 资料列 → 按钮 → 小字说明</p>
                <dl className="facts">
                  <div><dt>{lang === "en" ? "Languages" : "语言"}</dt><dd>English · 华语</dd></div>
                  <div><dt>{lang === "en" ? "Admitted" : "执业年份"}</dt><dd>2010</dd></div>
                </dl>
                <div className="btn-row"><a className="btn btn-cta" href="#">预约林慧盈的咨询</a></div>
                <p>按钮下面的小字说明</p>
              </div>
            </div>
          </div>
          <div>
            <div className="list-head"><h2>正文段落</h2><span>prose · stack</span></div>
            <div className="prose">
              <p>prose：段落之间自动留一行的距离，用在个人介绍、离婚百科文章。</p>
              <p>stack：好几组「横线标题 + 内容」往下排时，组和组之间的距离统一。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 深色行动区块 ═══ */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>{lang === "en" ? "Not sure who to speak to?" : "不确定该找谁？"}</h2>
              <p>cta-band：一句话 + 一个主要按钮（可以再加一个文字链接）。每页最多一个。</p>
            </div>
            <div className="btn-row">
              <a className="btn btn-cta" href="#">直接咨询律师</a>
              <a className="text-link" href="#">查看全部服务 →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
