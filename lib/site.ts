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
// ⚠ founded、phone、email、careersEmail、tagline 是示范资料（律师人数由 team 自动算），等律所问卷 A 部分回来后替换
export const firm = {
  name: "Chai & Associates",
  nameZh: "律师事务所",
  founded: 2010, // 页脚和关于我们显示「Est. 2010」
  phone: "+60194774149",
  phoneDisplay: "+6019-477 4149",
  email: "enquiry@chaiassociates.com.my",
  careersEmail: "careers@chaiassociates.com.my", // 招聘电邮（加入我们页）
  tagline: { zh: "专注家事法律，陪你走过人生转折。", en: "Family law, handled with care." },
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

// 不给 message 就用上面的默认讯息；询问表格会给自己组好的讯息
export const whatsappLink = (lang: Lang, message: string = firm.whatsappMessage[lang]) =>
  `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(message)}`;

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${firm.name} ${address}`)}`;

// ── 办事处（新增城市或办事处只改这里） ──────────
// label：短名（按钮用）· full：全名（标题用）
export const cities: { id: string; label: Bi; full: Bi }[] = [
  { id: "jb", label: { zh: "新山", en: "JB" }, full: { zh: "新山", en: "Johor Bahru" } },
  { id: "kl", label: { zh: "吉隆坡", en: "KL" }, full: { zh: "吉隆坡（八打灵再也）", en: "Petaling Jaya" } },
  { id: "mlk", label: { zh: "马六甲", en: "Melaka" }, full: { zh: "马六甲", en: "Melaka" } },
];

// id：办事处编号（团队成员用它指定在哪一间）
export const offices: { id: string; city: string; name: Bi; address: string; phone: string; phoneDisplay: string }[] = [
  { id: "impian-emas", city: "jb", name: { zh: "Taman Impian Emas（士姑来）", en: "Taman Impian Emas (Skudai)" }, address: "241, Jalan Impian Emas 22, Taman Impian Emas, 81300 Skudai, Johor", phone: "+60194774149", phoneDisplay: "+6019-477 4149" },
  { id: "eko-galleria", city: "jb", name: { zh: "Eko Galleria（依斯干达公主城）", en: "Eko Galleria (Iskandar Puteri)" }, address: "B-05-36, Blok B, Eko Galleria, Persiaran Eko Botani, 79100 Iskandar Puteri, Johor", phone: "+6075853008", phoneDisplay: "+607-585 3008" },
  { id: "jaya-putra", city: "jb", name: { zh: "Bandar Jaya Putra", en: "Bandar Jaya Putra" }, address: "12-01 & 12-02, Jalan Jaya Putra 7/2, Bandar Jaya Putra, 81100 Johor Bahru, Johor", phone: "+6073614666", phoneDisplay: "+607-361 4666" },
  { id: "taman-sea", city: "kl", name: { zh: "八打灵再也 Taman Sea", en: "Petaling Jaya (Taman Sea)" }, address: "51-03, Jalan SS 23/15, Taman Sea, 47400 Petaling Jaya, Selangor", phone: "+60378869672", phoneDisplay: "+603-7886 9672" },
  { id: "ayer-keroh", city: "mlk", name: { zh: "Ayer Keroh", en: "Ayer Keroh" }, address: "No. 27-2, Jalan PPPS 1, Pusat Perniagaan Putra Sentosa, 75150 Ayer Keroh, Melaka", phone: "+6062337189", phoneDisplay: "+606-233 7189" },
];

// ── 团队（首页、律师团队页、以后的个人页、办事处页都读这里） ──
// 职位 → 属于哪一组。法律支援团队（助理、实习律师）不能放在「律师」组（律师公会规定）。
export const roles = {
  "managing-partner": { group: "partners", label: { zh: "主管合伙人", en: "Managing Partner" } },
  "partner": { group: "partners", label: { zh: "合伙人", en: "Partner" } },
  "consultant": { group: "partners", label: { zh: "顾问律师", en: "Consultant" } },
  "senior-associate": { group: "lawyers", label: { zh: "资深律师", en: "Senior Associate" } },
  "associate": { group: "lawyers", label: { zh: "律师", en: "Associate" } },
  "legal-assistant": { group: "support", label: { zh: "法律助理", en: "Legal Assistant" } },
  "pupil": { group: "support", label: { zh: "实习律师", en: "Pupil in Chambers" } },
} as const;
export type Role = keyof typeof roles;
export const teamGroups = [
  { id: "partners", title: { zh: "合伙人与顾问律师", en: "Partners & Consultants" } },
  { id: "lawyers", title: { zh: "律师", en: "Lawyers" } },
  { id: "support", title: { zh: "法律支援团队", en: "Legal Support" } },
] as const;

// 每一位成员（顺序 = 显示顺序）。对应「律师问卷」第 1–3 部分。
// ⚠ 以下是示范资料（名字取自设计稿），上线前全部换成律所的真实资料。
// office：所在办事处（上面 offices 的 id）· honorific：Dato'、Dr 等，没有就不填
// services：负责的服务（服务的 slug）· lead：主要领域（会排第一并加黑）
// image：照片放进 public/images/people/ 后填上路径（人像 4:5）
type Member = { slug: string; honorific?: string; name: Bi; role: Role; office: string; languages: Bi; services: string[]; lead?: string; image: string | null };
const EN_ZH = { zh: "English · 华语", en: "English · Mandarin" };
export const team: Member[] = [
  { slug: "lim-hui-ying", name: { zh: "林慧盈", en: "Lim Hui Ying" }, role: "managing-partner", office: "impian-emas", languages: { zh: "English · 华语 · 粤语", en: "English · Mandarin · Cantonese" }, services: ["custody", "matrimonial-assets", "joint-petition", "single-petition"], lead: "custody", image: null },
  { slug: "tan-kok-wai", name: { zh: "陈国伟", en: "Tan Kok Wai" }, role: "partner", office: "taman-sea", languages: { zh: "English · 华语 · 福建话", en: "English · Mandarin · Hokkien" }, services: ["single-petition", "adultery", "matrimonial-assets"], lead: "single-petition", image: null },
  { slug: "ng-pei-shan", name: { zh: "黄佩珊", en: "Ng Pei Shan" }, role: "partner", office: "ayer-keroh", languages: { zh: "English · 华语 · 马来语", en: "English · Mandarin · Malay" }, services: ["joint-petition", "spousal-maintenance", "child-maintenance"], lead: "joint-petition", image: null },
  { slug: "wong-jun-hao", honorific: "Dato'", name: { zh: "王俊豪", en: "Wong Jun Hao" }, role: "consultant", office: "eko-galleria", languages: EN_ZH, services: ["matrimonial-assets", "prenup"], lead: "matrimonial-assets", image: null },
  { slug: "jessica-tan-mei-ling", name: { zh: "陈美玲", en: "Jessica Tan Mei Ling" }, role: "senior-associate", office: "impian-emas", languages: { zh: "English · 华语 · 粤语", en: "English · Mandarin · Cantonese" }, services: ["custody", "access", "matrimonial-assets", "foreign-divorce", "spousal-maintenance"], lead: "custody", image: null },
  { slug: "lee-chee-keong", name: { zh: "李志强", en: "Lee Chee Keong" }, role: "senior-associate", office: "taman-sea", languages: { zh: "English · 华语 · 客家话", en: "English · Mandarin · Hakka" }, services: ["responding", "enforcement", "variation"], lead: "responding", image: null },
  { slug: "priya-nair", name: { zh: "Priya Nair", en: "Priya Nair" }, role: "associate", office: "jaya-putra", languages: { zh: "English · 马来语 · 淡米尔语", en: "English · Malay · Tamil" }, services: ["protection-order", "deed-of-separation"], lead: "protection-order", image: null },
  { slug: "ong-zi-xuan", name: { zh: "王子萱", en: "Ong Zi Xuan" }, role: "associate", office: "ayer-keroh", languages: EN_ZH, services: ["joint-petition", "single-status"], lead: "joint-petition", image: null },
  { slug: "goh-xin-yi", name: { zh: "吴欣怡", en: "Goh Xin Yi" }, role: "legal-assistant", office: "impian-emas", languages: { zh: "English · 华语 · 福建话", en: "English · Mandarin · Hokkien" }, services: [], image: null },
  { slug: "yap-wen-jie", name: { zh: "叶文杰", en: "Yap Wen Jie" }, role: "legal-assistant", office: "taman-sea", languages: EN_ZH, services: [], image: null },
  { slug: "nurul-aina", name: { zh: "Nurul Aina", en: "Nurul Aina" }, role: "legal-assistant", office: "jaya-putra", languages: { zh: "English · 马来语", en: "English · Malay" }, services: [], image: null },
  { slug: "chong-mei-qi", name: { zh: "张美琪", en: "Chong Mei Qi" }, role: "pupil", office: "eko-galleria", languages: { zh: "English · 华语 · 粤语", en: "English · Mandarin · Cantonese" }, services: [], image: null },
];
// 显示用的名字：加上称号，例如「Dato' Wong Jun Hao」
export const displayName = (p: Member, lang: Lang) => (p.honorific ? `${p.honorific} ` : "") + p.name[lang];
// 成员所在的城市（由办事处推出来，不另外记）
export const cityOf = (p: Member) => cities.find((c) => c.id === offices.find((o) => o.id === p.office)?.city)!;
// 没有照片时显示的英文名缩写，例如 Lim Hui Ying → LH
export const initials = (name: Bi) => name.en.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// 律师人数（合伙人、顾问律师、律师；法律支援团队不算律师）
export const lawyerCount = team.filter((p) => roles[p.role].group !== "support").length;

// ── 离婚服务：5 个分类（首页卡片、选单、服务页都读这里） ──
// 网址：/services（全部）→ /services/分类 → /services/分类/服务
// image：照片放进 public/images/services/ 后，把 null 改成路径
export const serviceCategories = [
  { slug: "divorce", title: { zh: "办理离婚", en: "Getting Divorced" }, short: { zh: "协议、单方面、外遇与婚姻无效", en: "Joint, single, adultery and annulment" }, image: null as string | null },
  { slug: "children", title: { zh: "孩子", en: "Children" }, short: { zh: "抚养权、探视权与抚养费", en: "Custody, access and child maintenance" }, image: null as string | null },
  { slug: "finances", title: { zh: "财产与赡养费", en: "Money & Property" }, short: { zh: "赡养费、财产分配与欠债", en: "Maintenance, assets and debts" }, image: null as string | null },
  { slug: "after-divorce", title: { zh: "离婚之后", en: "After Divorce" }, short: { zh: "执行、修改法庭令与婚姻状况证明", en: "Enforcing and changing orders, marital status" }, image: null as string | null },
  { slug: "separation", title: { zh: "分居与保护", en: "Separation & Protection" }, short: { zh: "分居协议、家暴保护令与调解", en: "Separation deeds, protection orders, mediation" }, image: null as string | null },
] as const;
export type ServiceCategory = (typeof serviceCategories)[number]["slug"];

// ── 每一项服务（category = 属于哪个分类；不要的直接删掉那一行） ──
export const services: { slug: string; category: ServiceCategory; title: Bi; short: Bi }[] = [
  // 办理离婚
  { slug: "joint-petition", category: "divorce", title: { zh: "协议离婚", en: "Joint Petition" }, short: { zh: "双方同意离婚及所有条件", en: "When you both agree on everything" } },
  { slug: "single-petition", category: "divorce", title: { zh: "单方面离婚", en: "Single Petition" }, short: { zh: "对方不同意离婚时", en: "When your spouse won't agree" } },
  { slug: "responding", category: "divorce", title: { zh: "收到离婚申请", en: "Responding to a Petition" }, short: { zh: "对方已经提出离婚，你要怎么回应", en: "When your spouse has filed for divorce" } },
  { slug: "adultery", category: "divorce", title: { zh: "外遇与索赔", en: "Adultery & Claims" }, short: { zh: "因外遇离婚，并向对方或第三者索赔", en: "Divorce on adultery and claims for damages" } },
  { slug: "annulment", category: "divorce", title: { zh: "婚姻无效", en: "Annulment" }, short: { zh: "无效或可撤销的婚姻", en: "Void and voidable marriages" } },
  { slug: "foreigner-divorce", category: "divorce", title: { zh: "外籍人士离婚", en: "Divorce for Foreigners" }, short: { zh: "外籍人士在马来西亚申请离婚", en: "Divorcing in Malaysia as a foreigner" } },
  // 孩子
  { slug: "custody", category: "children", title: { zh: "抚养权与监护权", en: "Custody & Guardianship" }, short: { zh: "孩子跟谁住、由谁做决定", en: "Who the children live with and who decides" } },
  { slug: "access", category: "children", title: { zh: "探视权", en: "Access" }, short: { zh: "没有抚养权的一方如何探望孩子", en: "Time with your children after separation" } },
  { slug: "child-maintenance", category: "children", title: { zh: "子女抚养费", en: "Child Maintenance" }, short: { zh: "孩子的生活与教育费用", en: "Support for your children's needs" } },
  { slug: "adoption", category: "children", title: { zh: "领养", en: "Adoption" }, short: { zh: "合法领养孩子的程序", en: "The legal process of adoption" } },
  // 财产与赡养费
  { slug: "spousal-maintenance", category: "finances", title: { zh: "配偶赡养费", en: "Spousal Maintenance" }, short: { zh: "离婚后配偶的生活费", en: "Financial support after divorce" } },
  { slug: "matrimonial-assets", category: "finances", title: { zh: "婚姻财产分配", en: "Division of Matrimonial Assets" }, short: { zh: "房产、存款、公积金及婚内资产", en: "Your home, savings, EPF and assets" } },
  { slug: "debt-recovery", category: "finances", title: { zh: "追讨欠债", en: "Recovering Debts" }, short: { zh: "在离婚申请中一并追讨欠款", en: "Claiming debts within the divorce" } },
  { slug: "prenup", category: "finances", title: { zh: "婚前协议", en: "Prenuptial Agreement" }, short: { zh: "结婚前先定好财产安排", en: "Agreeing finances before marriage" } },
  // 离婚之后
  { slug: "enforcement", category: "after-divorce", title: { zh: "执行法庭令", en: "Enforcing Court Orders" }, short: { zh: "对方不付赡养费或不遵守探视安排", en: "When orders are not being followed" } },
  { slug: "variation", category: "after-divorce", title: { zh: "修改法庭令", en: "Varying Court Orders" }, short: { zh: "情况改变时，修改抚养权或赡养费", en: "When circumstances change after an order" } },
  { slug: "foreign-divorce", category: "after-divorce", title: { zh: "外国离婚令承认", en: "Recognition of Foreign Divorce" }, short: { zh: "在国外离婚，在马来西亚更新婚姻状况", en: "Registering an overseas divorce in Malaysia" } },
  { slug: "single-status", category: "after-divorce", title: { zh: "单身证明", en: "Single Status Certificate" }, short: { zh: "再婚或办理文件所需的婚姻状况证明", en: "Proof of marital status for remarriage or applications" } },
  // 分居与保护
  { slug: "deed-of-separation", category: "separation", title: { zh: "分居协议", en: "Deed of Separation" }, short: { zh: "暂不离婚，先定好分居安排", en: "Living apart without divorcing yet" } },
  { slug: "protection-order", category: "separation", title: { zh: "家暴保护令", en: "Domestic Violence Protection Order" }, short: { zh: "保护你与孩子的人身安全", en: "Keeping you and your children safe" } },
  { slug: "mediation", category: "separation", title: { zh: "调解", en: "Mediation" }, short: { zh: "不上法庭，协商解决", en: "Resolving matters without court" } },
];

// ── 多个页面共用的文字（选单、面包屑、页尾的「不是你的情况？」） ──
export const common = {
  home: { zh: "首页", en: "Home" },
  services: { zh: "离婚服务", en: "Divorce Services" },
  people: { zh: "律师团队", en: "Our People" },
  viewAll: { zh: "查看全部服务", en: "View All Services" },
  askLawyer: { zh: "直接咨询律师", en: "Ask a Lawyer Now" },
  readMore: { zh: "阅读详情", en: "Read More" },
  call: { zh: "拨打电话", en: "Call Now" },
  directions: { zh: "开始导航", en: "Get Directions" },
  notYours: {
    title: { zh: "不是你的情况？", en: "Not quite your situation?" },
    desc: { zh: "看看我们的全部服务，或直接问律师。", en: "Browse all our services, or ask a lawyer directly." },
  },
};

// ── 法律声明（页脚、以后的服务页和文章页共用） ──
export const disclaimer: Bi = {
  zh: "本网站内容仅供一般参考，不构成法律意见，亦不建立律师与客户关系。",
  en: "The content on this website is general information only. It is not legal advice and does not create a lawyer–client relationship.",
};

// ── 社交媒体（选单和页脚都用这里） ──
export const socials: { label: string; url: string }[] = [
  { label: "Facebook", url: "https://www.facebook.com/CHAI.ASSOCIATES/" },
  { label: "Instagram", url: "https://www.instagram.com/chai.consults/" }, // 之后改成 chai.associates
];
