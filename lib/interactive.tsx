"use client";
// ═══════════════════════════════════════════════════════════════
// 服务员：全站所有「点了会动」的东西都在这里，只管动作，不放内容。
// 文字和选项由使用它的 layout.tsx / page.tsx 传进来。
// · Menu            选单开关（layout.tsx）
// · SituationPicker 「我的情况是」选择器（/services 页）
// · InquiryForm     询问表格 → 自动打开 WhatsApp（服务页）
// · TeamFilter      律师团队按办事处筛选（/people 页）
// · PageTransition  换页动态（layout.tsx 包住 <main>；样式在 globals.css「换页动态」）
// · CookieConsent   Cookie 提示 + 同意后才载入 GA4（layout.tsx）
// · ConsentReset    「更改 Cookie 设定」按钮（隐私政策页）
// ═══════════════════════════════════════════════════════════════
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore, ViewTransition } from "react";
import { whatsappLink, type Lang } from "@/lib/site";

// ── 选单 ─────────────────────────────────────────
// 关闭方式：再点 ☰、点空白处、按 Esc、点选单里的任何链接。
export function Menu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // 打开时：后面的页面不能滑动；按 Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="menu" data-open={open}>
      <button type="button" className="menu-btn" aria-label={label} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <div className="menu-backdrop" onClick={() => setOpen(false)} />
      <div id="site-menu" className="menu-panel" inert={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        {children}
      </div>
    </div>
  );
}

