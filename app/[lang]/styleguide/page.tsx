// ═══════════════════════════════════════════════════════════════
// 样式总览 /styleguide（不公开：不在选单，也不让 Google 收录）
// ───────────────────────────────────────────────────────────────
// 全站所有积木摆在同一页，用来确认品牌一致。
// 新增积木时，也要在这里加一个示范；这一页只「使用」积木，不定义任何样式。
// /zh/styleguide 和 /en/styleguide 对照看：英文版的大标题是 Garamond。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
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
    "段落 = 色带：白 / 浅灰 / 深色交替，相邻不同色；一条色带只做一件事；母页只放「图 → 标题 → 一两句 → 一个链接」",
    "一个区块只有一个标题，标题上面不放小标签；小标签只放资料（城市、职位、日期、类别、编号），古铜色",
    "照片比例：人像 4:5，场景 3:2（首页首屏满版照片例外）",
    "古铜只用在主要按钮和小标签",
    "动态要轻；手机设定「减少动态」时全部关闭",
  ],
  colors: [
    ["bg-ink", "ink 主要文字"], ["bg-ink-muted", "ink-muted 次要文字"], ["bg-line", "line 线"],
    ["bg-subtle", "subtle 浅灰区块"], ["bg-accent", "accent 古铜"], ["bg-inverse", "inverse 深色底"],
  ],
  sizes: [
    ["text-title", "title · 页面标题 h1"], ["text-lead", "lead · 页面副标题（跟 title 一组）"],
    ["text-subtitle", "subtitle · 区块标题 h2"], ["text-body", "body · 说明、正文、卡片标题 h3（跟 subtitle 一组）"], ["text-caption", "caption · 小标签、面包屑、备注"],
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
                <div key={cls} className="feature"><div className={`photo-frame ${cls}`} /><p>{label}</p></div>
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
            <h2>section-head：标题 → 副标题 → 说明</h2>
            <p>区块开头用这个；一组清单的开头用下面的 list-head。</p>
            <p>第二段是说明：灰色小字。</p>
          </div>
          <div className="stack">
          <div>
          <div className="list-head"><h3>按钮</h3><span>全部胶囊形 · 文字一律用动词</span></div>
          <div className="btn-row">
            <a className="btn btn-cta" href="#">立即咨询（btn-cta · 主要）</a>
            <a className="btn btn-outline" href="#">了解我们的服务（btn-outline）</a>
            <a className="btn btn-ghost" href="#">查看全部服务（btn-ghost · 次要）</a>
            <a className="btn btn-ghost btn-sm" href="#">小按钮（btn-sm）</a>
            <a className="text-link" href="#">文字链接（text-link）→</a>
          </div>
          </div>
          <div>
          <div className="list-head"><h3>小按钮</h3><span>chip · 选中或主要领域（data-lead）变黑 · 前面可加 filter-label</span></div>
          <div className="btn-row">
            <span className="filter-label">筛选说明（filter-label）</span>
            <a className="chip" data-lead href="#">抚养权与监护权（data-lead）→</a>
            <a className="chip" href="#">探视权（chip）→</a>
            <button type="button" className="chip" aria-pressed="true">新山（aria-pressed）</button>
          </div>
          </div>
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
                <a key={t} href="#" className="photo-card reveal">
                  <div><h3>{t}</h3><p>photo-card：左上标题、右下按钮</p></div>
                  <span className="btn btn-light btn-sm photo-card-action">阅读详情 →</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="list-head"><h2>人物卡片</h2><span>人像 4:5 · 手机 2 栏、电脑 4 栏</span></div>
            <div className="person-grid">
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
          <div>
            <div className="list-head"><h2>照片框</h2><span>photo-frame · 场景 3:2</span></div>
            <div className="photo-frame max-w-md"><Image src="/images/hero/hero-bg-v3.png" alt="" fill sizes="448px" /></div>
          </div>
          <div>
            <div className="list-head"><h2>滑动列</h2><span>scroll-row · 手机左右滑，电脑 --cols 栏</span></div>
            <div className="scroll-row [--cols:3]">
              {["01", "02", "03", "04"].map((n) => <div key={n} className="card"><h3>{n}</h3><p>scroll-row 里的项目</p></div>)}
            </div>
            <p className="scroll-hint">scroll-hint：← 左右滑动 →（只在手机显示）</p>
            <p className="muted">muted：次要文字用灰色</p>
          </div>
          <div>
            <div className="list-head"><h2>首屏与重点三栏</h2><span>hero（照片下缘淡出，压小标签 + 标题）· hero-intro · points</span></div>
            <div className="hero">
              <Image src="/images/hero/hero-bg-v3.png" alt="" fill sizes="1152px" />
              <div>
                <p className="tag">新山 · 吉隆坡 · 马六甲</p>
                <h1>{lang === "en" ? "Family law,\nhandled with care." : "专注家事法律，\n陪你走过人生转折"}</h1>
              </div>
            </div>
            <div className="hero-intro">
              <p>hero-intro：照片下面接说明 → 按钮</p>
              <div className="btn-row"><a className="btn btn-outline" href="#">了解我们的服务 →</a></div>
              <ul className="points">
                {["多年经验", "收费透明", "隐私保密"].map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div className="cover">
              <Image src="/images/hero/hero-bg-v3.png" alt="" fill sizes="1152px" />
              <h1>{lang === "en" ? "cover: article title" : "cover：百科文章封面"}</h1>
              <p>手机 16:9、电脑 4:1；照片 2400 × 1350，标题压在下方</p>
            </div>
          </div>
          <div>
            <div className="list-head"><h2>分页选择</h2><span>tabs · 不用 JavaScript</span></div>
            <div className="tabs">
              {["新山", "吉隆坡", "马六甲"].map((c, i) => (
                <div key={c} className="tab">
                  <input type="radio" name="sg-tabs" id={`sg-tab-${i}`} defaultChecked={i === 0} />
                  <label htmlFor={`sg-tab-${i}`} className="chip">{c} <em>{3 - i}</em></label>
                  <div className="tab-panel"><div className="card"><h3>{c}</h3><p>tab-panel：只显示选中的那一项</p></div></div>
                </div>
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
          <aside className="panel">
            <div>
              <h3>侧栏（with-aside）里放框（panel）</h3>
              <p>侧栏本身就是卡片。电脑版在右边并跟着滑动；手机版排在正文下面。</p>
            </div>
            <label className="field">
              栏位（field + select）
              <select className="select" defaultValue=""><option value="" disabled>请选择</option><option>丈夫</option><option>妻子</option></select>
            </label>
            <a className="btn btn-cta" href="#">发送我的资料到 WhatsApp 咨询</a>
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
            <div className="list-head"><h2>引言</h2><span>quote · 英文 Garamond · 不用斜体</span></div>
            <figure className="quote">
              <blockquote><p>{lang === "en" ? "Every family is different. We listen first, then explain your options in plain words." : "每个家庭都不一样。我们先听，再用简单的话告诉你有哪些选择。"}</p></blockquote>
              <figcaption>— {lang === "en" ? "Lim Hui Ying" : "林慧盈"}</figcaption>
            </figure>
          </div>
          <div>
            <div className="list-head"><h2>步骤</h2><span>steps · 编号用小标签</span></div>
            <ol className="steps">
              {["联系我们", "初次咨询", "报价与委托", "办理案件"].map((t, i) => (
                <li key={t}><span className="tag">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>steps：手机一栏，电脑自动并排</p></li>
              ))}
            </ol>
          </div>
          <div>
            <div className="list-head"><h2>链接清单</h2><span>link-list · 不加框，一行一个链接</span></div>
            <ul className="link-list">{["协议离婚", "单方面离婚", "收到离婚申请"].map((t) => <li key={t}><a href="#">{t}</a></li>)}</ul>
          </div>
          <div>
            <div className="list-head"><h2>小组</h2><span>groups · 同一段落里用小标题分组，不再每组划横线</span></div>
            <div className="groups">
              {["经历", "奖项"].map((t) => <div key={t}><h3>{t}</h3><ul className="rule-list"><li>{t} 1</li><li>{t} 2</li></ul></div>)}
            </div>
          </div>
          <div>
            <div className="list-head"><h2>正文段落</h2><span>prose · stack</span></div>
            <div className="prose">
              <p>prose：段落之间自动留一行的距离，用在个人介绍、离婚百科文章。</p>
              <p>stack：好几组「横线标题 + 内容」往下排时，组和组之间的距离统一。</p>
              <h2>prose 里的小标题（h2）</h2>
              <p>文章里的 h2 用 subtitle 字号，上面留比较大的距离。</p>
              <ul>
                <li>prose 里的清单（ul）有圆点</li>
                <li>项目之间有一点距离</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 色带：深色 + 导览项目 + 左右并排 ═══ */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-head">
            <h2>深色色带：留给重点时刻</h2>
            <p>说明文字自动变浅灰，小标签（编号等）变浅古铜。最后一条色带不用深色（页脚是深色）。</p>
          </div>
          <a className="btn btn-light" href="#">btn-light（深色上的次要按钮）</a>
        </div>
      </section>
      <section className="section">
        <div className="container stack">
          <div>
            <div className="section-head"><h2>文字项目</h2><p>feature：没有照片的项目（理念、荣誉）：小标签 → 标题 → 一两句；有照片的用 photo-card</p></div>
            <div className="card-grid">
              {["办理离婚", "孩子", "财产与赡养费"].map((t) => (
                <article key={t} className="feature"><span className="tag">理念</span><h3>{t}</h3><p>一句话说明</p></article>
              ))}
            </div>
          </div>
          <div className="split">
            <div className="photo-frame" />
            <div>
              <div className="section-head"><h2>左右并排</h2></div>
              <p>照片（左）+ 文字（右）；手机上下排。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 结尾行动色带 ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{lang === "en" ? "Not sure who to speak to?" : "不确定该找谁？"}</h2>
            <p>结尾行动色带：section-head（标题 + 一句）→ 一个主要按钮（可以再加一个文字链接）。每页最后一条，浅灰或白，不用深色。</p>
          </div>
          <div className="btn-row">
            <a className="btn btn-cta" href="#">直接咨询律师</a>
            <a className="text-link" href="#">查看全部服务 →</a>
          </div>
        </div>
      </section>
    </>
  );
}
