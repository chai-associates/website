"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui";
import { copy } from "@/content/copy";
import { otherLocale, t, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

// 手机菜单用浏览器原生的 <details>（点一下展开、再点收起），不依赖 JavaScript，任何浏览器都能用。
// 点了菜单里的链接会自动收起。
const closeMenu = (e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.closest("details")?.removeAttribute("open");

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  // 切换语言：把网址开头的 /zh 换成 /en（或反过来），停留在同一页
  const switchTo = (target: Locale) => pathname.replace(/^\/(zh|en)/, `/${target}`) || `/${target}`;

  const links = [
    { href: `/${lang}#services`, label: t(copy.nav.services, lang) },
    { href: `/${lang}#people`, label: t(copy.nav.people, lang) },
    { href: `/${lang}#contact`, label: t(copy.nav.contact, lang) },
  ];

  return (
    <header className="site-header">
      <div className="container nav">
        <Logo lang={lang} />

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang-switch" role="group" aria-label="Language">
            <Link href={switchTo("zh")} className={lang === "zh" ? "on" : ""} hrefLang="zh">中文</Link>
            <Link href={switchTo("en")} className={lang === "en" ? "on" : ""} hrefLang="en">EN</Link>
          </div>
          <a className="btn btn-cta nav-cta" href={whatsappLink(lang)} target="_blank" rel="noopener">
            {t(copy.nav.book, lang)}
          </a>
          <details className="menu">
            <summary className="menu-btn" aria-label={t(copy.nav.menu, lang)}><span /></summary>
            <nav className="drawer" aria-label="Mobile">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>
              ))}
              <Link href={switchTo(otherLocale(lang))} onClick={closeMenu}>
                {lang === "zh" ? "English" : "中文"}
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