// ── 「我的情况是」选择器 ─────────────────────────
// 选一个情况 → 下面显示相关的服务卡片
type Card = { href: string; title: string; short: string };
export function SituationPicker({ label, placeholder, readMore, options }: {
  label: string; // 不显示，给读屏软件用（选单的预设文字本身就是问题，例如「我们可以怎么帮你？」）
  placeholder: string;
  readMore: string;
  options: { label: string; cards: Card[] }[];
}) {
  const [picked, setPicked] = useState(-1);
  const cards = options[picked]?.cards ?? [];

  return (
    <div className="form">
      <select className="select" aria-label={label} value={picked} onChange={(e) => setPicked(Number(e.target.value))}>
        <option value={-1} disabled>{placeholder}</option>
        {options.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
      </select>
      {cards.length > 0 && (
        <div className="card-grid" aria-live="polite">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card card-link reveal">
              <h3>{c.title}</h3>
              <p>{c.short}</p>
              <span className="text-link">{readMore} →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ── 询问表格 ─────────────────────────────────────
// 用户选好答案 → 按钮 → 打开 WhatsApp，讯息已经帮他打好，由他自己按发送。
// 网站不储存任何资料。
export function InquiryForm({ lang, intro, questions, placeholder, submit }: {
  lang: Lang;
  intro: string; // 讯息第一句，例如「你好，我想咨询「探视权」。」
  questions: { label: string; options: string[] }[];
  placeholder: string;
  submit: string;
}) {
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const colon = lang === "zh" ? "：" : ": ";
    const lines = questions.map((q, i) => `· ${q.label}${colon}${data.get(`q${i}`)}`);
    track("generate_lead", { method: "whatsapp_form" });
    window.open(whatsappLink(lang, [intro, ...lines].join("\n")), "_blank", "noopener");
  };

  return (
    <form className="form" onSubmit={send}>
      {questions.map((q, i) => (
        <label key={q.label} className="field">
          {q.label}
          <select className="select" name={`q${i}`} defaultValue="" required>
            <option value="" disabled>{placeholder}</option>
            {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      ))}
      <button type="submit" className="btn btn-cta">{submit}</button>
    </form>
  );
}

// ── 律师团队按办事处筛选 ─────────────────────────
// 点城市 → 只显示那个城市的成员；某一组没有人就整组隐藏。
// 没有 JavaScript 时显示全部成员。
type Person = { key: string; href: string; city: string; image: string | null; initials: string; name: string; role: string; meta: string };
export function TeamFilter({ label, allLabel, countLabel, cities, groups }: {
  label: string;
  allLabel: string;
  countLabel: string; // 例如「{n} 位」
  cities: { id: string; label: string }[];
  groups: { title: string; people: Person[] }[];
}) {
  const [city, setCity] = useState("all");
  const shown = groups
    .map((g) => ({ ...g, people: g.people.filter((p) => city === "all" || p.city === city) }))
    .filter((g) => g.people.length > 0);

  return (
    <div className="stack">
      <div className="btn-row" role="group" aria-label={label}>
        <span className="filter-label">{label}</span>
        {[{ id: "all", label: allLabel }, ...cities].map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={city === c.id} onClick={() => setCity(c.id)}>{c.label}</button>
        ))}
      </div>
      {shown.map((g) => (
        <div key={g.title}>
          <div className="list-head">
            <h2>{g.title}</h2>
            <span>{countLabel.replace("{n}", String(g.people.length))}</span>
          </div>
          <div className="person-grid">
            {g.people.map((p) => (
              <Link key={p.key} href={p.href} className="person-card reveal">
                <div className="person-photo">
                  {p.image ? <Image src={p.image} alt={p.name} fill sizes="(min-width: 860px) 25vw, 50vw" /> : p.initials}
                </div>
                <h3>{p.name}</h3>
                <strong>{p.role}</strong>
                <p>{p.meta}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 换页动态 ─────────────────────────────────────
// 网址一变，旧内容淡出（page-exit）、新内容淡入往上浮（page-enter）。只在换页时动，第一次打开网页不动。
export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <ViewTransition key={path} enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}

// ── Cookie 提示 + GA4 ────────────────────────────
// 访客按「同意」→ 才载入 GA4，并记录 WhatsApp / 电话的点击；按「不同意」→ 什么都不载入。
// 选择存在访客自己的浏览器（localStorage），隐私政策页的「更改 Cookie 设定」可以重新选择。
// 已关闭 Google 信号与广告个人化：资料只用来统计，不做再营销（离婚案件的隐私考量）。
type Consent = "granted" | "denied" | null;
const CONSENT_KEY = "cookie-consent";
const CONSENT_EVENT = "cookie-consent-change";
const readConsent = (): Consent => {
  try { return localStorage.getItem(CONSENT_KEY) as Consent; } catch { return null; }
};
const subscribeConsent = (cb: () => void) => {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => { window.removeEventListener(CONSENT_EVENT, cb); window.removeEventListener("storage", cb); };
};
const setConsent = (v: Consent) => {
  try { if (v) localStorage.setItem(CONSENT_KEY, v); else localStorage.removeItem(CONSENT_KEY); } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

// 送一个事件到 GA（没有同意 / 没有载入时什么都不做）
type Gtag = (...args: unknown[]) => void;
function track(event: string, params: Record<string, string>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", event, params);
}

export function CookieConsent({ gaId, text, policyHref }: {
  gaId: string;
  text: { message: string; policy: string; accept: string; decline: string };
  policyHref: string;
}) {
  // 服务器端、读到之前 = "unknown"：先不显示提示，避免一闪
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "unknown" as const);

  // 同意后：点 WhatsApp、电话的连结时记一笔
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (e: MouseEvent) => {
      const href = (e.target as HTMLElement).closest("a")?.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) track("generate_lead", { method: "whatsapp" });
      else if (href.startsWith("tel:")) track("generate_lead", { method: "phone" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  // 撤回同意：这一页剩下的时间也停止送资料
  useEffect(() => {
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = consent !== "granted";
  }, [consent, gaId]);

  if (consent === "granted") {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <Script id="ga4">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}</Script>
      </>
    );
  }
  if (consent !== null) return null;
  return (
    <div className="consent" role="region" aria-label={text.policy}>
      <p>{text.message} <Link className="text-link" href={policyHref}>{text.policy} →</Link></p>
      <div className="btn-row">
        <button type="button" className="btn btn-cta btn-sm" onClick={() => setConsent("granted")}>{text.accept}</button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConsent("denied")}>{text.decline}</button>
      </div>
    </div>
  );
}

// 「更改 Cookie 设定」：清掉选择 → 下面再出现 Cookie 提示
export function ConsentReset({ label }: { label: string }) {
  return <button type="button" className="btn btn-ghost" onClick={() => setConsent(null)}>{label}</button>;
}
