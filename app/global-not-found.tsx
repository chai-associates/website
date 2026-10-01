// ═══════════════════════════════════════════════════════════════
// 全站 404：找不到页面时显示（例如 /abc、/zh/people/不存在的人）。
// 因为语言放在网址里（app/[lang]/layout.tsx），404 进不了 layout，所以这里自己载入样式和字体，
// 中英文同时显示（404 页不知道访客在看哪一种语言）。需要 next.config.ts 的 globalNotFound。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { firm } from "@/lib/site";

const text = {
  title: "找不到这个页面\nPage not found",
  desc: "这个网址可能已经更改或删除。The page may have moved or no longer exists.",
  home: { zh: "回到首页", en: "Go to Home (English)" },
};

export const metadata: Metadata = {
  title: `404 | ${firm.name}`,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="zh-Hans" className={fontVariables}>
      <body className="lang-zh">
        <main>
          <section className="section">
            <div className="page-head"><div className="container">
              <span className="tag">404</span>
              <h1>{text.title}</h1>
              <p>{text.desc}</p>
              <div className="btn-row">
                <Link className="btn btn-cta" href="/zh">{text.home.zh}</Link>
                <Link className="btn btn-ghost" href="/en">{text.home.en}</Link>
              </div>
            </div></div>
          </section>
        </main>
      </body>
    </html>
  );
}
