// ─────────────────────────────────────────────
// 网站文案 · Page copy (中文 / English)
// 首页上的标题、按钮文字都在这里改。
// ─────────────────────────────────────────────
export const copy = {
  nav: {
    services: { zh: "服务", en: "Services" },
    people: { zh: "团队", en: "Our People" },
    contact: { zh: "联系", en: "Contact" },
    book: { zh: "预约咨询", en: "Book a Consultation" },
    menu: { zh: "菜单", en: "Menu" },
  },
  hero: {
    title: { zh: "专注家事法律，\n陪你走过\n人生转折。", en: "Family law,\nhandled with care." },
    sub: {
      zh: "离婚、抚养权、赡养费与财产分割，我们用清楚易懂的方式陪你处理每一步。",
      en: "Divorce, custody, maintenance and division of assets — explained clearly and handled with you, step by step.",
    },
    cta: { zh: "预约咨询", en: "Get in Touch" },
    // CTA 下方的快速跳转链接（href = 首页区块的 id）
    jumps: [
      { href: "#services", label: { zh: "查看服务范围", en: "Our services" } },
      { href: "#people", label: { zh: "认识我们的团队", en: "Meet our people" } },
      { href: "#contact", label: { zh: "联系我们", en: "Find an office" } },
    ],
    points: [
      {
        icon: "award",
        title: { zh: "多年经验", en: "Experienced" },
        desc: { zh: "专注离婚与家事案件，熟悉每一个程序。", en: "Focused on divorce and family matters." },
      },
      {
        icon: "receipt",
        title: { zh: "收费透明", en: "Clear fees" },
        desc: { zh: "开始之前先说明费用，清楚明白。", en: "Costs explained before we begin." },
      },
      {
        icon: "lock",
        title: { zh: "隐私保密", en: "Confidential" },
        desc: { zh: "所有咨询内容都严格保密。", en: "Every conversation stays private." },
      },
    ],
    // 首屏照片：background = 照片框里的图；cutout = 人物去背 PNG（可超出框外）。
    // 还没有去背图时 cutout 保持 null，照片框会直接显示 background。
    media: {
      background: "/images/hero/hero-bg.jpg",
      focus: "30% 25%", // 照片的焦点（水平 垂直）：手机照片框较窄时，保证律师在画面内
      cutout: null as string | null,
    },
    imageAlt: { zh: "律师与客户进行咨询", en: "A lawyer in a consultation with a client" },
  },
  services: {
    tag: { zh: "服务范围", en: "Our services" },
    title: { zh: "我们可以怎么帮你", en: "How we can help" },
    more: { zh: "了解", en: "Learn more" },
  },
  people: {
    tag: { zh: "我们的团队", en: "Our people" },
    title: { zh: "认识我们的团队", en: "Meet our people" },
    since: { zh: "执业自", en: "Practising since" },
    swipe: { zh: "← 左右滑动 →", en: "← Swipe →" },
  },
  contact: {
    tag: { zh: "联系我们", en: "Contact" },
    title: { zh: "5 间办事处，就近找我们", en: "Come and see us — 5 offices" },
    call: { zh: "致电", en: "Call" },
    directions: { zh: "导航", en: "Directions" },
  },
  footer: {
    disclaimer: {
      zh: "本网站内容仅供一般参考，不构成法律意见，亦不建立律师与客户关系。",
      en: "The content on this website is general information only. It is not legal advice and does not create a lawyer–client relationship.",
    },
    privacy: { zh: "隐私政策 (PDPA)", en: "Privacy Notice (PDPA)" },
  },
  fab: { zh: "WhatsApp 预约咨询", en: "Book via WhatsApp" },
} as const;
