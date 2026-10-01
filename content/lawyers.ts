// ─────────────────────────────────────────────
// 律师团队 · Our people
// 排列顺序 = 这里的顺序。
// image：照片放进 public/images/lawyers/ 之后，把 null 改成路径，
// 例如 "/images/lawyers/lawyer-01-chai-wei-ming.jpg"
// ─────────────────────────────────────────────
import type { Bi } from "@/lib/i18n";

export type Lawyer = {
  name: Bi;
  role: Bi;
  since: number | null; // 执业年份，例如 2012
  languages: Bi;
  image: string | null;
};

export const lawyers: Lawyer[] = [
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "主管合伙人", en: "Managing Partner" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "律师", en: "Lawyer" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "律师", en: "Lawyer" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "律师", en: "Lawyer" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "律师", en: "Lawyer" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
  { name: { zh: "律师姓名", en: "Lawyer Name" }, role: { zh: "律师", en: "Lawyer" }, since: null, languages: { zh: "中文 · English", en: "Chinese · English" }, image: null },
];
