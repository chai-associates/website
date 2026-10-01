import Link from "next/link";
import { Logo } from "@/components/ui";
import { copy } from "@/content/copy";
import { t, type Locale } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <Logo lang={lang} light />
        <nav className="footer-links">
          <Link href={`/${lang}#services`}>{t(copy.nav.services, lang)}</Link>
          <Link href={`/${lang}#people`}>{t(copy.nav.people, lang)}</Link>
          <Link href={`/${lang}#contact`}>{t(copy.nav.contact, lang)}</Link>
          <span className="muted-link">{t(copy.footer.privacy, lang)}</span>
        </nav>
        <p className="footer-disc">
          {t(copy.footer.disclaimer, lang)} © {new Date().getFullYear()} Chai &amp; Associates.
        </p>
      </div>
    </footer>
  );
}
