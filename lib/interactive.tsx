"use client";
// ═══════════════════════════════════════════════════════════════
// 服务员：全站所有「点了会动」的东西都在这里，只管动作，不放内容。
// 文字和选项由使用它的 layout.tsx / page.tsx 传进来。
// · Menu            选单开关（layout.tsx）
// · SituationPicker 「我的情况是」选择器（/services 页）
// · InquiryForm     询问表格 → 自动打开 WhatsApp（服务页）
// · ConsultButton   全站的「咨询」按钮：点了跳出咨询表格（不是直接去 WhatsApp）
// · ConsultDialog   咨询表格视窗（layout.tsx，全站一个）：3 个问题 + 其他 → 打开 WhatsApp，讯息已写好
// · NavLinks       电脑版页首的导航：目前所在的页面标古铜线；有子页面的鼠标移上去展开下拉（layout.tsx）
// · HeaderAutoHide 往下滑页首收起、往上滑马上出现（只设定 <html data-header-hidden>；选单打开时不收）
// · HeaderOverHero  首页：首屏照片还在页首下面时，页首透明；滑过照片变毛玻璃（只设定 <html data-over-hero>，样式在 globals.css）
// · PageTransition  换页动态（layout.tsx 包住 <main>；样式在 globals.css「换页动态」）
// · LangSwitch      语言切换：换语言时留在同一页（layout.tsx 的选单里）
// · TabsHash        分页选择记住选了哪一个：网址加 #代号，按返回会回到同一个分页（离婚百科）
// · CookieConsent   Cookie 提示 + 同意后才载入 GA4（layout.tsx）
// · ConsentReset    「更改 Cookie 设定」按钮（隐私政策页）
// ═══════════════════════════════════════════════════════════════
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
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
export function SituationPicker({ label, placeholder, options }: {
  label: string; // 不显示，给读屏软件用（选单的预设文字本身就是问题，例如「我们可以怎么帮你？」）
  placeholder: string;
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
        <ul className="link-list" aria-live="polite">
          {cards.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>
                <h3>{c.title}</h3>
                <p>{c.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── 询问表格 ─────────────────────────────────────
// 用户选好答案 → 按钮 → 打开 WhatsApp，讯息已经帮他打好，由他自己按发送。
// 网站不储存任何资料。
export function InquiryForm({ lang, intro, questions, remark, placeholder, submit }: {
  lang: Lang;
  intro: string; // 讯息第一句，例如「你好，我想咨询「探视权」。」
  questions: { label: string; short: string; options: string[] }[]; // short = WhatsApp 讯息里的简短标题（不重复整句问题）
  remark: { label: string; short: string; placeholder: string }; // 最后一题「其他」：自由填写，可以不填
  placeholder: string;
  submit: string;
}) {
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const colon = lang === "zh" ? "：" : ": ";
    const note = String(data.get("remark") ?? "").trim();
    const lines = [
      ...questions.map((q, i) => `· ${q.short}${colon}${data.get(`q${i}`)}`),
      ...(note ? [`· ${remark.short}${colon}${note}`] : []),
    ];
    track("generate_lead", { method: "whatsapp_form" });
    window.open(whatsappLink(lang, [intro, ...lines].join("\n")), "_blank", "noopener");
    e.currentTarget.closest("dialog")?.close(); // 在视窗里的话，打开 WhatsApp 后顺便关掉视窗
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
      <label className="field">
        {remark.label}
        <textarea className="textarea" name="remark" rows={3} placeholder={remark.placeholder} />
      </label>
      <button type="submit" className="btn btn-cta">{submit}</button>
    </form>
  );
}

// ── 咨询：按钮 → 跳出咨询表格 → 打开 WhatsApp ─────────────
// 全站只有一个表格视窗（ConsultDialog，放在 layout.tsx）；每个「咨询」按钮（ConsultButton）只负责叫它出来，
// 顺便告诉它讯息第一句要写什么（例如文章名称、律师名字）。
// 按钮本身是 WhatsApp 连结：没有 JavaScript 时，点了直接去 WhatsApp。
const CONSULT_EVENT = "consult-open";

export function ConsultButton({ href, intro, className, children }: {
  href: string; // 没有 JavaScript 时直接去的 WhatsApp 连结
  intro?: string; // 讯息第一句；不填就用表格预设的
  className: string;
  children: React.ReactNode;
}) {
  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent(CONSULT_EVENT, { detail: intro }));
  };
  return <a className={className} href={href} target="_blank" rel="noopener" data-consult onClick={open}>{children}</a>;
}

export function ConsultDialog({ title, desc, close, form }: {
  title: string;
  desc: string; // 为什么要填、填完会怎样（用户才不会担心没人回复）
  close: string; // × 按钮给读屏软件的名称
  form: Omit<React.ComponentProps<typeof InquiryForm>, "intro"> & { intro: string }; // intro = 预设的讯息第一句
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [intro, setIntro] = useState(form.intro);
  useEffect(() => {
    const onOpen = (e: Event) => {
      setIntro((e as CustomEvent<string | undefined>).detail ?? form.intro);
      ref.current?.showModal();
      track("consult_open", { page: location.pathname });
    };
    window.addEventListener(CONSULT_EVENT, onOpen);
    return () => window.removeEventListener(CONSULT_EVENT, onOpen);
  }, [form.intro]);
  return (
    <dialog ref={ref} className="dialog" aria-label={title}>
      <div className="dialog-head">
        <h2>{title}</h2>
        <button type="button" className="dialog-close" aria-label={close} onClick={() => ref.current?.close()}>×</button>
      </div>
      <p className="dialog-desc">{desc}</p>
      <InquiryForm key={intro} {...form} intro={intro} />
    </dialog>
  );
}

// ── 电脑版导航 ─────────────────────────────────────
// 目前所在的页面（或它的子页面）标 aria-current，样式在 globals.css（古铜线，跟 .tabs-line 同一个做法）。
// 有 children 的项目：鼠标移上去、或用键盘 Tab 到它时，展开下拉（纯 CSS）。
type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };
export function NavLinks({ label, items }: { label: string; items: NavItem[] }) {
  const path = usePathname();
  // 有子页面的项目：只有在它自己的子页面里才标（荣誉与认可在 /about/ 下面，但它是独立的项目，不会让「关于我们」也亮）
  const isCurrent = (l: NavItem) => (l.children ? l.children.some((c) => c.href === path) : path === l.href || path.startsWith(`${l.href}/`));
  return (
    <nav className="nav-links" aria-label={label}>
      {items.map((l) =>
        l.children ? (
          <div key={l.href} className="nav-drop">
            <Link href={l.href} aria-current={isCurrent(l) ? "page" : undefined}>{l.label}</Link>
            <div className="nav-drop-panel">
              {l.children.map((c) => <Link key={c.href} href={c.href} aria-current={path === c.href ? "page" : undefined}>{c.label}</Link>)}
            </div>
          </div>
        ) : (
          <Link key={l.href} href={l.href} aria-current={isCurrent(l) ? "page" : undefined}>{l.label}</Link>
        ),
      )}
    </nav>
  );
}

// ── 页首自动收起 ───────────────────────────────────
// 往下滑超过页首高度 → <html data-header-hidden>（页首往上收）；往上滑 → 拿掉（马上出现）。
// 选单打开时（body 不能滑）不动。没有 JavaScript 时页首一直在。
export function HeaderAutoHide() {
  useEffect(() => {
    const root = document.documentElement;
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      if (document.body.style.overflow === "hidden") { last = y; return; }
      if (y > last && y > header) root.dataset.headerHidden = "";
      else if (y < last) delete root.dataset.headerHidden;
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); delete root.dataset.headerHidden; };
  }, []);
  return null;
}

