// ═══════════════════════════════════════════════════════════════
// 字体 · 全站共用（layout.tsx 和 404 页都用）
// 变成 CSS 变量，tokens.css 里的 --font-zh / --font-en / --font-serif 使用这些变量。
// ═══════════════════════════════════════════════════════════════
import { EB_Garamond, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";

const notoSC = Noto_Sans_SC({ weight: ["400", "500", "700"], preload: false, display: "swap", variable: "--font-noto-sc" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jakarta" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-garamond" });

// 放在 <html className> 上
export const fontVariables = `${notoSC.variable} ${jakarta.variable} ${garamond.variable}`;
