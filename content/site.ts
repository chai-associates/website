// ─────────────────────────────────────────────
// 律所基本资料 · Firm details
// 要改电话、地址、办公时间，改这个文件就好。
// ─────────────────────────────────────────────
import type { Bi } from "@/lib/i18n";

export const site = {
  name: "Chai & Associates",
  nameZh: "律师事务所",
  whatsapp: "60194774149", // 国际格式，不要加 + 或空格
  whatsappMessage: {
    zh: "你好，我想预约咨询离婚相关问题。",
    en: "Hi, I'd like to book a consultation about a divorce matter.",
  } satisfies Bi,
  hours: {
    zh: "星期一至五 · 9:00am – 5:30pm（周末休息）",
    en: "Mon – Fri · 9:00am – 5:30pm (closed on weekends)",
  } satisfies Bi,
};

export type City = "jb" | "kl" | "mlk";

export const cities: { id: City; label: Bi }[] = [
  { id: "jb", label: { zh: "新山", en: "Johor Bahru" } },
  { id: "kl", label: { zh: "吉隆坡", en: "Kuala Lumpur" } },
  { id: "mlk", label: { zh: "马六甲", en: "Melaka" } },
];

export const offices: {
  city: City;
  name: Bi;
  address: string;
  phone: string; // 用来拨号：+60 开头，不要空格
  phoneDisplay: string; // 显示在网站上的格式
}[] = [
  {
    city: "jb",
    name: { zh: "Taman Impian Emas（士姑来）", en: "Taman Impian Emas (Skudai)" },
    address: "241, Jalan Impian Emas 22, Taman Impian Emas, 81300 Skudai, Johor",
    phone: "+60194774149",
    phoneDisplay: "+6019-477 4149",
  },
  {
    city: "jb",
    name: { zh: "Eko Galleria（依斯干达公主城）", en: "Eko Galleria (Iskandar Puteri)" },
    address: "B-05-36, Blok B, Eko Galleria, Persiaran Eko Botani, 79100 Iskandar Puteri, Johor",
    phone: "+6075853008",
    phoneDisplay: "+607-585 3008",
  },
  {
    city: "jb",
    name: { zh: "Bandar Jaya Putra", en: "Bandar Jaya Putra" },
    address: "12-01 & 12-02, Jalan Jaya Putra 7/2, Bandar Jaya Putra, 81100 Johor Bahru, Johor",
    phone: "+6073614666",
    phoneDisplay: "+607-361 4666",
  },
  {
    city: "kl",
    name: { zh: "八打灵再也 Taman Sea", en: "Petaling Jaya (Taman Sea)" },
    address: "51-03, Jalan SS 23/15, Taman Sea, 47400 Petaling Jaya, Selangor",
    phone: "+60378869672",
    phoneDisplay: "+603-7886 9672",
  },
  {
    city: "mlk",
    name: { zh: "Ayer Keroh", en: "Ayer Keroh" },
    address: "No. 27-2, Jalan PPPS 1, Pusat Perniagaan Putra Sentosa, 75150 Ayer Keroh, Melaka",
    phone: "+6062337189",
    phoneDisplay: "+606-233 7189",
  },
];
