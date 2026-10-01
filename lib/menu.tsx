"use client";
// ═══════════════════════════════════════════════════════════════
// 服务员：只负责「打开 / 关闭」选单
// 选单里面放什么（链接、语言），写在 app/[lang]/layout.tsx 的 <Menu> 里面。
// 样子在 globals.css 的「选单」那一段。
// 关闭方式：再点 ☰、点空白处、按 Esc、点选单里的任何链接。
// ═══════════════════════════════════════════════════════════════
import { useEffect, useState } from "react";

export default function Menu({ label, children }: { label: string; children: React.ReactNode }) {
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