// ── 首页页首透明 ─────────────────────────────────
// 看 .hero-top 里的照片：照片还在页首下面 → <html data-over-hero>（页首透明）；照片滑过页首 → 拿掉（页首毛玻璃）。
// 离开首页时自动拿掉。没有 JavaScript 时页首一直是毛玻璃。
export function HeaderOverHero() {
  useEffect(() => {
    const photo = document.querySelector(".hero-top .hero-photo");
    if (!photo) return;
    const root = document.documentElement;
    const header = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) root.dataset.overHero = "";
      else delete root.dataset.overHero;
    }, { rootMargin: `-${header}px 0px 0px 0px` });
    io.observe(photo);
    return () => { io.disconnect(); delete root.dataset.overHero; };
  }, []);
  return null;
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

// ── 语言切换 ─────────────────────────────────
// 把网址开头的 /zh 或 /en 换掉，其余不变：/zh/services/children ↔ /en/services/children
export function LangSwitch({ label, current }: { label: string; current: Lang }) {
  const rest = usePathname().replace(/^\/(zh|en)(?=\/|$)/, "");
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      <Link href={`/zh${rest}`} aria-current={current === "zh"} hrefLang="zh">中文</Link>
      <Link href={`/en${rest}`} aria-current={current === "en"} hrefLang="en">English</Link>
    </div>
  );
}

// ── 分页选择记住选了哪一个 ─────────────────────
// 分页选择（.tabs）本身不需要 JavaScript；这里只多做一件事：
// 选了哪个分页就把网址改成 #代号（不新增浏览纪录），打开带 #代号 的网址就选回那个分页。
// 所以从文章按「返回」或面包屑回来，会停在原本的分类，而不是第一个。
export function TabsHash({ name }: { name: string }) {
  useEffect(() => {
    const radios = () => [...document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${name}"]`)];
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const match = radios().find((r) => r.value === id);
      if (match) match.checked = true;
    };
    const toHash = (e: Event) => {
      const r = e.target as HTMLInputElement;
      if (r.name === name) window.history.replaceState(window.history.state, "", `#${r.value}`);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("change", toHash);
    return () => { window.removeEventListener("hashchange", fromHash); document.removeEventListener("change", toHash); };
  }, [name]);
  return null;
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
      const a = (e.target as HTMLElement).closest("a");
      if (a?.hasAttribute("data-consult")) return; // 咨询按钮只是打开表格；表格送出时才记一笔
      const href = a?.getAttribute("href") ?? "";
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
