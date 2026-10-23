// ═══════════════════════════════════════════════════════════════
// 全部服务 /services
// ───────────────────────────────────────────────────────────────
// 母页：只做导览，带人到分类页（每个分类的服务清单在分类页）。品牌语法 4：一条色带只做一件事。
// 色带顺序：① 首屏：面包屑 → 两行标题 → 选单「选择最接近你的情况」（选好的服务出现在首屏下面）  ③ 5 个分类：照片卡片，标题 + 一句 + 链接放在照片里面（白；不另加标题，页面标题已经说了）  ④ 找不到你的情况？（浅灰）
// 分类和服务清单在 lib/site.ts；这里只放这一页的文字和「情况 → 服务」的对应。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskSection, PageHero, PhotoTile } from "@/lib/blocks";
import { SituationPicker } from "@/lib/interactive";
import { common, isLang, pageMeta, serviceCategories, services, type Bi } from "@/lib/site";

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
  // ① 首屏：两行标题（不加逗号句号）+ 选单「选择最接近你的情况」（选好后，对应的服务出现在首屏下面）
  image: "/images/services/service.png" as string | null, // 2400 × 1350（规格见 lib/blocks.tsx 的 PageHero）
  title: { zh: "我们会针对你的情况\n提供服务", en: "Services shaped\naround your situation" },
  picker: {
    label: { zh: "选择你的情况", en: "Choose your situation" }, // 不显示，给读屏软件用
    placeholder: { zh: "选择最接近你的情况", en: "Choose the closest situation" },
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
      {/* ═══ ① 首屏（PageHero） ═══ */}
      <PageHero
        image={text.image}
        eyebrow={<ol className="breadcrumb"><li><Link href={`/${lang}`}>{common.home[lang]}</Link></li><li aria-current="page">{common.services[lang]}</li></ol>}
        title={text.title[lang]}
      >
        <SituationPicker
          label={text.picker.label[lang]}
          placeholder={text.picker.placeholder[lang]}
          resultsId="situation-results"
          options={text.picker.options.map((o) => ({
            label: o.label[lang],
            cards: o.slugs.map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return { href: href(slug), title: s.title[lang], short: s.short[lang] };
            }),
          }))}
        />
      </PageHero>
      {/* 选好情况后，对应的服务出现在这里（SituationPicker 放进来）；没选之前不占位置 */}
      <div id="situation-results" className="container hero-below" aria-live="polite" />

      {/* ═══ ③ 5 个分类：满版照片按钮卡，一排两张、每张 16:9（照片 2400 × 1350，整张不裁）；手机一排一张（白） ═══ */}
      <section className="section">
        <div className="photo-tiles photo-tiles-scene">
          {serviceCategories.map((c) => (
            <PhotoTile key={c.slug} href={`/${lang}/services/${c.slug}`} image={c.image} title={c.title[lang]} desc={c.short[lang]} action={common.viewService[lang]} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      {/* ═══ ④ 找不到你的情况？（浅灰；页脚是深色，最后一条色带不用深色） ═══ */}
      <AskSection lang={lang} title={text.ask.title} desc={text.ask.desc} />
    </>
  );
}
