// 语言设定：zh = 中文（默认），en = English
export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export type Bi = { zh: string; en: string };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// 从 { zh, en } 里取出当前语言的文字
export const t = (text: Bi, lang: Locale) => text[lang];

export const otherLocale = (lang: Locale): Locale => (lang === "zh" ? "en" : "zh");
