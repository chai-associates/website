// ═══════════════════════════════════════════════════════════════
// 字体 · 全站共用（layout.tsx 和 404 页都用）
// · 中文正文：MiSans（小米，免费商用）——npm 套件 misans，已照小米官方范围切成小档，访客只下载页面用到的字
// · 中文标题：思源宋体 Noto Serif SC（Google Fonts）
// · 英文正文：Plus Jakarta Sans · 英文标题、Logo：EB Garamond
// 变成 CSS 变量，tokens.css 里的 --font-zh / --font-en / --font-serif 使用这些变量。
// ═══════════════════════════════════════════════════════════════
import "misans/lib/Normal/MiSans-Regular.min.css"; // 400：正文
import "misans/lib/Normal/MiSans-Medium.min.css"; // 500：按钮、连结、卡片标题 h3
import { EB_Garamond, Noto_Serif_SC, Plus_Jakarta_Sans } from "next/font/google";

const notoSerifSC = Noto_Serif_SC({ weight: ["500", "700"], preload: false, display: "swap", variable: "--font-noto-serif-sc" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jakarta" });
const garamond = EB_Garamond({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-garamond" });

// 放在 <html className> 上
export const fontVariables = `${notoSerifSC.variable} ${jakarta.variable} ${garamond.variable}`;
