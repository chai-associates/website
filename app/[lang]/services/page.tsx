// ═══════════════════════════════════════════════════════════════
// 全部服务 /services
// ───────────────────────────────────────────────────────────────
// 母页：只做导览，带人到分类页（每个分类的服务清单在分类页）。品牌语法 4：一条色带只做一件事。
// 色带顺序：① 标题（白）  ② 从你的情况开始（浅灰）  ③ 5 个分类：照片 → 标题 → 一句 → 链接（白）  ④ 找不到你的情况？（浅灰）
// 分类和服务清单在 lib/site.ts；这里只放这一页的文字和「情况 → 服务」的对应。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SituationPicker } from "@/lib/interactive";
import { common, isLang, pageMeta, serviceCategories, services, whatsappLink, type Bi } from "@/lib/site";

// ─────────────────────────────────────────────
// 这一页的文字（中英对照）
// ─────────────────────────────────────────────
const text = {
  meta: {
    description: {
      zh: "Chai & Associates 的离婚与家事法律服务：协议离婚、单方面离婚、抚养权、赡养费、财产分配等。",
      en: "Divorce and family law services at Chai & Associates: joint and single petitions, custody, maintenance, division of assets and more.",
    },
  },
  // ① 标题
  lead: { zh: "从你的情况开始，找到对应的服务。", en: "Start with your situation and find the right service." },
  scope: { zh: "本所处理非穆斯林的离婚与家事案件。", en: "We act in divorce and family matters for non-Muslims." },
  // ② 我的情况是
  situation: { zh: "从你的情况开始", en: "Start with your situation" },
  picker: {
    label: { zh: "我的情况是", en: "My situation is" },
    placeholder: { zh: "请选择", en: "Choose one" },
    // 每个情况对应哪些服务（写服务的 slug，顺序 = 显示顺序）
    options: [
      { label: { zh: "我们都同意离婚", en: "We both agree to divorce" }, slugs: ["joint-petition"] },
      { label: { zh: "对方不同意离婚", en: "My spouse won't agree to divorce" }, slugs: ["single-petition", "adultery"] },
      { label: { zh: "我收到了对方的离婚申请", en: "I've received a divorce petition" }, slugs: ["responding"] },
      { label: { zh: "对方有外遇", en: "My spouse has had an affair" }, slugs: ["adultery", "single-petition"] },
      { label: { zh: "我想争取孩子", en: "I want to keep my children" }, slugs: ["custody", "access", "child-maintenance"] },
      { label: { zh: "我想知道财产怎么分", en: "I want to know how assets are divided" }, slugs: ["matrimonial-assets", "spousal-maintenance", "debt-recovery"] },
      { label: { zh: "对方不付赡养费", en: "My ex-spouse isn't paying maintenance" }, slugs: ["enforcement", "variation"] },
      { label: { zh: "我在国外结婚或离婚", en: "I married or divorced overseas" }, slugs: ["foreign-divorce", "foreigner-divorce"] },
      { label: { zh: "我需要保护自己和孩子", en: "I need to protect myself and my children" }, slugs: ["protection-order"] },
      { label: { zh: "我想先分居", en: "I want to separate first" }, slugs: ["deed-of-separation", "mediation"] },
      { label: { zh: "我需要单身证明", en: "I need a single status certificate" }, slugs: ["single-status"] },
      { label: { zh: "我的婚姻可能一开始就无效", en: "My marriage may not be valid" }, slugs: ["annulment"] },
    ] as { label: Bi; slugs: string[] }[],
  },
  // ③ 全部服务（5 个分类）
  all: { zh: "全部服务", en: "All services" },
  allDesc: { zh: "离婚相关的服务分成 5 类，点进去看每一类的服务。", en: "Our services fall into five areas. Open one to see the services in it." },
  viewCategory: { zh: "查看这个分类", en: "View this category" },
  // ④ 直接咨询
  ask: {
    title: { zh: "找不到你的情况？", en: "Can't find your situation?" },
    desc: { zh: "每个家庭的情况都不一样，直接问律师最快。", en: "Every family is different. The quickest way is to ask a lawyer." },
  },
};

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/services", common.services[lang], text.meta.description[lang]);
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const href = (slug: string) => {
    const s = services.find((x) => x.slug === slug)!;
    return `/${lang}/services/${s.category}/${s.slug}`;
  };

  return (
    <>
      {/* ═══ ① 标题（白） ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li aria-current="page">{common.services[lang]}</li>
          </ol>
          <h1>{common.services[lang]}</h1>
          <p>{text.lead[lang]}</p>
          <p>{text.scope[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 从你的情况开始（浅灰） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head"><h2>{text.situation[lang]}</h2></div>
          <SituationPicker
            label={text.picker.label[lang]}
            placeholder={text.picker.placeholder[lang]}
            readMore={common.readMore[lang]}
            options={text.picker.options.map((o) => ({
              label: o.label[lang],
              cards: o.slugs.map((slug) => {
                const s = services.find((x) => x.slug === slug)!;
                return { href: href(slug), title: s.title[lang], short: s.short[lang] };
              }),
            }))}
          />
        </div>
      </section>

      {/* ═══ ③ 5 个分类：照片 → 标题 → 一句 → 链接（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{text.all[lang]}</h2>
            <p>{text.allDesc[lang]}</p>
          </div>
          <div className="card-grid">
            {serviceCategories.map((c) => (
              <article key={c.slug} className="feature reveal">
                <div className="photo-frame">{c.image && <Image src={c.image} alt="" fill sizes="(min-width: 860px) 33vw, 100vw" />}</div>
                <h3>{c.title[lang]}</h3>
                <p>{c.short[lang]}</p>
                <Link className="text-link" href={`/${lang}/services/${c.slug}`}>{text.viewCategory[lang]} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ④ 找不到你的情况？（浅灰；页脚是深色，最后一条色带不用深色） ═══ */}
      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <h2>{text.ask.title[lang]}</h2>
            <p>{text.ask.desc[lang]}</p>
          </div>
          <a className="btn btn-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{common.askLawyer[lang]}</a>
        </div>
      </section>
    </>
  );
}
