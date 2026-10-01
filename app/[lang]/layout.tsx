// ═══════════════════════════════════════════════════════════════
// 全站外框：每一页都会出现的东西只写在这里
// · 页首（Logo、咨询按钮、选单；语言切换在选单里）
// · 页脚（链接、社交媒体、法律声明）
// · 字体、网页默认标题
// 页面内容写在各自的 page.tsx。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import { EB_Garamond, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import Menu from "@/lib/menu";
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
  book: { zh: "咨询", en: "Enquire" },
  menu: { zh: "菜单", en: "Menu" },
  language: { zh: "语言", en: "Language" },
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

            <div className="nav-right">
              <a className="btn btn-cta btn-sm" href={whatsappLink(lang)} target="_blank" rel="noopener">{text.book[lang]}</a>

              {/* 选单：里面放什么写在这里；打开 / 关闭由 lib/menu.tsx 负责 */}
              <Menu label={text.menu[lang]}>
                <nav className="menu-links" aria-label="Main">
                  {text.nav.map((l) => <Link key={l.href} href={`${home}${l.href}`}>{l.label[lang]}</Link>)}
                </nav>
                <div className="lang-switch" role="group" aria-label={text.language[lang]}>
                  <Link href="/zh" aria-current={lang === "zh"} hrefLang="zh">中文</Link>
                  <Link href="/en" aria-current={lang === "en"} hrefLang="en">English</Link>
                </div>
              </Menu>
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
      </body>
    </html>
  );
}
