// ─────────────────────────────────────────────
// 小元件 · Small shared pieces
// Icon（图标）、Logo、WhatsApp 浮动按钮都放在这里
// ─────────────────────────────────────────────
import Link from "next/link";
import { copy } from "@/content/copy";
import { t, type Locale } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

const iconPaths: Record<string, React.ReactNode> = {
  award: (<><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" /></>),
  receipt: (<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>),
  lock: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 16.4c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4z" />
    </svg>
  );
}

// 律所字标（用文字重做，放大也清晰）
export function Logo({ lang, light = false }: { lang: Locale; light?: boolean }) {
  return (
    <Link href={`/${lang}`} className={`logo${light ? " logo-light" : ""}`} aria-label="Chai & Associates">
      <span className="logo-wm">CHAI &amp; ASSOCIATES</span>
      <span className="logo-sub">{lang === "zh" ? "律师事务所" : "Advocates & Solicitors"}</span>
    </Link>
  );
}

// 右下角的 WhatsApp 浮动按钮
export function WhatsAppFab({ lang }: { lang: Locale }) {
  return (
    <a className="fab" href={whatsappLink(lang)} target="_blank" rel="noopener" aria-label="WhatsApp">
      <WhatsAppIcon /> {t(copy.fab, lang)}
    </a>
  );
}
