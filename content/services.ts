// ─────────────────────────────────────────────
// 服务范围 · Services
// image：照片放进 public/images/services/ 之后，把 null 改成路径，
// 例如 "/images/services/joint-petition.jpg"
// ─────────────────────────────────────────────
import type { Bi } from "@/lib/i18n";

export const services: {
  slug: string; // 网址用，例如 /zh/services/joint-petition
  title: Bi;
  short: Bi;
  image: string | null;
}[] = [
  {
    slug: "joint-petition",
    title: { zh: "协议离婚", en: "Joint Petition" },
    short: { zh: "双方同意离婚及所有条件", en: "When you both agree on everything" },
    image: null,
  },
  {
    slug: "single-petition",
    title: { zh: "单方面离婚", en: "Single Petition" },
    short: { zh: "对方不同意离婚时", en: "When your spouse won't agree" },
    image: null,
  },
  {
    slug: "custody",
    title: { zh: "抚养权与探视权", en: "Custody & Access" },
    short: { zh: "孩子的监护与探视安排", en: "Arrangements for your children" },
    image: null,
  },
  {
    slug: "maintenance",
    title: { zh: "赡养费与抚养费", en: "Maintenance" },
    short: { zh: "配偶及子女抚养费", en: "Spousal & child maintenance" },
    image: null,
  },
  {
    slug: "matrimonial-assets",
    title: { zh: "夫妻财产分割", en: "Matrimonial Assets" },
    short: { zh: "房产、存款及婚内资产", en: "Your home, savings and assets" },
    image: null,
  },
  {
    slug: "annulment",
    title: { zh: "婚姻无效申请", en: "Annulment" },
    short: { zh: "无效或可撤销婚姻", en: "Void & voidable marriages" },
    image: null,
  },
];
