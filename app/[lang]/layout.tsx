// ═══════════════════════════════════════════════════════════════
// 全站外框：每一页都会出现的东西只写在这里
// · 页首（Logo、咨询按钮、选单；语言切换在选单里）
// · 页脚（链接、社交媒体、隐私政策、法律声明）
// · Cookie 提示（有设定 GA 时才出现，见 lib/site.ts 的 gaId）
// · 网页默认标题、网址、搜寻引擎设定（字体在 lib/fonts.ts）
// 页面内容写在各自的 page.tsx。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { CookieConsent, Menu, PageTransition } from "@/lib/interactive";
import { aboutSections, common, disclaimer, firm, gaId, isLang, launched, locales, scope, serviceCategories, siteUrl, socials, whatsappLink, type Bi, type Lang } from "@/lib/site";

// ── 页首、页脚的文字 ─────────────────────────────
const text = {
  privacy: { zh: "隐私政策", en: "Privacy Policy" },
  consent: {
    message: { zh: "我们使用 Cookie 统计网站的访问情况，帮助改善网站。你同意后才会启用。", en: "We use cookies to understand how this site is used and to improve it. They are only turned on if you agree." },
    accept: { zh: "同意", en: "Accept" },
    decline: { zh: "不同意", en: "Decline" },
  },
  // 选单（有 children 的会展开；href 同时给页脚用）
  nav: [
    { href: "", label: common.home },
    {
      href: "/services", label: common.services,
      children: [
        { href: "/services", label: common.viewAll },
        ...serviceCategories.map((c) => ({ href: `/services/${c.slug}`, label: c.title })),
      ],
    },
    { href: "/divorcepedia", label: { zh: "离婚百科", en: "Divorcepedia" } },
    {
      href: "/about", label: { zh: "关于我们", en: "Profile" },
      children: [
        { href: "/about#firm", label: { zh: "律所简介", en: "Our Firm" } },
        { href: "/about#values", label: { zh: "我们的理念", en: "Our Values" } },
        { href: "/about#recognitions", label: { zh: "荣誉与认可", en: "Recognitions" } },
        ...aboutSections.map((s) => ({ href: `/about/${s.slug}`, label: s.title })),
      ],
    },
    { href: "/people", label: { zh: "律师团队", en: "People" } },
    { href: "/locations", label: { zh: "办事处", en: "Locations" } },
    { href: "/careers", label: { zh: "加入我们", en: "Join Us" } },
  ] as { href: string; label: Bi; children?: { href: string; label: Bi }[] }[],
  social: { zh: "关注我们", en: "Social Media" },
  logoSub: { zh: "律师事务所", en: "Advocates & Solicitors" },
  book: { zh: "咨询", en: "Enquire" },
  menu: { zh: "菜单", en: "Menu" },
  language: { zh: "语言", en: "Language" },
};

// 预先生成 /zh 和 /en；其他语言代码（例如 /abc）直接 404（app/global-not-found.tsx）
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// 默认网页标题（每一页可以在自己的 page.tsx 覆盖）
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: firm.name, template: `%s | ${firm.name}` },
  // 上线前（lib/site.ts 的 launched = false）每一页都不让 Google 收录
  robots: launched ? undefined : { index: false, follow: false },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const home = `/${lang}`;

  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"} className={fontVariables}>
      <body className={`lang-${lang}`}>
        {/* ── 页首 ───────────────────────────── */}
        <header className="site-header">
          <div className="container nav">
            <Link href={home} className="logo" aria-label={firm.name}>
              <span className="logo-wm">CHAI &amp; ASSOCIATES</span>
              <span className="logo-sub">{text.logoSub[lang]}</span>
            </Link>

            <div className="nav-right">
              <a className="btn btn-cta btn-sm" href={whatsappLink(lang)} target="_blank" rel="noopener">{text.book[lang]}</a>

              {/* 选单：里面放什么写在这里；打开 / 关闭由 lib/interactive.tsx 负责 */}
              <Menu label={text.menu[lang]}>
                <nav className="menu-links" aria-label="Main">
                  {text.nav.map((l) =>
                    l.children ? (
                      // 同一个 name：打开一组，另一组会自动收起
                      <details key={l.href} name="menu-group" className="menu-group">
                        <summary>{l.label[lang]}</summary>
                        <div className="menu-sub">
                          {l.children.map((c) => <Link key={c.href} href={`${home}${c.href}`}>{c.label[lang]}</Link>)}
                        </div>
                      </details>
                    ) : (
                      <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>
                    ),
                  )}
                  <details name="menu-group" className="menu-group">
                    <summary>{text.social[lang]}</summary>
                    <div className="menu-sub">
                      {socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener">{s.label}</a>)}
                    </div>
                  </details>
                </nav>
                <div className="lang-switch" role="group" aria-label={text.language[lang]}>
                  <Link href="/zh" aria-current={lang === "zh"} hrefLang="zh">中文</Link>
                  <Link href="/en" aria-current={lang === "en"} hrefLang="en">English</Link>
                </div>
              </Menu>
            </div>
          </div>
        </header>

        {/* 换页时只有 <main> 淡出淡入，页首、页脚不动 */}
        <PageTransition>
          <main>{children}</main>
        </PageTransition>

        {/* ── 页脚 ───────────────────────────── */}
        <footer className="site-footer">
          <div className="container">
            <Link href={home} className="logo">
              <span className="logo-wm">CHAI &amp; ASSOCIATES</span>
              <span className="logo-sub">{text.logoSub[lang]}</span>
            </Link>
            <nav className="footer-links">
              {text.nav.map((l) => <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>)}
              {socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener">{s.label}</a>)}
              <Link href={`${home}/privacy`}>{text.privacy[lang]}</Link>
            </nav>
            <p className="footer-disc">{scope[lang]} {disclaimer[lang]} © {new Date().getFullYear()} {firm.name}.</p>
          </div>
        </footer>

        {/* ── Cookie 提示（没有设定 GA 就不出现） ── */}
        {gaId && (
          <CookieConsent
            gaId={gaId}
            policyHref={`${home}/privacy`}
            text={{ message: text.consent.message[lang], policy: text.privacy[lang], accept: text.consent.accept[lang], decline: text.consent.decline[lang] }}
          />
        )}
      </body>
    </html>
  );
}
