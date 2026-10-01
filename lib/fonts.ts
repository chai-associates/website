import { EB_Garamond, Noto_Sans_SC, Plus_Jakarta_Sans } from "next/font/google";
// 载入的字体会变成 CSS 变量（--font-noto-sc 等），在 app/tokens.css 里使用

// 字体：中文 Noto Sans SC、英文 Plus Jakarta Sans、Logo 用 EB Garamond
export const notoSC = Noto_Sans_SC({ weight: ["400", "500", "700"], preload: false, display: "swap", variable: "--font-noto-sc" });
export const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-jakarta" });
export const garamond = EB_Garamond({ subsets: ["latin"], weight: ["500"], variable: "--font-garamond" });
