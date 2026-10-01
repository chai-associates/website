// ═══════════════════════════════════════════════════════════════
// 全站外框：每一页都会出现的东西只写在这里
// · 页首（Logo、选单、中文 / EN、预约按钮）
// · 页脚（链接、社交媒体、法律声明）
// · 浮动 WhatsApp 按钮
// · 字体、网页默认标题
// 页面内容写在各自的 page.tsx。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import { EB_Garamond, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import { disclaimer, firm, isLang, locales, socials, whatsappLink, type Lang } from "@/lib/site";

// ── 字体（变成 CSS 变量，tokens.css 里使用） ─────
const notoSC = Noto_Sans_SC({ weight: ["400", "500", "700"], preload: false, display: "swap", variable: "--font-noto-sc" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jakarta" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-garamond" });

// ── 页首、页脚的文字 ─────────────────────────────
const text = {
  nav: [
    { href: "#services", label: { zh: "服务", en: "Services" } },
    { href: "#people", label: { zh: "团队", en: "Our People" } },
    { href: "#contact", label: { zh: "联系", en: "Contact" } },
  ],
  logoSub: { zh: "律师事务所", en: "Advocates & Solicitors" },
  book: { zh: "预约咨询", en: "Book a Consultation" },
  menu: { zh: "菜单", en: "Menu" },
  fab: { zh: "WhatsApp 预约咨询", en: "Book via WhatsApp" },
};

// 预先生成 /zh 和 /en
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// 默认网页标题（每一页可以在自己的 page.tsx 覆盖）
export const metadata: Metadata = {
  title: { default: firm.name, template: `%s | ${firm.name}` },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const other: Lang = lang === "zh" ? "en" : "zh";
  const home = `/${lang}`;

  return (
    <html lang={lang === "zh" ? "zh-Hans" : "en"} className={`${notoSC.variable} ${jakarta.variable} ${garamond.variable}`}>
      <body className={`lang-${lang}`}>
        {/* ── 页首 ───────────────────────────── */}
        <header className="site-header">
          <div className="container nav">
            <Link href={home} className="logo" aria-label={firm.name}>
              <span className="logo-wm">CHAI &amp; ASSOCIATES</span>
              <span className="logo-sub">{text.logoSub[lang]}</span>
            </Link>

            <nav className="nav-links" aria-label="Main">
              {text.nav.map((l) => <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>)}
            </nav>

            <div className="nav-right">
              <div className="lang-switch" role="group" aria-label="Language">
                <Link href="/zh" aria-current={lang === "zh"} hrefLang="zh">中文</Link>
                <Link href="/en" aria-current={lang === "en"} hrefLang="en">EN</Link>
              </div>
              <a className="btn btn-cta nav-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">{text.book[lang]}</a>

              {/* 手机选单：浏览器原生展开 / 收起，不需要 JavaScript */}
              <details className="menu">
                <summary className="menu-btn" aria-label={text.menu[lang]}><span /></summary>
                <nav className="drawer" aria-label="Mobile">
                  {text.nav.map((l) => <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>)}
                  <Link href={`/${other}`} hrefLang={other}>{other === "en" ? "English" : "中文"}</Link>
                </nav>
              </details>
            </div>
          </div>
        </header>

        <main>{children}</main>

        {/* ── 页脚 ───────────────────────────── */}
        <footer className="site-footer">
          <div className="container">
            <Link href={home} className="logo">
              <span className="logo-wm">CHAI &amp; ASSOCIATES</span>
              <span className="logo-sub">{text.logoSub[lang]}</span>
            </Link>
            <nav className="footer-links">
              {text.nav.map((l) => <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>)}
              {socials.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener">{s.label}</a>)}
            </nav>
            <p className="footer-disc">{disclaimer[lang]} © {new Date().getFullYear()} {firm.name}.</p>
          </div>
        </footer>

        {/* ── 浮动 WhatsApp ──────────────────── */}
        <a className="fab" href={whatsappLink(lang)} target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 16.4c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4z" />
          </svg>
          {text.fab[lang]}
        </a>
      </body>
    </html>
  );
}
