// ═══════════════════════════════════════════════════════════════
// 律所资料 · 全站共用（只放资料，没有画面）
// 多个页面 / layout 都会用到的东西只放这里，改一次全站更新。
// ═══════════════════════════════════════════════════════════════

// ── 语言 ─────────────────────────────────────────
export const locales = ["zh", "en"] as const;
export type Lang = (typeof locales)[number];
export type Bi = { zh: string; en: string }; // 中英对照文字
export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);

// ── 律所 ─────────────────────────────────────────
export const firm = {
  name: "Chai & Associates",
  whatsapp: "60194774149", // 国际格式，不加 + 或空格
  whatsappMessage: {
    zh: "你好，我想预约咨询离婚相关问题。",
    en: "Hi, I'd like to book a consultation about a divorce matter.",
  },
  hours: {
    zh: "星期一至五 · 9:00am – 5:30pm（周末休息）",
    en: "Mon – Fri · 9:00am – 5:30pm (closed on weekends)",
  },
};

export const whatsappLink = (lang: Lang) =>
  `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(firm.whatsappMessage[lang])}`;

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${firm.name} ${address}`)}`;

// ── 办事处（新增城市或办事处只改这里） ──────────
export const cities: { id: string; label: Bi }[] = [
  { id: "jb", label: { zh: "新山", en: "JB" } },
  { id: "kl", label: { zh: "吉隆坡", en: "KL" } },
  { id: "mlk", label: { zh: "马六甲", en: "Melaka" } },
];

export const offices: { city: string; name: Bi; address: string; phone: string; phoneDisplay: string }[] = [
  { city: "jb", name: { zh: "Taman Impian Emas（士姑来）", en: "Taman Impian Emas (Skudai)" }, address: "241, Jalan Impian Emas 22, Taman Impian Emas, 81300 Skudai, Johor", phone: "+60194774149", phoneDisplay: "+6019-477 4149" },
  { city: "jb", name: { zh: "Eko Galleria（依斯干达公主城）", en: "Eko Galleria (Iskandar Puteri)" }, address: "B-05-36, Blok B, Eko Galleria, Persiaran Eko Botani, 79100 Iskandar Puteri, Johor", phone: "+6075853008", phoneDisplay: "+607-585 3008" },
  { city: "jb", name: { zh: "Bandar Jaya Putra", en: "Bandar Jaya Putra" }, address: "12-01 & 12-02, Jalan Jaya Putra 7/2, Bandar Jaya Putra, 81100 Johor Bahru, Johor", phone: "+6073614666", phoneDisplay: "+607-361 4666" },
  { city: "kl", name: { zh: "八打灵再也 Taman Sea", en: "Petaling Jaya (Taman Sea)" }, address: "51-03, Jalan SS 23/15, Taman Sea, 47400 Petaling Jaya, Selangor", phone: "+60378869672", phoneDisplay: "+603-7886 9672" },
  { city: "mlk", name: { zh: "Ayer Keroh", en: "Ayer Keroh" }, address: "No. 27-2, Jalan PPPS 1, Pusat Perniagaan Putra Sentosa, 75150 Ayer Keroh, Melaka", phone: "+6062337189", phoneDisplay: "+606-233 7189" },
];

// ── 服务清单（首页卡片、选单、页脚、以后的服务页都读这里） ──
// href：以后每项服务都有自己的页面，例如 /zh/joint-petition
// image：照片放进 public/images/services/ 后，把 null 改成路径
export const services: { slug: string; title: Bi; short: Bi; image: string | null }[] = [
  { slug: "joint-petition", title: { zh: "协议离婚", en: "Joint Petition" }, short: { zh: "双方同意离婚及所有条件", en: "When you both agree on everything" }, image: null },
  { slug: "single-petition", title: { zh: "单方面离婚", en: "Single Petition" }, short: { zh: "对方不同意离婚时", en: "When your spouse won't agree" }, image: null },
  { slug: "custody", title: { zh: "抚养权与探视权", en: "Custody & Access" }, short: { zh: "孩子的监护与探视安排", en: "Arrangements for your children" }, image: null },
  { slug: "maintenance", title: { zh: "赡养费与抚养费", en: "Maintenance" }, short: { zh: "配偶及子女抚养费", en: "Spousal & child maintenance" }, image: null },
  { slug: "matrimonial-assets", title: { zh: "夫妻财产分割", en: "Matrimonial Assets" }, short: { zh: "房产、存款及婚内资产", en: "Your home, savings and assets" }, image: null },
  { slug: "annulment", title: { zh: "婚姻无效申请", en: "Annulment" }, short: { zh: "无效或可撤销婚姻", en: "Void & voidable marriages" }, image: null },
];

// ── 法律声明（页脚、以后的服务页和文章页共用） ──
export const disclaimer: Bi = {
  zh: "本网站内容仅供一般参考，不构成法律意见，亦不建立律师与客户关系。",
  en: "The content on this website is general information only. It is not legal advice and does not create a lawyer–client relationship.",
};

// ── 社交媒体（有网址才会显示在页脚） ──
export const socials: { label: string; url: string }[] = [
  // { label: "Facebook", url: "https://www.facebook.com/..." },
];
