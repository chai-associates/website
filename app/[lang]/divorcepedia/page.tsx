// ═══════════════════════════════════════════════════════════════
// 离婚百科 /divorcepedia（文章列表）
// ───────────────────────────────────────────────────────────────
// 区块顺序：① 标题  ② 分类按钮（一次只看一个分类；不需要 JavaScript。选了哪个分类会记在网址 #代号，文章的面包屑会带 #代号回来）→ 文章（满版照片按钮卡）+ 该分类的服务连结
//          ③ 想先聊聊你的情况？
// 文章资料在 lib/divorcepedia.ts；分类跟服务一样读 lib/site.ts。没有文章的分类自动隐藏。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskSection, PageHero, PhotoTile } from "@/lib/blocks";
import { articles } from "@/lib/divorcepedia";
import { TabsHash } from "@/lib/interactive";
import { common, isLang, pageMeta, serviceCategories } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "离婚百科", en: "Divorcepedia" },
  // ① 标题
  image: "/images/divorcepedia/divorcepedia.png" as string | null, // 首屏照片 2400 × 1350（规格见 lib/blocks.tsx 的 PageHero）
  hero: {
    title: { zh: "关于离婚前后的一些事\n你都可以先了解", en: "What to know\nbefore and after divorce" }, // 不加逗号句号
    cta: { zh: "阅读", en: "Read" }, // 往下到文章分类
  },
  // lead：不显示在页面上，给 Google 的页面说明
  lead: { zh: "用简单的话，解释马来西亚非穆斯林离婚的常见问题。", en: "Plain answers to common questions about non-Muslim divorce in Malaysia." },
  // ② 分类
  services: { zh: "查看{category}的服务", en: "View {category} services" }, // 读完百科 → 去看服务：一律用动词开头
  // ③ 想先聊聊你的情况？
  ask: {
    title: { zh: "想先聊聊你的情况？", en: "Want to talk through your situation?" },
    desc: { zh: "每个案件都不一样。WhatsApp 我们，律师会了解你的情况，再告诉你可以怎么做。", en: "Every case is different. Message us on WhatsApp and a lawyer will explain your options." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/divorcepedia">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/divorcepedia", text.title[lang], text.lead[lang]);
}

export default async function DivorcepediaPage({ params }: PageProps<"/[lang]/divorcepedia">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const groups = serviceCategories
    .map((c) => ({ ...c, list: articles.filter((a) => a.category === c.slug) }))
    .filter((g) => g.list.length > 0);

  return (
    <>
      {/* ═══ ① 首屏（PageHero） ═══ */}
      <PageHero
        image={text.image}
        eyebrow={<ol className="breadcrumb"><li><Link href={`/${lang}`}>{common.home[lang]}</Link></li><li aria-current="page">{text.title[lang]}</li></ol>}
        title={text.hero.title[lang]}
      >
        <a className="btn btn-light btn-next" href="#articles">{text.hero.cta[lang]}</a>
      </PageHero>

      {/* ═══ ② 分类按钮 → 该分类的文章（浅灰色带；首屏的「阅读」到这里） ═══ */}
      <section id="articles" className="section section-muted">
        {/* 分页不放在 .container 里：文章卡片满版（tabs-bleed），按钮和下面的链接仍跟内容对齐 */}
        <div className="tabs tabs-bleed">
          {groups.map((g, i) => (
            <div key={g.slug} className="tab">
              <input type="radio" name="pedia-category" id={`pedia-${g.slug}`} value={g.slug} defaultChecked={i === 0} />
              <label htmlFor={`pedia-${g.slug}`} className="chip">
                {g.title[lang]} <em>{g.list.length}</em>
              </label>
              <div className="tab-panel">
                <div className="stack">
                  {/* 满版一排两张、每张 16:9（照片 2400 × 1350，整张不裁）；手机一排一张 */}
                  <div className="photo-tiles photo-tiles-scene">
                    {g.list.map((a) => (
                      <PhotoTile key={a.slug} href={`/${lang}/divorcepedia/${a.slug}`} image={a.image} title={a.title[lang]} action={common.readArticle[lang]} sizes="(min-width: 768px) 50vw, 100vw" />
                    ))}
                  </div>
                  <div className="container">
                    <Link className="text-link" href={`/${lang}/services/${g.slug}`}>{text.services[lang].replace("{category}", g.title[lang])}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <TabsHash name="pedia-category" />
      </section>

      {/* ═══ ③ 想先聊聊你的情况？（白） ═══ */}
      <AskSection lang={lang} title={text.ask.title} desc={text.ask.desc} muted={false} />
    </>
  );
}
