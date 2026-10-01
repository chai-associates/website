"use client";
// ═══════════════════════════════════════════════════════════════
// 服务员：全站所有「点了会动」的东西都在这里，只管动作，不放内容。
// 文字和选项由使用它的 layout.tsx / page.tsx 传进来。
// · Menu            选单开关（layout.tsx）
// · SituationPicker 「我的情况是」选择器（/services 页）
// · InquiryForm     询问表格 → 自动打开 WhatsApp（服务页）
// ═══════════════════════════════════════════════════════════════
import Link from "next/link";
import { useEffect, useState } from "react";
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
  label: string;
  placeholder: string;
  readMore: string;
  options: { label: string; cards: Card[] }[];
}) {
  const [picked, setPicked] = useState(-1);
  const cards = options[picked]?.cards ?? [];

  return (
    <div className="grid gap-6">
      <label className="field">
        {label}
        <select className="select" value={picked} onChange={(e) => setPicked(Number(e.target.value))}>
          <option value={-1} disabled>{placeholder}</option>
          {options.map((o, i) => <option key={o.label} value={i}>{o.label}</option>)}
        </select>
      </label>
      {cards.length > 0 && (
        <div className="card-grid" aria-live="polite">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card card-link">
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
    window.open(whatsappLink(lang, [intro, ...lines].join("\n")), "_blank", "noopener");
  };

  return (
    <form className="grid gap-5" onSubmit={send}>
      {questions.map((q, i) => (
        <label key={q.label} className="field">
          {q.label}
          <select className="select" name={`q${i}`} defaultValue="" required>
            <option value="" disabled>{placeholder}</option>
            {q.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      ))}
      <button type="submit" className="btn btn-cta w-full">{submit}</button>
    </form>
  );
}
